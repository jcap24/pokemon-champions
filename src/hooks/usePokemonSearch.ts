import { useState, useEffect, useRef } from 'react';
import { PokemonType } from '../types';

export interface PokeSearchResult {
  name: string;
  dex: number;
  types: PokemonType[];
  sprite: string;
  restricted: boolean;
}

// Pokemon that are Restricted in VGC (Reg I / Reg M-A)
const RESTRICTED_NAMES = new Set([
  'mewtwo', 'lugia', 'ho-oh', 'kyogre', 'groudon', 'rayquaza',
  'dialga', 'palkia', 'giratina', 'giratina-origin',
  'reshiram', 'zekrom', 'kyurem', 'kyurem-black', 'kyurem-white',
  'xerneas', 'yveltal', 'zygarde',
  'cosmog', 'cosmoem', 'solgaleo', 'lunala', 'necrozma',
  'necrozma-dusk-mane', 'necrozma-dawn-wings', 'necrozma-ultra',
  'zacian', 'zacian-crowned', 'zamazenta', 'zamazenta-crowned', 'eternatus',
  'calyrex', 'calyrex-ice', 'calyrex-shadow',
  'koraidon', 'miraidon',
]);

// Full list cache — fetched once
let allPokemonCache: { name: string; url: string }[] | null = null;
let cachePromise: Promise<{ name: string; url: string }[]> | null = null;

async function fetchAllPokemon(): Promise<{ name: string; url: string }[]> {
  if (allPokemonCache) return allPokemonCache;
  if (cachePromise) return cachePromise;

  cachePromise = fetch('https://pokeapi.co/api/v2/pokemon?limit=2000')
    .then(r => r.json())
    .then(data => {
      allPokemonCache = data.results as { name: string; url: string }[];
      return allPokemonCache;
    });

  return cachePromise;
}

function extractDexFromUrl(url: string): number {
  const parts = url.split('/').filter(Boolean);
  return parseInt(parts[parts.length - 1], 10);
}

function formatName(name: string): string {
  return name
    .split('-')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join('-');
}

// Detail cache keyed by name
const detailCache = new Map<string, PokeSearchResult>();

async function fetchPokemonDetail(name: string, dex: number): Promise<PokeSearchResult> {
  if (detailCache.has(name)) return detailCache.get(name)!;

  const data = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`).then(r => r.json());

  const types = (data.types as { type: { name: string } }[])
    .map(t => t.type.name as PokemonType)
    .sort((a, b) => (data.types[0].type.name === a ? -1 : 1));

  const sprite =
    data.sprites?.other?.['official-artwork']?.front_default ||
    data.sprites?.front_default ||
    '';

  const result: PokeSearchResult = {
    name: formatName(name),
    dex,
    types,
    sprite,
    restricted: RESTRICTED_NAMES.has(name),
  };

  detailCache.set(name, result);
  return result;
}

export function usePokemonSearch(query: string) {
  const [results, setResults] = useState<PokeSearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [allLoaded, setAllLoaded] = useState(false);
  const abortRef = useRef<AbortController | null>(null);

  // Pre-load the name list on mount
  useEffect(() => {
    fetchAllPokemon().then(() => setAllLoaded(true));
  }, []);

  useEffect(() => {
    if (!query.trim() || query.length < 2) {
      setResults([]);
      return;
    }

    const q = query.toLowerCase().trim();

    if (!allPokemonCache) return;

    // Filter names locally (fast)
    const matches = allPokemonCache
      .filter(p => p.name.includes(q))
      .slice(0, 20); // cap at 20 results

    if (matches.length === 0) {
      setResults([]);
      return;
    }

    // Cancel any previous fetch batch
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setLoading(true);

    // For each match, use cached detail or show a skeleton with just name+dex
    // Prioritise cached ones for instant display, then fill in the rest
    const quick: PokeSearchResult[] = matches.map(m => {
      const dex = extractDexFromUrl(m.url);
      if (detailCache.has(m.name)) return detailCache.get(m.name)!;
      // Placeholder until detail loads
      return {
        name: formatName(m.name),
        dex,
        types: [],
        sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${dex}.png`,
        restricted: RESTRICTED_NAMES.has(m.name),
      };
    });
    setResults(quick);
    setLoading(false);

    // Fetch details for uncached entries in background (fills in types)
    const uncached = matches.filter(m => !detailCache.has(m.name));
    if (uncached.length === 0) return;

    Promise.all(
      uncached.map(m => fetchPokemonDetail(m.name, extractDexFromUrl(m.url)).catch(() => null))
    ).then(details => {
      if (controller.signal.aborted) return;
      setResults(prev =>
        prev.map(r => {
          const apiName = r.name.toLowerCase().replace(/[^a-z0-9-]/g, '');
          const found = details.find(d => d && d.name.toLowerCase() === r.name.toLowerCase());
          return found || r;
        })
      );
    });

    return () => controller.abort();
  }, [query, allLoaded]);

  return { results, loading };
}

export { fetchPokemonDetail, formatName, extractDexFromUrl };

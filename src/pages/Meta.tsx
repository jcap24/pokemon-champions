import { useState, useEffect } from 'react';
import { META_POKEMON_REG_I, META_POKEMON_CHAMP } from '../data/metaPokemon';
import { MetaPokemon, Archetype } from '../types';
import TypeBadge from '../components/TypeBadge';

// Convert display name to PokeAPI slug
// e.g. "Mega Meganium" → "meganium-mega", "Flutter Mane" → "flutter-mane"
function toApiSlug(name: string): string {
  if (name.startsWith('Mega ')) {
    return name.slice(5).toLowerCase().replace(/\s+/g, '-') + '-mega';
  }
  return name.toLowerCase().replace(/\s+/g, '-');
}

const spriteCache = new Map<string, string>();

function usePokemonSprite(name: string, fallbackDex: number): string {
  const slug = toApiSlug(name);
  const fallback = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${fallbackDex}.png`;
  const [url, setUrl] = useState<string>(spriteCache.get(slug) ?? fallback);

  useEffect(() => {
    if (spriteCache.has(slug)) {
      setUrl(spriteCache.get(slug)!);
      return;
    }
    fetch(`https://pokeapi.co/api/v2/pokemon/${slug}`)
      .then(r => r.json())
      .then(data => {
        const sprite =
          data?.sprites?.other?.['official-artwork']?.front_default ?? fallback;
        spriteCache.set(slug, sprite);
        setUrl(sprite);
      })
      .catch(() => setUrl(fallback));
  }, [slug, fallback]);

  return url;
}

const TIER_ORDER = ['S', 'A', 'B', 'C'] as const;

const TIER_COLORS = {
  S: 'text-yellow-400 border-yellow-400/30 bg-yellow-400/10',
  A: 'text-orange-400 border-orange-400/30 bg-orange-400/10',
  B: 'text-blue-400 border-blue-400/30 bg-blue-400/10',
  C: 'text-slate-400 border-slate-400/30 bg-slate-400/10',
};

const ARCHETYPE_LABELS: Record<Archetype, string> = {
  'hyper-offense': 'Hyper Offense',
  'trick-room': 'Trick Room',
  'weather': 'Weather',
  'balance': 'Balance',
  'stall': 'Stall',
};

function PokemonCard({ pokemon }: { pokemon: MetaPokemon }) {
  const [showDetails, setShowDetails] = useState(false);
  const spriteUrl = usePokemonSprite(pokemon.name, pokemon.dexNumber);

  return (
    <div
      className={`card cursor-pointer hover:border-white/30 transition-all ${showDetails ? 'border-blue-500/30' : ''}`}
      onClick={() => setShowDetails(v => !v)}
    >
      <div className="flex items-start gap-3">
        {/* Sprite */}
        <div className="w-16 h-16 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0 overflow-hidden">
          <img
            src={spriteUrl}
            alt={pokemon.name}
            className="pokemon-sprite w-full h-full"
            onError={e => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className={`text-xs font-bold px-2 py-0.5 rounded border ${TIER_COLORS[pokemon.tier]}`}>
              {pokemon.tier}
            </span>
            <h3 className="font-bold text-sm">{pokemon.name}</h3>
            {pokemon.isRestricted && (
              <span className="text-xs shimmer-gold px-2 py-0.5 rounded font-bold">
                RESTRICTED
              </span>
            )}
            {pokemon.newInChampions && (
              <span className="text-xs bg-green-400/20 text-green-400 border border-green-400/30 px-2 py-0.5 rounded font-bold">
                NEW
              </span>
            )}
          </div>
          <div className="flex gap-1 mt-1.5 flex-wrap">
            {pokemon.types.map(t => <TypeBadge key={t} type={t} />)}
          </div>
          <p className="text-white/50 text-xs mt-1">{pokemon.role}</p>
        </div>

        {/* Usage bar */}
        <div className="text-right flex-shrink-0">
          <div className="text-sm font-bold text-white">{pokemon.usagePercent}%</div>
          <div className="text-white/40 text-xs">usage</div>
          <div className="w-16 h-1.5 bg-white/10 rounded-full mt-1 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
              style={{ width: `${pokemon.usagePercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Expanded details */}
      {showDetails && (
        <div className="mt-4 pt-4 border-t border-white/10 space-y-3">
          <div>
            <p className="text-white/40 text-xs uppercase tracking-wider mb-1.5">Key Strengths</p>
            <ul className="space-y-1">
              {pokemon.keyStrengths.map(s => (
                <li key={s} className="text-sm text-white/70 flex items-start gap-1.5">
                  <span className="text-yellow-400 mt-0.5">•</span>{s}
                </li>
              ))}
            </ul>
          </div>
          <div className="grid grid-cols-3 gap-3 text-xs">
            <div>
              <p className="text-white/40 uppercase tracking-wider mb-1">Abilities</p>
              <ul className="space-y-0.5 text-white/70">
                {pokemon.commonAbilities.map(a => <li key={a}>{a}</li>)}
              </ul>
            </div>
            <div>
              <p className="text-white/40 uppercase tracking-wider mb-1">Items</p>
              <ul className="space-y-0.5 text-white/70">
                {pokemon.commonItems.slice(0, 3).map(i => <li key={i}>{i}</li>)}
              </ul>
            </div>
            <div>
              <p className="text-white/40 uppercase tracking-wider mb-1">Moves</p>
              <ul className="space-y-0.5 text-white/70">
                {pokemon.commonMoves.slice(0, 4).map(m => <li key={m}>{m}</li>)}
              </ul>
            </div>
          </div>
          <div>
            <p className="text-white/40 text-xs uppercase tracking-wider mb-1.5">Used In</p>
            <div className="flex flex-wrap gap-1.5">
              {pokemon.archetypes.map(a => (
                <span key={a} className="text-xs bg-white/10 px-2 py-0.5 rounded text-white/70">
                  {ARCHETYPE_LABELS[a]}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

type FormatKey = 'reg-i' | 'champ';

const FORMAT_INFO: Record<FormatKey, {
  label: string;
  badge: string;
  badgeColor: string;
  description: string;
  rules: string[];
  note: string;
}> = {
  'reg-i': {
    label: 'S/V Regulation I',
    badge: 'ACTIVE NOW',
    badgeColor: 'bg-green-500/20 text-green-400 border-green-500/30',
    description: 'The final Scarlet & Violet format. Active through May 28, 2026.',
    rules: ['2 Restricted Pokemon allowed', 'Level 50 cap', 'Doubles (6 bring 4)', 'Terastallization only'],
    note: 'Usage data sourced from Pikalytics & Smogon VGC Reg I ladder.',
  },
  'champ': {
    label: 'Champions Reg M-A',
    badge: 'LAUNCHES MAY 29',
    badgeColor: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    description: 'First Pokemon Champions format. Debuts at Indianapolis Regionals (May 29–31, 2026).',
    rules: ['Omni Ring — all gimmicks available (Mega, Z-Move, Dynamax, Tera)', '2 Restricted Pokemon allowed', 'Level 50 cap', 'Doubles (6 bring 4)', 'No IVs'],
    note: 'Projected early meta — Champions launched April 8, 2026. Tier data reflects known power levels + Omni Ring impact.',
  },
};

export default function Meta() {
  const [format, setFormat] = useState<FormatKey>('reg-i');
  const [filter, setFilter] = useState<'all' | Archetype | 'restricted' | 'new'>('all');
  const [search, setSearch] = useState('');

  const pool = format === 'reg-i' ? META_POKEMON_REG_I : META_POKEMON_CHAMP;
  const info = FORMAT_INFO[format];

  const filtered = pool.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    if (!matchesSearch) return false;
    if (filter === 'all') return true;
    if (filter === 'restricted') return p.isRestricted;
    if (filter === 'new') return p.newInChampions;
    return p.archetypes.includes(filter as Archetype);
  });

  const byTier = TIER_ORDER.reduce((acc, tier) => {
    acc[tier] = filtered.filter(p => p.tier === tier);
    return acc;
  }, {} as Record<string, MetaPokemon[]>);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-black mb-2">Meta Hub</h1>
        <p className="text-white/60">VGC tier lists and usage data by format</p>
      </div>

      {/* Format switcher */}
      <div className="card mb-5">
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          {(Object.entries(FORMAT_INFO) as [FormatKey, typeof FORMAT_INFO[FormatKey]][]).map(([key, f]) => (
            <button
              key={key}
              onClick={() => { setFormat(key); setFilter('all'); }}
              className={`flex-1 text-left p-3 rounded-lg border transition-all ${
                format === key
                  ? 'border-blue-500/50 bg-blue-500/10'
                  : 'border-white/10 hover:border-white/20 bg-white/5'
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="font-bold text-sm">{f.label}</span>
                <span className={`text-xs px-2 py-0.5 rounded border font-semibold ${f.badgeColor}`}>
                  {f.badge}
                </span>
              </div>
              <p className="text-white/50 text-xs">{f.description}</p>
            </button>
          ))}
        </div>

        {/* Format rules */}
        <div className="flex flex-wrap gap-x-4 gap-y-1">
          {info.rules.map(r => (
            <span key={r} className="text-xs text-white/50 flex items-center gap-1">
              <span className="text-blue-400">▸</span>{r}
            </span>
          ))}
        </div>
        <p className="text-xs text-white/30 mt-2 italic">{info.note}</p>
      </div>

      {/* Filter bar */}
      <div className="flex gap-2 flex-wrap mb-6">
        <input
          type="text"
          placeholder="Search Pokemon..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="input-field max-w-48"
        />
        {[
          { key: 'all', label: 'All' },
          { key: 'restricted', label: '⭐ Restricted' },
          ...(format === 'champ' ? [{ key: 'new', label: '🆕 New in Champions' }] : []),
          { key: 'hyper-offense', label: 'Hyper Offense' },
          { key: 'trick-room', label: 'Trick Room' },
          { key: 'weather', label: 'Weather' },
          { key: 'balance', label: 'Balance' },
          { key: 'stall', label: 'Stall' },
        ].map(f => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key as typeof filter)}
            className={`text-sm px-3 py-1.5 rounded-lg font-medium transition-colors ${
              filter === f.key
                ? 'bg-blue-600 text-white'
                : 'bg-white/10 text-white/70 hover:bg-white/20'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Tier sections */}
      <div className="space-y-8">
        {TIER_ORDER.map(tier => {
          const pokemon = byTier[tier];
          if (!pokemon?.length) return null;
          return (
            <div key={tier}>
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-10 h-10 rounded-xl border-2 flex items-center justify-center font-black text-lg ${TIER_COLORS[tier]}`}>
                  {tier}
                </div>
                <div>
                  <h2 className="font-bold">{tier} Tier</h2>
                  <p className="text-white/40 text-xs">{pokemon.length} Pokemon</p>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-3">
                {pokemon.map(p => (
                  <PokemonCard key={p.name} pokemon={p} />
                ))}
              </div>
            </div>
          );
        })}
        {filtered.length === 0 && (
          <div className="text-center py-12 text-white/40">
            No Pokemon match your filter.
          </div>
        )}
      </div>
    </div>
  );
}

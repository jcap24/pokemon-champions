import { useState, useCallback } from 'react';
import { Team, TeamPokemon, PokemonType, PokemonEVs } from '../types';
import { POKEMON_TYPES, NATURES, POPULAR_ITEMS, VGC_ROLES } from '../data/pokemonData';
import TypeBadge from '../components/TypeBadge';
import { usePokemonSearch, PokeSearchResult } from '../hooks/usePokemonSearch';

const EMPTY_EVS: PokemonEVs = { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 };
const EV_TOTAL = 510;
const EV_MAX = 252;

function evTotal(evs: PokemonEVs) {
  return evs.hp + evs.atk + evs.def + evs.spa + evs.spd + evs.spe;
}

function createEmptySlot(): TeamPokemon {
  return {
    id: Math.random().toString(36).slice(2),
    dexNumber: 0,
    name: '',
    types: [],
    ability: '',
    item: '',
    teraType: 'normal',
    gimmick: 'none',
    moves: ['', '', '', ''],
    evs: { ...EMPTY_EVS },
    nature: 'Hardy',
    role: '',
    spriteUrl: '',
    isRestricted: false,
  };
}

function createEmptyTeam(): Team {
  return {
    id: Math.random().toString(36).slice(2),
    name: 'New Team',
    archetype: 'balance',
    format: 'Regulation M-A',
    pokemon: [],
    notes: '',
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };
}

function loadTeams(): Team[] {
  try {
    return JSON.parse(localStorage.getItem('vgc-teams') || '[]');
  } catch {
    return [];
  }
}

function saveTeams(teams: Team[]) {
  localStorage.setItem('vgc-teams', JSON.stringify(teams));
}

// EV Slider component
function EVSlider({ label, value, onChange, remaining }: {
  label: string; value: number; onChange: (v: number) => void; remaining: number;
}) {
  const max = Math.min(EV_MAX, value + remaining);
  const pct = (value / 252) * 100;
  return (
    <div>
      <div className="flex justify-between text-xs mb-1">
        <span className="text-white/50 uppercase">{label}</span>
        <span className={value > 0 ? 'text-blue-400 font-bold' : 'text-white/40'}>{value}</span>
      </div>
      <input
        type="range"
        min={0}
        max={max}
        value={value}
        onChange={e => onChange(Number(e.target.value))}
        className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
        style={{
          background: `linear-gradient(to right, #3B4CCA ${pct}%, rgba(255,255,255,0.1) ${pct}%)`,
        }}
      />
    </div>
  );
}

// Pokemon slot card
function PokemonSlot({
  pokemon,
  slotIndex,
  onEdit,
  onRemove,
  isEditing,
}: {
  pokemon: TeamPokemon | null;
  slotIndex: number;
  onEdit: () => void;
  onRemove: () => void;
  isEditing: boolean;
}) {
  const spriteUrl = pokemon?.dexNumber
    ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.dexNumber}.png`
    : null;

  if (!pokemon || !pokemon.name) {
    return (
      <button
        onClick={onEdit}
        className="card border-dashed border-white/20 hover:border-white/40 flex items-center justify-center gap-2 h-24 text-white/40 hover:text-white/60 transition-all cursor-pointer w-full"
      >
        <span className="text-2xl">+</span>
        <span className="text-sm">Add Pokemon #{slotIndex + 1}</span>
      </button>
    );
  }

  return (
    <div
      className={`card cursor-pointer hover:border-white/30 transition-all ${isEditing ? 'border-blue-500/50 bg-blue-500/5' : ''}`}
      onClick={onEdit}
    >
      <div className="flex items-center gap-3">
        <div className="w-14 h-14 bg-white/5 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
          {spriteUrl ? (
            <img src={spriteUrl} alt={pokemon.name} className="pokemon-sprite w-full h-full"
              onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }} />
          ) : (
            <span className="text-2xl">❓</span>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="font-bold text-sm">{pokemon.name}</span>
            {pokemon.isRestricted && (
              <span className="text-xs shimmer-gold px-1.5 py-0.5 rounded font-bold">R</span>
            )}
          </div>
          <div className="flex gap-1 mt-1 flex-wrap">
            {pokemon.types.map(t => <TypeBadge key={t} type={t} />)}
          </div>
          {pokemon.item && <p className="text-white/40 text-xs mt-0.5 truncate">@ {pokemon.item}</p>}
        </div>
        <button
          onClick={e => { e.stopPropagation(); onRemove(); }}
          className="text-white/30 hover:text-red-400 transition-colors p-1 flex-shrink-0"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}

// Pokemon search/edit panel
function PokemonEditPanel({
  pokemon,
  onUpdate,
  onClose,
}: {
  pokemon: TeamPokemon;
  onUpdate: (p: TeamPokemon) => void;
  onClose: () => void;
}) {
  const [search, setSearch] = useState('');
  const { results, loading } = usePokemonSearch(search);

  const remaining = EV_TOTAL - evTotal(pokemon.evs);

  const updateEV = (stat: keyof PokemonEVs, val: number) => {
    onUpdate({ ...pokemon, evs: { ...pokemon.evs, [stat]: val } });
  };

  const updateMove = (i: number, val: string) => {
    const moves = [...pokemon.moves];
    moves[i] = val;
    onUpdate({ ...pokemon, moves });
  };

  const selectPokemon = (p: PokeSearchResult) => {
    onUpdate({
      ...pokemon,
      dexNumber: p.dex,
      name: p.name,
      types: p.types,
      isRestricted: p.restricted,
      spriteUrl: p.sprite,
    });
    setSearch('');
  };

  return (
    <div className="card space-y-5">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-base">Edit Pokemon</h3>
        <button onClick={onClose} className="text-white/40 hover:text-white transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Pokemon search */}
      <div>
        <label className="text-xs text-white/40 uppercase tracking-wider block mb-2">Select Pokemon</label>
        <input
          type="text"
          placeholder="Search any Pokemon... (e.g. Garchomp)"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="input-field mb-2"
        />
        {search.length >= 2 && (
          <div className="max-h-52 overflow-y-auto space-y-1 bg-white/5 rounded-lg p-2">
            {loading && (
              <p className="text-white/40 text-sm text-center py-2">Searching...</p>
            )}
            {!loading && results.length === 0 && (
              <p className="text-white/40 text-sm text-center py-2">No results for "{search}"</p>
            )}
            {results.map(p => (
              <button
                key={`${p.name}-${p.dex}`}
                onClick={() => selectPokemon(p)}
                className="w-full text-left px-3 py-2 rounded-lg hover:bg-white/10 transition-colors flex items-center gap-2"
              >
                <img
                  src={p.sprite || `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${p.dex}.png`}
                  alt={p.name}
                  className="w-8 h-8 pokemon-sprite"
                  onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
                />
                <span className="text-sm font-medium">{p.name}</span>
                <div className="flex gap-1 ml-auto flex-wrap">
                  {p.types.map(t => <TypeBadge key={t} type={t} />)}
                </div>
                {p.restricted && <span className="text-xs shimmer-gold px-1.5 py-0.5 rounded font-bold flex-shrink-0">R</span>}
              </button>
            ))}
          </div>
        )}
        {search.length === 1 && (
          <p className="text-white/30 text-xs px-1">Type at least 2 characters to search</p>
        )}
        {pokemon.name && (
          <div className="flex items-center gap-2 mt-2 p-2 bg-white/5 rounded-lg">
            <img
              src={pokemon.spriteUrl || `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.dexNumber}.png`}
              alt={pokemon.name}
              className="w-10 h-10 pokemon-sprite"
              onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
            />
            <div>
              <div className="font-bold text-sm">{pokemon.name}</div>
              <div className="flex gap-1">{pokemon.types.map(t => <TypeBadge key={t} type={t} />)}</div>
            </div>
          </div>
        )}
      </div>

      {/* Nickname */}
      <div>
        <label className="text-xs text-white/40 uppercase tracking-wider block mb-2">Nickname (optional)</label>
        <input
          type="text"
          placeholder="Nickname..."
          value={pokemon.nickname || ''}
          onChange={e => onUpdate({ ...pokemon, nickname: e.target.value })}
          className="input-field"
        />
      </div>

      {/* Role */}
      <div>
        <label className="text-xs text-white/40 uppercase tracking-wider block mb-2">Role</label>
        <select
          value={pokemon.role}
          onChange={e => onUpdate({ ...pokemon, role: e.target.value })}
          className="input-field"
        >
          <option value="">Select role...</option>
          {VGC_ROLES.map(r => <option key={r} value={r}>{r}</option>)}
        </select>
      </div>

      {/* Item */}
      <div>
        <label className="text-xs text-white/40 uppercase tracking-wider block mb-2">Held Item</label>
        <input
          type="text"
          list="items-list"
          placeholder="Search item..."
          value={pokemon.item}
          onChange={e => onUpdate({ ...pokemon, item: e.target.value })}
          className="input-field"
        />
        <datalist id="items-list">
          {POPULAR_ITEMS.map(i => <option key={i} value={i} />)}
        </datalist>
      </div>

      {/* Ability */}
      <div>
        <label className="text-xs text-white/40 uppercase tracking-wider block mb-2">Ability</label>
        <input
          type="text"
          placeholder="Ability..."
          value={pokemon.ability}
          onChange={e => onUpdate({ ...pokemon, ability: e.target.value })}
          className="input-field"
        />
      </div>

      {/* Nature */}
      <div>
        <label className="text-xs text-white/40 uppercase tracking-wider block mb-2">Nature</label>
        <select
          value={pokemon.nature}
          onChange={e => onUpdate({ ...pokemon, nature: e.target.value })}
          className="input-field"
        >
          {NATURES.map(n => <option key={n} value={n}>{n}</option>)}
        </select>
      </div>

      {/* Tera Type */}
      <div>
        <label className="text-xs text-white/40 uppercase tracking-wider block mb-2">Tera Type</label>
        <select
          value={pokemon.teraType}
          onChange={e => onUpdate({ ...pokemon, teraType: e.target.value as PokemonType })}
          className="input-field"
        >
          {POKEMON_TYPES.map(t => (
            <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>
          ))}
        </select>
      </div>

      {/* Gimmick */}
      <div>
        <label className="text-xs text-white/40 uppercase tracking-wider block mb-2">Gimmick (Omni Ring)</label>
        <select
          value={pokemon.gimmick}
          onChange={e => onUpdate({ ...pokemon, gimmick: e.target.value as TeamPokemon['gimmick'] })}
          className="input-field"
        >
          <option value="none">None</option>
          <option value="mega">Mega Evolution</option>
          <option value="zmove">Z-Move</option>
          <option value="dynamax">Dynamax</option>
          <option value="gigantamax">Gigantamax</option>
          <option value="tera">Terastallization</option>
        </select>
      </div>

      {/* Moves */}
      <div>
        <label className="text-xs text-white/40 uppercase tracking-wider block mb-2">Moves</label>
        <div className="space-y-2">
          {[0, 1, 2, 3].map(i => (
            <input
              key={i}
              type="text"
              placeholder={`Move ${i + 1}...`}
              value={pokemon.moves[i] || ''}
              onChange={e => updateMove(i, e.target.value)}
              className="input-field"
            />
          ))}
        </div>
      </div>

      {/* EVs */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs text-white/40 uppercase tracking-wider">EV Spread</label>
          <span className={`text-xs font-bold ${remaining < 0 ? 'text-red-400' : remaining === 0 ? 'text-green-400' : 'text-white/50'}`}>
            {evTotal(pokemon.evs)} / {EV_TOTAL} used
          </span>
        </div>
        <div className="space-y-3">
          {(Object.keys(pokemon.evs) as (keyof PokemonEVs)[]).map(stat => (
            <EVSlider
              key={stat}
              label={stat.toUpperCase()}
              value={pokemon.evs[stat]}
              onChange={val => updateEV(stat, val)}
              remaining={remaining}
            />
          ))}
        </div>
      </div>

      <button onClick={onClose} className="btn-primary w-full">
        Done
      </button>
    </div>
  );
}

// Type coverage analysis
function TypeCoverage({ team }: { team: Team }) {
  const moveTypes = team.pokemon.flatMap(p => p.types);
  const uniqueTypes = [...new Set(moveTypes)];

  const defWeaknesses = team.pokemon.reduce<Record<string, number>>((acc, p) => {
    // Simplified weakness tracking based on types
    p.types.forEach(t => {
      if (t === 'ice') { acc['fire'] = (acc['fire'] || 0) + 1; acc['rock'] = (acc['rock'] || 0) + 1; }
      if (t === 'dragon') { acc['ice'] = (acc['ice'] || 0) + 1; acc['fairy'] = (acc['fairy'] || 0) + 1; }
      if (t === 'flying') { acc['electric'] = (acc['electric'] || 0) + 1; acc['ice'] = (acc['ice'] || 0) + 1; acc['rock'] = (acc['rock'] || 0) + 1; }
      if (t === 'fire') { acc['water'] = (acc['water'] || 0) + 1; acc['rock'] = (acc['rock'] || 0) + 1; }
      if (t === 'grass') { acc['fire'] = (acc['fire'] || 0) + 1; acc['bug'] = (acc['bug'] || 0) + 1; }
    });
    return acc;
  }, {});

  const topWeaknesses = Object.entries(defWeaknesses)
    .filter(([, count]) => count >= 2)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  return (
    <div className="card">
      <h3 className="font-bold mb-3 flex items-center gap-2 text-sm">
        <span>🎯</span> Team Analysis
      </h3>
      <div className="space-y-3">
        <div>
          <p className="text-white/40 text-xs uppercase tracking-wider mb-2">STAB Types</p>
          <div className="flex flex-wrap gap-1.5">
            {uniqueTypes.length > 0
              ? uniqueTypes.map(t => <TypeBadge key={t} type={t} size="md" />)
              : <span className="text-white/30 text-xs">Add Pokemon to analyze</span>
            }
          </div>
        </div>

        {topWeaknesses.length > 0 && (
          <div>
            <p className="text-white/40 text-xs uppercase tracking-wider mb-2">Shared Weaknesses</p>
            <div className="space-y-1">
              {topWeaknesses.map(([type, count]) => (
                <div key={type} className="flex items-center gap-2">
                  <TypeBadge type={type as PokemonType} size="sm" />
                  <span className="text-xs text-white/50">×{count} Pokemon weak</span>
                  {count >= 3 && <span className="text-xs text-red-400">⚠</span>}
                </div>
              ))}
            </div>
          </div>
        )}

        <div>
          <p className="text-white/40 text-xs uppercase tracking-wider mb-2">Restricted Slots</p>
          <div className="flex gap-2">
            {[0, 1].map(i => {
              const restricted = team.pokemon.filter(p => p.isRestricted);
              const filled = restricted[i];
              return (
                <div key={i} className={`flex-1 h-8 rounded-lg border flex items-center justify-center text-xs font-medium ${
                  filled ? 'border-yellow-400/50 bg-yellow-400/10 text-yellow-400' : 'border-white/10 text-white/30'
                }`}>
                  {filled ? filled.name : `Slot ${i + 1}`}
                </div>
              );
            })}
          </div>
          <p className="text-white/30 text-xs mt-1">Max 2 Restricted Pokemon (Reg M-A)</p>
        </div>
      </div>
    </div>
  );
}

export default function TeamBuilder() {
  const [teams, setTeams] = useState<Team[]>(loadTeams);
  const [activeTeamId, setActiveTeamId] = useState<string | null>(teams[0]?.id ?? null);
  const [editingSlot, setEditingSlot] = useState<number | null>(null);

  const activeTeam = teams.find(t => t.id === activeTeamId) ?? null;

  const updateTeam = useCallback((updated: Team) => {
    setTeams(prev => {
      const next = prev.map(t => t.id === updated.id ? { ...updated, updatedAt: Date.now() } : t);
      saveTeams(next);
      return next;
    });
  }, []);

  const newTeam = () => {
    const t = createEmptyTeam();
    setTeams(prev => { const next = [...prev, t]; saveTeams(next); return next; });
    setActiveTeamId(t.id);
    setEditingSlot(null);
  };

  const deleteTeam = (id: string) => {
    setTeams(prev => {
      const next = prev.filter(t => t.id !== id);
      saveTeams(next);
      return next;
    });
    if (activeTeamId === id) {
      setActiveTeamId(teams.find(t => t.id !== id)?.id ?? null);
    }
  };

  const updatePokemon = (slotIndex: number, updated: TeamPokemon) => {
    if (!activeTeam) return;
    const pokemon = [...activeTeam.pokemon];
    pokemon[slotIndex] = updated;
    updateTeam({ ...activeTeam, pokemon });
  };

  const removePokemon = (slotIndex: number) => {
    if (!activeTeam) return;
    const pokemon = activeTeam.pokemon.filter((_, i) => i !== slotIndex);
    updateTeam({ ...activeTeam, pokemon });
    setEditingSlot(null);
  };

  const addPokemonSlot = () => {
    if (!activeTeam || activeTeam.pokemon.length >= 6) return;
    const pokemon = [...activeTeam.pokemon, createEmptySlot()];
    updateTeam({ ...activeTeam, pokemon });
    setEditingSlot(pokemon.length - 1);
  };

  const editSlot = (i: number) => {
    if (!activeTeam) return;
    if (i >= activeTeam.pokemon.length) {
      addPokemonSlot();
    } else {
      setEditingSlot(editingSlot === i ? null : i);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-6 flex items-start justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-3xl font-black mb-1">Team Builder</h1>
          <p className="text-white/60 text-sm">Build your VGC team for Pokemon Champions</p>
        </div>
        <button onClick={newTeam} className="btn-primary flex items-center gap-2">
          <span>+</span> New Team
        </button>
      </div>

      {/* Team tabs */}
      {teams.length > 0 && (
        <div className="flex gap-2 flex-wrap mb-6 overflow-x-auto pb-1">
          {teams.map(t => (
            <div key={t.id} className="flex items-center">
              <button
                onClick={() => { setActiveTeamId(t.id); setEditingSlot(null); }}
                className={`px-3 py-1.5 rounded-l-lg text-sm font-medium transition-colors ${
                  activeTeamId === t.id ? 'bg-pokemon-blue text-white' : 'bg-white/10 text-white/60 hover:bg-white/20'
                }`}
              >
                {t.name}
              </button>
              <button
                onClick={() => deleteTeam(t.id)}
                className={`px-2 py-1.5 rounded-r-lg text-sm transition-colors border-l border-white/10 ${
                  activeTeamId === t.id ? 'bg-pokemon-blue/70 hover:bg-red-600 text-white' : 'bg-white/10 hover:bg-red-600 text-white/40 hover:text-white'
                }`}
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}

      {!activeTeam ? (
        <div className="text-center py-16">
          <div className="text-5xl mb-4">⚔️</div>
          <h2 className="text-xl font-bold mb-2">No Teams Yet</h2>
          <p className="text-white/50 mb-6">Create your first VGC team to get started</p>
          <button onClick={newTeam} className="btn-primary">Create First Team</button>
        </div>
      ) : (
        <div className="grid lg:grid-cols-[1fr_380px] gap-6">
          {/* Left: Team details */}
          <div className="space-y-4">
            {/* Team info */}
            <div className="card space-y-3">
              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-white/40 uppercase tracking-wider block mb-1">Team Name</label>
                  <input
                    type="text"
                    value={activeTeam.name}
                    onChange={e => updateTeam({ ...activeTeam, name: e.target.value })}
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="text-xs text-white/40 uppercase tracking-wider block mb-1">Archetype</label>
                  <select
                    value={activeTeam.archetype}
                    onChange={e => updateTeam({ ...activeTeam, archetype: e.target.value as Team['archetype'] })}
                    className="input-field"
                  >
                    <option value="hyper-offense">Hyper Offense</option>
                    <option value="trick-room">Trick Room</option>
                    <option value="weather">Weather</option>
                    <option value="balance">Balance</option>
                    <option value="stall">Stall</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="text-xs text-white/40 uppercase tracking-wider block mb-1">Notes</label>
                <textarea
                  value={activeTeam.notes}
                  onChange={e => updateTeam({ ...activeTeam, notes: e.target.value })}
                  placeholder="Team notes, lead combos, win conditions..."
                  className="input-field resize-none h-16 text-sm"
                />
              </div>
            </div>

            {/* Pokemon slots */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <p className="text-white/40 text-xs uppercase tracking-wider">
                  Pokemon ({activeTeam.pokemon.length}/6)
                </p>
                {activeTeam.pokemon.length < 6 && (
                  <button onClick={addPokemonSlot} className="text-xs text-blue-400 hover:text-blue-300 transition-colors">
                    + Add Pokemon
                  </button>
                )}
              </div>
              <div className="space-y-2">
                {Array.from({ length: 6 }).map((_, i) => {
                  const mon = activeTeam.pokemon[i] ?? null;
                  return (
                    <PokemonSlot
                      key={i}
                      pokemon={mon}
                      slotIndex={i}
                      onEdit={() => editSlot(i)}
                      onRemove={() => removePokemon(i)}
                      isEditing={editingSlot === i}
                    />
                  );
                })}
              </div>
            </div>

            {/* Type Coverage */}
            <TypeCoverage team={activeTeam} />
          </div>

          {/* Right: Edit panel */}
          <div>
            {editingSlot !== null && activeTeam.pokemon[editingSlot] ? (
              <div className="lg:sticky lg:top-20">
                <PokemonEditPanel
                  pokemon={activeTeam.pokemon[editingSlot]}
                  onUpdate={p => updatePokemon(editingSlot, p)}
                  onClose={() => setEditingSlot(null)}
                />
              </div>
            ) : (
              <div className="card text-center py-8 text-white/30">
                <div className="text-4xl mb-3">👆</div>
                <p className="text-sm">Click a Pokemon slot to edit</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

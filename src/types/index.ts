export type PokemonType =
  | 'normal' | 'fire' | 'water' | 'electric' | 'grass' | 'ice'
  | 'fighting' | 'poison' | 'ground' | 'flying' | 'psychic' | 'bug'
  | 'rock' | 'ghost' | 'dragon' | 'dark' | 'steel' | 'fairy' | 'stellar';

export type Gimmick = 'mega' | 'zmove' | 'dynamax' | 'gigantamax' | 'tera' | 'none';

export type Archetype = 'hyper-offense' | 'trick-room' | 'weather' | 'balance' | 'stall';
export type WeatherType = 'sun' | 'rain' | 'sand' | 'snow';

export interface PokemonMove {
  name: string;
  type: PokemonType;
  category: 'physical' | 'special' | 'status';
  power: number | null;
  accuracy: number | null;
  pp: number;
  effect: string;
}

export interface PokemonEVs {
  hp: number;
  atk: number;
  def: number;
  spa: number;
  spd: number;
  spe: number;
}

export interface TeamPokemon {
  id: string;
  dexNumber: number;
  name: string;
  nickname?: string;
  types: PokemonType[];
  ability: string;
  item: string;
  teraType: PokemonType;
  gimmick: Gimmick;
  moves: string[];
  evs: PokemonEVs;
  nature: string;
  role: string;
  spriteUrl: string;
  isRestricted: boolean;
}

export interface Team {
  id: string;
  name: string;
  archetype: Archetype;
  format: string;
  pokemon: TeamPokemon[];
  notes: string;
  createdAt: number;
  updatedAt: number;
}

export interface MetaPokemon {
  dexNumber: number;
  name: string;
  types: PokemonType[];
  role: string;
  tier: 'S' | 'A' | 'B' | 'C';
  usagePercent: number;
  commonAbilities: string[];
  commonItems: string[];
  commonMoves: string[];
  isRestricted: boolean;
  archetypes: Archetype[];
  keyStrengths: string[];
  spriteUrl: string;
  newInChampions?: boolean;
}

export interface StrategyArchetype {
  id: Archetype;
  name: string;
  description: string;
  playstyle: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  keyMechanics: string[];
  corePokemon: string[];
  sampleTeam: string[];
  pros: string[];
  cons: string[];
  colorGradient: string;
  icon: string;
}

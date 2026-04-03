import { PokemonType } from '../types';

interface TypeBadgeProps {
  type: PokemonType;
  size?: 'sm' | 'md' | 'lg';
}

const TYPE_LABELS: Record<PokemonType, string> = {
  normal: 'Normal', fire: 'Fire', water: 'Water', electric: 'Electric',
  grass: 'Grass', ice: 'Ice', fighting: 'Fighting', poison: 'Poison',
  ground: 'Ground', flying: 'Flying', psychic: 'Psychic', bug: 'Bug',
  rock: 'Rock', ghost: 'Ghost', dragon: 'Dragon', dark: 'Dark',
  steel: 'Steel', fairy: 'Fairy', stellar: 'Stellar'
};

export default function TypeBadge({ type, size = 'sm' }: TypeBadgeProps) {
  const sizeClass = size === 'lg' ? 'px-3 py-1 text-sm' : size === 'md' ? 'px-2 py-0.5 text-xs' : 'px-2 py-0.5 text-xs';

  return (
    <span className={`type-badge type-${type} ${sizeClass} font-bold rounded`}>
      {TYPE_LABELS[type]}
    </span>
  );
}

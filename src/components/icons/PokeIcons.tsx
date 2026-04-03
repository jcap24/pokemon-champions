// Pokeball SVG
export function PokeballIcon({ size = 40, className = '' }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" className={className} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="pbTop" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ef4444" />
          <stop offset="100%" stopColor="#b91c1c" />
        </linearGradient>
        <linearGradient id="pbBot" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#e5e7eb" />
          <stop offset="100%" stopColor="#9ca3af" />
        </linearGradient>
      </defs>
      <circle cx="50" cy="50" r="46" fill="url(#pbBot)" stroke="#374151" strokeWidth="3" />
      <path d="M 4 50 A 46 46 0 0 1 96 50 Z" fill="url(#pbTop)" />
      <rect x="4" y="47" width="92" height="6" fill="#1f2937" />
      <circle cx="50" cy="50" r="13" fill="#1f2937" stroke="#1f2937" strokeWidth="3" />
      <circle cx="50" cy="50" r="9" fill="white" />
      <circle cx="50" cy="50" r="5" fill="#e5e7eb" />
      <ellipse cx="45" cy="43" rx="4" ry="2.5" fill="white" opacity="0.5" transform="rotate(-30 45 43)" />
    </svg>
  );
}

// Double battle — two silhouettes facing off
export function DoubleBattleIcon({ size = 48, className = '' }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 80" className={className} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="leftTeam" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#6366f1" />
        </linearGradient>
        <linearGradient id="rightTeam" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#ef4444" />
          <stop offset="100%" stopColor="#f97316" />
        </linearGradient>
      </defs>
      {/* Left Pokemon silhouette 1 */}
      <ellipse cx="18" cy="52" rx="14" ry="10" fill="url(#leftTeam)" opacity="0.9" />
      <circle cx="18" cy="38" r="10" fill="url(#leftTeam)" opacity="0.9" />
      <ellipse cx="10" cy="55" rx="5" ry="7" fill="url(#leftTeam)" opacity="0.9" />
      <ellipse cx="26" cy="55" rx="5" ry="7" fill="url(#leftTeam)" opacity="0.9" />
      {/* Left Pokemon silhouette 2 */}
      <ellipse cx="40" cy="54" rx="12" ry="9" fill="url(#leftTeam)" opacity="0.7" />
      <circle cx="40" cy="41" r="9" fill="url(#leftTeam)" opacity="0.7" />
      <ellipse cx="33" cy="57" rx="4" ry="6" fill="url(#leftTeam)" opacity="0.7" />
      <ellipse cx="47" cy="57" rx="4" ry="6" fill="url(#leftTeam)" opacity="0.7" />

      {/* VS divider */}
      <line x1="60" y1="10" x2="60" y2="70" stroke="#fbbf24" strokeWidth="2" strokeDasharray="4,3" />
      <text x="60" y="46" textAnchor="middle" fill="#fbbf24" fontSize="14" fontWeight="bold" fontFamily="sans-serif">VS</text>

      {/* Right Pokemon silhouette 1 (mirrored) */}
      <ellipse cx="80" cy="54" rx="12" ry="9" fill="url(#rightTeam)" opacity="0.7" />
      <circle cx="80" cy="41" r="9" fill="url(#rightTeam)" opacity="0.7" />
      <ellipse cx="73" cy="57" rx="4" ry="6" fill="url(#rightTeam)" opacity="0.7" />
      <ellipse cx="87" cy="57" rx="4" ry="6" fill="url(#rightTeam)" opacity="0.7" />
      {/* Right Pokemon silhouette 2 */}
      <ellipse cx="102" cy="52" rx="14" ry="10" fill="url(#rightTeam)" opacity="0.9" />
      <circle cx="102" cy="38" r="10" fill="url(#rightTeam)" opacity="0.9" />
      <ellipse cx="94" cy="55" rx="5" ry="7" fill="url(#rightTeam)" opacity="0.9" />
      <ellipse cx="110" cy="55" rx="5" ry="7" fill="url(#rightTeam)" opacity="0.9" />
    </svg>
  );
}

// Team slots — 6 pokeball grid
export function TeamSlotsIcon({ size = 48, className = '' }: { size?: number; className?: string }) {
  const positions = [
    [16, 20], [36, 20], [56, 20],
    [16, 44], [36, 44], [56, 44],
  ];
  return (
    <svg width={size} height={size} viewBox="0 0 72 64" className={className} xmlns="http://www.w3.org/2000/svg">
      {positions.map(([cx, cy], i) => (
        <g key={i}>
          <circle cx={cx} cy={cy} r="12" fill={i < 3 ? '#3b82f6' : '#6366f1'} opacity={0.8 - i * 0.05} />
          <path d={`M ${cx - 12} ${cy} A 12 12 0 0 1 ${cx + 12} ${cy} Z`} fill={i < 3 ? '#ef4444' : '#ec4899'} opacity={0.9} />
          <rect x={cx - 12} y={cy - 1.5} width={24} height={3} fill="#111827" />
          <circle cx={cx} cy={cy} r="4" fill="white" />
          <circle cx={cx} cy={cy} r="2.5" fill="#9ca3af" />
        </g>
      ))}
    </svg>
  );
}

// Speed control — lightning + arrows
export function SpeedControlIcon({ size = 48, className = '' }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" className={className} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="speedGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fbbf24" />
          <stop offset="100%" stopColor="#f59e0b" />
        </linearGradient>
      </defs>
      {/* Lightning bolt */}
      <polygon points="48,8 28,44 42,44 32,72 60,36 46,36" fill="url(#speedGrad)" />
      {/* Arrows */}
      <path d="M 8 30 L 18 24 L 18 28 L 26 28 L 26 32 L 18 32 L 18 36 Z" fill="#60a5fa" opacity="0.8" />
      <path d="M 8 52 L 18 46 L 18 50 L 26 50 L 26 54 L 18 54 L 18 58 Z" fill="#60a5fa" opacity="0.6" />
    </svg>
  );
}

// Type chart icon
export function TypeChartIcon({ size = 48, className = '' }: { size?: number; className?: string }) {
  const types = [
    { x: 8, y: 8, color: '#F08030' },   // fire
    { x: 24, y: 8, color: '#6890F0' },  // water
    { x: 40, y: 8, color: '#78C850' },  // grass
    { x: 8, y: 24, color: '#F8D030' },  // electric
    { x: 24, y: 24, color: '#7038F8' }, // dragon
    { x: 40, y: 24, color: '#EE99AC' }, // fairy
    { x: 8, y: 40, color: '#705898' },  // ghost
    { x: 24, y: 40, color: '#B8B8D0' }, // steel
    { x: 40, y: 40, color: '#98D8D8' }, // ice
  ];
  return (
    <svg width={size} height={size} viewBox="0 0 56 56" className={className} xmlns="http://www.w3.org/2000/svg">
      {types.map((t, i) => (
        <rect key={i} x={t.x} y={t.y} width="14" height="12" rx="3" fill={t.color} opacity="0.85" />
      ))}
    </svg>
  );
}

// Trophy / championship icon
export function TrophyIcon({ size = 48, className = '' }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" className={className} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="trophyGold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fbbf24" />
          <stop offset="50%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
      </defs>
      {/* Cup body */}
      <path d="M 22 12 L 58 12 L 54 46 Q 50 54 40 54 Q 30 54 26 46 Z" fill="url(#trophyGold)" />
      {/* Handles */}
      <path d="M 22 16 Q 8 16 8 28 Q 8 38 20 40 L 24 32 Q 16 30 16 26 Q 16 22 22 22 Z" fill="url(#trophyGold)" />
      <path d="M 58 16 Q 72 16 72 28 Q 72 38 60 40 L 56 32 Q 64 30 64 26 Q 64 22 58 22 Z" fill="url(#trophyGold)" />
      {/* Stem */}
      <rect x="35" y="54" width="10" height="10" fill="url(#trophyGold)" />
      {/* Base */}
      <rect x="26" y="64" width="28" height="6" rx="3" fill="url(#trophyGold)" />
      {/* Star in cup */}
      <polygon points="40,22 42.5,29 50,29 44,33.5 46.5,40.5 40,36 33.5,40.5 36,33.5 30,29 37.5,29"
        fill="white" opacity="0.5" />
      {/* Shine */}
      <ellipse cx="32" cy="20" rx="4" ry="6" fill="white" opacity="0.2" transform="rotate(-20 32 20)" />
    </svg>
  );
}

// Z-Crystal icon
export function ZCrystalIcon({ size = 48, className = '' }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" className={className} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="crystalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#a78bfa" />
          <stop offset="50%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#5b21b6" />
        </linearGradient>
      </defs>
      {/* Hexagonal crystal */}
      <polygon points="40,8 62,20 62,60 40,72 18,60 18,20" fill="url(#crystalGrad)" />
      {/* Inner facets */}
      <polygon points="40,8 62,20 40,40" fill="white" opacity="0.15" />
      <polygon points="40,8 18,20 40,40" fill="white" opacity="0.08" />
      <polygon points="62,60 40,72 40,40" fill="black" opacity="0.15" />
      <polygon points="18,60 40,72 40,40" fill="black" opacity="0.08" />
      {/* Z letter */}
      <text x="40" y="48" textAnchor="middle" fill="white" fontSize="24" fontWeight="900"
        fontFamily="sans-serif" opacity="0.9">Z</text>
      {/* Shine */}
      <ellipse cx="32" cy="22" rx="5" ry="8" fill="white" opacity="0.25" transform="rotate(-20 32 22)" />
    </svg>
  );
}

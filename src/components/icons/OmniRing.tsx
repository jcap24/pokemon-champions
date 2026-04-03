export default function OmniRingIcon({ size = 64, className = '' }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id="ringGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#a78bfa" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#7c3aed" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="ringGold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fbbf24" />
          <stop offset="50%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="ringInner" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1e1b4b" />
          <stop offset="100%" stopColor="#312e81" />
        </linearGradient>
      </defs>

      {/* Outer glow */}
      <circle cx="50" cy="50" r="46" fill="url(#ringGlow)" />

      {/* Outer ring band */}
      <circle cx="50" cy="50" r="44" fill="none" stroke="url(#ringGold)" strokeWidth="7" />

      {/* Inner ring */}
      <circle cx="50" cy="50" r="36" fill="url(#ringInner)" stroke="#7c3aed" strokeWidth="1.5" />

      {/* Gimmick gem stones around ring — Mega, Z-Move, Dynamax, Tera */}
      {/* Mega — red top */}
      <circle cx="50" cy="8" r="5.5" fill="#ef4444" stroke="#fca5a5" strokeWidth="1.2" />
      <circle cx="50" cy="8" r="2.5" fill="#fca5a5" opacity="0.8" />

      {/* Z-Move — purple right */}
      <circle cx="92" cy="50" r="5.5" fill="#8b5cf6" stroke="#c4b5fd" strokeWidth="1.2" />
      <circle cx="92" cy="50" r="2.5" fill="#c4b5fd" opacity="0.8" />

      {/* Dynamax — crimson bottom */}
      <circle cx="50" cy="92" r="5.5" fill="#dc2626" stroke="#f87171" strokeWidth="1.2" />
      <circle cx="50" cy="92" r="2.5" fill="#fda4af" opacity="0.8" />

      {/* Tera — cyan left */}
      <circle cx="8" cy="50" r="5.5" fill="#06b6d4" stroke="#67e8f9" strokeWidth="1.2" />
      <circle cx="8" cy="50" r="2.5" fill="#a5f3fc" opacity="0.8" />

      {/* Diagonal gems */}
      <circle cx="21" cy="21" r="4" fill="#f59e0b" stroke="#fde68a" strokeWidth="1" />
      <circle cx="79" cy="21" r="4" fill="#10b981" stroke="#6ee7b7" strokeWidth="1" />
      <circle cx="79" cy="79" r="4" fill="#3b82f6" stroke="#93c5fd" strokeWidth="1" />
      <circle cx="21" cy="79" r="4" fill="#ec4899" stroke="#f9a8d4" strokeWidth="1" />

      {/* Center symbol — stylized O for Omni */}
      <circle cx="50" cy="50" r="14" fill="none" stroke="#a78bfa" strokeWidth="2.5" />
      <circle cx="50" cy="50" r="8" fill="#7c3aed" opacity="0.7" />
      <circle cx="50" cy="50" r="4" fill="#c4b5fd" />

      {/* Shine */}
      <ellipse cx="42" cy="42" rx="5" ry="3" fill="white" opacity="0.15" transform="rotate(-40 42 42)" />
    </svg>
  );
}

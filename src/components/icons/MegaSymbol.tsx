export default function MegaSymbol({ size = 48, className = '' }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="megaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f97316" />
          <stop offset="50%" stopColor="#ef4444" />
          <stop offset="100%" stopColor="#dc2626" />
        </linearGradient>
        <linearGradient id="megaGlow" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fed7aa" />
          <stop offset="100%" stopColor="#fca5a5" />
        </linearGradient>
        <filter id="megaShadow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Outer circle */}
      <circle cx="50" cy="50" r="46" fill="url(#megaGrad)" />

      {/* Inner swirl — Mega Evolution symbol approximation */}
      {/* Main circle ring */}
      <circle cx="50" cy="50" r="34" fill="none" stroke="#fed7aa" strokeWidth="5" />

      {/* Cross dividers */}
      <line x1="50" y1="16" x2="50" y2="84" stroke="#fed7aa" strokeWidth="4" strokeLinecap="round" />
      <line x1="16" y1="50" x2="84" y2="50" stroke="#fed7aa" strokeWidth="4" strokeLinecap="round" />

      {/* Four quadrant arcs to make the swirl shape */}
      <path
        d="M 50 16 A 20 20 0 0 1 70 36"
        fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" opacity="0.9"
      />
      <path
        d="M 84 50 A 20 20 0 0 1 64 70"
        fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" opacity="0.9"
      />
      <path
        d="M 50 84 A 20 20 0 0 1 30 64"
        fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" opacity="0.9"
      />
      <path
        d="M 16 50 A 20 20 0 0 1 36 30"
        fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" opacity="0.9"
      />

      {/* Center dot */}
      <circle cx="50" cy="50" r="7" fill="white" />
      <circle cx="50" cy="50" r="4" fill="#ef4444" />

      {/* Corner dots */}
      <circle cx="50" cy="16" r="3.5" fill="white" />
      <circle cx="84" cy="50" r="3.5" fill="white" />
      <circle cx="50" cy="84" r="3.5" fill="white" />
      <circle cx="16" cy="50" r="3.5" fill="white" />

      {/* Shine */}
      <ellipse cx="38" cy="34" rx="8" ry="5" fill="white" opacity="0.2" transform="rotate(-35 38 34)" />
    </svg>
  );
}

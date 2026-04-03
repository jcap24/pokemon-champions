import { Link } from 'react-router-dom';
import MegaSymbol from '../components/icons/MegaSymbol';
import {
  PokeballIcon,
  DoubleBattleIcon,
  TeamSlotsIcon,
  SpeedControlIcon,
  TypeChartIcon,
  TrophyIcon,
  ZCrystalIcon,
} from '../components/icons/PokeIcons';

// ── Coming-soon gimmicks ──────────────────────────────────────────────────────
const COMING_SOON_GIMMICKS = [
  {
    label: 'Z-Moves',
    border: 'border-purple-500/30',
    desc: 'Once-per-battle ultimate move powered by a Z-Crystal',
    icon: <ZCrystalIcon size={32} />,
  },
  {
    label: 'Dynamax',
    border: 'border-pink-500/30',
    desc: 'Gigantify your Pokemon for 3 turns of boosted Max Moves',
    icon: (
      <svg width="32" height="32" viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="dmax" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f43f5e" />
            <stop offset="100%" stopColor="#e11d48" />
          </linearGradient>
        </defs>
        <path d="M40 8 L60 20 L60 60 L40 72 L20 60 L20 20 Z" fill="none" stroke="#f43f5e" strokeWidth="3" />
        <text x="40" y="50" textAnchor="middle" fill="#f43f5e" fontSize="28" fontWeight="900" fontFamily="sans-serif">D</text>
        <circle cx="40" cy="8" r="4" fill="#f43f5e" />
        <circle cx="40" cy="72" r="4" fill="#f43f5e" />
        <circle cx="20" cy="20" r="3" fill="#f43f5e" />
        <circle cx="60" cy="20" r="3" fill="#f43f5e" />
        <circle cx="20" cy="60" r="3" fill="#f43f5e" />
        <circle cx="60" cy="60" r="3" fill="#f43f5e" />
      </svg>
    ),
  },
  {
    label: 'Terastallize',
    border: 'border-cyan-500/30',
    desc: "Change your Pokémon's type once per battle with a Tera Orb",
    icon: (
      <svg width="32" height="32" viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="tera" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#22d3ee" />
            <stop offset="100%" stopColor="#0891b2" />
          </linearGradient>
        </defs>
        <path d="M40 10 L52 30 L70 20 L60 45 L70 65 L40 55 L10 65 L20 45 L10 20 L28 30 Z"
          fill="url(#tera)" opacity="0.85" />
        <path d="M40 10 L52 30 L40 38 L28 30 Z" fill="white" opacity="0.25" />
        <circle cx="40" cy="40" r="7" fill="white" opacity="0.3" />
        <text x="40" y="47" textAnchor="middle" fill="white" fontSize="16" fontWeight="900" fontFamily="sans-serif">T</text>
      </svg>
    ),
  },
];

// ── Feature cards ─────────────────────────────────────────────────────────────
const FEATURES = [
  {
    icon: <TeamSlotsIcon size={52} />,
    title: 'Team Builder',
    description: 'Build and save full 6-Pokemon teams with EVs, moves, items, Tera types, and Omni Ring gimmick assignments.',
    link: '/builder',
    accent: 'from-blue-600/20 to-blue-500/5',
    border: 'hover:border-blue-500/40',
    badge: 'All Pokemon',
  },
  {
    icon: <TrophyIcon size={52} />,
    title: 'Strategy Center',
    description: 'Master every archetype — Hyper Offense, Trick Room, Weather, Balance, and Stall — with detailed guides.',
    link: '/strategies',
    accent: 'from-yellow-600/20 to-yellow-500/5',
    border: 'hover:border-yellow-500/40',
    badge: '5 Archetypes',
  },
  {
    icon: <TypeChartIcon size={52} />,
    title: 'Meta Hub',
    description: 'S/A/B tier rankings, usage stats, and key info for every major Pokemon in both S/V Reg I and Champions Reg M-A.',
    link: '/meta',
    accent: 'from-green-600/20 to-green-500/5',
    border: 'hover:border-green-500/40',
    badge: 'Live Formats',
  },
  {
    icon: <SpeedControlIcon size={52} />,
    title: 'Resources',
    description: 'Curated links to Pikalytics, Showdown, Smogon, Victory Road, and upcoming tournament dates.',
    link: '/resources',
    accent: 'from-orange-600/20 to-orange-500/5',
    border: 'hover:border-orange-500/40',
    badge: 'Tournaments',
  },
];

// ── VGC mechanics quick cards ─────────────────────────────────────────────────
const MECHANICS = [
  {
    icon: <DoubleBattleIcon size={56} />,
    title: 'Doubles Format',
    lines: ['2 vs 2 on field at once', 'Team of 6, bring 4', 'Spread moves hit both foes', 'Level 50 cap enforced'],
  },
  {
    icon: <PokeballIcon size={48} />,
    title: 'Team Rules',
    lines: ['Max 2 Restricted Pokemon', 'No duplicate held items', 'No duplicate species', 'One Tera / gimmick per battle'],
  },
  {
    icon: <SpeedControlIcon size={48} />,
    title: 'Speed Control',
    lines: ['Tailwind doubles Speed (4 turns)', 'Trick Room reverses order (5 turns)', 'Icy Wind / Electroweb cut Speed', 'Choice Scarf × 1.5 Speed'],
  },
];

export default function Home() {
  return (
    <div className="min-h-screen">

      {/* ── Hero ── */}
      <section className="relative overflow-hidden py-16 px-4">
        <div className="absolute inset-0 bg-gradient-to-br from-pokemon-blue/20 via-transparent to-purple-900/20" />
        <div className="absolute top-0 right-0 w-80 h-80 bg-pokemon-blue/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-800/10 rounded-full blur-3xl" />

        <div className="relative max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-yellow-400/10 border border-yellow-400/30 rounded-full px-4 py-1.5 text-yellow-400 text-sm font-medium mb-6">
            <span className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
            Pokemon Champions — Out Now (April 8, 2026)
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black mb-6 leading-tight">
            Build Your
            <span className="bg-gradient-to-r from-yellow-400 via-red-400 to-pink-400 bg-clip-text text-transparent block">
              Champion Team
            </span>
          </h1>

          <p className="text-lg text-white/60 max-w-2xl mx-auto mb-10 leading-relaxed">
            The ultimate VGC team builder for Pokemon Champions. Plan strategies,
            analyze the meta, and build competitive doubles teams to dominate tournaments.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/builder"
              className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-pokemon-blue to-blue-500 hover:brightness-110 text-white font-bold py-3 px-8 rounded-xl transition-all shadow-lg shadow-blue-500/20"
            >
              <TeamSlotsIcon size={20} />
              Start Building
            </Link>
            <Link
              to="/strategies"
              className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold py-3 px-8 rounded-xl transition-all border border-white/10"
            >
              <TrophyIcon size={20} />
              View Strategies
            </Link>
          </div>
        </div>
      </section>

      {/* ── Mega Evolution / Omni Ring Section ── */}
      <section className="py-12 px-4 border-y border-white/5 bg-white/[0.02]">
        <div className="max-w-5xl mx-auto">

          {/* Top: Mega Evolution — available at launch */}
          <div className="flex flex-col md:flex-row items-center gap-10 mb-10">

            {/* Left: Mega symbol */}
            <div className="flex-shrink-0 flex flex-col items-center">
              <div className="relative">
                <div className="absolute inset-0 bg-orange-500/20 rounded-full blur-2xl scale-125" />
                <MegaSymbol size={140} className="relative drop-shadow-2xl" />
              </div>
            </div>

            {/* Right: Mega Evolution detail */}
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <h2 className="text-2xl font-black">Mega Evolution</h2>
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-green-500/20 text-green-400 border border-green-500/30">
                  Available at Launch
                </span>
              </div>
              <p className="text-white/60 text-sm mb-5 leading-relaxed">
                Mega Evolution is the flagship battle mechanic in Pokemon Champions at launch.
                Your Pokemon holds its Mega Stone to trigger a powerful mid-battle transformation,
                boosting stats and sometimes changing type or ability entirely.
              </p>

              {/* Mega key facts */}
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  { icon: '💎', label: 'Mega Stone required', desc: 'Each Mega-capable Pokemon holds its own unique Mega Stone (e.g. Meganiumite, Feraligatrite)' },
                  { icon: '⚡', label: 'Once per battle', desc: 'Only one Pokemon on your team can Mega Evolve per battle' },
                  { icon: '📈', label: 'Massive stat boosts', desc: 'Stats increase significantly and abilities often change entirely upon Mega Evolution' },
                  { icon: '🆕', label: '3 new Megas', desc: 'Mega Meganium, Mega Feraligatr, and Mega Emboar debut exclusively in Champions' },
                ].map(f => (
                  <div key={f.label} className="flex items-start gap-2.5 p-3 rounded-xl bg-orange-500/5 border border-orange-500/20">
                    <span className="text-xl flex-shrink-0">{f.icon}</span>
                    <div>
                      <p className="font-semibold text-xs text-orange-300">{f.label}</p>
                      <p className="text-white/50 text-xs leading-relaxed mt-0.5">{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Coming soon gimmicks */}
          <div className="border-t border-white/10 pt-6">
            <div className="flex items-center gap-2 mb-4">
              <p className="font-bold text-sm text-white/70">More battle gimmicks coming soon</p>
              <span className="text-xs px-2 py-0.5 rounded-full bg-white/10 text-white/40 border border-white/10 ml-1">Coming Soon</span>
            </div>
            <div className="grid sm:grid-cols-3 gap-3">
              {COMING_SOON_GIMMICKS.map(g => (
                <div key={g.label} className={`flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/10 ${g.border} opacity-60`}>
                  <div className="flex-shrink-0 grayscale opacity-70">{g.icon}</div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-sm text-white/60">{g.label}</p>
                      <span className="text-xs px-1.5 py-0.5 rounded bg-white/10 text-white/30">Soon</span>
                    </div>
                    <p className="text-white/35 text-xs leading-relaxed mt-0.5">{g.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ── New Mega Evolutions ── */}
      <section className="py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <MegaSymbol size={36} />
            <div>
              <h2 className="text-xl font-black">New Mega Evolutions</h2>
              <p className="text-white/50 text-sm">Exclusive to Pokemon Champions</p>
            </div>
          </div>

          <div className="grid sm:grid-cols-3 gap-4">
            {[
              {
                name: 'Mega Meganium',
                dex: 154,
                ability: 'Mega Sol',
                effect: 'All moves act as if harsh sunlight is active — Solar Beam never needs charging.',
                type: 'grass',
                typeColor: '#78C850',
              },
              {
                name: 'Mega Feraligatr',
                dex: 160,
                ability: 'Dragonize',
                effect: 'Normal-type moves become Dragon-type and gain +20% power.',
                type: 'water',
                typeColor: '#6890F0',
              },
              {
                name: 'Mega Emboar',
                dex: 500,
                ability: 'Mold Breaker',
                effect: 'Moves ignore the effects of the target\'s Ability.',
                type: 'fire',
                typeColor: '#F08030',
              },
            ].map(m => (
              <div key={m.name} className="card hover:border-white/25 transition-all group">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-14 h-14 rounded-xl flex items-center justify-center overflow-hidden"
                    style={{ background: `${m.typeColor}22`, border: `1px solid ${m.typeColor}44` }}>
                    <img
                      src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${m.dex}.png`}
                      alt={m.name}
                      className="pokemon-sprite w-full h-full"
                      onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
                    />
                  </div>
                  <div>
                    <MegaSymbol size={18} className="inline-block mb-0.5" />
                    <p className="font-bold text-sm leading-tight">{m.name}</p>
                    <p className="text-xs font-semibold" style={{ color: m.typeColor }}>
                      {m.ability}
                    </p>
                  </div>
                </div>
                <p className="text-white/55 text-xs leading-relaxed">{m.effect}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Feature cards ── */}
      <section className="py-10 px-4 border-t border-white/5 bg-white/[0.015]">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-2">Everything You Need</h2>
          <p className="text-white/50 text-center mb-8 text-sm">Built for Pokemon Champions VGC competitive play</p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {FEATURES.map(f => (
              <Link
                key={f.link}
                to={f.link}
                className={`card group bg-gradient-to-br ${f.accent} ${f.border} hover:-translate-y-1 transition-all cursor-pointer`}
              >
                <div className="mb-3">{f.icon}</div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-bold text-sm group-hover:text-yellow-400 transition-colors">{f.title}</h3>
                  <span className="text-xs bg-white/10 px-1.5 py-0.5 rounded text-white/50 ml-auto flex-shrink-0">{f.badge}</span>
                </div>
                <p className="text-white/55 text-xs leading-relaxed">{f.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── VGC Mechanics ── */}
      <section className="py-10 px-4 border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <DoubleBattleIcon size={44} />
            <div>
              <h2 className="text-xl font-black">VGC Quick Reference</h2>
              <p className="text-white/50 text-sm">Core rules for Pokemon Champions competitive play</p>
            </div>
          </div>

          <div className="grid sm:grid-cols-3 gap-4">
            {MECHANICS.map(m => (
              <div key={m.title} className="card">
                <div className="mb-3">{m.icon}</div>
                <h3 className="font-bold text-sm mb-2 text-white/90">{m.title}</h3>
                <ul className="space-y-1">
                  {m.lines.map(l => (
                    <li key={l} className="text-xs text-white/55 flex items-start gap-1.5">
                      <span className="text-blue-400 mt-0.5 flex-shrink-0">▸</span>{l}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── No IVs banner ── */}
      <section className="py-6 px-4 border-t border-white/5 bg-gradient-to-r from-pokemon-blue/10 via-purple-900/10 to-pink-900/10">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <h3 className="font-bold text-lg">No IVs in Pokemon Champions</h3>
            <p className="text-white/55 text-sm">Individual Values are removed — every Pokemon is optimized equally. EVs and Nature still matter.</p>
          </div>
          <Link to="/builder" className="btn-primary flex-shrink-0 flex items-center gap-2">
            <PokeballIcon size={20} />
            Build Your Team
          </Link>
        </div>
      </section>

    </div>
  );
}

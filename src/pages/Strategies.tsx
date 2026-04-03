import { useState } from 'react';
import { STRATEGIES } from '../data/strategies';
import { StrategyArchetype } from '../types';

function StrategyCard({ strategy, isSelected, onClick }: {
  strategy: StrategyArchetype;
  isSelected: boolean;
  onClick: () => void;
}) {
  const difficultyColor = {
    Beginner: 'text-green-400 bg-green-400/10',
    Intermediate: 'text-yellow-400 bg-yellow-400/10',
    Advanced: 'text-red-400 bg-red-400/10',
  }[strategy.difficulty];

  return (
    <button
      onClick={onClick}
      className={`card text-left w-full transition-all hover:border-white/30 cursor-pointer ${
        isSelected ? 'border-blue-500/50 bg-blue-500/5' : ''
      }`}
    >
      <div className="flex items-start gap-3">
        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${strategy.colorGradient} flex items-center justify-center text-2xl flex-shrink-0`}>
          {strategy.icon}
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="font-bold text-base">{strategy.name}</h3>
            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${difficultyColor}`}>
              {strategy.difficulty}
            </span>
          </div>
          <p className="text-white/60 text-sm mt-1 line-clamp-2">{strategy.description}</p>
        </div>
      </div>
    </button>
  );
}

function StrategyDetail({ strategy }: { strategy: StrategyArchetype }) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className={`rounded-xl p-6 bg-gradient-to-br ${strategy.colorGradient} bg-opacity-10 border border-white/10`}>
        <div className="flex items-center gap-3 mb-3">
          <span className="text-4xl">{strategy.icon}</span>
          <div>
            <h2 className="text-2xl font-black">{strategy.name}</h2>
            <p className="text-white/70 text-sm">{strategy.difficulty} Difficulty</p>
          </div>
        </div>
        <p className="text-white/80 leading-relaxed">{strategy.description}</p>
      </div>

      {/* Playstyle */}
      <div className="card">
        <h3 className="font-bold text-blue-400 mb-3 flex items-center gap-2">
          <span>🎮</span> How to Play
        </h3>
        <p className="text-white/70 text-sm leading-relaxed">{strategy.playstyle}</p>
      </div>

      {/* Key Mechanics */}
      <div className="card">
        <h3 className="font-bold text-purple-400 mb-3 flex items-center gap-2">
          <span>⚙️</span> Key Mechanics
        </h3>
        <ul className="space-y-2">
          {strategy.keyMechanics.map(m => (
            <li key={m} className="flex items-start gap-2 text-sm text-white/70">
              <span className="text-purple-400 mt-0.5">▸</span>
              <span>{m}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Core Pokemon */}
      <div className="card">
        <h3 className="font-bold text-green-400 mb-3 flex items-center gap-2">
          <span>⭐</span> Core Pokemon
        </h3>
        <div className="flex flex-wrap gap-2">
          {strategy.corePokemon.map(p => (
            <span key={p} className="bg-white/10 px-3 py-1.5 rounded-lg text-sm font-medium text-white/90">
              {p}
            </span>
          ))}
        </div>
      </div>

      {/* Sample Team */}
      <div className="card">
        <h3 className="font-bold text-yellow-400 mb-3 flex items-center gap-2">
          <span>🏆</span> Sample Team
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {strategy.sampleTeam.map((p, i) => (
            <div key={i} className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm">
              <span className="text-white/40 text-xs mr-1">#{i + 1}</span>
              <span className="font-medium">{p}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Pros & Cons */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="card">
          <h3 className="font-bold text-green-400 mb-3 flex items-center gap-2">
            <span>✅</span> Strengths
          </h3>
          <ul className="space-y-2">
            {strategy.pros.map(p => (
              <li key={p} className="flex items-start gap-2 text-sm text-white/70">
                <span className="text-green-400 mt-0.5">+</span>
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="card">
          <h3 className="font-bold text-red-400 mb-3 flex items-center gap-2">
            <span>⚠️</span> Weaknesses
          </h3>
          <ul className="space-y-2">
            {strategy.cons.map(c => (
              <li key={c} className="flex items-start gap-2 text-sm text-white/70">
                <span className="text-red-400 mt-0.5">-</span>
                <span>{c}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default function Strategies() {
  const [selected, setSelected] = useState<StrategyArchetype>(STRATEGIES[0]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-black mb-2">Strategy Center</h1>
        <p className="text-white/60">Master every VGC archetype for Pokemon Champions competitive play</p>
      </div>

      <div className="grid lg:grid-cols-[340px_1fr] gap-6">
        {/* Left: Archetype list */}
        <div className="space-y-3">
          <p className="text-white/40 text-xs uppercase tracking-wider font-semibold px-1">Select Archetype</p>
          {STRATEGIES.map(s => (
            <StrategyCard
              key={s.id}
              strategy={s}
              isSelected={selected.id === s.id}
              onClick={() => setSelected(s)}
            />
          ))}
        </div>

        {/* Right: Detail */}
        <div>
          <StrategyDetail strategy={selected} />
        </div>
      </div>
    </div>
  );
}

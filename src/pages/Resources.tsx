const RESOURCE_SECTIONS = [
  {
    title: 'Simulators & Practice',
    icon: '🎮',
    color: 'from-blue-600 to-blue-400',
    items: [
      {
        name: 'Pokemon Showdown',
        url: 'https://pokemonshowdown.com',
        description: 'Free browser-based battle simulator. Test teams on the VGC ladder vs real opponents.',
        tags: ['Free', 'Essential'],
      },
      {
        name: 'Pokemon Champions (Official)',
        url: 'https://champions.pokemon.com',
        description: 'The official game platform. Free to start — the actual tournament game for VGC.',
        tags: ['Official', 'Switch'],
      },
    ],
  },
  {
    title: 'Stats & Usage Data',
    icon: '📊',
    color: 'from-purple-600 to-purple-400',
    items: [
      {
        name: 'Pikalytics',
        url: 'https://pikalytics.com',
        description: 'Usage stats, damage calc, and team builder pulled from Showdown and official ladders. Best tool for meta analysis.',
        tags: ['Usage Stats', 'Damage Calc'],
      },
      {
        name: 'Limitless VGC',
        url: 'https://limitlessvgc.com/pokemon',
        description: 'Pokemon usage rankings pulled directly from tournament results.',
        tags: ['Tournament', 'Stats'],
      },
    ],
  },
  {
    title: 'Community & Guides',
    icon: '📚',
    color: 'from-green-600 to-green-400',
    items: [
      {
        name: 'Victory Road',
        url: 'https://victoryroad.pro',
        description: 'VGC coverage, rules, tournament results, and resource hub. Best single resource for current format info.',
        tags: ['Guides', 'Rules', 'Tournaments'],
      },
      {
        name: 'VGC Guide',
        url: 'https://www.vgcguide.com',
        description: 'Beginner to intermediate guides by 2016 World Champion Wolfe Glick and top players.',
        tags: ['Beginner', 'Guides'],
      },
      {
        name: 'Smogon VGC Forums',
        url: 'https://www.smogon.com/forums/forums/video-game-championships.127',
        description: 'In-depth team reports, sample teams, and metagame discussion threads.',
        tags: ['Advanced', 'Team Reports'],
      },
      {
        name: 'r/VGC',
        url: 'https://reddit.com/r/vgc',
        description: 'Community discussion, team feedback, event news, and meta discourse.',
        tags: ['Community', 'Discussion'],
      },
    ],
  },
  {
    title: 'Tournament Data',
    icon: '🏆',
    color: 'from-yellow-600 to-yellow-400',
    items: [
      {
        name: 'Nimbasa City Post',
        url: 'https://www.nimbasacitypost.com',
        description: 'Damage calculators, Top Cut team lists from major tournaments.',
        tags: ['Top Cut Teams', 'Damage Calc'],
      },
      {
        name: 'VGCpedia',
        url: 'https://www.vgcpedia.com/resources',
        description: 'Aggregated VGC resource list with links to tools, guides, and references.',
        tags: ['Resources', 'Reference'],
      },
      {
        name: 'Play! Pokemon Points',
        url: 'https://www.pokemon.com/us/play-pokemon',
        description: 'Official Play! Pokemon website for tournament registration, points standings, and rules.',
        tags: ['Official', 'Registration'],
      },
    ],
  },
  {
    title: 'Pokemon HOME & Transfers',
    icon: '🏠',
    color: 'from-pink-600 to-pink-400',
    items: [
      {
        name: 'Pokemon HOME',
        url: 'https://home.pokemon.com',
        description: 'Transfer Pokemon from Scarlet/Violet and other games into Pokemon Champions.',
        tags: ['Official', 'Transfer'],
      },
    ],
  },
];

const UPCOMING_EVENTS = [
  {
    name: 'Global Challenge I',
    date: 'May 1–4, 2026',
    format: 'Champions (no CP)',
    location: 'Online',
    type: 'online',
  },
  {
    name: 'Indianapolis Regionals',
    date: 'May 29–31, 2026',
    format: 'Regulation M-A',
    location: 'Indianapolis, Indiana',
    type: 'major',
  },
  {
    name: '2026 Pokemon World Championships',
    date: 'August 2026',
    format: 'Pokemon Champions',
    location: 'TBA',
    type: 'worlds',
  },
];

export default function Resources() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-black mb-2">Resources</h1>
        <p className="text-white/60">Everything you need to compete at the highest level of VGC</p>
      </div>

      {/* Upcoming Events */}
      <div className="card mb-8">
        <h2 className="font-bold text-lg mb-4 flex items-center gap-2">
          <span>📅</span> Upcoming VGC Events
        </h2>
        <div className="space-y-3">
          {UPCOMING_EVENTS.map(e => (
            <div key={e.name} className="flex items-start gap-3 p-3 bg-white/5 rounded-lg">
              <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${
                e.type === 'worlds' ? 'bg-yellow-400' :
                e.type === 'major' ? 'bg-blue-400' : 'bg-green-400'
              }`} />
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-semibold text-sm">{e.name}</span>
                  {e.type === 'worlds' && (
                    <span className="text-xs shimmer-gold px-2 py-0.5 rounded font-bold">WORLDS</span>
                  )}
                </div>
                <p className="text-white/50 text-xs mt-0.5">{e.date} • {e.location}</p>
                <p className="text-white/60 text-xs mt-0.5">Format: {e.format}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Resource sections */}
      <div className="space-y-8">
        {RESOURCE_SECTIONS.map(section => (
          <div key={section.title}>
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${section.color} flex items-center justify-center text-sm`}>
                {section.icon}
              </div>
              <h2 className="font-bold text-lg">{section.title}</h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              {section.items.map(item => (
                <a
                  key={item.name}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card hover:border-white/30 transition-all group cursor-pointer"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-bold text-sm group-hover:text-blue-400 transition-colors flex items-center gap-1">
                        {item.name}
                        <svg className="w-3 h-3 text-white/30 group-hover:text-blue-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </h3>
                      <p className="text-white/60 text-xs mt-1 leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                  <div className="flex gap-1.5 mt-2.5 flex-wrap">
                    {item.tags.map(tag => (
                      <span key={tag} className="text-xs bg-white/10 px-2 py-0.5 rounded text-white/60">
                        {tag}
                      </span>
                    ))}
                  </div>
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Quick tip */}
      <div className="mt-8 p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl">
        <p className="text-sm text-blue-300 leading-relaxed">
          <span className="font-bold">Pro Tip:</span> Start with Pokemon Showdown to test team ideas for free before building your team in Pokemon Champions.
          Pikalytics is essential for checking current meta usage rates before finalizing your team's Pokemon selection.
        </p>
      </div>
    </div>
  );
}

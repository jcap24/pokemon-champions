# Pokemon Champions — VGC Team Builder

A competitive team builder and strategy hub for [Pokemon Champions](https://champions.pokemon.com/en-us/), the new dedicated battle game from The Pokemon Company. Built for VGC (Video Game Championships) doubles play.

---

## Features

### Team Builder
- Search the full Pokemon roster via live PokeAPI lookups
- Build teams of 6 with per-Pokemon EV spreads, natures, moves, held items, and Tera types
- Assign Mega Evolution gimmicks per Pokemon
- Real-time type coverage and shared weakness analysis
- Restricted Pokemon slot tracker (max 2 per team, per Regulation M-A rules)
- Teams saved to local storage — persist across sessions
- Multiple teams supported with tab switching

### Strategy Center
Five fully-documented VGC archetypes with guides, sample teams, core Pokemon, key mechanics, pros and cons:
- Hyper Offense
- Trick Room
- Weather (Sun / Rain / Sand / Snow)
- Balance
- Stall / Attrition

### Meta Hub
Tier lists and usage data for two active formats:

| Format | Status | Rules |
|---|---|---|
| **S/V Regulation I** | Active now | 2 Restricted, Tera only |
| **Champions Regulation M-A** | Launches May 29, 2026 | Mega Evolution, 2 Restricted, no IVs |

Each Pokemon card shows tier rating, usage %, role, common abilities/items/moves, key strengths, and which archetypes it fits. Sprites are fetched live from PokeAPI by name for accuracy.

### Resources
Curated links to the most useful competitive tools:
- [Pikalytics](https://pikalytics.com) — usage stats and damage calc
- [Pokemon Showdown](https://pokemonshowdown.com) — free battle simulator
- [Victory Road](https://victoryroad.pro) — VGC coverage and rules
- [Smogon VGC Forums](https://www.smogon.com/forums/forums/video-game-championships.127/) — team reports and metagame discussion
- [Limitless VGC](https://limitlessvgc.com/pokemon) — tournament usage rankings
- Upcoming tournament dates and formats

---

## Tech Stack

| Tool | Purpose |
|---|---|
| React 18 + TypeScript | UI framework |
| Vite | Build tool and dev server |
| Tailwind CSS | Styling |
| React Router v6 | Client-side routing |
| [PokeAPI](https://pokeapi.co) | Live Pokemon data and sprites |

---

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev
```

App runs at `http://localhost:5173`.

```bash
# Production build
npm run build

# Preview production build
npm run preview
```

---

## Project Structure

```
src/
├── components/
│   ├── Navbar.tsx
│   ├── TypeBadge.tsx
│   └── icons/          # Custom SVG icon components
│       ├── MegaSymbol.tsx
│       ├── OmniRing.tsx
│       └── PokeIcons.tsx
├── data/
│   ├── metaPokemon.ts  # Reg I + Champions Reg M-A tier data
│   ├── pokemonData.ts  # Natures, items, types, VGC roles
│   └── strategies.ts   # Archetype guides
├── hooks/
│   └── usePokemonSearch.ts  # Live PokeAPI search with caching
├── pages/
│   ├── Home.tsx
│   ├── TeamBuilder.tsx
│   ├── Strategies.tsx
│   ├── Meta.tsx
│   └── Resources.tsx
└── types/
    └── index.ts
```

---

## VGC Quick Reference

- **Format:** Doubles — 2v2, team of 6, bring 4
- **Level cap:** 50
- **Restricted Pokemon:** Max 2 per team (Reg M-A)
- **Mega Evolution:** Pokemon holds Mega Stone; one Mega per battle
- **No IVs:** Removed in Pokemon Champions — EVs and Nature still apply

---

## Notes

- Pokemon Champions launched **April 8, 2026** on Nintendo Switch
- The first Champions VGC event is **Indianapolis Regionals, May 29–31, 2026**
- Z-Moves, Dynamax, and Terastallization are planned for future updates to Champions
- This is a fan-made tool. Pokemon is owned by Nintendo / The Pokemon Company

---

## License

MIT

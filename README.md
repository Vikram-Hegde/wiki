# vikram.wiki

Personal site of [Vikram Hegde](https://vikram.wiki/) — frontend engineer, design technologist, Bangalore.

A brutalist single-page site. One `index.astro`. Vanilla CSS. JetBrains Mono for everything. No frameworks, no tracking, no cookies, no analytics.

The `§ NOW.LOG` and `§ STACK.MD` sections pull live data from the GitHub API at build time — the page is a real README for the work, not a hand-curated brochure.

## Stack

- **[Astro 6](https://astro.build/)** — static site generation, fonts API
- **Vanilla CSS** — single `global.css` + scoped styles, CSS custom properties for theming
- **[JetBrains Mono](https://www.jetbrains.com/lp/mono/)** — single font, weights 400/500/600/700/800
- **GitHub REST API** — fetched at build time, no auth, 5s timeout, offline fallback
- **Node ≥ 22.12** — required by Astro 6

## Features

- **Dark mode** via `prefers-color-scheme` — no toggle, just follows system
- **Live GitHub data** — `§ NOW.LOG` shows the 4 most recently pushed repos; `§ STACK.MD` aggregates languages across all public repos, sorted by recent activity
- **Build-time honesty** — every metric on the page (build date, commit hash, section count) is computed at build. No fakes.
- **Zero JS shipped** — the page is fully static HTML + CSS

## Local development

```bash
pnpm install
pnpm dev          # → http://127.0.0.1:4321
pnpm build        # → ./dist
```

Requires Node 22.12+ and pnpm 10+.

## Project structure

```
src/
├── global.css          # design tokens, reset, dark-mode via prefers-color-scheme
├── pages/
│   └── index.astro     # the entire site
└── ...

public/
└── favicon.svg

astro.config.mjs       # fonts config only
```

Everything visual lives in `index.astro`. The frontmatter does the GitHub fetch + derivation; the rest is template + scoped CSS.

## Design

Monospace throughout. Hard 1px/2px rules. No shadows, no gradients, no rounded corners on the structural elements. `NOW.LOG` and `STACK.MD` read as source code — sections, statuses, since-dates — because the page is one.

Color is monochrome by default: black on white in light mode, `#F5F5F5` on `#0A0A0A` in dark mode. Slightly softer than pure black/white for comfortable dark mode.

## Notes

- The site is intentionally tiny. `dist/index.html` is around ~15KB; the JetBrains Mono font subset is the largest asset.
- Redesigned quarterly. The version in production is whatever the latest commit is — no semver, no releases.
- Pull requests for typos welcome. Larger changes — open an issue first.

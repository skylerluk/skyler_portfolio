# skyler_portfolio

A single-screen, editorial portfolio for **Skyler Luk** — aimed at founders hiring a
high-impact generalist who thinks across product, growth & strategy, and actually ships.
Restraint over decoration: one seamless light surface, three zones (About · Rail · Preview),
work separated only by shadow.

## Stack

- **Vite + React 18 + TypeScript** (strict mode)
- **Plain CSS via CSS Modules** per component + a small set of global files
  (`src/styles/tokens.css`, `src/styles/global.css`) owned by Track A. No Tailwind, no CSS-in-JS.
- **Self-hosted fonts** via `@fontsource`: Fraunces, Inter, JetBrains Mono
- **ESLint + Prettier**, strict TS
- **Deploy:** Vercel (Vite preset)
- Node 20+ · package manager: **npm**

## Getting started

```bash
npm install
npm run dev        # start the dev server
npm run build      # tsc + vite build (production)
npm run preview    # preview the production build
npm run lint       # eslint
npm run typecheck  # tsc --noEmit
npm run format     # prettier --write .
```

## How this repo is structured (tracks)

Work is split into parallel **tracks**, each owning a specific set of folders so agents
never collide. The authoritative plan lives in the prompts folder:
`/Users/skylerluk/Documents/Claude/skyler_portfolio` (start with `OVERVIEW.md`).

- **Track A — Foundation & Design System** — app shell, context, design tokens, data layer
  (`src/app/*`, `src/styles/*`, `src/data/*`). Merges first; unblocks the rest.
- **Track B — About + live GitHub tracker** — `src/components/about/*`, `src/lib/github.ts`
- **Track C — Rail + scroll engine** — `src/components/rail/*`
- **Track D — Preview container + project rendering** — `src/components/preview/*`
- **Track E — Assets** — `public/assets/*`, `src/data/assets.ts`

Feature components read shared state through the `usePortfolio()` hook, never by editing
`App.tsx` — see `OVERVIEW.md` §5 for the collision-avoidance contract.

## Deploy

Deployed on Vercel (Vite framework preset, `vercel.json` committed). No environment
variables required. The production deploy is Skyler's click. (Full deploy notes land in A4.)

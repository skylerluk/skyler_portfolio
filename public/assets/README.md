# Assets — how to add logos & screenshots

This folder holds the real project imagery. The app degrades to tasteful placeholders
when a project has no assets, so you can add them **one project at a time**.

The whole flow is: **drop files → run one script → add one entry in `src/data/assets.ts`.**

## 1. Where files go

One folder per project, named by its `project.id` (from `src/data/projects.ts`):

```
public/assets/<project-id>/
  logo.svg     ← square logo (SVG preferred; or logo.png). Monochrome / ink on transparent.
  01.png       ← source screenshots, numbered in display order (01, 02, 03…)
  02.png
  01.webp      ← optimized versions (generated for you by the script — don't hand-make these)
```

Valid project ids:
`sailor` · `bsg` · `amazon` · `ibm` · `uber-wrapped` · `karpathy-brain` · `anthology`

## 2. Screenshot guidance

| Project        | Orientation        | Shots | Notes                                  |
| -------------- | ------------------ | ----- | -------------------------------------- |
| `sailor`       | portrait (mobile)  | 2–3   | Phone frame — tall 9:19.5-ish captures |
| everything else| landscape (browser)| 1–2   | Desktop/browser captures, ~16:10       |

**Recommended source resolution**

- Landscape: **2560×1600** (or the app window at 2× / "Retina"). Wider is fine — the
  optimizer downsamples; too small looks soft in the frame.
- Portrait (Sailor): **1179×2556** (iPhone-ish) or any real device capture at 2×.
- Logos: an actual **SVG** if you have one. Otherwise a square PNG at **≥512×512** on a
  transparent background.

Capture PNG or JPG. You don't need to optimize by hand — that's step 3.

## 3. Optimize

From the repo root:

```bash
npm run assets:optimize
```

This walks every `public/assets/*/` folder and, for each source `*.png`/`*.jpg`,
writes a compact `.webp` next to it (and a smaller `@1280w.webp` width variant for large
landscape shots). Raster logos (`logo.png`) are compressed in place; `logo.svg` is left
untouched. It's **idempotent** — re-running skips anything already up to date.

## 4. Wire it up

Add one entry per project in [`src/data/assets.ts`](../../src/data/assets.ts). A commented
template is in that file. Point `src` at the **`.webp`** the script produced, and write a
real, descriptive `alt` for each shot:

```ts
sailor: {
  logo: '/assets/sailor/logo.svg',
  screenshots: [
    { src: '/assets/sailor/01.webp', alt: 'Sailor — leads inbox with AI triage' },
    { src: '/assets/sailor/02.webp', alt: 'Sailor — WhatsApp follow-up thread' },
  ],
},
```

> ⚠️ **Only reference files that exist.** An entry pointing at a missing image renders a
> broken image; leaving a project out just shows the placeholder. Add the entry in the same
> commit as the files.

Paths are web paths served from `public/` — so `public/assets/sailor/01.webp` → `/assets/sailor/01.webp`.

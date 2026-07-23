// OWNED BY TRACK E. Other tracks: read-only.
//
// Fill in logos + screenshots here, keyed by project id, as their files land under
// public/assets/<id>/. Keep this object referencing ONLY files that exist — an entry
// pointing at a missing image renders a broken image; omitting a project just shows the
// placeholder. See public/assets/README.md for the drop → optimize → wire flow.
//
// Template (copy per project, point `src` at the optimized .webp, write real alt text):
//
//   sailor: {
//     logo: '/assets/sailor/logo.svg',
//     screenshots: [
//       { src: '/assets/sailor/01.webp', alt: 'Sailor — leads inbox with AI triage' },
//       { src: '/assets/sailor/02.webp', alt: 'Sailor — WhatsApp follow-up thread' },
//     ],
//   },
//   bsg: {
//     logo: '/assets/bsg/logo.svg',
//     screenshots: [
//       { src: '/assets/bsg/01.webp', alt: 'Berkeley Strategy Group — landing page' },
//     ],
//   },
//
// Paths are web paths served from public/ (so public/assets/sailor/01.webp → /assets/sailor/01.webp).

import type { ProjectAssets } from './types'

export const projectAssets: Record<string, ProjectAssets> = {
  // E1 — Sailor (real assets, optimized from Skyler's app screens).
  sailor: {
    logo: '/assets/sailor/logo.png',
    screenshots: [
      {
        src: '/assets/sailor/01.webp',
        alt: 'Sailor app — Inbox with AI-suggested next actions for each lead',
      },
      {
        src: '/assets/sailor/02.webp',
        alt: 'Sailor app — Today dashboard showing pipeline commission and lead activity',
      },
    ],
  },
  // E2 (the rest) still to come.
}

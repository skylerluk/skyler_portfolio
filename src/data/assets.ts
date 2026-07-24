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
        caption: 'Lead inbox',
      },
      {
        src: '/assets/sailor/02.webp',
        alt: 'Sailor app — Today dashboard showing pipeline commission and lead activity',
        caption: 'Pipeline overview',
      },
      {
        src: '/assets/sailor/03.webp',
        alt: 'Sailor marketing site — “Your WhatsApp, Organized,” the first CRM built for mobile',
        caption: 'Product website',
      },
    ],
  },

  // E2 — IBM Team Board.
  team_board: {
    logo: '/assets/team_board/logo.png',
    screenshots: [
      {
        src: '/assets/team_board/01.webp',
        alt: 'IBM Team Board — a “most wanted” style interactive team board for Jay Smith’s team',
        aspect: 1248 / 797,
      },
    ],
  },

  // E2 — Personal site (interactive 3D desk).
  'skyler-website': {
    logo: '/assets/skyler-website/logo.png',
    screenshots: [
      {
        src: '/assets/skyler-website/01.webp',
        alt: 'Skyler Luk personal site — an interactive 3D desk scene to explore',
        aspect: 1800 / 973,
      },
    ],
  },

  // Berkeley Strategy Group — CRM pipeline screenshot + client logos.
  bsg: {
    logo: '/assets/bsg/bsg_logo.svg',
    logoContain: true, // wordmark — show it whole, not cropped
    screenshots: [
      {
        src: '/assets/bsg/01.webp',
        alt: 'BSG CRM — sales pipeline board (account names blurred)',
        aspect: 1600 / 870,
      },
    ],
    clients: [
      { name: 'Amazon', logo: '/assets/bsg/Amazon-Square-Outline-Logo.png' },
      { name: 'Sweetgreen', logo: '/assets/bsg/sweetgreen_logo.jpg' },
    ],
  },

  // Uber Wrapped — two "wrapped" story cards.
  'uber-wrapped': {
    logo: '/assets/uber-wrapped/uber_logo_square.jpg',
    screenshots: [
      {
        src: '/assets/uber-wrapped/01.webp',
        alt: 'Uber Wrapped — “Breakfast Sandwich, your most-ordered item, 74 times”',
        aspect: 1200 / 1491,
      },
      {
        src: '/assets/uber-wrapped/02.webp',
        alt: 'Uber Wrapped — “Your rides timeline,” yearly spend bar chart',
        aspect: 1200 / 1473,
      },
    ],
  },

  // Karpathy Brain — knowledge-graph view.
  'karpathy-brain': {
    logo: '/assets/karpathy-brain/karpathy_logo_square.png',
    screenshots: [
      {
        src: '/assets/karpathy-brain/01.webp',
        alt: 'Karpathy Brain — interlinked knowledge graph of notes',
        aspect: 1400 / 1395,
      },
    ],
  },
}

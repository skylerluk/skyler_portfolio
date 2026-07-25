// Base project content in relevance order (OVERVIEW §7). Real copy is used verbatim;
// projects with `contentComplete: false` carry clearly-marked TODO(content) placeholders.
// No metrics or claims are invented — placeholders stay placeholders until Skyler provides copy.

import type { ProjectBase, SiteConfig } from './types'

export const projectsBase: ProjectBase[] = [
  {
    id: 'sailor',
    index: '01',
    name: 'Sailor',
    role: 'Founder',
    oneLiner:
      'An AI WhatsApp CRM for real estate agents — it sorts leads and runs follow-up around the agent instead of replacing them.',
    status: 'Live',
    stack: ['Next.js', 'WhatsApp API', 'Webhooks'],
    link: { label: 'meetsailor.com', href: 'https://meetsailor.com' },
    bullets: [
      'Designed, built, and shipped the entire product end to end',
      'Launched on the App Store; live in production at meetsailor.com',
    ],
    // By-the-numbers (measured across the 4 Sailor repos: app · server · webhook · site).
    metrics: [
      { value: '400+', label: 'commits' },
      { value: '84K+', label: 'lines of code' },
      { value: '4', label: 'services' },
      { value: '3 weeks', label: 'solo' },
    ],
    orientation: 'portrait',
    theme: 'dark',
    contentComplete: true,
  },
  {
    id: 'bsg',
    index: '02',
    name: 'Berkeley Strategy Group',
    role: 'Co-Founder and COO',
    oneLiner: 'Strategy consultancy based in Berkeley.',
    bullets: [
      '$200K in revenue in the first 30 days of launch.',
      'Sourced and closed 5+ enterprise deals including Amazon, Tesla, and Rackspace, built on 100+ 1:1s with VPs and C-suite at Fortune 500s.',
      'Hired and managed a lean team of 7.',
    ],
    stack: ['GTM', 'Accounts'],
    orientation: 'landscape',
    theme: 'light',
    contentComplete: true,
  },
  {
    id: 'team_board',
    index: '03',
    name: 'IBM Team Board',
    role: 'Builder',
    oneLiner:
      'An interactive team board built as a website design challenge — brief to live site in 60 minutes.',
    status: 'Live',
    stack: ['Design', 'Interactive'],
    link: { label: 'teamjay.vercel.app', href: 'https://teamjay.vercel.app' },
    orientation: 'landscape',
    theme: 'light',
    contentComplete: true,
  },
  {
    id: 'uber-wrapped',
    index: '04',
    name: 'Uber Wrapped',
    role: 'Builder',
    oneLiner: 'Turns a year of your Uber rides into a story told back to you.',
    bullets: [
      'Took raw ride history and turned it into a shareable, animated year in review.',
      'Design, data viz, and front-end, shipped live at uber-wrapped.vercel.app.',
    ],
    status: 'Live',
    stack: ['React', 'Data viz'],
    link: {
      label: 'uber-wrapped.vercel.app',
      href: 'https://uber-wrapped.vercel.app',
    },
    orientation: 'landscape',
    theme: 'dark',
    contentComplete: true,
  },
  {
    id: 'karpathy-brain',
    index: '05',
    name: 'Karpathy Brain',
    role: 'Builder',
    oneLiner:
      'A private, local LLM second brain over my own notes and writing.',
    bullets: [
      'Built a retrieval pipeline over my personal knowledge base, running models locally with LM Studio.',
      'AI engineering end to end: retrieval, local model deployment, and prompt design, fully offline.',
    ],
    metrics: [
      { value: '300+', label: 'documents' },
      { value: '30+', label: 'hours saved' },
    ],
    stack: ['LLM', 'Local'],
    orientation: 'landscape',
    theme: 'dark',
    contentComplete: true,
  },
  {
    id: 'anthology',
    index: '06',
    name: 'Anthology',
    role: 'Venture',
    // TODO(content): confirm public framing (link is real; framing to confirm).
    oneLiner:
      'Vision management studio. TODO(content): confirm public framing.',
    stack: ['Brand', 'Studio'],
    link: { label: 'anthologyvm.com', href: 'https://anthologyvm.com' },
    orientation: 'landscape',
    theme: 'light',
    contentComplete: false,
  },
  {
    id: 'skyler-website',
    index: '07',
    name: 'Personal Site',
    role: 'Builder',
    oneLiner:
      'An explorable, candlelit desk you light up to move through a life.',
    bullets: [
      'A cinematic 2.5D personal site, designed and built from scratch.',
      'Interaction design, motion, and creative front-end treated as craft.',
    ],
    status: 'Live',
    stack: ['Design', 'Interactive', '3D'],
    link: {
      label: 'skyler-website.vercel.app',
      href: 'https://skyler-website.vercel.app/',
    },
    orientation: 'landscape',
    theme: 'dark',
    contentComplete: true,
  },
]

export const siteConfig: SiteConfig = {
  name: 'Skyler Luk',
  role: 'Builder · Operator · Strategist',
  bio: 'I build products people use, close deals that move companies, and get obsessive about the problems I solve.',
  currentlyBuilding: 'Sailor',
  githubUser: 'skylerluk',
  location: 'Berkeley, CA · San Francisco, CA · New York, NY · Hong Kong, SAR',
  coords: '37.87, −122.27',
  links: [
    { label: 'Email', href: 'mailto:skylerluk@berkeley.edu' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/skylerluk/' },
    { label: 'GitHub', href: 'https://github.com/skylerluk' },
  ],
}

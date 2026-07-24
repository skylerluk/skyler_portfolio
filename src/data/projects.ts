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
    role: 'VP, Partnerships',
    oneLiner:
      'Client acquisition and account management for a strategy consultancy serving US and international clients.',
    stack: ['GTM', 'Accounts'],
    orientation: 'landscape',
    theme: 'light',
    contentComplete: true,
  },
  {
    id: 'amazon',
    index: '03',
    name: 'Amazon',
    role: 'Program Manager, Intern',
    // TODO(content): one line on what Skyler actually did + impact.
    oneLiner: 'TODO(content): one line on what Skyler actually did + impact.',
    stack: ['PM', 'Ops'],
    orientation: 'landscape',
    theme: 'light',
    contentComplete: false,
  },
  {
    id: 'ibm',
    index: '04',
    name: 'IBM',
    role: 'Sales',
    // TODO(content): one line on the sales work + outcome.
    oneLiner: 'TODO(content): one line on the sales work + outcome.',
    stack: ['Sales', 'B2B'],
    orientation: 'landscape',
    theme: 'light',
    contentComplete: false,
  },
  {
    id: 'uber-wrapped',
    index: '05',
    name: 'Uber Wrapped',
    role: 'Builder',
    oneLiner: 'Turns a year of your Uber rides into a story told back to you.',
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
    index: '06',
    name: 'Karpathy Brain',
    role: 'Builder',
    // TODO(content): confirm real description.
    oneLiner: 'TODO(content): confirm real description.',
    stack: ['LLM', 'Local'],
    orientation: 'landscape',
    theme: 'dark',
    contentComplete: false,
  },
  {
    id: 'anthology',
    index: '07',
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
]

export const siteConfig: SiteConfig = {
  name: 'Skyler Luk',
  role: 'Builder · Operator · Strategist',
  bio: 'I build products people use, close deals that move companies, and get obsessive about the problems I solve. One person across product, growth & strategy — who ships.',
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

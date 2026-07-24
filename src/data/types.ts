// Data schema for the whole app. Owned by Track A (A2) and FROZEN once merged —
// B/C/D/E read these types and must not change them. If a field is genuinely
// missing, flag it in the PR rather than editing here.

export type ProjectStatus = 'Live' | 'Prototype' | 'Internal'
export type Orientation = 'landscape' | 'portrait'
export type FrameTheme = 'light' | 'dark' // chrome of the preview frame

export interface Screenshot {
  src: string
  alt: string
  /** Short descriptive label shown beneath the frame (e.g. "Pipeline overview"). */
  caption?: string
}

export interface ProjectLink {
  label: string
  href: string
}

// A single "by the numbers" stat: `value` is emphasised (accent), `label` reads muted.
export interface Metric {
  value: string
  label: string
}

export interface ProjectBase {
  id: string // 'sailor'
  index: string // '01'
  name: string
  role: string // 'Founder' | 'VP, Partnerships' ...
  oneLiner: string
  status?: ProjectStatus
  stack: string[]
  link?: ProjectLink
  metrics?: Metric[] // optional one-line "by the numbers" strip
  orientation: Orientation
  theme: FrameTheme
  contentComplete: boolean // false => copy is placeholder (TODO)
}

export interface ProjectAssets {
  logo?: string
  screenshots: Screenshot[]
}

export interface Project extends ProjectBase, ProjectAssets {}

export interface SiteConfig {
  name: string
  role: string
  bio: string
  currentlyBuilding: string
  githubUser: string
  location: string
  coords: string
  links: ProjectLink[] // email, linkedin, github, resume
}

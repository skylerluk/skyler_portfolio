// Single import surface for feature tracks. Merges base project content (A2, frozen)
// with the Track E asset manifest by id, defaulting to empty assets when absent.

import { projectsBase, siteConfig } from './projects'
import { projectAssets } from './assets'
import type { Project } from './types'

export function getProjects(): Project[] {
  return projectsBase.map((base) => {
    const assets = projectAssets[base.id]
    return {
      ...base,
      ...assets, // logo, logoContain, clients, screenshots
      screenshots: assets?.screenshots ?? [],
    }
  })
}

export { siteConfig }
export type {
  Project,
  ProjectBase,
  ProjectAssets,
  ProjectLink,
  ProjectStatus,
  Orientation,
  FrameTheme,
  Screenshot,
  SiteConfig,
} from './types'

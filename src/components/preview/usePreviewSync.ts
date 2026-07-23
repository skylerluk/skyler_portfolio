// Track D — preview-owned side effects. Kept out of Preview.tsx for clarity and
// entirely within components/preview/* (OVERVIEW §5): no router, no App edits.
//
//  • useHashSync   — two-way sync between the active project and the URL hash
//                    (#sailor …), including browser back/forward.
//  • useNeighborPreload — warm the next/previous first screenshot so scrolling
//                    feels instant; a no-op when assets are absent.
//
// NOTE: hash-sync arguably belongs at the app level, but A owns App.tsx and this
// track must not edit shared files — so it lives here per the D3 constraint. If
// a future track adds real routing, lift this into the provider. Flagged in PR.

import { useEffect, useRef } from 'react'
import type { Project } from '../../data/types'

interface PortfolioSlice {
  projects: Project[]
  activeIndex: number
  setActiveIndex: (i: number) => void
}

function idFromHash(): string {
  return decodeURIComponent(window.location.hash.replace(/^#/, '')).trim()
}

/** Keep `activeIndex` and the URL hash in sync, both directions. */
export function useHashSync({
  projects,
  activeIndex,
  setActiveIndex,
}: PortfolioSlice): void {
  // Don't write the hash until we've read the initial one, so a deep link isn't
  // clobbered by the mount-time write.
  const hydrated = useRef(false)

  // On mount: adopt the incoming hash if it names a known project.
  useEffect(() => {
    const id = idFromHash()
    if (id) {
      const i = projects.findIndex((p) => p.id === id)
      if (i >= 0) setActiveIndex(i)
    }
    hydrated.current = true
    // Run once — projects are static for the session.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Reflect the active project into the hash. replaceState avoids spamming
  // back-history on every scroll step.
  useEffect(() => {
    if (!hydrated.current) return
    const project = projects[activeIndex]
    if (!project) return
    const next = `#${project.id}`
    if (window.location.hash !== next) {
      window.history.replaceState(null, '', next)
    }
  }, [projects, activeIndex])

  // Browser back/forward (and manual hash edits) drive the active project.
  useEffect(() => {
    const onHashChange = () => {
      const id = idFromHash()
      if (!id) return
      const i = projects.findIndex((p) => p.id === id)
      if (i >= 0) setActiveIndex(i)
    }
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [projects, setActiveIndex])
}

/** Preload the neighbouring projects' first screenshots. No-op when absent. */
export function useNeighborPreload({
  projects,
  activeIndex,
}: Pick<PortfolioSlice, 'projects' | 'activeIndex'>): void {
  useEffect(() => {
    const srcs = [activeIndex + 1, activeIndex - 1]
      .map((i) => projects[i]?.screenshots[0]?.src)
      .filter((src): src is string => Boolean(src))

    for (const src of srcs) {
      const img = new Image()
      img.decoding = 'async'
      img.src = src
    }
  }, [projects, activeIndex])
}

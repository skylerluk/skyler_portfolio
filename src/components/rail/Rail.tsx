// STUB (Track A/A3). Internals owned by Track C; replace within this folder only.
// Click selection only — the scroll engine + keyboard nav are C1. No hardcoded data.

import { usePortfolio } from '../../app/PortfolioProvider'
import styles from './Rail.module.css'

export function Rail() {
  const { projects, activeIndex, setActiveIndex } = usePortfolio()

  return (
    <nav aria-label="Projects">
      <ul className={styles.rail}>
        {projects.map((project, i) => {
          const active = i === activeIndex
          // Placeholder logo: monogram from name initial (Track E supplies real logos)
          const monogram = project.name.charAt(0).toUpperCase()
          return (
            <li key={project.id}>
              <button
                type="button"
                className={`${styles.tile} ${active ? styles.active : ''}`}
                aria-label={`${project.index} ${project.name}`}
                aria-current={active ? 'true' : undefined}
                onClick={() => setActiveIndex(i)}
              >
                {monogram}
              </button>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

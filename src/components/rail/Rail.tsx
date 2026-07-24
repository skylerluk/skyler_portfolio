// Track C — the production rail. Owns src/components/rail/* only.
// C0: square logo tiles, active/hover/focus states, click selection.
// C3: native scroll-position-driven selection (see useRailScroll) — the
//     centered tile is active and scales up; the preview follows.
// Consumes shared state via usePortfolio(); never edits App.tsx / Layout / tokens.

import { useRef } from 'react'
import { usePortfolio } from '../../app/PortfolioProvider'
import { useRailScroll } from './useRailScroll'
import styles from './Rail.module.css'

export function Rail() {
  const { projects, activeIndex, setActiveIndex } = usePortfolio()

  // Refs the interaction engine uses: the <ul> to detect overflow / scope
  // keyboard, and each tile to keep the selected one centered when overflowing.
  const listRef = useRef<HTMLUListElement>(null)
  const tileRefs = useRef<(HTMLButtonElement | null)[]>([])

  useRailScroll({ listRef, tileRefs })

  return (
    <nav aria-label="Projects" className={styles.nav}>
      <ul ref={listRef} className={styles.rail}>
        {projects.map((project, i) => {
          const active = i === activeIndex
          // Monogram fallback until Track E supplies real square logos.
          const monogram = project.name.charAt(0).toUpperCase()
          return (
            <li key={project.id}>
              <button
                type="button"
                ref={(el) => {
                  tileRefs.current[i] = el
                }}
                data-index={i}
                className={`${styles.tile} ${active ? styles.active : ''}`}
                aria-label={`${project.index} ${project.name}`}
                aria-current={active ? 'true' : undefined}
                onClick={() => setActiveIndex(i)}
              >
                {project.logo ? (
                  // Decorative — the button's aria-label carries the name.
                  <img className={styles.logo} src={project.logo} alt="" />
                ) : (
                  <span className={styles.monogram} aria-hidden="true">
                    {monogram}
                  </span>
                )}
              </button>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

// Track D — Preview. Reads the active project from usePortfolio() and renders it
// on the seamless --paper surface: a shadow-lifted frame group (landscape or
// portrait, 1–3 shots) plus the caption. A quiet crossfade plays on change; the
// pane always stays --paper. Reduced-motion swaps instantly. Owns preview/* only.

import type { ReactNode } from 'react'
import { usePortfolio } from '../../app/PortfolioProvider'
import { ShotGroup } from './ShotGroup'
import { useHashSync, useNeighborPreload } from './usePreviewSync'
import type { ProjectLink } from '../../data/types'
import styles from './Preview.module.css'

// Render a bullet, turning the project link's label (e.g. "meetsailor.com")
// into an accent link where it appears in the text.
function renderBullet(text: string, link?: ProjectLink): ReactNode {
  if (!link || !text.includes(link.label)) return text
  const parts = text.split(link.label)
  return parts.map((part, i) => (
    <span key={i}>
      {part}
      {i < parts.length - 1 && (
        <a
          className={styles.bulletLink}
          href={link.href}
          target="_blank"
          rel="noreferrer"
        >
          {link.label}
        </a>
      )}
    </span>
  ))
}

export function Preview() {
  const { projects, activeIndex, setActiveIndex } = usePortfolio()

  // Deep-linking (#sailor …) and neighbour preloading — preview-owned effects.
  useHashSync({ projects, activeIndex, setActiveIndex })
  useNeighborPreload({ projects, activeIndex })

  const project = projects[activeIndex]
  if (!project) return null

  return (
    <section
      className={styles.preview}
      role="region"
      aria-label="Selected project"
    >
      {/* key={project.id} restarts the enter animation on every change; a
          consistent flex layout keeps height stable so there's no jump. */}
      <div className={styles.fade} key={project.id}>
        <div className={styles.stage}>
          <ShotGroup
            orientation={project.orientation}
            theme={project.theme}
            screenshots={project.screenshots}
            label={project.name}
          />
        </div>

        <div className={styles.captionRow}>
          <div className={styles.caption}>
            <div className={styles.metaRow}>
              <span className={styles.index}>{project.index}</span>
              <span className={styles.name} aria-live="polite">
                {project.name}
              </span>
              <span className={styles.role}>{project.role}</span>
              {project.status && (
                <span className={styles.status}>{project.status}</span>
              )}
            </div>

            <p
              className={`${styles.oneLiner} ${
                project.contentComplete ? '' : styles.pending
              }`}
            >
              {project.contentComplete
                ? project.oneLiner
                : 'Details coming soon.'}
            </p>

            {project.bullets && project.bullets.length > 0 && (
              <ul className={styles.bullets}>
                {project.bullets.map((b) => (
                  <li key={b} className={styles.bullet}>
                    {renderBullet(b, project.link)}
                  </li>
                ))}
              </ul>
            )}

            {project.stack.length > 0 && (
              <div className={styles.chips}>
                {project.stack.map((tech) => (
                  <span key={tech} className={styles.chip}>
                    {tech}
                  </span>
                ))}
              </div>
            )}

            {project.link && (
              <a
                className={styles.link}
                href={project.link.href}
                target="_blank"
                rel="noreferrer"
              >
                {project.link.label} ↗
              </a>
            )}
          </div>

          {/* Bottom-right "by the numbers" ledger — serif accented values,
              black mono labels. Uses the free space beside the caption. */}
          {project.metrics && project.metrics.length > 0 && (
            <aside className={styles.ledger} aria-label="By the numbers">
              {project.metrics.map((m) => (
                <div key={m.label} className={styles.ledgerRow}>
                  <span className={styles.ledgerValue}>{m.value}</span>
                  <span className={styles.ledgerLabel}>{m.label}</span>
                </div>
              ))}
            </aside>
          )}
        </div>
      </div>
    </section>
  )
}

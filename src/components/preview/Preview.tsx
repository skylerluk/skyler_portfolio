// Track D — Preview. Reads the active project from usePortfolio() and renders it
// on the seamless --paper surface: a shadow-lifted frame group (landscape or
// portrait, 1–3 shots) plus the caption. A quiet crossfade plays on change; the
// pane always stays --paper. Reduced-motion swaps instantly. Owns preview/* only.

import { usePortfolio } from '../../app/PortfolioProvider'
import { ShotGroup } from './ShotGroup'
import { useHashSync, useNeighborPreload } from './usePreviewSync'
import styles from './Preview.module.css'

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

          {project.metrics && project.metrics.length > 0 && (
            <p className={styles.metrics}>
              {project.metrics.map((m, i) => (
                <span key={m.label} className={styles.metric}>
                  {i > 0 && <span className={styles.metricSep}>·</span>}
                  <span className={styles.metricValue}>{m.value}</span>{' '}
                  {m.label}
                </span>
              ))}
            </p>
          )}
        </div>
      </div>
    </section>
  )
}

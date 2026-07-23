// Track D — Preview. Reads the active project from usePortfolio() and renders it
// on the seamless --paper surface: a browser frame holding the first screenshot
// (or a tasteful placeholder), lifted by shadow only, plus the caption block.
// Portrait/multi-shot layouts + transitions arrive in D1/D2. Owns preview/* only.

import { usePortfolio } from '../../app/PortfolioProvider'
import { BrowserFrame } from './BrowserFrame'
import styles from './Preview.module.css'

export function Preview() {
  const { projects, activeIndex } = usePortfolio()
  const project = projects[activeIndex]
  if (!project) return null

  const shot = project.screenshots[0]

  return (
    <section className={styles.preview} aria-label="Selected project">
      <div className={styles.stage}>
        <div className={styles.group}>
          <BrowserFrame theme={project.theme} shot={shot} label={project.name} />
        </div>
      </div>

      <div className={styles.caption}>
        <div className={styles.metaRow}>
          <span className={styles.index}>{project.index}</span>
          <span className={styles.name}>{project.name}</span>
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
          {project.contentComplete ? project.oneLiner : 'Details coming soon.'}
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
      </div>
    </section>
  )
}

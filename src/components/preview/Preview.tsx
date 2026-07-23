// STUB (Track A/A3). Internals owned by Track D; replace within this folder only.
// Renders a placeholder frame (sized by orientation) + caption from data. Track D
// builds real screenshot frames + per-project chrome. No hardcoded content.

import { usePortfolio } from '../../app/PortfolioProvider'
import styles from './Preview.module.css'

export function Preview() {
  const { projects, activeIndex } = usePortfolio()
  const project = projects[activeIndex]
  if (!project) return null

  const frameClass =
    project.orientation === 'portrait' ? styles.portrait : styles.landscape

  return (
    <div className={styles.preview}>
      <div className={styles.stage}>
        <div className={`${styles.frame} ${frameClass}`}>
          screenshot placeholder
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

        <div className={styles.chips}>
          {project.stack.map((tech) => (
            <span key={tech} className={styles.chip}>
              {tech}
            </span>
          ))}
        </div>

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
    </div>
  )
}

// STUB (Track A/A3). Internals owned by Track B; replace within this folder only.
// Reads only from data/usePortfolio — no hardcoded content.

import { siteConfig } from '../../data'
import styles from './About.module.css'

export function About() {
  return (
    <div className={styles.about}>
      <h1 className={styles.name}>{siteConfig.name}</h1>
      <p className={styles.role}>{siteConfig.role}</p>
      <p className={styles.bio}>{siteConfig.bio}</p>
      <p className={styles.building}>
        Currently building <strong>{siteConfig.currentlyBuilding}</strong>
      </p>

      {/* Track B replaces this with the live GitHub contribution tracker */}
      <div className={styles.trackerSlot}>GitHub tracker (Track B)</div>

      <ul className={styles.links}>
        {siteConfig.links.map((link) => {
          const pending = link.href === '#'
          return (
            <li key={link.label}>
              {pending ? (
                <span className={`${styles.link} ${styles.linkPending}`}>
                  {link.label}
                </span>
              ) : (
                <a
                  className={styles.link}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                >
                  {link.label}
                </a>
              )}
            </li>
          )
        })}
      </ul>
    </div>
  )
}

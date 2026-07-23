// Track B (B0). Production About panel — identity, positioning bio, currently-building,
// contact links. Reads only from siteConfig; no hardcoded content. Owns components/about/*.

import { siteConfig } from '../../data'
import styles from './About.module.css'

export function About() {
  return (
    <div className={styles.about}>
      <h1 className={styles.name}>
        {siteConfig.name}
        <span className={styles.period}>.</span>
      </h1>
      <p className={styles.role}>{siteConfig.role}</p>
      <p className={styles.bio}>{siteConfig.bio}</p>

      <p className={styles.building}>
        <span className={styles.pulse} aria-hidden="true" />
        Currently — building <strong>{siteConfig.currentlyBuilding}</strong>
      </p>

      {/* B1 mounts <GithubTracker/> here */}
      <div className={styles.trackerSlot} />

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
                  <span className={styles.arrow} aria-hidden="true">
                    {' '}
                    ↗
                  </span>
                </a>
              )}
            </li>
          )
        })}
      </ul>
    </div>
  )
}

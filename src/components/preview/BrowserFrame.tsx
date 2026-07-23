// Track D. Reusable landscape browser-window frame. Lifted from the surface by
// shadow only (OVERVIEW §4) — no border on the surrounding pane. Chrome is light
// or dark per `theme`. Renders the screenshot when present, else a tasteful
// placeholder so a missing asset never shows a broken image (Track E fills later).

import type { FrameTheme, Screenshot } from '../../data/types'
import styles from './BrowserFrame.module.css'

interface BrowserFrameProps {
  theme: FrameTheme
  shot?: Screenshot
  /** Project name — shown in the placeholder so the empty state reads intentional. */
  label: string
  /** Slightly de-emphasize a supporting frame in a multi-shot group (D1). */
  supporting?: boolean
}

export function BrowserFrame({
  theme,
  shot,
  label,
  supporting = false,
}: BrowserFrameProps) {
  const hasImage = Boolean(shot?.src)

  return (
    <figure
      className={`${styles.frame} ${theme === 'dark' ? styles.dark : styles.light} ${
        supporting ? styles.supporting : ''
      }`}
    >
      <div className={styles.bar}>
        <span className={styles.dot} />
        <span className={styles.dot} />
        <span className={styles.dot} />
      </div>
      <div className={styles.body}>
        {hasImage ? (
          <img
            className={styles.img}
            src={shot!.src}
            alt={shot!.alt}
            loading="lazy"
            decoding="async"
          />
        ) : (
          <div className={styles.placeholder}>
            <span className={styles.placeholderName}>{label}</span>
            <span className={styles.placeholderLabel}>screenshot placeholder</span>
          </div>
        )}
      </div>
    </figure>
  )
}

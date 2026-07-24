// Track D. Reusable landscape browser-window frame. Lifted from the surface by
// shadow only (OVERVIEW §4) — no border on the surrounding pane. Chrome is light
// or dark per `theme`. Renders the screenshot when present, else a tasteful
// placeholder so a missing asset never shows a broken image (Track E fills later).

import { useEffect, useState, type CSSProperties } from 'react'
import type { FrameTheme, Screenshot } from '../../data/types'
import styles from './BrowserFrame.module.css'

interface BrowserFrameProps {
  theme: FrameTheme
  shot?: Screenshot
  /** Project name — shown in the placeholder so the empty state reads intentional. */
  label: string
  /** Body aspect ratio (defaults to 16:10). Lets a shot fill without cropping. */
  aspect?: number
}

export function BrowserFrame({
  theme,
  shot,
  label,
  aspect,
}: BrowserFrameProps) {
  // Fall back to the placeholder if a real image 404s — a missing file must
  // never break the layout (Track E fills assets later). Reset on src change.
  const [errored, setErrored] = useState(false)
  useEffect(() => setErrored(false), [shot?.src])
  const hasImage = Boolean(shot?.src) && !errored

  return (
    <figure
      className={`${styles.frame} ${theme === 'dark' ? styles.dark : styles.light}`}
      style={
        aspect
          ? ({ '--fr-aspect': String(aspect) } as CSSProperties)
          : undefined
      }
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
            onError={() => setErrored(true)}
          />
        ) : (
          <div className={styles.placeholder}>
            <span className={styles.placeholderName}>{label}</span>
            <span className={styles.placeholderLabel}>
              screenshot placeholder
            </span>
          </div>
        )}
      </div>
    </figure>
  )
}

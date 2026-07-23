// Track D — portrait phone frame. Sailor is the only mobile piece. Lifted from
// the --paper surface by --shadow-phone; screenshot fills the body, else a
// tasteful placeholder (never a broken <img>). Primary vs. supporting sizing is
// handled by the ShotGroup layout via the `supporting` flag.

import { useEffect, useState } from 'react'
import type { Screenshot } from '../../data/types'
import styles from './PhoneFrame.module.css'

interface PhoneFrameProps {
  shot?: Screenshot
  /** Project name — shown in the placeholder so the empty state reads intentional. */
  label: string
  /** A secondary phone in a side-by-side group sits a touch smaller/back. */
  supporting?: boolean
}

export function PhoneFrame({
  shot,
  label,
  supporting = false,
}: PhoneFrameProps) {
  // Fall back to placeholder if a real image fails to load. Reset on src change.
  const [errored, setErrored] = useState(false)
  useEffect(() => setErrored(false), [shot?.src])
  const hasImage = Boolean(shot?.src) && !errored

  return (
    <figure
      className={`${styles.phone} ${supporting ? styles.supporting : ''}`}
    >
      <div className={styles.bar}>
        <span className={styles.notch} />
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

// Track D — portrait phone frame. Sailor is the only mobile piece. Lifted from
// the --paper surface by --shadow-phone; screenshot fills the body, else a
// tasteful placeholder (never a broken <img>). Primary vs. supporting sizing is
// handled by the ShotGroup layout via the `supporting` flag.

import type { Screenshot } from '../../data/types'
import styles from './PhoneFrame.module.css'

interface PhoneFrameProps {
  shot?: Screenshot
  /** Project name — shown in the placeholder so the empty state reads intentional. */
  label: string
  /** A secondary phone in a side-by-side group sits a touch smaller/back. */
  supporting?: boolean
}

export function PhoneFrame({ shot, label, supporting = false }: PhoneFrameProps) {
  const hasImage = Boolean(shot?.src)

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

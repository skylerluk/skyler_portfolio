// Track D — ShotGroup. Arranges a project's screenshots by orientation + count,
// each frame lifted by shadow, whitespace preserved. Handles 1/2/3 shots and the
// zero-shot placeholder case, for both portrait (Sailor) and landscape.
//
// Single shot renders one centered frame. Multiple shots go through ShotCarousel,
// which is side-by-side on desktop and a swipeable carousel on mobile (arrows +
// dots) rather than a long vertical scroll list.

import type { ReactNode } from 'react'
import type { Orientation, FrameTheme, Screenshot } from '../../data/types'
import { BrowserFrame } from './BrowserFrame'
import { PhoneFrame } from './PhoneFrame'
import { ShotCarousel } from './ShotCarousel'
import styles from './ShotGroup.module.css'

export type ShotGroupMode = 'side-by-side' // 'main-thumbnails' reserved for later

interface ShotGroupProps {
  orientation: Orientation
  theme: FrameTheme
  screenshots: Screenshot[]
  label: string
  mode?: ShotGroupMode
}

const MAX_SHOTS = 3

export function ShotGroup({
  orientation,
  theme,
  screenshots,
  label,
  mode = 'side-by-side',
}: ShotGroupProps) {
  // Derive the slots to render. Zero shots → a single placeholder frame so the
  // empty state still looks intentional; never render a broken image.
  const shots = screenshots.slice(0, MAX_SHOTS)
  const slots: (Screenshot | undefined)[] =
    shots.length > 0 ? shots : [undefined]

  // One slide's content: a phone (+ caption) for portrait, a browser frame
  // (+ caption when present) for landscape. Shared by both the single and multi
  // (carousel) paths so captions render identically either way.
  const renderSlot = (shot: Screenshot | undefined): ReactNode =>
    orientation === 'portrait' ? (
      <div className={styles.shot}>
        <PhoneFrame shot={shot} label={label} />
        {shot?.caption && (
          <span className={styles.shotCaption}>{shot.caption}</span>
        )}
      </div>
    ) : shot?.caption ? (
      <div className={styles.shotLand}>
        <BrowserFrame
          theme={theme}
          shot={shot}
          label={label}
          aspect={shot.aspect}
        />
        <span className={styles.shotCaption}>{shot.caption}</span>
      </div>
    ) : (
      <BrowserFrame
        theme={theme}
        shot={shot}
        label={label}
        aspect={shot?.aspect}
      />
    )

  // Multiple shots → carousel (side-by-side on desktop, swipeable on mobile).
  if (slots.length > 1) {
    return (
      <ShotCarousel
        orientation={orientation}
        label={label}
        slides={slots.map((shot) => renderSlot(shot))}
      />
    )
  }

  // Single shot → one centered frame.
  const groupClass = `${styles.group} ${
    orientation === 'portrait' ? styles.portrait : styles.landscape
  } ${styles.single} ${styles[mode] ?? ''}`

  return (
    <div className={groupClass} data-count={1}>
      {renderSlot(slots[0])}
    </div>
  )
}

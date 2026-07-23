// Track D — ShotGroup. Arranges a project's screenshots by orientation + count,
// each frame lifted by shadow, whitespace preserved. Handles 1/2/3 shots and the
// zero-shot placeholder case, for both portrait (Sailor) and landscape.
//
// Layout is `side-by-side` today (Skyler's open decision, OVERVIEW §8). The code
// is structured so a `main + thumbnails` mode can be added later behind `mode`
// without touching call sites — the default keeps working for any shot count.

import type { Orientation, FrameTheme, Screenshot } from '../../data/types'
import { BrowserFrame } from './BrowserFrame'
import { PhoneFrame } from './PhoneFrame'
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

  const groupClass = `${styles.group} ${
    orientation === 'portrait' ? styles.portrait : styles.landscape
  } ${slots.length > 1 ? styles.multi : styles.single} ${styles[mode] ?? ''}`

  return (
    <div className={groupClass} data-count={slots.length}>
      {slots.map((shot, i) =>
        orientation === 'portrait' ? (
          <div className={styles.shot} key={i}>
            <PhoneFrame shot={shot} label={label} />
            {shot?.caption && (
              <span className={styles.shotCaption}>{shot.caption}</span>
            )}
          </div>
        ) : (
          <BrowserFrame
            key={i}
            theme={theme}
            shot={shot}
            label={label}
            supporting={i > 0}
          />
        ),
      )}
    </div>
  )
}

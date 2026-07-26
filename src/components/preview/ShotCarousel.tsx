// Track D — responsive multi-shot presenter. On desktop it lays the slides out
// side-by-side (the approved comp). On mobile it becomes a swipeable carousel:
// native horizontal scroll-snap (so touch swipe + momentum come for free) with
// arrow buttons and dot indicators layered on top — one screenshot at a time,
// never a long vertical scroll list. Controls are hidden ≥861px via CSS.

import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react'
import type { Orientation } from '../../data/types'
import styles from './ShotCarousel.module.css'

interface ShotCarouselProps {
  slides: ReactNode[]
  orientation: Orientation
  /** Used for the controls' accessible name (e.g. "Sailor"). */
  label: string
}

export function ShotCarousel({
  slides,
  orientation,
  label,
}: ShotCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)
  const count = slides.length

  // Derive the centered slide from scroll position (mobile scroll-snap). Runs on
  // desktop too, but the track isn't scrollable there so it stays at 0.
  useEffect(() => {
    const el = trackRef.current
    if (!el) return
    let raf = 0
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const i = Math.round(el.scrollLeft / Math.max(1, el.clientWidth))
        setActive(Math.max(0, Math.min(count - 1, i)))
      })
    }
    el.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      el.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [count])

  const go = useCallback(
    (i: number) => {
      const el = trackRef.current
      if (!el) return
      const clamped = Math.max(0, Math.min(count - 1, i))
      el.scrollTo({ left: clamped * el.clientWidth, behavior: 'smooth' })
    },
    [count],
  )

  return (
    <div
      className={`${styles.carousel} ${
        orientation === 'portrait' ? styles.portrait : styles.landscape
      }`}
    >
      <div className={styles.track} ref={trackRef}>
        {slides.map((slide, i) => (
          <div className={styles.slide} key={i}>
            {slide}
          </div>
        ))}
      </div>

      {/* Arrow controls — mobile only (display:none ≥861px). Stop the click from
          bubbling to the stage's project link. */}
      <button
        type="button"
        className={`${styles.arrow} ${styles.prev}`}
        aria-label="Previous screenshot"
        disabled={active === 0}
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          go(active - 1)
        }}
      >
        <span aria-hidden="true">‹</span>
      </button>
      <button
        type="button"
        className={`${styles.arrow} ${styles.next}`}
        aria-label="Next screenshot"
        disabled={active === count - 1}
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          go(active + 1)
        }}
      >
        <span aria-hidden="true">›</span>
      </button>

      <div className={styles.dots} aria-hidden="true">
        {slides.map((_, i) => (
          <button
            type="button"
            key={i}
            className={`${styles.dot} ${i === active ? styles.dotActive : ''}`}
            aria-label={`${label} screenshot ${i + 1} of ${count}`}
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              go(i)
            }}
          />
        ))}
      </div>
    </div>
  )
}

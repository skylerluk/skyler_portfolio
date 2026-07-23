// Track C — C1 scroll engine. The signature interaction: scrolling anywhere
// over the single-screen app steps through projects and swaps the preview.
// Encapsulated here so we never touch App.tsx — listeners attach to window/
// document from within the hook. Owns src/components/rail/* only.

import { useEffect, useRef, type RefObject } from 'react'
import { usePortfolio } from '../../app/PortfolioProvider'

// Pacing tuned in the approved comp (OVERVIEW §4):
const THRESHOLD = 36 // wheel deltaY the accumulator must cross to advance a step
const LOCK_MS = 340 // cooldown after a step so one swipe doesn't skip several

interface UseRailScrollArgs {
  listRef: RefObject<HTMLUListElement | null>
  tileRefs: RefObject<(HTMLButtonElement | null)[]>
}

function prefersReducedMotion(): boolean {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}

export function useRailScroll({ listRef, tileRefs }: UseRailScrollArgs) {
  const { activeIndex, projects, next, prev, setActiveIndex } = usePortfolio()
  const count = projects.length

  // Latest values read inside the (once-registered) listeners without
  // re-binding them every render.
  const stateRef = useRef({ activeIndex, count, next, prev, setActiveIndex })
  stateRef.current = { activeIndex, count, next, prev, setActiveIndex }

  // Center the active tile whenever the index changes (smooth, or instant
  // under reduced-motion).
  useEffect(() => {
    const tile = tileRefs.current?.[activeIndex]
    if (!tile) return
    const reduce = prefersReducedMotion()
    tile.scrollIntoView({
      behavior: reduce ? 'auto' : 'smooth',
      block: 'center',
      inline: 'center',
    })
  }, [activeIndex, tileRefs])

  // Wheel + keyboard engine — registered once.
  useEffect(() => {
    let accum = 0
    let locked = false
    let lockTimer: number | undefined

    const atFirst = () => stateRef.current.activeIndex <= 0
    const atLast = () =>
      stateRef.current.activeIndex >= stateRef.current.count - 1

    const step = (dir: 1 | -1) => {
      if (dir === 1) stateRef.current.next()
      else stateRef.current.prev()
      accum = 0
      if (prefersReducedMotion()) return
      locked = true
      lockTimer = window.setTimeout(() => {
        locked = false
      }, LOCK_MS)
    }

    const onWheel = (e: WheelEvent) => {
      // Don't hijack scrolling inside a genuinely scrollable inner element
      // (defensive — the app has none today) or while typing in a field.
      const target = e.target as HTMLElement | null
      if (
        target?.closest('input, textarea, select, [contenteditable="true"]')
      ) {
        return
      }

      const down = e.deltaY > 0

      // Edge release: let the page scroll normally at the ends.
      if ((down && atLast()) || (!down && atFirst())) {
        accum = 0
        return
      }

      // We're going to consume this gesture to drive the rail.
      e.preventDefault()
      if (locked) return

      accum += e.deltaY
      if (accum >= THRESHOLD) step(1)
      else if (accum <= -THRESHOLD) step(-1)
    }

    const onKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null
      if (
        target?.closest('input, textarea, select, [contenteditable="true"]')
      ) {
        return
      }

      switch (e.key) {
        case 'ArrowDown':
        case 'ArrowRight':
          e.preventDefault()
          stateRef.current.next()
          break
        case 'ArrowUp':
        case 'ArrowLeft':
          e.preventDefault()
          stateRef.current.prev()
          break
        case 'Home':
          e.preventDefault()
          stateRef.current.setActiveIndex(0)
          break
        case 'End':
          e.preventDefault()
          stateRef.current.setActiveIndex(stateRef.current.count - 1)
          break
        default:
          break
      }
    }

    // { passive: false } so preventDefault actually blocks page scroll.
    window.addEventListener('wheel', onWheel, { passive: false })
    window.addEventListener('keydown', onKeyDown)

    return () => {
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('keydown', onKeyDown)
      if (lockTimer !== undefined) window.clearTimeout(lockTimer)
    }
  }, [])

  // listRef is reserved for C2 (overflow container tuning); referenced so the
  // arg stays part of the stable hook signature.
  void listRef
}

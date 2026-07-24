// Track C — rail interaction engine.
//
// The rail is a statically centered column: the middle project sits at the
// screen's vertical center (via CSS centering — automatic for any project
// count), and the SELECTED tile is highlighted/scaled wherever it sits. Sailor
// (index 0) is featured on load, near the top of the column.
//
// Scrolling anywhere over the page steps the selection one project at a time
// (fluid distance-mapped pacing, momentum carried — no per-step lock). A single
// window wheel handler drives it, so scrolling over the rail and scrolling over
// the rest of the page feel identical. For lists too tall to fit, the selected
// tile is kept centered via scrollIntoView; when the column fits, it stays put
// and only the highlight moves. Encapsulated here so we never touch App.tsx.

import { useEffect, useRef, type RefObject } from 'react'
import { usePortfolio } from '../../app/PortfolioProvider'

// Fluid pacing (reference: bguillaume.info). Scroll distance maps directly to
// steps with the remainder carried over — no post-step lock, so a continuous
// wheel/trackpad gesture flows smoothly through projects.
const STEP = 90 // wheel delta that advances one project (~one mouse notch)
const CARRY_CAP = STEP // clamp leftover so momentum can't run away unbounded

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

function isEditableTarget(target: EventTarget | null): boolean {
  return (
    target instanceof Element &&
    target.closest('input, textarea, select, [contenteditable="true"]') !== null
  )
}

export function useRailScroll({ listRef, tileRefs }: UseRailScrollArgs) {
  const { activeIndex, projects, next, prev, setActiveIndex } = usePortfolio()
  const count = projects.length

  // Latest values read inside once-registered listeners without re-binding.
  const stateRef = useRef({ activeIndex, count, next, prev, setActiveIndex })
  stateRef.current = { activeIndex, count, next, prev, setActiveIndex }

  // Keep the selected tile centered ONLY when the column overflows its lane
  // (long project lists). When everything fits, there's no scroll range, so
  // this is a no-op and the column stays statically centered on its middle.
  useEffect(() => {
    const root = listRef.current
    const tile = tileRefs.current?.[activeIndex]
    if (!root || !tile) return
    const overflows =
      root.scrollHeight > root.clientHeight + 1 ||
      root.scrollWidth > root.clientWidth + 1
    if (!overflows) return
    tile.scrollIntoView({
      behavior: prefersReducedMotion() ? 'auto' : 'smooth',
      block: 'center',
      inline: 'center',
    })
  }, [activeIndex, listRef, tileRefs])

  // Wheel engine — one window listener so on-rail and off-rail scroll identically.
  useEffect(() => {
    let accum = 0

    const atFirst = () => stateRef.current.activeIndex <= 0
    const atLast = () =>
      stateRef.current.activeIndex >= stateRef.current.count - 1

    const onWheel = (e: WheelEvent) => {
      if (isEditableTarget(e.target)) return

      const down = e.deltaY > 0
      // Edge release: at the ends let the page scroll normally.
      if ((down && atLast()) || (!down && atFirst())) {
        accum = 0
        return
      }

      // Consume the gesture to drive the rail. Accumulated distance maps to
      // steps (remainder carried) so a continuous gesture flows through
      // projects with momentum — no per-step lock.
      e.preventDefault()
      accum += e.deltaY

      while (accum >= STEP && !atLast()) {
        stateRef.current.next()
        accum -= STEP
      }
      while (accum <= -STEP && !atFirst()) {
        stateRef.current.prev()
        accum += STEP
      }

      // Clamp leftover so momentum can't build up unbounded between steps.
      if (accum > CARRY_CAP) accum = CARRY_CAP
      else if (accum < -CARRY_CAP) accum = -CARRY_CAP
    }

    // { passive: false } so preventDefault actually blocks page scroll.
    window.addEventListener('wheel', onWheel, { passive: false })
    return () => window.removeEventListener('wheel', onWheel)
  }, [])

  // Keyboard navigation — scoped to the rail (listener on the <ul>), so arrow
  // keys only drive selection when focus is within the rail; no global hijack.
  useEffect(() => {
    const root = listRef.current
    if (!root) return

    const onKeyDown = (e: KeyboardEvent) => {
      if (isEditableTarget(e.target)) return
      const s = stateRef.current
      switch (e.key) {
        case 'ArrowDown':
        case 'ArrowRight':
          e.preventDefault()
          s.next()
          break
        case 'ArrowUp':
        case 'ArrowLeft':
          e.preventDefault()
          s.prev()
          break
        case 'Home':
          e.preventDefault()
          s.setActiveIndex(0)
          break
        case 'End':
          e.preventDefault()
          s.setActiveIndex(s.count - 1)
          break
        default:
          break
      }
    }

    root.addEventListener('keydown', onKeyDown)
    return () => root.removeEventListener('keydown', onKeyDown)
  }, [listRef])
}

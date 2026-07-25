// Track G (G0). A stylized revenue-ramp chart for BSG — the visual counterpart
// to Sailor's stats ledger, in the same right-hand slot. Only the endpoints are
// factual ($200K, 30 days); the curve is an illustrative ease, not real daily
// data. Owns components/preview/* only. Inline SVG, tokens only, no deps.

import type { RevenueRamp as RevenueRampData } from '../../data/types'
import styles from './RevenueRamp.module.css'

// SVG coordinate space (viewBox). Width/height are relative; the SVG scales to
// its container via width:100%.
const W = 300
const YTOP = 10
const YBASE = 90
const X0 = 3
const X1 = 289
const N = 48 // sample count for a smooth path

// Illustrative growth ease — a stylized hockey stick from 0 → peak. This is NOT
// real daily revenue; only the labelled endpoint ($200K at day 30) is factual.
const ease = (t: number) => Math.pow(t, 2.3)

function buildPaths() {
  const pts: Array<[number, number]> = []
  for (let i = 0; i <= N; i++) {
    const t = i / N
    const x = X0 + (X1 - X0) * t
    const y = YBASE - (YBASE - YTOP) * ease(t)
    pts.push([x, y])
  }
  const line =
    'M' + pts.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(' L')
  const area = `${line} L${X1},${YBASE} L${X0},${YBASE} Z`
  return { line, area, end: pts[N] }
}

export function RevenueRamp({ endLabel, spanLabel, stats }: RevenueRampData) {
  const { line, area, end } = buildPaths()

  return (
    <aside
      className={styles.ramp}
      role="img"
      aria-label={`${endLabel} in revenue in the ${spanLabel}`}
    >
      <div className={styles.head}>
        <span className={styles.value}>{endLabel}</span>
        <span className={styles.span}>{spanLabel}</span>
      </div>

      <div className={styles.chartWrap}>
        <svg
          className={styles.chart}
          viewBox={`0 0 ${W} 100`}
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="bsgRampGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" className={styles.gradTop} />
              <stop offset="100%" className={styles.gradBottom} />
            </linearGradient>
          </defs>
          <line
            className={styles.baseline}
            x1={X0}
            y1={YBASE}
            x2={X1}
            y2={YBASE}
          />
          <path className={styles.area} d={area} fill="url(#bsgRampGrad)" />
          <path className={styles.line} d={line} pathLength={1} />
          <circle className={styles.dot} cx={end[0]} cy={end[1]} r={3.5} />
        </svg>
        <div className={styles.axis}>
          <span>day 0</span>
          <span>day 30</span>
        </div>
      </div>

      {stats && stats.length > 0 && (
        <div className={styles.stats}>
          {stats.map((s, i) => (
            <span key={s.label} className={styles.stat}>
              {i > 0 && <span className={styles.statSep}>·</span>}
              <span className={styles.statValue}>{s.value}</span>{' '}
              <span className={styles.statLabel}>{s.label}</span>
            </span>
          ))}
        </div>
      )}
    </aside>
  )
}

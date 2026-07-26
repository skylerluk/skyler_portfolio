// Track B (B1). Live GitHub tracker — contribution heatmap + latest-commit ticker.
// Client-side only; graceful static fallback when the API is unavailable/rate-limited.

import { useEffect, useState } from 'react'
import { siteConfig } from '../../data'
import {
  fetchContributions,
  fetchLatestCommit,
  relativeTime,
  type Contrib,
  type CommitInfo,
} from '../../lib/github'
import styles from './GithubTracker.module.css'

type Status = 'loading' | 'ready' | 'error'

const CELLS = 50 // heatmap shows the past ~50 days

const LEVEL_CLASS = [
  styles.level0,
  styles.level1,
  styles.level2,
  styles.level3,
  styles.level4,
] as const

const MONTHS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
]

// 'YYYY-MM-DD' -> 'Jul 3' (no Date parsing, so no timezone surprises).
function fmtDate(iso: string): string {
  const [, m, d] = iso.split('-')
  return `${MONTHS[Number(m) - 1] ?? ''} ${Number(d)}`
}

export function GithubTracker() {
  const user = siteConfig.githubUser
  const [status, setStatus] = useState<Status>('loading')
  const [contribs, setContribs] = useState<Contrib[]>([])
  const [commit, setCommit] = useState<CommitInfo | null>(null)

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      const [c, latest] = await Promise.all([
        fetchContributions(user),
        fetchLatestCommit(user),
      ])
      if (cancelled) return
      if (c.length === 0) {
        setStatus('error')
        return
      }
      setContribs(c)
      setCommit(latest)
      setStatus('ready')
    })()
    return () => {
      cancelled = true
    }
  }, [user])

  const profileUrl = `https://github.com/${user}`

  // ---- Fallback: honest static line, no invented numbers ----
  if (status === 'error') {
    return (
      <div className={styles.tracker}>
        <div className={styles.header}>
          <span className={styles.label}>Contributions</span>
        </div>
        <p className={styles.fallback}>
          <a href={profileUrl} target="_blank" rel="noreferrer">
            github.com/{user} ↗
          </a>
        </p>
      </div>
    )
  }

  // ---- Loading skeleton ----
  if (status === 'loading') {
    return (
      <div className={styles.tracker} aria-hidden="true">
        <div className={styles.header}>
          <span className={styles.label}>Contributions</span>
        </div>
        <div className={styles.grid}>
          {Array.from({ length: CELLS }).map((_, i) => (
            <div key={i} className={`${styles.cell} ${styles.skeleton}`} />
          ))}
        </div>
      </div>
    )
  }

  // ---- Ready ----
  const cells = contribs.slice(-CELLS)
  const total = contribs.reduce((sum, c) => sum + c.count, 0)
  const totalLabel = total.toLocaleString()

  return (
    <div
      className={styles.tracker}
      aria-label={`${total} GitHub contributions in the last year`}
    >
      <div className={styles.header}>
        <span className={styles.label}>Contributions</span>
        <span className={styles.total}>
          <span className={styles.dot} aria-hidden="true" />
          {totalLabel} · live
        </span>
      </div>

      <div className={styles.grid} aria-hidden="true">
        {cells.map((c) => (
          <div
            key={c.date}
            className={`${styles.cell} ${LEVEL_CLASS[c.level]}`}
            data-tip={`${c.count} ${
              c.count === 1 ? 'contribution' : 'contributions'
            } · ${fmtDate(c.date)}`}
          />
        ))}
      </div>

      {commit &&
        (() => {
          const shortRepo = commit.repo.split('/').pop() ?? commit.repo
          const text = commit.message || `pushed to ${shortRepo}`
          return (
            <p className={styles.ticker} title={`${text} — ${commit.repo}`}>
              ↳ {text}{' '}
              <span className={styles.rel}>· {relativeTime(commit.date)}</span>
            </p>
          )
        })()}
    </div>
  )
}

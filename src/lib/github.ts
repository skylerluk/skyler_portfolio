// Track B (B1). Client-side GitHub fetch helpers — no backend, no auth.
// Every call is wrapped so it never throws to the UI: on failure it returns a
// sentinel (empty array / null). Successful responses are cached in
// sessionStorage (~15 min) to avoid refetching on re-render/navigation.

export interface Contrib {
  date: string
  count: number
  level: 0 | 1 | 2 | 3 | 4
}

export interface CommitInfo {
  // Commit message when GitHub returns it; empty when the public events feed
  // omits the commits array (it often does) — the UI falls back to "pushed to {repo}".
  message: string
  repo: string
  date: string
}

const CACHE_TTL_MS = 15 * 60 * 1000

interface CacheEntry<T> {
  t: number
  v: T
}

function readCache<T>(key: string): T | null {
  try {
    const raw = sessionStorage.getItem(key)
    if (!raw) return null
    const entry = JSON.parse(raw) as CacheEntry<T>
    if (Date.now() - entry.t > CACHE_TTL_MS) return null
    return entry.v
  } catch {
    return null
  }
}

function writeCache<T>(key: string, value: T): void {
  try {
    const entry: CacheEntry<T> = { t: Date.now(), v: value }
    sessionStorage.setItem(key, JSON.stringify(entry))
  } catch {
    // sessionStorage unavailable (private mode / quota) — caching is best-effort.
  }
}

interface ContributionsResponse {
  total?: Record<string, number>
  contributions?: Array<{ date: string; count: number; level: number }>
}

function clampLevel(level: number): 0 | 1 | 2 | 3 | 4 {
  if (level <= 0) return 0
  if (level >= 4) return 4
  return level as 1 | 2 | 3
}

export async function fetchContributions(user: string): Promise<Contrib[]> {
  const cacheKey = `gh:contrib:${user}`
  const cached = readCache<Contrib[]>(cacheKey)
  if (cached) return cached

  try {
    const res = await fetch(
      `https://github-contributions-api.jogruber.de/v4/${encodeURIComponent(
        user,
      )}?y=last`,
    )
    if (!res.ok) return []
    const data = (await res.json()) as ContributionsResponse
    const contributions = data.contributions ?? []
    const result: Contrib[] = contributions.map((c) => ({
      date: c.date,
      count: c.count,
      level: clampLevel(c.level),
    }))
    if (result.length > 0) writeCache(cacheKey, result)
    return result
  } catch {
    return []
  }
}

interface PublicEvent {
  type: string
  created_at: string
  repo?: { name: string }
  payload?: { commits?: Array<{ message: string }> }
}

export async function fetchLatestCommit(
  user: string,
): Promise<CommitInfo | null> {
  const cacheKey = `gh:commit:${user}`
  const cached = readCache<CommitInfo | null>(cacheKey)
  if (cached) return cached

  try {
    const res = await fetch(
      `https://api.github.com/users/${encodeURIComponent(user)}/events/public`,
    )
    if (!res.ok) return null // includes 403 rate-limit
    const events = (await res.json()) as PublicEvent[]
    if (!Array.isArray(events)) return null

    // Most recent PushEvent. The public feed frequently omits payload.commits,
    // so we don't require it — message is used when present, else the UI shows
    // "pushed to {repo}". Never fabricate a message.
    const push = events.find((e) => e.type === 'PushEvent')
    if (!push) return null

    const commits = push.payload?.commits
    const info: CommitInfo = {
      message: commits?.length ? commits[commits.length - 1].message : '',
      repo: push.repo?.name ?? user,
      date: push.created_at,
    }
    writeCache(cacheKey, info)
    return info
  } catch {
    return null
  }
}

/** Local relative-time formatting ("2h ago"). No external deps. */
export function relativeTime(iso: string): string {
  const then = new Date(iso).getTime()
  if (Number.isNaN(then)) return ''
  const diff = Math.max(0, Date.now() - then)
  const mins = Math.floor(diff / 60000)
  if (mins < 1) return 'just now'
  if (mins < 60) return `${mins}m ago`
  const hours = Math.floor(mins / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  if (days < 30) return `${days}d ago`
  const months = Math.floor(days / 30)
  if (months < 12) return `${months}mo ago`
  return `${Math.floor(months / 12)}y ago`
}

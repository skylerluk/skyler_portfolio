// Shared state for the whole app. Owned by Track A — B/C/D consume it via
// usePortfolio() and never edit this file or App.tsx.

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { getProjects } from '../data'
import type { Project } from '../data/types'

interface PortfolioContextValue {
  projects: Project[]
  activeIndex: number
  setActiveIndex: (i: number) => void
  next: () => void // clamp at last
  prev: () => void // clamp at first
}

const PortfolioContext = createContext<PortfolioContextValue | null>(null)

export function PortfolioProvider({ children }: { children: ReactNode }) {
  // Load once — project data is static for the session.
  const [projects] = useState<Project[]>(() => getProjects())
  const [activeIndex, setActiveIndexState] = useState(0)

  const clamp = useCallback(
    (i: number) => Math.max(0, Math.min(projects.length - 1, i)),
    [projects.length],
  )

  const setActiveIndex = useCallback(
    (i: number) => setActiveIndexState(clamp(i)),
    [clamp],
  )

  const next = useCallback(
    () => setActiveIndexState((i) => clamp(i + 1)),
    [clamp],
  )

  const prev = useCallback(
    () => setActiveIndexState((i) => clamp(i - 1)),
    [clamp],
  )

  const value = useMemo(
    () => ({ projects, activeIndex, setActiveIndex, next, prev }),
    [projects, activeIndex, setActiveIndex, next, prev],
  )

  return (
    <PortfolioContext.Provider value={value}>
      {children}
    </PortfolioContext.Provider>
  )
}

// Co-located by design (OVERVIEW §5) — the hook lives with its provider.
// eslint-disable-next-line react-refresh/only-export-components
export function usePortfolio(): PortfolioContextValue {
  const ctx = useContext(PortfolioContext)
  if (!ctx) {
    throw new Error('usePortfolio must be used within a PortfolioProvider')
  }
  return ctx
}

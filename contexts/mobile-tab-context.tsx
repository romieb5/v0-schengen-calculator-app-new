"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

export type MobileTab = "my-trips" | "timeline"
export type MobileSegment = "recorded" | "proposed"

interface MobileTabContextValue {
  activeTab: MobileTab
  setActiveTab: (tab: MobileTab) => void
  activeSegment: MobileSegment
  setActiveSegment: (segment: MobileSegment) => void
  barsVisible: boolean
}

const MobileTabContext = createContext<MobileTabContextValue | null>(null)

export function MobileTabProvider({ children, barsVisible = true }: { children: ReactNode; barsVisible?: boolean }) {
  const [activeTab, setActiveTab] = useState<MobileTab>("my-trips")
  const [activeSegment, setActiveSegment] = useState<MobileSegment>("recorded")

  return (
    <MobileTabContext.Provider value={{ activeTab, setActiveTab, activeSegment, setActiveSegment, barsVisible }}>
      {children}
    </MobileTabContext.Provider>
  )
}

export function useMobileTab() {
  const ctx = useContext(MobileTabContext)
  if (!ctx) throw new Error("useMobileTab must be used within MobileTabProvider")
  return ctx
}

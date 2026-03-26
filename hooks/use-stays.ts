"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { useAuth } from "@/components/auth-provider"

interface Stay {
  id: string
  entryDate: Date
  exitDate: Date
  stayType: "short" | "residence"
  countryCode?: string
  hidden?: boolean
}

interface ProposedTrip {
  id: string
  entryDate: Date
  exitDate: Date
  stayType: "short" | "residence"
  hidden?: boolean
}

// Parse a "YYYY-MM-DD" date string into a local-midnight Date.
// new Date("YYYY-MM-DD") parses as UTC midnight per spec, which drifts in
// non-UTC timezones. Splitting the parts and using the Date constructor
// gives us local midnight — the only thing this app cares about.
function parseDate(dateStr: string): Date {
  const [y, m, d] = dateStr.split("-").map(Number)
  return new Date(y, m - 1, d)
}

// Format a Date as "YYYY-MM-DD" using local date components.
// Never goes through UTC so the calendar date is always preserved.
function toDateString(date: Date): string {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, "0")
  const d = String(date.getDate()).padStart(2, "0")
  return `${y}-${m}-${d}`
}

// Convert database row (snake_case, "YYYY-MM-DD" strings) → app format (camelCase, Date)
function dbStayToApp(row: any): Stay {
  return {
    id: row.id,
    entryDate: parseDate(row.entry_date),
    exitDate: parseDate(row.exit_date),
    stayType: row.stay_type,
    countryCode: row.country_code || undefined,
    hidden: row.hidden ?? false,
  }
}

function dbTripToApp(row: any): ProposedTrip {
  return {
    id: row.id,
    entryDate: parseDate(row.entry_date),
    exitDate: parseDate(row.exit_date),
    stayType: "short",
    hidden: row.hidden ?? false,
  }
}

// Convert app format → API request body ("YYYY-MM-DD" strings)
function appStayToApi(stay: Stay) {
  return {
    entryDate: toDateString(stay.entryDate),
    exitDate: toDateString(stay.exitDate),
    stayType: stay.stayType,
    countryCode: stay.countryCode || undefined,
    hidden: stay.hidden ?? false,
  }
}

function appTripToApi(trip: ProposedTrip) {
  return {
    entryDate: toDateString(trip.entryDate),
    exitDate: toDateString(trip.exitDate),
    hidden: trip.hidden ?? false,
  }
}

// Parse localStorage entries. Dates are stored as ISO strings by JSON.stringify,
// so we extract just the "YYYY-MM-DD" portion and parse as local midnight.
function parseLocalStorageStays(key: string): Stay[] | ProposedTrip[] {
  try {
    const saved = localStorage.getItem(key)
    if (!saved) return []
    return JSON.parse(saved).map((s: any) => ({
      ...s,
      entryDate: parseDate(String(s.entryDate).slice(0, 10)),
      exitDate: parseDate(String(s.exitDate).slice(0, 10)),
    }))
  } catch {
    return []
  }
}

export function useStays() {
  const { isAuthenticated, isLoading: authLoading } = useAuth()
  const [stays, setStaysState] = useState<Stay[]>([])
  const [proposedTrips, setProposedTripsState] = useState<ProposedTrip[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isInitialized, setIsInitialized] = useState(false)
  const prevAuthenticatedRef = useRef<boolean | null>(null)

  // Load data on mount — from localStorage or API depending on auth status
  useEffect(() => {
    if (authLoading) return

    const wasAuthenticated = prevAuthenticatedRef.current
    prevAuthenticatedRef.current = isAuthenticated

    if (isAuthenticated) {
      // Fetch from API
      Promise.all([
        fetch("/api/stays").then((r) => r.json()),
        fetch("/api/proposed-trips").then((r) => r.json()),
      ])
        .then(([staysData, tripsData]) => {
          if (Array.isArray(staysData)) setStaysState(staysData.map(dbStayToApp))
          if (Array.isArray(tripsData)) setProposedTripsState(tripsData.map(dbTripToApp))
        })
        .catch(console.error)
        .finally(() => {
          setIsLoading(false)
          setIsInitialized(true)
        })
    } else if (wasAuthenticated) {
      // User just logged out — persist current in-memory state to localStorage
      // so their latest view (including hidden flags) is preserved
      setStaysState((current) => {
        localStorage.setItem("schengen-stays", JSON.stringify(current))
        return current
      })
      setProposedTripsState((current) => {
        localStorage.setItem("schengen-proposed-trips", JSON.stringify(current))
        return current
      })
      setIsLoading(false)
      setIsInitialized(true)
    } else {
      // Initial load as anonymous — load from localStorage
      setStaysState(parseLocalStorageStays("schengen-stays") as Stay[])
      setProposedTripsState(parseLocalStorageStays("schengen-proposed-trips") as ProposedTrip[])
      setIsLoading(false)
      setIsInitialized(true)
    }
  }, [isAuthenticated, authLoading])

  // Save to localStorage for anonymous users
  useEffect(() => {
    if (!isInitialized || isAuthenticated) return
    localStorage.setItem("schengen-stays", JSON.stringify(stays))
  }, [stays, isAuthenticated, isInitialized])

  useEffect(() => {
    if (!isInitialized || isAuthenticated) return
    localStorage.setItem("schengen-proposed-trips", JSON.stringify(proposedTrips))
  }, [proposedTrips, isAuthenticated, isInitialized])

  // --- Stays CRUD ---

  const addStay = useCallback(
    async (stay: Stay) => {
      if (isAuthenticated) {
        const res = await fetch("/api/stays", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(appStayToApi(stay)),
        })
        const data = await res.json()
        if (res.ok) {
          setStaysState((prev) => [...prev, dbStayToApp(data)])
        }
      } else {
        setStaysState((prev) => [...prev, stay])
      }
    },
    [isAuthenticated],
  )

  const updateStay = useCallback(
    async (stay: Stay) => {
      // Optimistic update
      setStaysState((prev) => prev.map((s) => (s.id === stay.id ? stay : s)))

      if (isAuthenticated) {
        const res = await fetch(`/api/stays/${stay.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(appStayToApi(stay)),
        })
        if (!res.ok) {
          const errBody = await res.json().catch(() => null)
          console.error("[updateStay] PUT failed:", res.status, errBody)
          console.error("[updateStay] Request body was:", appStayToApi(stay))
          // Rollback on failure — refetch
          const refetch = await fetch("/api/stays").then((r) => r.json())
          if (Array.isArray(refetch)) setStaysState(refetch.map(dbStayToApp))
        }
      }
    },
    [isAuthenticated],
  )

  const deleteStay = useCallback(
    async (id: string) => {
      setStaysState((prev) => prev.filter((s) => s.id !== id))

      if (isAuthenticated) {
        await fetch(`/api/stays/${id}`, { method: "DELETE" })
      }
    },
    [isAuthenticated],
  )

  const toggleStayVisibility = useCallback(
    async (id: string) => {
      const stay = stays.find((s) => s.id === id)
      if (!stay) return

      const updated = { ...stay, hidden: !stay.hidden }
      setStaysState((prev) => prev.map((s) => (s.id === id ? updated : s)))

      if (isAuthenticated) {
        await fetch(`/api/stays/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(appStayToApi(updated)),
        })
      }
    },
    [isAuthenticated, stays],
  )

  // --- Proposed Trips CRUD ---

  const addProposedTrip = useCallback(
    async (trip: ProposedTrip) => {
      if (isAuthenticated) {
        const res = await fetch("/api/proposed-trips", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(appTripToApi(trip)),
        })
        const data = await res.json()
        if (res.ok) {
          setProposedTripsState((prev) => [...prev, dbTripToApp(data)])
        }
      } else {
        setProposedTripsState((prev) => [...prev, trip])
      }
    },
    [isAuthenticated],
  )

  const updateProposedTrip = useCallback(
    async (trip: ProposedTrip) => {
      setProposedTripsState((prev) => prev.map((t) => (t.id === trip.id ? trip : t)))

      if (isAuthenticated) {
        const res = await fetch(`/api/proposed-trips/${trip.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(appTripToApi(trip)),
        })
        if (!res.ok) {
          const errBody = await res.json().catch(() => null)
          console.error("[updateProposedTrip] PUT failed:", res.status, errBody)
          console.error("[updateProposedTrip] Request body was:", appTripToApi(trip))
          const refetch = await fetch("/api/proposed-trips").then((r) => r.json())
          if (Array.isArray(refetch)) setProposedTripsState(refetch.map(dbTripToApp))
        }
      }
    },
    [isAuthenticated],
  )

  const deleteProposedTrip = useCallback(
    async (id: string) => {
      setProposedTripsState((prev) => prev.filter((t) => t.id !== id))

      if (isAuthenticated) {
        await fetch(`/api/proposed-trips/${id}`, { method: "DELETE" })
      }
    },
    [isAuthenticated],
  )

  const toggleProposedTripVisibility = useCallback(
    async (id: string) => {
      const trip = proposedTrips.find((t) => t.id === id)
      if (!trip) return

      const updated = { ...trip, hidden: !trip.hidden }
      setProposedTripsState((prev) => prev.map((t) => (t.id === id ? updated : t)))

      if (isAuthenticated) {
        await fetch(`/api/proposed-trips/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(appTripToApi(updated)),
        })
      }
    },
    [isAuthenticated, proposedTrips],
  )

  // --- Setters for direct state manipulation (used by calculator dialogs) ---

  const setStays = useCallback(
    (updater: Stay[] | ((prev: Stay[]) => Stay[])) => {
      setStaysState(updater)
    },
    [],
  )

  const setProposedTrips = useCallback(
    (updater: ProposedTrip[] | ((prev: ProposedTrip[]) => ProposedTrip[])) => {
      setProposedTripsState(updater)
    },
    [],
  )

  return {
    stays,
    proposedTrips,
    setStays,
    setProposedTrips,
    addStay,
    updateStay,
    deleteStay,
    toggleStayVisibility,
    addProposedTrip,
    updateProposedTrip,
    deleteProposedTrip,
    toggleProposedTripVisibility,
    isLoading: isLoading || authLoading,
  }
}

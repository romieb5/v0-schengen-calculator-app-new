"use client"

import { useState, useEffect, useCallback } from "react"
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

// Convert database row (snake_case, date strings) to app format (camelCase, Date objects)
function dbStayToApp(row: any): Stay {
  return {
    id: row.id,
    entryDate: new Date(row.entry_date),
    exitDate: new Date(row.exit_date),
    stayType: row.stay_type,
    countryCode: row.country_code || undefined,
    hidden: row.hidden ?? false,
  }
}

function dbTripToApp(row: any): ProposedTrip {
  return {
    id: row.id,
    entryDate: new Date(row.entry_date),
    exitDate: new Date(row.exit_date),
    stayType: "short",
    hidden: row.hidden ?? false,
  }
}

// Convert app format to API request body
function appStayToApi(stay: Stay) {
  return {
    entryDate: stay.entryDate.toISOString().split("T")[0],
    exitDate: stay.exitDate.toISOString().split("T")[0],
    stayType: stay.stayType,
    countryCode: stay.countryCode || null,
    hidden: stay.hidden ?? false,
  }
}

function appTripToApi(trip: ProposedTrip) {
  return {
    entryDate: trip.entryDate.toISOString().split("T")[0],
    exitDate: trip.exitDate.toISOString().split("T")[0],
    hidden: trip.hidden ?? false,
  }
}

function parseLocalStorageStays(key: string): Stay[] | ProposedTrip[] {
  try {
    const saved = localStorage.getItem(key)
    if (!saved) return []
    return JSON.parse(saved).map((s: any) => ({
      ...s,
      entryDate: new Date(s.entryDate),
      exitDate: new Date(s.exitDate),
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

  // Load data on mount — from localStorage or API depending on auth status
  useEffect(() => {
    if (authLoading) return

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
    } else {
      // Load from localStorage
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

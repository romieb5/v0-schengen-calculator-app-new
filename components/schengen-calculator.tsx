"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { ThreeMonthCalendar } from "./three-month-calendar"
import { TimelineVisualization } from "./timeline-visualization"
import { CalendarIcon, Pencil, Trash2, AlertTriangle, CheckCircle2, Info, PlusCircle, AlertCircle } from "lucide-react"
import { format, subDays, differenceInDays, isAfter, isBefore, addDays } from "date-fns"
import { cn } from "@/lib/utils"
import { SingleMonthCalendar } from "@/components/single-month-calendar"
import { calculateDaysUsedForDate } from "@/lib/schengen-calculations"

interface Stay {
  id: string
  entryDate: Date
  exitDate: Date
  stayType: "short" | "residence"
  countryCode?: string
}

const getDisabledDateRanges = (stays: Stay[], proposedTrips: Stay[], excludeId?: string | null) => {
  const allTrips = [...stays, ...proposedTrips]
  return allTrips
    .filter((trip) => trip.id !== excludeId)
    .map((trip) => ({
      start: trip.entryDate,
      end: trip.exitDate,
    }))
}

export function SchengenCalculator() {
  const [stays, setStays] = useState<Stay[]>([])
  const [entryDate, setEntryDate] = useState<Date>()
  const [exitDate, setExitDate] = useState<Date>()
  const [stayType, setStayType] = useState<"short" | "residence">("short")
  const [countryCode, setCountryCode] = useState("")
  const [referenceDate, setReferenceDate] = useState<Date>(new Date())
  const [editingId, setEditingId] = useState<string | null>(null)

  const [proposedTrips, setProposedTrips] = useState<Stay[]>([])
  const [proposedEntry, setProposedEntry] = useState<Date>()
  const [proposedExit, setProposedExit] = useState<Date>()
  const [editingProposedId, setEditingProposedId] = useState<string | null>(null)

  const [entryPopoverOpen, setEntryPopoverOpen] = useState(false)
  const [exitPopoverOpen, setExitPopoverOpen] = useState(false)
  const [referencePopoverOpen, setReferencePopoverOpen] = useState(false)
  const [proposedEntryPopoverOpen, setProposedEntryPopoverOpen] = useState(false)
  const [proposedExitPopoverOpen, setProposedExitPopoverOpen] = useState(false)

  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [editDialogEntry, setEditDialogEntry] = useState<Date>()
  const [editDialogExit, setEditDialogExit] = useState<Date>()
  const [editDialogStayType, setEditDialogStayType] = useState<"short" | "residence">("short")
  const [editDialogCountryCode, setEditDialogCountryCode] = useState("")
  const [editDialogId, setEditDialogId] = useState<string | null>(null)

  const [editProposedDialogOpen, setEditProposedDialogOpen] = useState(false)
  const [editProposedDialogEntry, setEditProposedDialogEntry] = useState<Date>()
  const [editProposedDialogExit, setEditProposedDialogExit] = useState<Date>()
  const [editProposedDialogId, setEditProposedDialogId] = useState<string | null>(null)

  // Load stays from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("schengen-stays")
    if (saved) {
      const parsed = JSON.parse(saved)
      setStays(
        parsed.map((s: any) => ({
          ...s,
          entryDate: new Date(s.entryDate),
          exitDate: new Date(s.exitDate),
        })),
      )
    }

    const savedProposed = localStorage.getItem("schengen-proposed-trips")
    if (savedProposed) {
      const parsed = JSON.parse(savedProposed)
      setProposedTrips(
        parsed.map((s: any) => ({
          ...s,
          entryDate: new Date(s.entryDate),
          exitDate: new Date(s.exitDate),
        })),
      )
    }
  }, [])

  // Save stays to localStorage
  useEffect(() => {
    localStorage.setItem("schengen-stays", JSON.stringify(stays))
  }, [stays])

  useEffect(() => {
    localStorage.setItem("schengen-proposed-trips", JSON.stringify(proposedTrips))
  }, [proposedTrips])

  const addOrUpdateStay = () => {
    if (!entryDate || !exitDate) return

    if (isAfter(entryDate, exitDate)) {
      alert("Entry date must be before exit date")
      return
    }

    const stay: Stay = {
      id: editingId || Date.now().toString(),
      entryDate,
      exitDate,
      stayType,
      countryCode: countryCode || undefined,
    }

    if (editingId) {
      setStays(stays.map((s) => (s.id === editingId ? stay : s)))
      setEditingId(null)
    } else {
      setStays([...stays, stay])
    }

    // Reset form
    setEntryDate(undefined)
    setExitDate(undefined)
    setStayType("short")
    setCountryCode("")
  }

  const editStay = (stay: Stay) => {
    setEditDialogEntry(stay.entryDate)
    setEditDialogExit(stay.exitDate)
    setEditDialogStayType(stay.stayType)
    setEditDialogCountryCode(stay.countryCode || "")
    setEditDialogId(stay.id)
    setEditDialogOpen(true)
  }

  const saveEditedStay = () => {
    if (!editDialogEntry || !editDialogExit || !editDialogId) return

    if (isAfter(editDialogEntry, editDialogExit)) {
      alert("Entry date must be before exit date")
      return
    }

    const stay: Stay = {
      id: editDialogId,
      entryDate: editDialogEntry,
      exitDate: editDialogExit,
      stayType: editDialogStayType,
      countryCode: editDialogCountryCode || undefined,
    }

    setStays(stays.map((s) => (s.id === editDialogId ? stay : s)))

    // Reset dialog state
    setEditDialogOpen(false)
    setEditDialogEntry(undefined)
    setEditDialogExit(undefined)
    setEditDialogStayType("short")
    setEditDialogCountryCode("")
    setEditDialogId(null)
  }

  const deleteStay = (id: string) => {
    setStays(stays.filter((s) => s.id !== id))
  }

  // REMOVED LOCAL calculateDaysUsed function

  const daysUsedForCalculations = calculateDaysUsedForDate(
    referenceDate,
    stays,
    proposedTrips, // Always include proposed trips in the calculation for status
  )

  const daysUsed = daysUsedForCalculations.daysUsed
  const daysRemaining = daysUsedForCalculations.daysLeft
  const windowStart = subDays(referenceDate, 179)
  const isOverstay = daysUsed > 90

  const checkProposedTrip = (
    tripEntry: Date,
    tripExit: Date,
    currentTripId?: string, // Optional ID to exclude current trip from calculations
  ): { isLegal: boolean; message: string; daysRemaining?: number; lastEligibleDate?: Date } => {
    if (!tripEntry || !tripExit) {
      return { isLegal: false, message: "Please enter valid trip details" }
    }

    if (isAfter(tripEntry, tripExit)) {
      return { isLegal: false, message: "Entry date must be before exit date" }
    }

    const duration = differenceInDays(tripExit, tripEntry) + 1

    console.log(
      "[v0] Checking proposed trip:",
      format(tripEntry, "MMM dd, yyyy"),
      "to",
      format(tripExit, "MMM dd, yyyy"),
    )
    console.log("[v0] Trip duration:", duration, "days")
    console.log(
      "[v0] Existing stays:",
      stays.map((s) => ({
        entry: format(s.entryDate, "MMM dd, yyyy"),
        exit: format(s.exitDate, "MMM dd, yyyy"),
        type: s.stayType,
      })),
    )
    console.log(
      "[v0] Other proposed trips:",
      proposedTrips
        .filter((t) => !currentTripId || t.id !== currentTripId)
        .map((t) => ({
          entry: format(t.entryDate, "MMM d, yyyy"),
          exit: format(t.exitDate, "MMM d, yyyy"),
        })),
    )

    let maxDaysUsed = 0
    let daysUsedOnLastDay = 0
    let maxDaysUsedDate: Date | null = null
    let lastEligibleDate: Date | null = null

    const tripsToInclude = proposedTrips.filter((t) => !currentTripId || t.id !== currentTripId)
    tripsToInclude.push({ id: "temp", entryDate: tripEntry, exitDate: tripExit })

    const { daysUsed: calculatedDaysUsedOnLastDay, daysLeft: daysRemainingAfterTrip } = calculateDaysUsedForDate(
      tripExit,
      stays,
      tripsToInclude,
    )

    daysUsedOnLastDay = calculatedDaysUsedOnLastDay
    maxDaysUsed = daysUsedOnLastDay // In this simplified approach, we only check the end date for the 'maxDaysUsed' within the proposed trip itself

    // We need to re-evaluate the loop to find the actual maxDaysUsed across the entire trip duration
    // and the last eligible date. The calculateDaysUsedForDate function needs to be adapted or used iteratively.

    // Re-iterating to find max days used and last eligible date:
    for (let i = 0; i < duration; i++) {
      const currentDayOfTrip = addDays(tripEntry, i)
      const windowStartForDay = subDays(currentDayOfTrip, 179)
      let daysUsedForThisDay = 0

      // Calculate days from existing stays
      stays.forEach((stay) => {
        if (stay.stayType !== "short") return
        const effectiveEntry = isAfter(stay.entryDate, windowStartForDay) ? stay.entryDate : windowStartForDay
        const effectiveExit = isBefore(stay.exitDate, currentDayOfTrip) ? stay.exitDate : currentDayOfTrip
        if (isBefore(effectiveEntry, effectiveExit) || effectiveEntry.getTime() === effectiveExit.getTime()) {
          daysUsedForThisDay += differenceInDays(effectiveExit, effectiveEntry) + 1
        }
      })

      // Calculate days from other proposed trips
      proposedTrips.forEach((otherTrip) => {
        if (currentTripId && otherTrip.id === currentTripId) return
        const otherTripStart = otherTrip.entryDate
        const otherTripEnd = otherTrip.exitDate
        const effectiveEntry = isAfter(otherTripStart, windowStartForDay) ? otherTripStart : windowStartForDay
        const effectiveExit = isBefore(otherTripEnd, currentDayOfTrip) ? otherTripEnd : currentDayOfTrip
        if (isBefore(effectiveEntry, effectiveExit) || effectiveEntry.getTime() === effectiveExit.getTime()) {
          daysUsedForThisDay += differenceInDays(effectiveExit, otherTripEnd) + 1
        }
      })

      // Calculate days from the current proposed trip up to this day
      const proposedTripStart = isAfter(tripEntry, windowStartForDay) ? tripEntry : windowStartForDay
      const proposedTripEnd = currentDayOfTrip
      if (isBefore(proposedTripStart, proposedTripEnd) || proposedTripStart.getTime() === proposedTripEnd.getTime()) {
        daysUsedForThisDay += differenceInDays(proposedTripEnd, proposedTripStart) + 1
      }

      console.log(
        `[v0] Day ${i + 1} (${format(currentDayOfTrip, "MMM dd, yyyy")}): Total days used: ${daysUsedForThisDay}/90`,
      )

      if (daysUsedForThisDay > maxDaysUsed) {
        maxDaysUsed = daysUsedForThisDay
        maxDaysUsedDate = currentDayOfTrip
      }

      if (daysUsedForThisDay <= 90 && (lastEligibleDate === null || isAfter(currentDayOfTrip, lastEligibleDate))) {
        lastEligibleDate = currentDayOfTrip
      }
    }

    console.log(
      `[v0] Maximum days used: ${maxDaysUsed}/90 on ${maxDaysUsedDate ? format(maxDaysUsedDate, "MMM dd, yyyy") : "unknown"}`,
    )
    console.log(`[v0] Days used on last day: ${daysUsedOnLastDay}/90`)

    if (maxDaysUsed > 90) {
      const lastEligibleDateText = lastEligibleDate
        ? ` Last eligible exit date: ${format(lastEligibleDate, "MMMM d, yyyy")}`
        : ""
      return {
        isLegal: false,
        message: `This trip would exceed the 90-day limit. Maximum days during trip: ${maxDaysUsed}/90.${lastEligibleDateText}`,
        lastEligibleDate: lastEligibleDate || undefined,
      }
    }

    return {
      isLegal: true,
      message: `Maximum days used during trip: ${maxDaysUsed}/90. Days remaining after trip: ${daysRemainingAfterTrip}`,
      daysRemaining: daysRemainingAfterTrip,
    }
  }

  const addProposedTrip = () => {
    if (!proposedEntry || !proposedExit) {
      return
    }

    if (isAfter(proposedEntry, proposedExit)) {
      return
    }

    if (editingProposedId) {
      setProposedTrips(
        proposedTrips.map((trip) =>
          trip.id === editingProposedId ? { ...trip, entryDate: proposedEntry, exitDate: proposedExit } : trip,
        ),
      )
      setEditingProposedId(null)
    } else {
      const newTrip: Stay = {
        id: Date.now().toString(),
        entryDate: proposedEntry,
        exitDate: proposedExit,
        stayType: "short",
        countryCode: "",
      }
      setProposedTrips([...proposedTrips, newTrip])
    }

    setProposedEntry(undefined)
    setProposedExit(undefined)
  }

  const editProposedTrip = (id: string) => {
    const trip = proposedTrips.find((t) => t.id === id)
    if (trip) {
      setEditProposedDialogEntry(trip.entryDate)
      setEditProposedDialogExit(trip.exitDate)
      setEditProposedDialogId(id)
      setEditProposedDialogOpen(true)
    }
  }

  const saveEditedProposedTrip = () => {
    if (!editProposedDialogEntry || !editProposedDialogExit || !editProposedDialogId) return

    if (isAfter(editProposedDialogEntry, editProposedDialogExit)) {
      alert("Entry date must be before exit date")
      return
    }

    setProposedTrips(
      proposedTrips.map((trip) =>
        trip.id === editProposedDialogId
          ? { ...trip, entryDate: editProposedDialogEntry, exitDate: editProposedDialogExit }
          : trip,
      ),
    )

    // Reset dialog state
    setEditProposedDialogOpen(false)
    setEditProposedDialogEntry(undefined)
    setEditProposedDialogExit(undefined)
    setEditProposedDialogId(null)
  }

  const deleteProposedTrip = (id: string) => {
    setProposedTrips(proposedTrips.filter((trip) => trip.id !== id))
  }

  const proposedTripResults = proposedTrips
    .sort((a, b) => a.entryDate.getTime() - b.entryDate.getTime())
    .map((trip) => ({
      trip,
      result: checkProposedTrip(trip.entryDate, trip.exitDate, trip.id),
    }))

  const currentProposedResult =
    proposedEntry && proposedExit
      ? checkProposedTrip(proposedEntry, proposedExit, editingProposedId || undefined)
      : null

  const stayColors = [
    "bg-green-500", // 1
    "bg-blue-500", // 2
    "bg-yellow-500", // 3
    "bg-purple-500", // 4
    "bg-orange-500", // 5
    "bg-cyan-500", // 6
    "bg-pink-500", // 7
    "bg-emerald-500", // 8
    "bg-indigo-500", // 9
    "bg-red-500", // 10
    "bg-teal-500", // 11
    "bg-violet-500", // 12
    "bg-lime-500", // 13
    "bg-fuchsia-500", // 14
    "bg-amber-500", // 15
    "bg-sky-500", // 16
    "bg-rose-500", // 17
    "bg-green-600", // 18
    "bg-blue-600", // 19
    "bg-purple-600", // 20
    "bg-orange-600", // 21
    "bg-cyan-600", // 22
    "bg-pink-600", // 23
    "bg-emerald-600", // 24
    "bg-indigo-600", // 25
  ]

  const sortedStays = [...stays].sort((a, b) => a.entryDate.getTime() - b.entryDate.getTime())
  const stayColorMap = new Map<string, string>()
  sortedStays.forEach((stay, index) => {
    stayColorMap.set(stay.id, stayColors[index % stayColors.length])
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Edit Stay Dialog */}
        <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
          <DialogContent className="max-w-2xl max-h-[85vh] sm:max-h-[90vh] overflow-y-auto p-4 sm:p-6">
            <DialogHeader>
              <DialogTitle className="text-lg sm:text-2xl">Edit Stay</DialogTitle>
              <DialogDescription className="text-sm">Update the details of your recorded stay</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 sm:space-y-6 py-2 sm:py-4">
              <div className="space-y-4">
                <SingleMonthCalendar
                  entryDate={editDialogEntry}
                  exitDate={editDialogExit}
                  onDateSelect={(date) => {
                    if (!editDialogEntry || (editDialogEntry && editDialogExit)) {
                      setEditDialogEntry(date)
                      setEditDialogExit(undefined)
                    } else {
                      if (date < editDialogEntry) {
                        setEditDialogExit(editDialogEntry)
                        setEditDialogEntry(date)
                      } else {
                        setEditDialogExit(date)
                      }
                    }
                  }}
                  initialMonth={editDialogEntry}
                  disabledRanges={getDisabledDateRanges(stays, proposedTrips, editDialogId)}
                />

                {editDialogEntry && editDialogExit && (
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-end gap-2 sm:gap-6 text-xs sm:text-sm bg-muted/50 rounded-lg px-3 py-2 sm:px-4 sm:py-3">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-foreground">Entry:</span>
                      <span className="text-muted-foreground">{format(editDialogEntry, "MMM d, yyyy")}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-foreground">Exit:</span>
                      <span className="text-muted-foreground">{format(editDialogExit, "MMM d, yyyy")}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-foreground">Duration:</span>
                      <span className="font-semibold text-primary">
                        {differenceInDays(editDialogExit, editDialogEntry) + 1} day(s)
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Stay Type and Country Code fields are removed as per update */}

              <div className="flex gap-3 justify-end pt-2 sm:pt-4">
                <Button
                  variant="outline"
                  onClick={() => {
                    setEditDialogOpen(false)
                    setEditDialogEntry(undefined)
                    setEditDialogExit(undefined)
                    setEditDialogStayType("short")
                    setEditDialogCountryCode("")
                    setEditDialogId(null)
                  }}
                >
                  Cancel
                </Button>
                <Button
                  onClick={saveEditedStay}
                  disabled={!editDialogEntry || !editDialogExit}
                  className="font-semibold shadow-md hover:shadow-lg transition-shadow"
                >
                  Update Stay
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Add Edit Proposed Trip Dialog */}
        <Dialog open={editProposedDialogOpen} onOpenChange={setEditProposedDialogOpen}>
          <DialogContent className="max-w-2xl max-h-[85vh] sm:max-h-[90vh] overflow-y-auto p-4 sm:p-6">
            <DialogHeader>
              <DialogTitle className="text-lg sm:text-2xl">Edit Proposed Trip</DialogTitle>
              <DialogDescription className="text-sm">Update the dates of your proposed trip</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 sm:space-y-6 py-2 sm:py-4">
              <div className="space-y-4">
                <SingleMonthCalendar
                  entryDate={editProposedDialogEntry}
                  exitDate={editProposedDialogExit}
                  onDateSelect={(date) => {
                    if (!editProposedDialogEntry || (editProposedDialogEntry && editProposedDialogExit)) {
                      setEditProposedDialogEntry(date)
                      setEditProposedDialogExit(undefined)
                    } else {
                      if (date < editProposedDialogEntry) {
                        setEditProposedDialogExit(editProposedDialogEntry)
                        setEditProposedDialogEntry(date)
                      } else {
                        setEditProposedDialogExit(date)
                      }
                    }
                  }}
                  initialMonth={editProposedDialogEntry}
                  disabledRanges={getDisabledDateRanges(stays, proposedTrips, editProposedDialogId)}
                />

                {editProposedDialogEntry && editProposedDialogExit && (
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-end gap-2 sm:gap-6 text-xs sm:text-sm bg-muted/50 rounded-lg px-3 py-2 sm:px-4 sm:py-3">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-foreground">Entry:</span>
                      <span className="text-muted-foreground">{format(editProposedDialogEntry, "MMM d, yyyy")}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-foreground">Exit:</span>
                      <span className="text-muted-foreground">{format(editProposedDialogExit, "MMM d, yyyy")}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-foreground">Duration:</span>
                      <span className="font-semibold text-primary">
                        {differenceInDays(editProposedDialogExit, editProposedDialogEntry) + 1} day(s)
                      </span>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex gap-3 justify-end pt-2 sm:pt-4">
                <Button
                  variant="outline"
                  onClick={() => {
                    setEditProposedDialogOpen(false)
                    setEditProposedDialogEntry(undefined)
                    setEditProposedDialogExit(undefined)
                    setEditProposedDialogId(null)
                  }}
                >
                  Cancel
                </Button>
                <Button
                  onClick={saveEditedProposedTrip}
                  disabled={!editProposedDialogEntry || !editProposedDialogExit}
                  className="font-semibold shadow-md hover:shadow-lg transition-shadow"
                >
                  Update Proposed Trip
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        <div className="mb-8 sm:mb-12 text-center space-y-2 sm:space-3 px-4">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground tracking-tight">
            Schengen Visit Calculator
          </h1>
          <p className="text-muted-foreground text-base lg:text-lg max-w-2xl mx-auto min-h-[1.5rem]">
            Track your stays and ensure compliance with Schengen visa rules
          </p>
        </div>

        <div className="space-y-6 sm:space-y-8">
          <Card className="border-2 shadow-lg">
            <CardHeader className="pb-4 sm:pb-6 px-4 sm:px-6">
              <CardTitle className="text-lg sm:text-xl lg:text-2xl">{editingId ? "Edit Stay" : "Add Stay"}</CardTitle>
              <CardDescription className="text-xs sm:text-sm">Record your Schengen area visits</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 sm:space-y-6 px-4 sm:px-6">
              <div className="space-y-4">
                <ThreeMonthCalendar
                  entryDate={entryDate}
                  exitDate={exitDate}
                  onEntryDateChange={setEntryDate}
                  onExitDateChange={setExitDate}
                  onClear={() => {
                    setEntryDate(undefined)
                    setExitDate(undefined)
                  }}
                  initialMonth={entryDate || new Date()}
                  disabledRanges={getDisabledDateRanges(stays, proposedTrips)}
                />

                {entryDate && exitDate && (
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 bg-muted/50 rounded-lg px-3 sm:px-4 py-2 sm:py-3">
                    <div className="flex flex-wrap items-center gap-3 sm:gap-4 lg:gap-6 text-xs sm:text-sm">
                      <div className="flex items-center gap-1 sm:gap-2">
                        <span className="font-medium text-foreground">Entry:</span>
                        <span className="text-muted-foreground">{format(entryDate, "MMM d, yyyy")}</span>
                      </div>
                      <div className="flex items-center gap-1 sm:gap-2">
                        <span className="font-medium text-foreground">Exit:</span>
                        <span className="text-muted-foreground">{format(exitDate, "MMM d, yyyy")}</span>
                      </div>
                      <div className="flex items-center gap-1 sm:gap-2">
                        <span className="font-semibold text-foreground">Duration:</span>
                        <span className="font-semibold text-primary">
                          {differenceInDays(exitDate, entryDate) + 1} day(s)
                        </span>
                      </div>
                    </div>
                    <Button
                      onClick={addOrUpdateStay}
                      className="w-full sm:w-auto h-10 sm:h-11 font-semibold shadow-md hover:shadow-lg transition-shadow text-sm sm:text-base flex-shrink-0"
                      disabled={!entryDate || !exitDate}
                    >
                      <PlusCircle className="h-4 w-4 mr-2 flex-shrink-0" />
                      {editingId ? "Update Stay" : "Add Stay"}
                    </Button>
                  </div>
                )}
              </div>

              {editingId && (
                <Button
                  onClick={() => {
                    setEditingId(null)
                    setEntryDate(undefined)
                    setExitDate(undefined)
                    setStayType("short")
                    setCountryCode("")
                  }}
                  variant="outline"
                  className="w-full sm:w-auto"
                >
                  Cancel Edit
                </Button>
              )}
            </CardContent>
          </Card>

          <div className="space-y-6 sm:space-y-8 lg:grid lg:grid-cols-2 lg:gap-8 lg:space-y-0">
            <Card className="border-2 shadow-lg">
              <CardHeader className="pb-4 sm:pb-6 px-4 sm:px-6">
                <CardTitle className="text-lg sm:text-xl lg:text-2xl flex items-center gap-2">
                  <Info className="h-5 w-5 flex-shrink-0" />
                  Current Status
                </CardTitle>
                <CardDescription className="text-xs sm:text-sm break-words">
                  <span className="block sm:inline">180-day window:</span>{" "}
                  <span className="block sm:inline">
                    {format(windowStart, "PP")} to {format(referenceDate, "PP")}
                  </span>
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 sm:space-y-6 px-4 sm:px-6">
                <div className="space-y-2 sm:space-y-3">
                  <div className="flex justify-between items-baseline gap-2">
                    <span className="text-xs sm:text-sm font-semibold text-foreground">Days Used</span>
                    <span
                      className={cn(
                        "text-xl sm:text-2xl font-bold tabular-nums",
                        isOverstay ? "text-destructive" : daysRemaining <= 10 ? "text-warning" : "text-success",
                      )}
                    >
                      {daysUsed} <span className="text-sm sm:text-base text-muted-foreground">/ 90</span>
                    </span>
                  </div>
                  <div className="relative">
                    <Progress
                      value={isOverstay ? 100 : (daysUsed / 90) * 100}
                      className={cn(
                        "h-3 sm:h-4 shadow-inner",
                        isOverstay
                          ? "[&>div]:bg-destructive"
                          : daysRemaining <= 10
                            ? "[&>div]:bg-warning"
                            : "[&>div]:bg-success",
                      )}
                    />
                  </div>
                </div>

                {isOverstay ? (
                  <Alert className="border-2 border-destructive bg-destructive/10">
                    <AlertTriangle className="h-4 w-4 sm:h-5 sm:w-5 text-destructive flex-shrink-0" />
                    <AlertTitle className="font-bold text-foreground text-sm sm:text-base">Overstay Warning</AlertTitle>
                    <AlertDescription className="text-foreground font-medium text-xs sm:text-sm break-words">
                      You have exceeded the 90-day limit by {daysUsed - 90} day(s)
                    </AlertDescription>
                  </Alert>
                ) : daysRemaining <= 10 ? (
                  <Alert className="border-2 border-warning bg-warning/10">
                    <AlertCircle className="h-4 w-4 sm:h-5 sm:w-5 text-warning flex-shrink-0" />
                    <AlertTitle className="font-bold text-foreground text-sm sm:text-base">Caution</AlertTitle>
                    <AlertDescription className="text-foreground font-medium text-xs sm:text-sm break-words">
                      Only {daysRemaining} day(s) remaining in your 180-day window
                    </AlertDescription>
                  </Alert>
                ) : (
                  <Alert className="border-2 border-success bg-success/10">
                    <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-success flex-shrink-0" />
                    <AlertTitle className="font-bold text-foreground text-sm sm:text-base">Compliant</AlertTitle>
                    <AlertDescription className="text-foreground font-medium text-xs sm:text-sm break-words">
                      You have {daysRemaining} day(s) remaining
                    </AlertDescription>
                  </Alert>
                )}

                <div className="pt-4 sm:pt-6 border-t space-y-2 sm:space-y-3">
                  <Label className="text-sm sm:text-base font-semibold">Reference Date</Label>
                  <p className="text-xs sm:text-sm text-muted-foreground break-words">
                    Change this date to adjust the 180-day window and see your status at different points in time.
                  </p>
                  <Popover open={referencePopoverOpen} onOpenChange={setReferencePopoverOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal h-10 sm:h-11 text-sm sm:text-base shadow-sm hover:shadow-md transition-shadow bg-transparent"
                      >
                        <CalendarIcon className="mr-2 h-3 w-3 sm:h-4 sm:w-4 text-primary flex-shrink-0" />
                        <span className="truncate">{format(referenceDate, "PPP")}</span>
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={referenceDate}
                        onSelect={(date) => {
                          if (date) {
                            setReferenceDate(date)
                            setReferencePopoverOpen(false)
                          }
                        }}
                        defaultMonth={referenceDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 shadow-lg">
              <CardHeader className="pb-4 sm:pb-6 px-4 sm:px-6">
                <CardTitle className="text-lg sm:text-xl lg:text-2xl flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 flex-shrink-0" />
                  Check Proposed Trip
                </CardTitle>
                <CardDescription className="text-sm sm:text-base break-words">
                  Verify if a future trip would be legal
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 px-4 sm:px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label htmlFor="proposed-entry" className="text-sm sm:text-base">
                      Proposed Entry Date
                    </Label>
                    <Popover open={proposedEntryPopoverOpen} onOpenChange={setProposedEntryPopoverOpen}>
                      <PopoverTrigger asChild>
                        <Button
                          id="proposed-entry"
                          variant="outline"
                          className="w-full justify-start text-left font-normal h-10 sm:h-11 text-sm sm:text-base shadow-sm hover:shadow-md transition-shadow bg-transparent"
                        >
                          <CalendarIcon className="mr-2 h-3 w-3 sm:h-4 sm:w-4 text-primary flex-shrink-0" />
                          <span className="truncate">
                            {proposedEntry ? format(proposedEntry, "PPP") : "Pick a date"}
                          </span>
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={proposedEntry}
                          onSelect={(date) => {
                            setProposedEntry(date)
                            setProposedEntryPopoverOpen(false)
                          }}
                          disabled={(date) => {
                            const disabledRanges = getDisabledDateRanges(stays, proposedTrips)
                            return disabledRanges.some((range) => {
                              return date >= range.start && date <= range.end
                            })
                          }}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="proposed-exit" className="text-sm sm:text-base">
                      Proposed Exit Date
                    </Label>
                    <Popover open={proposedExitPopoverOpen} onOpenChange={setProposedExitPopoverOpen}>
                      <PopoverTrigger asChild>
                        <Button
                          id="proposed-exit"
                          variant="outline"
                          className="w-full justify-start text-left font-normal h-10 sm:h-11 text-sm sm:text-base shadow-sm hover:shadow-md transition-shadow bg-transparent"
                        >
                          <CalendarIcon className="mr-2 h-3 w-3 sm:h-4 sm:w-4 text-primary flex-shrink-0" />
                          <span className="truncate">{proposedExit ? format(proposedExit, "PPP") : "Pick a date"}</span>
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={proposedExit}
                          onSelect={(date) => {
                            setProposedExit(date)
                            setProposedExitPopoverOpen(false)
                          }}
                          disabled={(date) => {
                            const disabledRanges = getDisabledDateRanges(stays, proposedTrips)
                            return disabledRanges.some((range) => {
                              return date >= range.start && date <= range.end
                            })
                          }}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>

                <Button
                  onClick={addProposedTrip}
                  disabled={!proposedEntry || !proposedExit}
                  className="w-full h-10 sm:h-11 text-sm sm:text-base font-semibold shadow-md hover:shadow-lg transition-shadow"
                >
                  <PlusCircle className="mr-2 h-3 w-3 sm:h-4 w-4 flex-shrink-0" />
                  {editingProposedId ? "Update Proposed Trip" : "Add Proposed Trip"}
                </Button>

                {currentProposedResult && (
                  <Alert
                    className={cn(
                      "border-2",
                      currentProposedResult.isLegal
                        ? "border-success bg-success/10"
                        : "border-destructive bg-destructive/10",
                    )}
                  >
                    {currentProposedResult.isLegal ? (
                      <CheckCircle2 className="h-5 w-5 text-success flex-shrink-0" />
                    ) : (
                      <AlertTriangle className="h-5 w-5 text-destructive flex-shrink-0" />
                    )}
                    {!currentProposedResult.isLegal && (
                      <AlertTitle className={cn("font-bold text-foreground")}>Trip Exceeds Limit</AlertTitle>
                    )}
                    <AlertDescription className={cn("font-medium text-foreground")}>
                      {currentProposedResult.message.split(". ").map((sentence, idx) => (
                        <div key={idx}>
                          {sentence}
                          {idx < currentProposedResult.message.split(". ").length - 1 ? "." : ""}
                        </div>
                      ))}
                    </AlertDescription>
                  </Alert>
                )}

                {proposedTripResults.length > 0 && (
                  <div className="space-y-3 pt-4 border-t">
                    <h3 className="font-semibold text-base">Saved Proposed Trips</h3>
                    <div className="space-y-2">
                      {proposedTripResults.map(({ trip, result }) => (
                        <div
                          key={trip.id}
                          className={cn(
                            "p-4 rounded-lg border-2 transition-colors",
                            result.isLegal
                              ? "bg-success/5 border-success/30"
                              : "bg-destructive/5 border-destructive/30",
                          )}
                        >
                          <div className="space-y-2 sm:space-y-1">
                            {/* Date row with icons and buttons */}
                            <div className="flex items-start justify-between gap-3">
                              <div className="flex items-center gap-2 flex-1 min-w-0">
                                {result.isLegal ? (
                                  <CheckCircle2 className="h-4 w-4 text-success flex-shrink-0" />
                                ) : (
                                  <AlertTriangle className="h-4 w-4 text-destructive flex-shrink-0" />
                                )}
                                <div className="text-xs sm:text-sm font-medium sm:truncate break-words">
                                  {format(trip.entryDate, "MMM d, yyyy")} → {format(trip.exitDate, "MMM d, yyyy")}
                                </div>
                              </div>
                              <div className="flex gap-1 flex-shrink-0">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => editProposedTrip(trip.id)}
                                  className="h-8 w-8 p-0 shadow-sm hover:shadow-md transition-shadow"
                                >
                                  <Pencil className="h-3.5 w-3.5" />
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => deleteProposedTrip(trip.id)}
                                  className="h-8 w-8 p-0 text-destructive hover:bg-destructive hover:text-destructive-foreground shadow-sm hover:shadow-md transition-shadow"
                                >
                                  <Trash2 className="h-3.5 w-3.5" />
                                </Button>
                              </div>
                            </div>
                            <div
                              className={cn(
                                "text-xs font-medium sm:pl-6",
                                result.isLegal ? "text-success" : "text-destructive",
                              )}
                            >
                              {(() => {
                                const sentences = result.message.split(". ")
                                const firstSentence = sentences[0].replace("Maximum", "Max") + "."
                                const secondSentence = sentences[1] || ""
                                return (
                                  <>
                                    <div>{firstSentence}</div>
                                    {secondSentence && <div>{secondSentence}</div>}
                                  </>
                                )
                              })()}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {(stays.length > 0 || proposedTrips.length > 0) && (
            <Card className="border-2 shadow-lg">
              <CardHeader className="pb-6 px-4 sm:px-6">
                <CardTitle className="text-lg sm:text-xl lg:text-2xl">Timeline Visualization</CardTitle>
                <CardDescription className="text-sm sm:text-base">
                  Visual representation of your stays within the rolling 180-day window
                </CardDescription>
              </CardHeader>
              <CardContent>
                <TimelineVisualization
                  stays={stays}
                  proposedTrips={proposedTrips.map((trip) => ({
                    id: trip.id,
                    entryDate: trip.entryDate,
                    exitDate: trip.exitDate,
                  }))}
                  referenceDate={referenceDate}
                />
              </CardContent>
            </Card>
          )}

          {stays.length > 0 && (
            <Card className="border-2 shadow-lg">
              <CardHeader className="pb-4 sm:pb-6 px-4 sm:px-6">
                <CardTitle className="text-lg sm:text-xl lg:text-2xl">Recorded Stays</CardTitle>
                <CardDescription className="text-sm sm:text-base">
                  {stays.length} stay{stays.length !== 1 ? "s" : ""} recorded
                </CardDescription>
              </CardHeader>
              <CardContent className="px-4 sm:px-6">
                <div className="space-y-3">
                  {sortedStays.map((stay, index) => {
                    const duration = differenceInDays(stay.exitDate, stay.entryDate) + 1
                    const stayColor = stayColorMap.get(stay.id) || stayColors[0]

                    return (
                      <div
                        key={stay.id}
                        className="bg-card p-3 sm:p-4 rounded-lg border-2 hover:border-primary/50 transition-colors relative group shadow-sm"
                      >
                        <div className="flex items-start gap-3 sm:gap-4">
                          <div
                            className={`flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-full ${stayColor} text-white flex items-center justify-center font-bold text-xs sm:text-sm shadow-sm`}
                          >
                            {index + 1}
                          </div>

                          <div className="flex-1 min-w-0">
                            {/* Mobile: Date range and buttons on same row */}
                            <div className="flex items-start justify-between gap-2 sm:hidden">
                              <div className="text-xs leading-tight">
                                <div className="font-semibold text-foreground">
                                  {format(stay.entryDate, "MMM d, yyyy")} →
                                </div>
                                <div className="font-semibold text-foreground">
                                  {format(stay.exitDate, "MMM d, yyyy")}
                                </div>
                              </div>
                              <div className="flex gap-1 flex-shrink-0">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => editStay(stay)}
                                  className="shadow-sm hover:shadow-md transition-shadow h-7 w-7 p-0"
                                >
                                  <Pencil className="h-3 w-3" />
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => deleteStay(stay.id)}
                                  className="text-destructive hover:bg-destructive hover:text-destructive-foreground shadow-sm hover:shadow-md transition-shadow h-7 w-7 p-0"
                                >
                                  <Trash2 className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                            {/* Mobile: Day count below date range */}
                            <div className="text-xs text-muted-foreground mt-1 sm:hidden">{duration} day(s)</div>
                            <div className="hidden sm:flex items-center justify-between gap-4">
                              <div className="flex items-center gap-4 flex-1">
                                <span className="font-semibold text-foreground text-base break-words">
                                  {format(stay.entryDate, "MMM d, yyyy")} → {format(stay.exitDate, "MMM d, yyyy")}
                                </span>
                                <span className="text-sm text-muted-foreground whitespace-nowrap">
                                  {duration} day(s)
                                </span>
                              </div>
                              <div className="flex gap-2 flex-shrink-0">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => editStay(stay)}
                                  className="shadow-sm hover:shadow-md transition-shadow text-sm h-9"
                                >
                                  <Pencil className="h-4 w-4 mr-1 flex-shrink-0" />
                                  <span>Edit</span>
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => deleteStay(stay.id)}
                                  className="text-destructive hover:bg-destructive hover:text-destructive-foreground shadow-sm hover:shadow-md transition-shadow text-sm h-9"
                                >
                                  <Trash2 className="h-4 w-4 mr-1 flex-shrink-0" />
                                  <span>Delete</span>
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          )}

          <Alert className="border-2 bg-muted/30 sm:mx-0">
            <Info className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground flex-shrink-0" />
            <AlertTitle className="font-semibold text-sm sm:text-base">Legal Disclaimer</AlertTitle>
            <AlertDescription className="text-xs sm:text-sm leading-relaxed">
              This calculator is provided for informational purposes only and should not be considered legal advice.
              Always verify your status with official immigration authorities. The Schengen 90/180 rule states that
              non-EU nationals can stay in the Schengen Area for up to 90 days within any 180-day period.
            </AlertDescription>
          </Alert>
        </div>
      </div>
    </div>
  )
}

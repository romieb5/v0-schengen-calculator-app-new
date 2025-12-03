"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
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

interface Stay {
  id: string
  entryDate: Date
  exitDate: Date
  stayType: "short" | "residence"
  countryCode?: string
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

  const calculateDaysUsed = (checkDate: Date): number => {
    const windowStart = subDays(checkDate, 179)
    let daysUsed = 0

    stays.forEach((stay) => {
      if (stay.stayType !== "short") return

      const effectiveEntry = isAfter(stay.entryDate, windowStart) ? stay.entryDate : windowStart
      const effectiveExit = isBefore(stay.exitDate, checkDate) ? stay.exitDate : checkDate

      if (isBefore(effectiveEntry, effectiveExit) || effectiveEntry.getTime() === effectiveExit.getTime()) {
        daysUsed += differenceInDays(effectiveExit, effectiveEntry) + 1
      }
    })

    return Math.min(daysUsed, 90)
  }

  const daysUsed = calculateDaysUsed(referenceDate)
  const daysRemaining = Math.max(90 - daysUsed, 0)
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
          entry: format(t.entryDate, "MMM dd, yyyy"),
          exit: format(t.exitDate, "MMM dd, yyyy"),
        })),
    )

    let maxDaysUsed = 0
    let daysUsedOnLastDay = 0
    let maxDaysUsedDate: Date | null = null
    let lastEligibleDate: Date | null = null

    for (let i = 0; i < duration; i++) {
      const currentDayOfTrip = addDays(tripEntry, i)
      const windowStartForDay = subDays(currentDayOfTrip, 179)
      let daysUsedForThisDay = 0

      stays.forEach((stay) => {
        if (stay.stayType !== "short") return

        const effectiveEntry = isAfter(stay.entryDate, windowStartForDay) ? stay.entryDate : windowStartForDay
        const effectiveExit = isBefore(stay.exitDate, currentDayOfTrip) ? stay.exitDate : currentDayOfTrip

        if (isBefore(effectiveEntry, effectiveExit) || effectiveEntry.getTime() === effectiveExit.getTime()) {
          const stayDays = differenceInDays(effectiveExit, effectiveEntry) + 1
          daysUsedForThisDay += stayDays
        }
      })

      const daysFromExistingStays = daysUsedForThisDay

      proposedTrips.forEach((otherTrip) => {
        if (currentTripId && otherTrip.id === currentTripId) return

        const otherTripStart = otherTrip.entryDate
        const otherTripEnd = otherTrip.exitDate

        const effectiveEntry = isAfter(otherTripStart, windowStartForDay) ? otherTripStart : windowStartForDay
        const effectiveExit = isBefore(otherTripEnd, currentDayOfTrip) ? otherTripEnd : currentDayOfTrip

        if (isBefore(effectiveEntry, effectiveExit) || effectiveEntry.getTime() === effectiveExit.getTime()) {
          const otherTripDays = differenceInDays(effectiveExit, effectiveEntry) + 1
          daysUsedForThisDay += otherTripDays
        }
      })

      const daysFromOtherProposedTrips = daysUsedForThisDay - daysFromExistingStays

      const proposedTripStart = isAfter(tripEntry, windowStartForDay) ? tripEntry : windowStartForDay
      const proposedTripEnd = currentDayOfTrip

      if (isBefore(proposedTripStart, proposedTripEnd) || proposedTripStart.getTime() === proposedTripEnd.getTime()) {
        const proposedDays = differenceInDays(proposedTripEnd, proposedTripStart) + 1
        daysUsedForThisDay += proposedDays
      }

      const daysFromCurrentTrip = daysUsedForThisDay - daysFromOtherProposedTrips - daysFromExistingStays

      if (daysUsedForThisDay > 85 || i === 0 || i === duration - 1) {
        console.log(`[v0] Day ${i + 1} (${format(currentDayOfTrip, "MMM dd, yyyy")}):`)
        console.log(
          `  Window: ${format(windowStartForDay, "MMM dd, yyyy")} to ${format(currentDayOfTrip, "MMM dd, yyyy")}`,
        )
        console.log(`  Days from existing stays: ${daysFromExistingStays}`)
        console.log(`  Days from other proposed trips: ${daysFromOtherProposedTrips}`)
        console.log(`  Days from current trip: ${daysFromCurrentTrip}`)
        console.log(`  Total days used: ${daysUsedForThisDay}/90`)
      }

      if (daysUsedForThisDay > maxDaysUsed) {
        maxDaysUsed = daysUsedForThisDay
        maxDaysUsedDate = currentDayOfTrip
      }

      if (daysUsedForThisDay <= 90 && (lastEligibleDate === null || isAfter(currentDayOfTrip, lastEligibleDate))) {
        lastEligibleDate = currentDayOfTrip
      }

      if (i === duration - 1) {
        daysUsedOnLastDay = daysUsedForThisDay
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

    const daysRemainingAfterTrip = 90 - daysUsedOnLastDay

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

  const proposedTripResults = proposedTrips.map((trip) => ({
    trip,
    result: checkProposedTrip(trip.entryDate, trip.exitDate, trip.id),
  }))

  const currentProposedResult =
    proposedEntry && proposedExit
      ? checkProposedTrip(proposedEntry, proposedExit, editingProposedId || undefined)
      : null

  const stayColors = [
    "bg-green-500",
    "bg-blue-500",
    "bg-yellow-500",
    "bg-purple-500",
    "bg-orange-500",
    "bg-cyan-500",
    "bg-pink-500",
    "bg-emerald-500",
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Edit Stay Dialog */}
        <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl">Edit Stay</DialogTitle>
              <DialogDescription>Update the details of your recorded stay</DialogDescription>
            </DialogHeader>
            <div className="space-y-6 py-4">
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
                />

                {editDialogEntry && editDialogExit && (
                  <div className="flex items-center justify-end gap-6 text-sm bg-muted/50 rounded-lg px-4 py-3">
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

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Stay Type</Label>
                  <Select
                    value={editDialogStayType}
                    onValueChange={(v) => setEditDialogStayType(v as "short" | "residence")}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="short">Short Stay</SelectItem>
                      <SelectItem value="residence">Residence Permit</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Country Code (Optional)</Label>
                  <Input
                    placeholder="e.g., FR, DE, ES"
                    value={editDialogCountryCode}
                    onChange={(e) => setEditDialogCountryCode(e.target.value.toUpperCase())}
                    maxLength={2}
                  />
                </div>
              </div>

              <div className="flex gap-3 justify-end pt-4">
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
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl">Edit Proposed Trip</DialogTitle>
              <DialogDescription>Update the dates of your proposed trip</DialogDescription>
            </DialogHeader>
            <div className="space-y-6 py-4">
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
                />

                {editProposedDialogEntry && editProposedDialogExit && (
                  <div className="flex items-center justify-end gap-6 text-sm bg-muted/50 rounded-lg px-4 py-3">
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

              <div className="flex gap-3 justify-end pt-4">
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

        <div className="mb-12 text-center space-y-3">
          <h1 className="text-5xl font-bold text-foreground tracking-tight">Schengen Visit Calculator</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            Track your stays and ensure compliance with Schengen visa rules
          </p>
        </div>

        <div className="space-y-8">
          <Card className="border-2 shadow-lg">
            <CardHeader className="pb-6">
              <CardTitle className="text-2xl">{editingId ? "Edit Stay" : "Add Stay"}</CardTitle>
              <CardDescription className="text-base">Record your Schengen area visits</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
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
                />

                {entryDate && exitDate && (
                  <div className="flex flex-wrap items-center justify-end gap-4 lg:gap-6 text-sm bg-muted/50 rounded-lg px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-foreground">Entry:</span>
                      <span className="text-muted-foreground">{format(entryDate, "MMM d, yyyy")}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-foreground">Exit:</span>
                      <span className="text-muted-foreground">{format(exitDate, "MMM d, yyyy")}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-foreground">Duration:</span>
                      <span className="font-semibold text-primary">
                        {differenceInDays(exitDate, entryDate) + 1} day(s)
                      </span>
                    </div>
                  </div>
                )}
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <div className="space-y-2">
                  <Label>Stay Type</Label>
                  <Select value={stayType} onValueChange={(v) => setStayType(v as "short" | "residence")}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="short">Short Stay</SelectItem>
                      <SelectItem value="residence">Residence Permit</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Country Code (Optional)</Label>
                  <Input
                    placeholder="e.g., FR, DE, ES"
                    value={countryCode}
                    onChange={(e) => setCountryCode(e.target.value.toUpperCase())}
                    maxLength={2}
                  />
                </div>

                <div className="space-y-2 flex flex-col items-end">
                  <Label className="invisible">Action</Label>
                  <Button
                    onClick={addOrUpdateStay}
                    className="w-full h-11 font-semibold shadow-md hover:shadow-lg transition-shadow"
                    disabled={!entryDate || !exitDate}
                  >
                    {editingId ? "Update Stay" : "Add Stay"}
                  </Button>
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
                      className="w-full mt-2"
                    >
                      Cancel Edit
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-8 lg:grid-cols-2">
            <Card className="border-2 shadow-lg">
              <CardHeader className="pb-6">
                <CardTitle className="text-2xl flex items-center gap-2">
                  <Info className="h-5 w-5 text-primary" />
                  Current Status
                </CardTitle>
                <CardDescription className="text-base">
                  180-day window: {format(windowStart, "PP")} to {format(referenceDate, "PP")}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <div className="flex justify-between items-baseline">
                    <span className="text-sm font-semibold text-foreground">Days Used</span>
                    <span
                      className={cn(
                        "text-2xl font-bold tabular-nums",
                        isOverstay ? "text-destructive" : daysRemaining <= 10 ? "text-warning" : "text-success",
                      )}
                    >
                      {daysUsed} <span className="text-base text-muted-foreground">/ 90</span>
                    </span>
                  </div>
                  <div className="relative">
                    <Progress
                      value={(daysUsed / 90) * 100}
                      className={cn(
                        "h-4 shadow-inner",
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
                  <Alert variant="destructive" className="border-2">
                    <AlertTriangle className="h-5 w-5" />
                    <AlertTitle className="font-bold">Overstay Warning</AlertTitle>
                    <AlertDescription className="font-medium">
                      You have exceeded the 90-day limit by {daysUsed - 90} day(s)
                    </AlertDescription>
                  </Alert>
                ) : daysRemaining <= 10 ? (
                  <Alert className="border-2 border-warning bg-warning/10">
                    <AlertCircle className="h-5 w-5 text-warning" />
                    <AlertTitle className="font-bold text-foreground">Caution</AlertTitle>
                    <AlertDescription className="text-foreground font-medium">
                      Only {daysRemaining} day(s) remaining in your 180-day window
                    </AlertDescription>
                  </Alert>
                ) : (
                  <Alert className="border-2 border-success bg-success/10">
                    <CheckCircle2 className="h-5 w-5 text-success" />
                    <AlertTitle className="font-bold text-foreground">Compliant</AlertTitle>
                    <AlertDescription className="text-foreground font-medium">
                      You have {daysRemaining} day(s) remaining
                    </AlertDescription>
                  </Alert>
                )}

                <div className="pt-6 border-t space-y-3">
                  <Label className="text-base font-semibold">Reference Date</Label>
                  <p className="text-sm text-muted-foreground">
                    Change this date to adjust the 180-day window and see your status at different points in time.
                  </p>
                  <Popover open={referencePopoverOpen} onOpenChange={setReferencePopoverOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal h-11 shadow-sm hover:shadow-md transition-shadow bg-transparent"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4 text-primary" />
                        {format(referenceDate, "PPP")}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent
                      className="w-auto p-0"
                      align="start"
                      side="bottom"
                      sideOffset={4}
                      avoidCollisions={false}
                    >
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
              <CardHeader className="pb-6">
                <CardTitle className="text-2xl flex items-center gap-2 text-primary">
                  <CheckCircle2 className="h-5 w-5" />
                  Check Proposed Trip
                </CardTitle>
                <CardDescription className="text-base">Verify if a future trip would be legal</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="proposed-entry">Proposed Entry Date</Label>
                    <Popover open={proposedEntryPopoverOpen} onOpenChange={setProposedEntryPopoverOpen}>
                      <PopoverTrigger asChild>
                        <Button
                          id="proposed-entry"
                          variant="outline"
                          className="w-full justify-start text-left font-normal h-11 shadow-sm hover:shadow-md transition-shadow bg-transparent"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4 text-primary" />
                          {proposedEntry ? format(proposedEntry, "PPP") : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent
                        className="w-auto p-0"
                        align="start"
                        side="bottom"
                        sideOffset={4}
                        avoidCollisions={false}
                      >
                        <Calendar
                          mode="single"
                          selected={proposedEntry}
                          onSelect={(date) => {
                            setProposedEntry(date)
                            setProposedEntryPopoverOpen(false)
                          }}
                          defaultMonth={proposedEntry}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="proposed-exit">Proposed Exit Date</Label>
                    <Popover open={proposedExitPopoverOpen} onOpenChange={setProposedExitPopoverOpen}>
                      <PopoverTrigger asChild>
                        <Button
                          id="proposed-exit"
                          variant="outline"
                          className="w-full justify-start text-left font-normal h-11 shadow-sm hover:shadow-md transition-shadow bg-transparent"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4 text-primary" />
                          {proposedExit ? format(proposedExit, "PPP") : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent
                        className="w-auto p-0"
                        align="start"
                        side="bottom"
                        sideOffset={4}
                        avoidCollisions={false}
                      >
                        <Calendar
                          mode="single"
                          selected={proposedExit}
                          onSelect={(date) => {
                            setProposedExit(date)
                            setProposedExitPopoverOpen(false)
                          }}
                          defaultMonth={proposedExit}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>

                <Button
                  onClick={addProposedTrip}
                  disabled={!proposedEntry || !proposedExit}
                  className="w-full h-11 font-semibold shadow-md hover:shadow-lg transition-shadow"
                >
                  <PlusCircle className="mr-2 h-4 w-4" />
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
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex-1 min-w-0 space-y-1">
                              <div className="flex items-center gap-2">
                                {result.isLegal ? (
                                  <CheckCircle2 className="h-4 w-4 text-success flex-shrink-0" />
                                ) : (
                                  <AlertTriangle className="h-4 w-4 text-destructive flex-shrink-0" />
                                )}
                                <div className="text-sm font-medium truncate">
                                  {format(trip.entryDate, "MMM d, yyyy")} → {format(trip.exitDate, "MMM d, yyyy")}
                                </div>
                              </div>
                              <div
                                className={cn(
                                  "text-xs font-medium pl-6 space-y-1",
                                  result.isLegal ? "text-success" : "text-destructive",
                                )}
                              >
                                {result.message.split(". ").map((sentence, idx) => (
                                  <div key={idx}>
                                    {sentence}
                                    {idx < result.message.split(". ").length - 1 ? "." : ""}
                                  </div>
                                ))}
                              </div>
                            </div>
                            <div className="flex gap-1 flex-shrink-0">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => editProposedTrip(trip.id)}
                                className="h-8 w-8 p-0"
                              >
                                <Pencil className="h-3.5 w-3.5" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => deleteProposedTrip(trip.id)}
                                className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                              </Button>
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
              <CardHeader className="pb-6">
                <CardTitle className="text-2xl">Timeline Visualization</CardTitle>
                <CardDescription className="text-base">
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
              <CardHeader className="pb-6">
                <CardTitle className="text-2xl">Recorded Stays</CardTitle>
                <CardDescription className="text-base">
                  {stays.length} stay{stays.length !== 1 ? "s" : ""} recorded
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {stays.map((stay, index) => (
                    <div
                      key={stay.id}
                      className="flex items-center justify-between p-4 rounded-lg border-2 bg-card hover:bg-accent/50 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={`flex-shrink-0 w-8 h-8 rounded-full ${stayColors[index % stayColors.length]} text-white flex items-center justify-center font-bold text-sm shadow-sm`}
                        >
                          {index + 1}
                        </div>
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center gap-3">
                            <span className="font-semibold text-foreground">
                              {format(stay.entryDate, "MMM d, yyyy")} → {format(stay.exitDate, "MMM d, yyyy")}
                            </span>
                            <span
                              className={cn(
                                "px-3 py-1 rounded-full text-xs font-semibold",
                                stay.stayType === "short"
                                  ? "bg-primary/10 text-primary"
                                  : "bg-secondary text-secondary-foreground",
                              )}
                            >
                              {stay.stayType === "short" ? "Short Stay" : "Residence"}
                            </span>
                            {stay.countryCode && (
                              <span className="px-2 py-1 rounded bg-muted text-xs font-medium">{stay.countryCode}</span>
                            )}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {differenceInDays(stay.exitDate, stay.entryDate) + 1} day(s)
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => editStay(stay)}
                          className="shadow-sm hover:shadow-md transition-shadow"
                        >
                          <Pencil className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => deleteStay(stay.id)}
                          className="text-destructive hover:bg-destructive hover:text-destructive-foreground shadow-sm hover:shadow-md transition-shadow"
                        >
                          <Trash2 className="h-4 w-4 mr-1" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          <Alert className="border-2 bg-muted/30">
            <Info className="h-5 w-5 text-muted-foreground" />
            <AlertTitle className="font-semibold">Legal Disclaimer</AlertTitle>
            <AlertDescription className="text-sm leading-relaxed">
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

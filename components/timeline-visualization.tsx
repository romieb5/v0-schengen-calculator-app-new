"use client"

import { useState } from "react"
import { format, startOfDay, endOfDay, differenceInDays, addDays, subDays, min, max, isAfter, isBefore } from "date-fns"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

interface Stay {
  id: string
  entryDate: Date
  exitDate: Date
  stayType: "short" | "residence"
  countryCode?: string
}

interface ProposedTrip {
  id: string
  entryDate: Date
  exitDate: Date
}

interface TimelineVisualizationProps {
  stays: Stay[]
  proposedTrips: ProposedTrip[]
  referenceDate: Date
}

export function TimelineVisualization({ stays, proposedTrips, referenceDate }: TimelineVisualizationProps) {
  const [showProposedTrips, setShowProposedTrips] = useState(true)

  const visibleProposedTrips = showProposedTrips ? proposedTrips : []

  // Calculate the timeline range
  const allDates = [
    ...stays.flatMap((s) => [s.entryDate, s.exitDate]),
    ...visibleProposedTrips.flatMap((p) => [p.entryDate, p.exitDate]),
    referenceDate,
  ]

  if (allDates.length === 0) {
    return <div className="text-center py-12 text-muted-foreground">No stays or proposed trips to visualize</div>
  }

  const timelineStart = startOfDay(min(allDates))
  const latestProposedDate =
    visibleProposedTrips.length > 0 ? max(visibleProposedTrips.map((p) => p.exitDate)) : referenceDate
  const timelineEnd = endOfDay(max([...allDates, latestProposedDate]))

  const totalDays = differenceInDays(timelineEnd, timelineStart) + 1

  // Calculate 180-day window (ending at the most recent proposed trip date or reference date)
  const windowStartForEndDate = subDays(latestProposedDate, 179)
  let daysUsedOnWindowEnd = 0

  let maxDaysUsed = 0
  let firstNoncompliantTripMaxDays = 0
  let hasNoncompliantTrip = false

  // Check each proposed trip for noncompliance and find the first one
  for (const trip of visibleProposedTrips) {
    let tripMaxDays = 0

    // Check each day of this trip to find maximum days used
    for (let currentDate = trip.entryDate; currentDate <= trip.exitDate; currentDate = addDays(currentDate, 1)) {
      const windowStartForDay = subDays(currentDate, 179)
      let daysUsedOnDay = 0

      // Count existing short stays within this day's 180-day window
      stays.forEach((stay) => {
        if (stay.stayType !== "short") return
        const effectiveEntry = isAfter(stay.entryDate, windowStartForDay) ? stay.entryDate : windowStartForDay
        const effectiveExit = isBefore(stay.exitDate, currentDate) ? stay.exitDate : currentDate
        if (isBefore(effectiveEntry, effectiveExit) || effectiveEntry.getTime() === effectiveExit.getTime()) {
          const stayDays = differenceInDays(effectiveExit, effectiveEntry) + 1
          daysUsedOnDay += stayDays
        }
      })

      // Count days from ALL proposed trips within this day's 180-day window
      visibleProposedTrips.forEach((otherTrip) => {
        const tripEffectiveEntry = isAfter(otherTrip.entryDate, windowStartForDay)
          ? otherTrip.entryDate
          : windowStartForDay
        const tripEffectiveExit = isBefore(otherTrip.exitDate, currentDate) ? otherTrip.exitDate : currentDate
        if (
          isBefore(tripEffectiveEntry, tripEffectiveExit) ||
          tripEffectiveEntry.getTime() === tripEffectiveExit.getTime()
        ) {
          const tripDays = differenceInDays(tripEffectiveExit, tripEffectiveEntry) + 1
          daysUsedOnDay += tripDays
        }
      })

      tripMaxDays = Math.max(tripMaxDays, daysUsedOnDay)
    }

    // If this trip is noncompliant and it's the first one we've found
    if (tripMaxDays > 90 && !hasNoncompliantTrip) {
      firstNoncompliantTripMaxDays = tripMaxDays
      hasNoncompliantTrip = true
      break // Stop at first noncompliant trip
    }
  }

  // If there's a noncompliant trip, use its max days; otherwise calculate for the end date
  if (hasNoncompliantTrip) {
    maxDaysUsed = firstNoncompliantTripMaxDays
  } else {
    // Count existing short stays within the 180-day window ending on windowEnd
    stays.forEach((stay) => {
      if (stay.stayType !== "short") return
      const effectiveEntry = isAfter(stay.entryDate, windowStartForEndDate) ? stay.entryDate : windowStartForEndDate
      const effectiveExit = isBefore(stay.exitDate, latestProposedDate) ? stay.exitDate : latestProposedDate
      if (isBefore(effectiveEntry, effectiveExit) || effectiveEntry.getTime() === effectiveExit.getTime()) {
        const stayDays = differenceInDays(effectiveExit, effectiveEntry) + 1
        daysUsedOnWindowEnd += stayDays
      }
    })

    // Count days from ALL proposed trips within the 180-day window ending on windowEnd
    visibleProposedTrips.forEach((trip) => {
      const tripEffectiveEntry = isAfter(trip.entryDate, windowStartForEndDate) ? trip.entryDate : windowStartForEndDate
      const tripEffectiveExit = isBefore(trip.exitDate, latestProposedDate) ? trip.exitDate : latestProposedDate
      if (
        isBefore(tripEffectiveEntry, tripEffectiveExit) ||
        tripEffectiveEntry.getTime() === tripEffectiveExit.getTime()
      ) {
        const tripDays = differenceInDays(tripEffectiveExit, tripEffectiveEntry) + 1
        daysUsedOnWindowEnd += tripDays
      }
    })

    maxDaysUsed = daysUsedOnWindowEnd
  }

  const findLastLegalDate = () => {
    if (visibleProposedTrips.length === 0) return latestProposedDate

    // Check each day from the earliest trip to the latest
    const earliestProposedDate = min(visibleProposedTrips.map((p) => p.entryDate))
    let lastLegalDate = latestProposedDate
    let foundExcess = false

    // Iterate through each day from earliest to latest proposed trip date
    for (
      let currentDate = earliestProposedDate;
      currentDate <= latestProposedDate;
      currentDate = addDays(currentDate, 1)
    ) {
      const windowStartForDay = subDays(currentDate, 179)
      let daysUsedOnDay = 0

      // Count existing short stays within this day's 180-day window
      stays.forEach((stay) => {
        if (stay.stayType !== "short") return

        const effectiveEntry = isAfter(stay.entryDate, windowStartForDay) ? stay.entryDate : windowStartForDay
        const effectiveExit = isBefore(stay.exitDate, currentDate) ? stay.exitDate : currentDate

        if (isBefore(effectiveEntry, effectiveExit) || effectiveEntry.getTime() === effectiveExit.getTime()) {
          const stayDays = differenceInDays(effectiveExit, effectiveEntry) + 1
          daysUsedOnDay += stayDays
        }
      })

      // Count days from ALL proposed trips within this day's 180-day window
      visibleProposedTrips.forEach((trip) => {
        const tripEffectiveEntry = isAfter(trip.entryDate, windowStartForDay) ? trip.entryDate : windowStartForDay
        const tripEffectiveExit = isBefore(trip.exitDate, currentDate) ? trip.exitDate : currentDate

        if (
          isBefore(tripEffectiveEntry, tripEffectiveExit) ||
          tripEffectiveEntry.getTime() === tripEffectiveExit.getTime()
        ) {
          const tripDays = differenceInDays(tripEffectiveExit, tripEffectiveEntry) + 1
          daysUsedOnDay += tripDays
        }
      })

      // If this day exceeds the limit, record the previous day as the last legal date
      if (daysUsedOnDay > 90 && !foundExcess) {
        lastLegalDate = subDays(currentDate, 1)
        foundExcess = true
        break
      }
    }

    return lastLegalDate
  }

  const lastLegalDate = findLastLegalDate()
  const hasExcess = lastLegalDate < latestProposedDate

  const windowEnd = hasExcess ? lastLegalDate : latestProposedDate
  const windowStart = subDays(windowEnd, 179) // 180 days including end date

  const daysLeft = 90 - maxDaysUsed

  // Helper to convert date to position percentage
  const dateToPosition = (date: Date) => {
    const daysSinceStart = differenceInDays(date, timelineStart)
    return (daysSinceStart / totalDays) * 100
  }

  const generateMonthMarkers = () => {
    const markers = []
    let currentMarker = new Date(timelineStart.getFullYear(), timelineStart.getMonth(), 1)

    while (currentMarker <= timelineEnd) {
      if (currentMarker >= timelineStart) {
        markers.push(currentMarker)
      }
      currentMarker = new Date(currentMarker.getFullYear(), currentMarker.getMonth() + 1, 1)
    }

    return markers
  }

  const monthMarkers = generateMonthMarkers()

  // Colors for stays and trips
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

  const proposedTripColor = "bg-red-400 border-2 border-red-600 border-dashed"

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Schengen Rolling 180-Day Window</h3>
        <div className="flex items-center gap-3">
          {proposedTrips.length > 0 && (
            <div className="flex items-center gap-2">
              <Switch id="show-proposed" checked={showProposedTrips} onCheckedChange={setShowProposedTrips} />
              <Label htmlFor="show-proposed" className="text-sm font-medium cursor-pointer">
                Show Proposed Trips
              </Label>
            </div>
          )}
          <div
            className={`text-sm font-semibold px-3 py-1 rounded ${
              maxDaysUsed > 90 ? "bg-destructive/10 text-destructive" : "bg-primary/10 text-primary"
            }`}
          >
            {maxDaysUsed} days used, {daysLeft} days left
          </div>
        </div>
      </div>

      {/* Timeline visualization */}
      <div className="relative bg-card border rounded-lg p-6 overflow-x-auto">
        {/* Timeline container */}
        <div className="relative min-w-[800px]" style={{ height: "240px" }}>
          <div className="absolute bottom-0 left-0 right-0 h-px bg-border" />
          {monthMarkers.map((marker) => {
            const pos = dateToPosition(marker)
            return (
              <div key={marker.toISOString()} className="absolute bottom-0" style={{ left: `${pos}%` }}>
                <div className="w-px h-3 bg-border" />
                <div className="absolute top-4 left-1/2 -translate-x-1/2 text-xs text-muted-foreground whitespace-nowrap">
                  {format(marker, "MMM yyyy")}
                </div>
              </div>
            )
          })}

          {/* 180-day window overlay */}
          <div
            className="absolute bottom-8 bg-primary/5 pointer-events-none"
            style={{
              left: `${dateToPosition(windowStart)}%`,
              width: `${dateToPosition(windowEnd) - dateToPosition(windowStart)}%`,
              height: "calc(100% - 3rem)",
            }}
          >
            <div className="absolute -top-6 left-2 text-xs font-medium text-primary">180-day window</div>
          </div>

          {/* Recorded stays */}
          {stays.map((stay, index) => {
            const left = dateToPosition(stay.entryDate)
            const width = dateToPosition(stay.exitDate) - left
            const color = stayColors[index % stayColors.length]
            const duration = differenceInDays(stay.exitDate, stay.entryDate) + 1

            return (
              <div key={stay.id} className="absolute" style={{ left: `${left}%`, width: `${width}%`, bottom: "3rem" }}>
                {/* Bar */}
                <div
                  className={`h-20 ${color} rounded opacity-90 hover:opacity-100 transition-opacity cursor-pointer shadow-sm`}
                  title={`Stay ${index + 1}: ${format(stay.entryDate, "MMM d, yyyy")} - ${format(stay.exitDate, "MMM d, yyyy")} (${duration} days)`}
                />
              </div>
            )
          })}

          {visibleProposedTrips.map((trip, index) => {
            const left = dateToPosition(trip.entryDate)
            const width = dateToPosition(trip.exitDate) - left
            const duration = differenceInDays(trip.exitDate, trip.entryDate) + 1

            return (
              <div key={trip.id} className="absolute" style={{ left: `${left}%`, width: `${width}%`, bottom: "3rem" }}>
                {/* Bar */}
                <div
                  className={`h-20 ${proposedTripColor} rounded opacity-90 hover:opacity-100 transition-opacity cursor-pointer shadow-sm`}
                  title={`Proposed Trip ${index + 1}: ${format(trip.entryDate, "MMM d, yyyy")} - ${format(trip.exitDate, "MMM d, yyyy")} (${duration} days)`}
                />
              </div>
            )
          })}

          {/* Window markers with dates */}
          <div
            className="absolute bottom-8 w-0.5 bg-primary pointer-events-none"
            style={{ left: `${dateToPosition(windowStart)}%`, height: "calc(100% - 3rem)" }}
          >
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs font-medium whitespace-nowrap bg-background px-1">
              {format(windowStart, "MMM d, yyyy")}
            </div>
          </div>
          <div
            className="absolute bottom-8 w-0.5 bg-primary pointer-events-none"
            style={{ left: `${dateToPosition(windowEnd)}%`, height: "calc(100% - 3rem)" }}
          >
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs font-medium whitespace-nowrap bg-background px-1">
              {format(windowEnd, "MMM d, yyyy")}
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-4 justify-center text-sm mt-8 pt-4 border-t">
          {stays.map((stay, index) => (
            <div key={stay.id} className="flex items-center gap-2">
              <div className={`w-4 h-4 ${stayColors[index % stayColors.length]} rounded`} />
              <span>Stay {index + 1}</span>
            </div>
          ))}
          {visibleProposedTrips.map((trip, index) => (
            <div key={trip.id} className="flex items-center gap-2">
              <div className={`w-4 h-4 ${proposedTripColor} rounded`} />
              <span className="text-red-600">Proposed {index + 1}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

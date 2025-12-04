"use client"

import { useState, useEffect } from "react"
import {
  format,
  startOfDay,
  endOfDay,
  differenceInDays,
  differenceInMonths,
  addDays,
  subDays,
  subMonths,
  addMonths,
  min,
  max,
  isAfter,
  isBefore,
} from "date-fns"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { calculateDaysUsedForDate } from "@/lib/schengen-calculations"

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
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const visibleProposedTrips = showProposedTrips ? proposedTrips : []

  const allDates = [
    ...stays.flatMap((s) => [s.entryDate, s.exitDate]),
    ...visibleProposedTrips.flatMap((p) => [p.entryDate, p.exitDate]),
    referenceDate,
  ]

  if (allDates.length === 0) {
    return <div className="text-center py-12 text-muted-foreground">No stays or proposed trips to visualize</div>
  }

  const latestProposedDate2 =
    visibleProposedTrips.length > 0 ? max(visibleProposedTrips.map((p) => p.exitDate)) : referenceDate
  const windowEnd = latestProposedDate2
  const windowStart = subDays(windowEnd, 179) // 180 days including end date

  const earliestDate = min(allDates)
  const calculatedTimelineStart = startOfDay(earliestDate)
  const minTimelineStart = subMonths(windowEnd, 7)
  const timelineStart = calculatedTimelineStart < minTimelineStart ? calculatedTimelineStart : minTimelineStart

  const timelineEnd = endOfDay(max([...allDates, latestProposedDate2]))

  const monthsInTimeline = differenceInMonths(timelineEnd, timelineStart) + 1
  const adjustedTimelineEnd = monthsInTimeline < 7 ? addMonths(timelineStart, 7) : timelineEnd

  const totalDays = differenceInDays(adjustedTimelineEnd, timelineStart) + 1

  const findLastLegalDate = () => {
    if (visibleProposedTrips.length === 0) return latestProposedDate2

    const earliestProposedDate = min(visibleProposedTrips.map((p) => p.entryDate))
    let lastLegalDate = latestProposedDate2
    let foundExcess = false

    for (
      let currentDate = earliestProposedDate;
      currentDate <= latestProposedDate2;
      currentDate = addDays(currentDate, 1)
    ) {
      const windowStartForDay = subDays(currentDate, 179)
      let daysUsedOnDay = 0

      stays.forEach((stay) => {
        if (stay.stayType !== "short") return

        const effectiveEntry = isAfter(stay.entryDate, windowStartForDay) ? stay.entryDate : windowStartForDay
        const effectiveExit = isBefore(stay.exitDate, currentDate) ? stay.exitDate : currentDate

        if (isBefore(effectiveEntry, effectiveExit) || effectiveEntry.getTime() === effectiveExit.getTime()) {
          const stayDays = differenceInDays(effectiveExit, effectiveEntry) + 1
          daysUsedOnDay += stayDays
        }
      })

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

      if (daysUsedOnDay > 90 && !foundExcess) {
        lastLegalDate = subDays(currentDate, 1)
        foundExcess = true
        break
      }
    }

    return lastLegalDate
  }

  const lastLegalDate = findLastLegalDate()
  const hasExcess = lastLegalDate < latestProposedDate2

  const visibleProposedForCalculation = showProposedTrips ? visibleProposedTrips : []
  const { daysUsed, daysLeft } = calculateDaysUsedForDate(windowEnd, stays, visibleProposedForCalculation)

  const dateToPosition = (date: Date) => {
    const daysSinceStart = differenceInDays(date, timelineStart)
    return (daysSinceStart / totalDays) * 100
  }

  const generateMonthMarkers = () => {
    const markers = []
    let currentMarker = new Date(timelineStart.getFullYear(), timelineStart.getMonth(), 1)

    while (currentMarker <= adjustedTimelineEnd) {
      if (currentMarker >= timelineStart) {
        markers.push(currentMarker)
      }
      currentMarker = new Date(currentMarker.getFullYear(), currentMarker.getMonth() + 1, 1)
    }

    return markers
  }

  const monthMarkers = generateMonthMarkers()

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

  const proposedTripColor = "bg-red-400 border-2 border-red-600 border-dashed"

  if (isMobile) {
    return (
      <div className="space-y-4">
        <div className="flex flex-col items-start gap-3">
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
              daysLeft < 0 ? "bg-destructive/10 text-destructive" : "bg-primary/10 text-primary"
            }`}
          >
            {daysUsed} days used, {daysLeft} days left
          </div>
          {proposedTrips.length > 0 && showProposedTrips && (
            <div className="flex flex-col gap-1">
              <div className="text-xs text-muted-foreground italic">Dashed red bars represent proposed trips.</div>
              <div className="text-xs text-muted-foreground italic">
                Note: Reference date changes to the last date of proposed trip(s).
              </div>
            </div>
          )}
        </div>

        <div className="relative bg-card border rounded-lg p-4 py-8 overflow-y-auto max-h-[600px]">
          <div className="relative" style={{ height: `${totalDays * 4}px`, paddingLeft: "80px" }}>
            <div className="absolute left-[80px] top-0 bottom-0 w-px bg-border" />

            {monthMarkers.map((marker) => {
              const daysSinceStart = differenceInDays(marker, timelineStart)
              const top = (daysSinceStart / totalDays) * 100
              return (
                <div key={marker.toISOString()} className="absolute left-0" style={{ top: `${top}%`, width: "80px" }}>
                  <div className="text-xs text-muted-foreground text-right pr-2 whitespace-nowrap">
                    {format(marker, "MMM yyyy")}
                  </div>
                  <div className="absolute right-0 top-1/2 w-3 h-px bg-border" />
                </div>
              )
            })}

            <div
              className="absolute left-0 bg-primary/5 pointer-events-none"
              style={{
                top: `${(differenceInDays(windowStart, timelineStart) / totalDays) * 100}%`,
                height: `${(180 / totalDays) * 100}%`,
                width: "calc(100% - 80px)",
                marginLeft: "80px",
              }}
            />

            {stays.map((stay, index) => {
              const top = (differenceInDays(stay.entryDate, timelineStart) / totalDays) * 100
              const height = ((differenceInDays(stay.exitDate, stay.entryDate) + 1) / totalDays) * 100
              const color = stayColors[index % stayColors.length]
              const duration = differenceInDays(stay.exitDate, stay.entryDate) + 1

              return (
                <div
                  key={stay.id}
                  className="absolute"
                  style={{
                    top: `${top}%`,
                    height: `${height}%`,
                    left: "90px",
                    right: "10px",
                  }}
                >
                  <div
                    className={`h-full ${color} rounded opacity-90 hover:opacity-100 transition-opacity cursor-pointer shadow-sm`}
                    title={`Stay ${index + 1}: ${format(stay.entryDate, "MMM d, yyyy")} - ${format(stay.exitDate, "MMM d, yyyy")} (${duration} days)`}
                  />
                </div>
              )
            })}

            {visibleProposedTrips.map((trip, index) => {
              const top = (differenceInDays(trip.entryDate, timelineStart) / totalDays) * 100
              const height = ((differenceInDays(trip.exitDate, trip.entryDate) + 1) / totalDays) * 100
              const duration = differenceInDays(trip.exitDate, trip.entryDate) + 1

              return (
                <div
                  key={trip.id}
                  className="absolute"
                  style={{
                    top: `${top}%`,
                    height: `${height}%`,
                    left: "90px",
                    right: "10px",
                  }}
                >
                  <div
                    className={`h-full ${proposedTripColor} rounded opacity-90 hover:opacity-100 transition-opacity cursor-pointer shadow-sm`}
                    title={`Proposed Trip ${index + 1}: ${format(trip.entryDate, "MMM d, yyyy")} - ${format(trip.exitDate, "MMM d, yyyy")} (${duration} days)`}
                  />
                </div>
              )
            })}

            <div
              className="absolute left-0 pointer-events-none z-10"
              style={{
                top: `${(differenceInDays(windowStart, timelineStart) / totalDays) * 100}%`,
                marginLeft: "80px",
              }}
            >
              <div className="text-xs font-medium text-primary bg-background/80 px-1 rounded">180-day window</div>
            </div>

            <div
              className="absolute left-0 h-0.5 bg-primary pointer-events-none"
              style={{
                top: `${(differenceInDays(windowStart, timelineStart) / totalDays) * 100}%`,
                width: "calc(100% - 80px)",
                marginLeft: "80px",
              }}
            >
              <div className="absolute left-4 -top-5 text-xs font-semibold whitespace-nowrap bg-background px-2 py-1 rounded border border-primary/20">
                {format(windowStart, "MMM d, yyyy")}
              </div>
            </div>
            <div
              className="absolute left-0 h-0.5 bg-primary pointer-events-none"
              style={{
                top: `${(differenceInDays(windowEnd, timelineStart) / totalDays) * 100}%`,
                width: "calc(100% - 80px)",
                marginLeft: "80px",
              }}
            >
              <div className="absolute left-4 -bottom-5 text-xs font-semibold whitespace-nowrap bg-background px-2 py-1 rounded border border-primary/20">
                {format(windowEnd, "MMM d, yyyy")}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
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
              daysLeft < 0 ? "bg-destructive/10 text-destructive" : "bg-primary/10 text-primary"
            }`}
          >
            {daysUsed} days used, {daysLeft} days left
          </div>
        </div>
        <div className="flex flex-col items-end gap-1">
          {proposedTrips.length > 0 && showProposedTrips && (
            <>
              <div className="text-xs text-muted-foreground italic">Dashed red bars represent proposed trips.</div>
              <div className="text-xs text-muted-foreground italic">
                Note: Reference date changes to the last date of proposed trip(s).
              </div>
            </>
          )}
        </div>
      </div>

      <div className="relative bg-card border rounded-lg p-4 sm:p-6 overflow-x-auto">
        <div className="relative pl-32 pr-4" style={{ minWidth: "500px", height: "160px" }}>
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

          <div
            className="absolute bottom-4 bg-primary/5 pointer-events-none z-0"
            style={{
              left: `${dateToPosition(windowStart)}%`,
              width: `${dateToPosition(windowEnd) - dateToPosition(windowStart)}%`,
              height: "calc(100% - 2rem)",
            }}
          >
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-medium text-primary">
              180-day window
            </div>
          </div>

          {stays.map((stay, index) => {
            const duration = differenceInDays(stay.exitDate, stay.entryDate) + 1
            const startPos = dateToPosition(stay.entryDate)
            const endPos = dateToPosition(stay.exitDate)
            const stayColor = stayColors[index % stayColors.length]

            return (
              <div
                key={index}
                className="absolute"
                style={{
                  left: `${startPos}%`,
                  width: `${endPos - startPos}%`,
                  bottom: "1rem",
                }}
              >
                <div
                  className={`h-20 ${stayColor} rounded shadow-md relative group cursor-pointer`}
                  title={`Stay ${index + 1}: ${format(stay.entryDate, "MMM d, yyyy")} - ${format(stay.exitDate, "MMM d, yyyy")} (${duration} days)`}
                />
              </div>
            )
          })}

          {visibleProposedTrips.map((trip, index) => {
            const duration = differenceInDays(trip.exitDate, trip.entryDate) + 1
            const startPos = dateToPosition(trip.entryDate)
            const endPos = dateToPosition(trip.exitDate)
            const proposedTripColor = "bg-red-400 border-2 border-red-600 border-dashed"

            return (
              <div
                key={index}
                className="absolute"
                style={{
                  left: `${startPos}%`,
                  width: `${endPos - startPos}%`,
                  bottom: "1rem",
                }}
              >
                <div
                  className={`h-20 ${proposedTripColor} rounded opacity-90 hover:opacity-100 transition-opacity cursor-pointer shadow-sm`}
                  title={`Proposed Trip ${index + 1}: ${format(trip.entryDate, "MMM d, yyyy")} - ${format(trip.exitDate, "MMM d, yyyy")} (${duration} days)`}
                />
              </div>
            )
          })}

          <div
            className="absolute bottom-4 w-0.5 bg-primary pointer-events-none"
            style={{ left: `${dateToPosition(windowStart)}%`, height: "calc(100% - 2rem)" }}
          >
            <div className="absolute -top-6 left-0 text-xs font-semibold whitespace-nowrap text-primary px-2 py-1 bg-background border border-primary/20 rounded shadow-sm z-20">
              {format(windowStart, "MMM d, yyyy")}
            </div>
          </div>
          <div
            className="absolute bottom-4 w-0.5 bg-primary pointer-events-none"
            style={{ left: `${dateToPosition(windowEnd)}%`, height: "calc(100% - 2rem)" }}
          >
            <div className="absolute -top-6 right-0 text-xs font-semibold whitespace-nowrap text-primary px-2 py-1 bg-background border border-primary/20 rounded shadow-sm z-20">
              {format(windowEnd, "MMM d, yyyy")}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

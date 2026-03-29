"use client"

import { useState, useEffect, useRef } from "react"
import {
  format,
  startOfDay,
  endOfDay,
  differenceInDays,
  differenceInMonths,
  subDays,
  subMonths,
  addDays,
  addMonths,
  min,
  max,
} from "date-fns"
import { Pause, Play } from "lucide-react"
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
  stayColorMap?: Map<string, string>
}

// Example animation: stays revealed progressively in a loop to demonstrate
// the rolling 180-day window. When the proposed trip is added the window
// shifts forward, pushing Stay 1 outside — a key educational moment.
const EXAMPLE_TODAY = startOfDay(new Date())

const EXAMPLE_LOOP_STAYS: Stay[] = [
  { id: "ex-1", entryDate: subDays(EXAMPLE_TODAY, 170), exitDate: subDays(EXAMPLE_TODAY, 159), stayType: "short" }, // 12 days — falls out when proposed trip shifts window
  { id: "ex-2", entryDate: subDays(EXAMPLE_TODAY, 130), exitDate: subDays(EXAMPLE_TODAY, 116), stayType: "short" }, // 15 days
  { id: "ex-3", entryDate: subDays(EXAMPLE_TODAY, 90),  exitDate: subDays(EXAMPLE_TODAY, 71),  stayType: "short" }, // 20 days
  { id: "ex-4", entryDate: subDays(EXAMPLE_TODAY, 50),  exitDate: subDays(EXAMPLE_TODAY, 39),  stayType: "short" }, // 12 days
  { id: "ex-5", entryDate: subDays(EXAMPLE_TODAY, 25),  exitDate: subDays(EXAMPLE_TODAY, 8),   stayType: "short" }, // 18 days
]

const EXAMPLE_LOOP_TRIP: ProposedTrip = {
  id: "ex-proposed",
  entryDate: addDays(EXAMPLE_TODAY, 14),
  exitDate: addDays(EXAMPLE_TODAY, 33), // 20 days → total reaches 85 (close to 90)
}

const EXAMPLE_COLOR_MAP = new Map<string, string>([
  ["ex-1", "bg-blue-500"],
  ["ex-2", "bg-green-500"],
  ["ex-3", "bg-yellow-500"],
  ["ex-4", "bg-purple-500"],
  ["ex-5", "bg-orange-500"],
])

// Reusable hook: keeps exiting items in the DOM so CSS transitions can animate them out
function useAnimatedSet<T>(
  items: T[],
  getKey: (item: T) => string,
): Array<{ item: T; key: string; opacity: number }> {
  const allSeenRef = useRef<Map<string, T>>(new Map())
  const prevKeysRef = useRef<Set<string>>(new Set())
  const enteringRef = useRef<Set<string>>(new Set())
  const isFirstRef = useRef(true)
  const latestKeysRef = useRef<Set<string>>(new Set())
  const timerRef = useRef<ReturnType<typeof setTimeout>>()
  const [, tick] = useState(0)

  // Always update seen items with latest data
  for (const item of items) {
    allSeenRef.current.set(getKey(item), item)
  }

  const currentKeys = new Set(items.map(getKey))
  latestKeysRef.current = currentKeys

  // Track entering items (skip first render so everything appears immediately)
  if (isFirstRef.current) {
    isFirstRef.current = false
    enteringRef.current = new Set()
  } else {
    const entering = new Set<string>()
    for (const key of currentKeys) {
      if (!prevKeysRef.current.has(key)) entering.add(key)
    }
    enteringRef.current = entering
  }
  prevKeysRef.current = currentKeys

  const keyStr = items.map(getKey).join(',')

  useEffect(() => {
    if (enteringRef.current.size > 0) {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          enteringRef.current = new Set()
          tick(n => n + 1)
        })
      })
    }

    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => {
      const latest = latestKeysRef.current
      let cleaned = false
      for (const key of allSeenRef.current.keys()) {
        if (!latest.has(key)) {
          allSeenRef.current.delete(key)
          cleaned = true
        }
      }
      if (cleaned) tick(n => n + 1)
    }, 1200)

    return () => { if (timerRef.current) clearTimeout(timerRef.current) }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyStr])

  return [...allSeenRef.current.entries()].map(([key, item]) => ({
    item,
    key,
    opacity: enteringRef.current.has(key) ? 0 : currentKeys.has(key) ? 1 : 0,
  }))
}

export function TimelineVisualization({ stays, proposedTrips, referenceDate, stayColorMap: externalColorMap }: TimelineVisualizationProps) {
  const [showProposedTrips, setShowProposedTrips] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // Use example data only if absolutely no data exists (no stays AND no proposed trips)
  const isEmptyState = stays.length === 0 && proposedTrips.length === 0

  // --- Example animation loop: progressively reveal stays, then proposed trip ---
  // Steps: 0 = 2 stays, 1 = +stay 3, 2 = +stay 4, 3 = +stay 5, 4 = +proposed trip
  const [exampleStep, setExampleStep] = useState(0)
  const [exampleFade, setExampleFade] = useState(1)
  const [examplePaused, setExamplePaused] = useState(false)
  const loopTimers = useRef<ReturnType<typeof setTimeout>[]>([])
  const startLoopRef = useRef<() => void>(() => {})
  const loopStarted = useRef(false)

  const displayStays = isEmptyState
    ? EXAMPLE_LOOP_STAYS.slice(0, Math.min(exampleStep + 2, 5))
    : stays
  const displayProposedTrips = isEmptyState
    ? (exampleStep >= 4 ? [EXAMPLE_LOOP_TRIP] : [])
    : proposedTrips

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // Start the example animation loop when the timeline scrolls into view
  useEffect(() => {
    if (!isEmptyState) return
    const el = containerRef.current
    if (!el) return

    const clearTimers = () => {
      loopTimers.current.forEach(clearTimeout)
      loopTimers.current = []
    }

    const schedule = (fn: () => void, delay: number) => {
      loopTimers.current.push(setTimeout(fn, delay))
    }

    const startLoop = () => {
      clearTimers()
      setExampleStep(0)
      setShowProposedTrips(false)
      setExampleFade(1)

      schedule(() => setExampleStep(1), 1200)              // +stay 3 (quick first reveal)
      schedule(() => setExampleStep(2), 3200)              // +stay 4
      schedule(() => setExampleStep(3), 5600)              // +stay 5
      schedule(() => {                                      // +proposed trip
        setExampleStep(4)
        setShowProposedTrips(true)
      }, 8400)
      schedule(() => setExampleFade(0), 11400)             // fade out
      schedule(() => {                                      // reset while faded
        setExampleStep(0)
        setShowProposedTrips(false)
      }, 13200)
      schedule(() => setExampleFade(1), 15400)             // fade in
      schedule(() => startLoop(), 18000)                   // restart
    }

    startLoopRef.current = startLoop

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !loopStarted.current) {
          loopStarted.current = true
          observer.disconnect()
          setTimeout(() => startLoop(), 600)
        }
      },
      { threshold: 0.3 }
    )
    observer.observe(el)

    return () => {
      observer.disconnect()
      clearTimers()
    }
  }, [isEmptyState])

  // Pause/resume: clear timers on pause, restart loop on resume
  const toggleExamplePause = () => {
    if (examplePaused) {
      // Resume: restart the loop from the beginning
      startLoopRef.current()
      setExamplePaused(false)
    } else {
      // Pause: freeze at current state
      loopTimers.current.forEach(clearTimeout)
      loopTimers.current = []
      setExampleFade(1) // ensure visible if mid-fade
      setExamplePaused(true)
    }
  }

  const visibleProposedTrips = showProposedTrips ? displayProposedTrips : []

  // Only include visible proposed trips in date range so the timeline rescales on toggle
  const allDates = [
    ...displayStays.flatMap((s) => [s.entryDate, s.exitDate]),
    ...visibleProposedTrips.flatMap((p) => [p.entryDate, p.exitDate]),
    referenceDate,
  ]

  if (allDates.length === 0) {
    return <div className="text-center py-12 text-muted-foreground">No stays or proposed trips to visualize</div>
  }

  const latestProposedDate =
    visibleProposedTrips.length > 0 ? max(visibleProposedTrips.map((p) => p.exitDate)) : referenceDate

  const windowEnd = latestProposedDate
  const windowStart = subDays(windowEnd, 179) // 180 days including end date

  const earliestDate = min(allDates)
  const calculatedTimelineStart = startOfDay(earliestDate)
  const minTimelineStart = subMonths(windowEnd, 7)
  const timelineStart = calculatedTimelineStart < minTimelineStart ? calculatedTimelineStart : minTimelineStart

  const timelineEnd = endOfDay(max([...allDates, latestProposedDate]))

  const monthsInTimeline = differenceInMonths(timelineEnd, timelineStart) + 1
  const adjustedTimelineEnd = monthsInTimeline < 7 ? addMonths(timelineStart, 7) : timelineEnd

  const totalDays = differenceInDays(adjustedTimelineEnd, timelineStart) + 1

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

  // Animated month markers, stays, and trips — fade in/out instead of popping
  const displayMarkers = useAnimatedSet(monthMarkers, m => m.toISOString())

  const stayColors = [
    "bg-green-500",
    "bg-blue-500",
    "bg-yellow-500",
    "bg-purple-500",
    "bg-orange-500",
    "bg-cyan-500",
    "bg-pink-500",
    "bg-emerald-500",
    "bg-indigo-500",
    "bg-red-500",
    "bg-teal-500",
    "bg-violet-500",
    "bg-lime-500",
    "bg-fuchsia-500",
    "bg-amber-500",
    "bg-sky-500",
    "bg-rose-500",
    "bg-green-600",
    "bg-blue-600",
    "bg-purple-600",
    "bg-orange-600",
    "bg-cyan-600",
    "bg-pink-600",
    "bg-emerald-600",
    "bg-indigo-600",
  ]

  const sortedStays = [...displayStays].sort((a, b) => a.entryDate.getTime() - b.entryDate.getTime())
  const stayColorMap = externalColorMap ?? (isEmptyState ? EXAMPLE_COLOR_MAP : new Map<string, string>())
  if (!externalColorMap && !isEmptyState) {
    sortedStays.forEach((stay, index) => {
      stayColorMap.set(stay.id, stayColors[index % stayColors.length])
    })
  }

  const proposedTripColor = "bg-red-400 border-2 border-red-600 border-dashed"

  // Animated stays: persist hidden ones in DOM so they fade out
  const stayItemsForAnimation = displayStays.map(stay => ({
    ...stay,
    _color: stayColorMap.get(stay.id) || stayColors[0],
  }))
  const animatedStays = useAnimatedSet(stayItemsForAnimation, s => s.id)

  // Animated proposed trips: persist hidden ones in DOM so they fade out
  const animatedTrips = useAnimatedSet(displayProposedTrips, t => t.id)

  const visibleProposedForCalculation = showProposedTrips ? visibleProposedTrips : []
  const calculationResult = calculateDaysUsedForDate(windowEnd, displayStays, visibleProposedForCalculation)
  const daysUsed = calculationResult.daysUsed
  const daysLeft = calculationResult.daysLeft

  const daysRemainingText = daysLeft < 0 ? `${Math.abs(daysLeft)} days over limit` : `${daysLeft} days left`
  const statsColor = daysLeft < 0 ? "bg-red-50 text-red-700" : "bg-blue-50 text-blue-700"

  if (isMobile) {
    return (
      <div ref={containerRef} className="relative space-y-4" style={isEmptyState ? { opacity: exampleFade, transition: 'opacity 800ms ease-in-out' } : undefined}>
        {isEmptyState && (
          <button
            onClick={toggleExamplePause}
            className="absolute top-0 right-0 z-20 p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            title={examplePaused ? "Resume animation" : "Pause animation"}
          >
            {examplePaused ? <Play className="h-7 w-7" /> : <Pause className="h-7 w-7" />}
          </button>
        )}
        <div className="flex flex-col items-start gap-3">
          <div className="flex items-center gap-2">
            <Switch id="show-proposed" checked={showProposedTrips} onCheckedChange={setShowProposedTrips} className="data-[state=checked]:bg-emerald-600" />
            <Label htmlFor="show-proposed" className="text-sm font-medium cursor-pointer">
              Show Proposed Trips
            </Label>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <div className={`text-sm font-semibold px-3 py-1 rounded ${statsColor}`}>
              {daysUsed} days used
            </div>
            <div className={`text-sm font-semibold px-3 py-1 rounded ${statsColor}`}>
              {daysRemainingText}
            </div>
            {isEmptyState && (
              <span className="text-xs text-muted-foreground italic">Example data shown</span>
            )}
          </div>
          <div className={`flex flex-col gap-1 transition-opacity duration-500 ${showProposedTrips ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
            <div className="text-xs text-muted-foreground italic">Dashed red bars represent proposed trips.</div>
            <div className="text-xs text-muted-foreground italic">
              Reference date based on most recent proposed trip.
            </div>
          </div>
        </div>

        <div className="relative bg-card border rounded-lg p-4 py-8 overflow-y-auto max-h-[600px]">
          <div className="relative" style={{ height: `${totalDays * 4}px`, paddingLeft: "80px" }}>
            <div className="absolute left-[80px] top-0 bottom-0 w-px bg-border" />

            {displayMarkers.map(({ item: marker, key, opacity }) => {
              const daysSinceStart = differenceInDays(marker, timelineStart)
              const top = (daysSinceStart / totalDays) * 100
              return (
                <div key={key} className="absolute left-0 transition-all duration-1000 ease-in-out" style={{ top: `${top}%`, width: "80px", opacity }}>
                  <div className="text-xs text-muted-foreground text-right pr-2 whitespace-nowrap">
                    {format(marker, "MMM yyyy")}
                  </div>
                  <div className="absolute right-0 top-1/2 w-3 h-px bg-border" />
                </div>
              )
            })}

            <div
              className="absolute left-0 bg-primary/5 pointer-events-none transition-all duration-1000 ease-in-out"
              style={{
                top: `${(differenceInDays(windowStart, timelineStart) / totalDays) * 100}%`,
                height: `${(180 / totalDays) * 100}%`,
                width: "calc(100% - 80px)",
                marginLeft: "80px",
              }}
            />

            {animatedStays.map(({ item: stay, key, opacity: stayOpacity }) => {
              const top = (differenceInDays(stay.entryDate, timelineStart) / totalDays) * 100
              const height = ((differenceInDays(stay.exitDate, stay.entryDate) + 1) / totalDays) * 100
              const color = stay._color
              const duration = differenceInDays(stay.exitDate, stay.entryDate) + 1
              const stayIndex = sortedStays.findIndex((s) => s.id === stay.id) + 1

              return (
                <div
                  key={key}
                  className="absolute transition-all duration-1000 ease-in-out"
                  style={{
                    top: `${top}%`,
                    height: `${height}%`,
                    left: "90px",
                    right: "10px",
                    opacity: stayOpacity,
                    pointerEvents: stayOpacity === 0 ? "none" : "auto",
                  }}
                >
                  <div
                    className={`h-full ${color} rounded opacity-90 hover:opacity-100 transition-opacity cursor-pointer shadow-sm ${
                      isEmptyState ? "opacity-75" : ""
                    }`}
                    title={`Stay ${stayIndex}: ${format(stay.entryDate, "MMM d, yyyy")} - ${format(stay.exitDate, "MMM d, yyyy")} (${duration} days)`}
                  />
                </div>
              )
            })}

            {animatedTrips.map(({ item: trip, key, opacity: tripOpacity }, index) => {
              const top = (differenceInDays(trip.entryDate, timelineStart) / totalDays) * 100
              const height = ((differenceInDays(trip.exitDate, trip.entryDate) + 1) / totalDays) * 100
              const duration = differenceInDays(trip.exitDate, trip.entryDate) + 1
              const finalOpacity = tripOpacity * (showProposedTrips ? 0.9 : 0)

              return (
                <div
                  key={key}
                  className="absolute transition-all duration-1000 ease-in-out"
                  style={{
                    top: `${top}%`,
                    height: `${height}%`,
                    left: "90px",
                    right: "10px",
                    opacity: finalOpacity,
                    pointerEvents: finalOpacity > 0 ? "auto" : "none",
                  }}
                >
                  <div
                    className={`h-full ${proposedTripColor} rounded hover:opacity-100 cursor-pointer shadow-sm`}
                    title={`Proposed Trip ${index + 1}: ${format(trip.entryDate, "MMM d, yyyy")} - ${format(trip.exitDate, "MMM d, yyyy")} (${duration} days)`}
                  />
                </div>
              )
            })}

            <div
              className="absolute left-0 pointer-events-none z-10 transition-all duration-1000 ease-in-out"
              style={{
                top: `${(differenceInDays(windowStart, timelineStart) / totalDays) * 100}%`,
                marginLeft: "80px",
              }}
            >
              <div className="text-xs font-medium text-primary bg-background/80 px-1 rounded">180-day window</div>
            </div>

            <div
              className="absolute left-0 h-0.5 bg-primary pointer-events-none transition-all duration-1000 ease-in-out"
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
              className="absolute left-0 h-0.5 bg-primary pointer-events-none transition-all duration-1000 ease-in-out"
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
    <div ref={containerRef} className="relative space-y-4">
      {isEmptyState && (
        <button
          onClick={toggleExamplePause}
          className="absolute top-0 right-0 z-20 p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          title={examplePaused ? "Resume animation" : "Pause animation"}
        >
          {examplePaused ? <Play className="h-7 w-7" /> : <Pause className="h-7 w-7" />}
        </button>
      )}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <div className="flex items-center gap-2">
            <Switch id="show-proposed" checked={showProposedTrips} onCheckedChange={setShowProposedTrips} className="data-[state=checked]:bg-emerald-600" />
            <Label htmlFor="show-proposed" className="text-sm font-medium cursor-pointer">
              Show Proposed Trips
            </Label>
          </div>
          <div className="flex items-center gap-2">
            <div className={`text-sm font-semibold px-3 py-1 rounded ${statsColor}`}>
              {daysUsed} days used
            </div>
            <div className={`text-sm font-semibold px-3 py-1 rounded ${statsColor}`}>
              {daysRemainingText}
            </div>
          </div>
          {isEmptyState && (
            <span className="text-xs text-muted-foreground italic">Example data shown</span>
          )}
        </div>
        <div className={`flex flex-col items-end gap-1 transition-opacity duration-500 ${showProposedTrips ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
          <div className="text-xs text-muted-foreground italic">Dashed red bars represent proposed trips.</div>
          <div className="text-xs text-muted-foreground italic">
            Reference date based on most recent proposed trip.
          </div>
        </div>
      </div>

      <div className={`relative bg-card border rounded-lg p-4 sm:p-6 overflow-hidden ${isEmptyState ? "opacity-85" : ""}`}>
        <div className="relative pl-32 pr-4" style={{ minWidth: "500px", height: "160px" }}>
          <div className="absolute bottom-0 left-0 right-0 h-px bg-border" />
          {displayMarkers.map(({ item: marker, key, opacity }) => {
            const pos = dateToPosition(marker)
            return (
              <div key={key} className="absolute bottom-0 transition-all duration-1000 ease-in-out" style={{ left: `${pos}%`, opacity }}>
                <div className="w-px h-3 bg-border" />
                <div className="absolute top-4 left-1/2 -translate-x-1/2 text-xs text-muted-foreground whitespace-nowrap">
                  {format(marker, "MMM yyyy")}
                </div>
              </div>
            )
          })}

          <div
            className="absolute bottom-4 bg-primary/5 pointer-events-none z-0 transition-all duration-1000 ease-in-out"
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

          {animatedStays.map(({ item: stay, key, opacity: stayOpacity }) => {
            const duration = differenceInDays(stay.exitDate, stay.entryDate) + 1
            const startPos = dateToPosition(stay.entryDate)
            const endPos = dateToPosition(stay.exitDate)
            const color = stay._color
            const stayIndex = sortedStays.findIndex((s) => s.id === stay.id) + 1

            return (
              <div
                key={key}
                className="absolute transition-all duration-1000 ease-in-out"
                style={{
                  left: `${startPos}%`,
                  width: `${endPos - startPos}%`,
                  bottom: "1rem",
                  opacity: stayOpacity,
                  pointerEvents: stayOpacity === 0 ? "none" : "auto",
                }}
              >
                <div
                  className={`h-20 ${color} rounded shadow-md relative group cursor-pointer ${
                    isEmptyState ? "opacity-75" : ""
                  }`}
                  title={`Stay ${stayIndex}: ${format(stay.entryDate, "MMM d, yyyy")} - ${format(stay.exitDate, "MMM d, yyyy")} (${duration} days)`}
                />
              </div>
            )
          })}

          {animatedTrips.map(({ item: trip, key, opacity: tripOpacity }, index) => {
            const duration = differenceInDays(trip.exitDate, trip.entryDate) + 1
            const startPos = dateToPosition(trip.entryDate)
            const endPos = dateToPosition(trip.exitDate)
            const finalOpacity = tripOpacity * (showProposedTrips ? 0.9 : 0)

            return (
              <div
                key={key}
                className="absolute transition-all duration-1000 ease-in-out"
                style={{
                  left: `${startPos}%`,
                  width: `${endPos - startPos}%`,
                  bottom: "1rem",
                  opacity: finalOpacity,
                  pointerEvents: finalOpacity > 0 ? "auto" : "none",
                }}
              >
                <div
                  className={`h-20 ${proposedTripColor} rounded hover:opacity-100 cursor-pointer shadow-sm`}
                  title={`Proposed Trip ${index + 1}: ${format(trip.entryDate, "MMM d, yyyy")} - ${format(trip.exitDate, "MMM d, yyyy")} (${duration} days)`}
                />
              </div>
            )
          })}

          <div
            className="absolute bottom-4 w-0.5 bg-primary pointer-events-none transition-all duration-1000 ease-in-out"
            style={{ left: `${dateToPosition(windowStart)}%`, height: "calc(100% - 2rem)" }}
          >
            <div className="absolute -top-6 left-0 text-xs font-semibold whitespace-nowrap text-primary px-2 py-1 bg-background border border-primary/20 rounded shadow-sm z-20">
              {format(windowStart, "MMM d, yyyy")}
            </div>
          </div>
          <div
            className="absolute bottom-4 w-0.5 bg-primary pointer-events-none transition-all duration-1000 ease-in-out"
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

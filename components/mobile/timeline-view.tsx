"use client"

import { useRef, useState } from "react"
import { Loader2 } from "lucide-react"
import { TimelineVisualization, type TimelineVisualizationHandle } from "@/components/timeline-visualization"
import { TimelinePaywall } from "@/components/timeline-paywall"

interface Stay {
  id: string
  entryDate: Date
  exitDate: Date
  stayType: "short" | "residence"
  countryCode?: string
  hidden?: boolean
}

interface TimelineViewProps {
  visibleStays: Stay[]
  visibleProposedTrips: Stay[]
  referenceDate: Date
  stayColorMap: Map<string, string>
  hasPaid: boolean
  isAuthenticated: boolean
  paymentLoading: boolean
  dataLoading: boolean
}

export function TimelineView({
  visibleStays,
  visibleProposedTrips,
  referenceDate,
  stayColorMap,
  hasPaid,
  isAuthenticated,
  paymentLoading,
  dataLoading,
}: TimelineViewProps) {
  const timelineRef = useRef<TimelineVisualizationHandle>(null)

  if (paymentLoading || (hasPaid && dataLoading)) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        <p className="mt-3 text-sm text-muted-foreground">Loading timeline...</p>
      </div>
    )
  }

  if (hasPaid) {
    return (
      <div className="px-4 pb-4">
        <div className="text-lg font-bold mb-1">Timeline</div>
        <p className="text-xs text-muted-foreground mb-3">
          Visual representation of your stays within the rolling 180-day window
        </p>
        <TimelineVisualization
          stays={visibleStays}
          proposedTrips={visibleProposedTrips.map((trip) => ({
            id: trip.id,
            entryDate: trip.entryDate,
            exitDate: trip.exitDate,
          }))}
          referenceDate={referenceDate}
          stayColorMap={stayColorMap}
        />
      </div>
    )
  }

  // Unpaid — show paywall + example timeline
  return (
    <div className="px-4 pb-4 space-y-4">
      <TimelinePaywall isAuthenticated={isAuthenticated} />
      <div className="border rounded-lg overflow-hidden">
        <div className="px-4 pt-4 pb-2">
          <div className="text-sm font-semibold text-muted-foreground">Preview</div>
        </div>
        <div className="px-4 pb-4 select-none">
          <TimelineVisualization
            ref={timelineRef}
            stays={[]}
            proposedTrips={[]}
            referenceDate={referenceDate}
          />
        </div>
      </div>
    </div>
  )
}

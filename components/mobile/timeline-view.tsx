"use client"

import { Loader2 } from "lucide-react"
import { TimelineVisualization } from "@/components/timeline-visualization"
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

  // Unpaid — timeline with paywall overlay
  return (
    <div className="px-4 pb-4">
      <div className="relative">
        {/* Timeline renders behind */}
        <div className="pointer-events-none select-none">
          <TimelineVisualization
            stays={[]}
            proposedTrips={[]}
            referenceDate={referenceDate}
          />
        </div>

        {/* Frosted overlay with paywall */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="absolute inset-0 bg-background/70 backdrop-blur-[2px]" />
          <div className="relative z-10 bg-background/95 border-2 rounded-xl shadow-lg px-6 py-5 mx-4 max-w-xs w-full">
            <TimelinePaywall isAuthenticated={isAuthenticated} />
          </div>
        </div>
      </div>
    </div>
  )
}

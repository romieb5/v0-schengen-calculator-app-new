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

  // Unpaid — full timeline preview with sticky paywall banner at bottom
  return (
    <div className="px-4 pb-28">
      {/* Timeline fully visible and scrollable */}
      <TimelineVisualization
        stays={[]}
        proposedTrips={[]}
        referenceDate={referenceDate}
      />

      {/* Sticky paywall banner at bottom */}
      <div className="fixed bottom-14 left-0 right-0 z-30 px-4 md:hidden" style={{ paddingBottom: "env(safe-area-inset-bottom)" }}>
        <div className="bg-background/95 backdrop-blur-sm border-2 rounded-xl shadow-lg px-5 py-4">
          <TimelinePaywall isAuthenticated={isAuthenticated} />
        </div>
      </div>
    </div>
  )
}

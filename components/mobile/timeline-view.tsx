"use client"

import { Loader2, Monitor } from "lucide-react"
import { TimelineVisualization } from "@/components/timeline-visualization"
import { TimelinePaywall } from "@/components/timeline-paywall"

function DesktopTimelineHint() {
  return (
    <div className="flex items-start gap-2 rounded-lg border border-border bg-card px-3 py-2.5 mb-4">
      <Monitor className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-0.5" />
      <p className="text-xs text-muted-foreground leading-relaxed">
        View this timeline horizontally on a desktop.
      </p>
    </div>
  )
}

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
        <DesktopTimelineHint />
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

  // Unpaid — paywall, separator, hint, then static timeline
  return (
    <div className="px-4 pb-4">
      <TimelinePaywall isAuthenticated={isAuthenticated} />
      <hr className="border-border my-6" />
      <DesktopTimelineHint />
      <TimelineVisualization
        stays={[]}
        proposedTrips={[]}
        referenceDate={referenceDate}
      />
    </div>
  )
}

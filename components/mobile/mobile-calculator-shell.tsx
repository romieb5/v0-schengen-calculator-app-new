"use client"

import { Loader2 } from "lucide-react"
import { useMobileTab } from "@/contexts/mobile-tab-context"
import { RecordedStaysView } from "./recorded-stays-view"
import { ProposedTripsView } from "./proposed-trips-view"
import { TimelineView } from "./timeline-view"
import { cn } from "@/lib/utils"

interface Stay {
  id: string
  entryDate: Date
  exitDate: Date
  stayType: "short" | "residence"
  countryCode?: string
  hidden?: boolean
}

interface ProposedTripResult {
  trip: Stay
  result: { isLegal: boolean; message: string; daysRemaining?: number; lastEligibleDate?: Date }
}

interface MobileCalculatorShellProps {
  // Status
  daysUsed: number
  daysRemaining: number
  isOverstay: boolean
  dataLoading: boolean
  // Stays
  stays: Stay[]
  sortedStays: Stay[]
  stayColorMap: Map<string, string>
  stayColors: string[]
  entryDate: Date | undefined
  exitDate: Date | undefined
  setEntryDate: (date: Date | undefined) => void
  setExitDate: (date: Date | undefined) => void
  addOrUpdateStay: () => void
  editStay: (stay: Stay) => void
  deleteStay: (id: string) => void
  toggleStayVisibility: (id: string) => void
  editingId: string | null
  // Reference date
  referenceDate: Date
  setReferenceDate: (date: Date) => void
  // Proposed trips
  openAddProposedDialog: () => void
  editProposedTrip: (id: string) => void
  deleteProposedTrip: (id: string) => void
  toggleProposedTripVisibility: (id: string) => void
  proposedTripResults: ProposedTripResult[]
  // Timeline
  visibleStays: Stay[]
  visibleProposedTrips: Stay[]
  hasPaid: boolean
  isAuthenticated: boolean
  paymentLoading: boolean
  // Disabled date ranges
  disabledRanges: Array<{ start: Date; end: Date }>
}

export function MobileCalculatorShell(props: MobileCalculatorShellProps) {
  const { activeTab, activeSegment, setActiveSegment } = useMobileTab()

  return (
    <div className="md:hidden min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      {/* Page header — only on My Trips tab */}
      {activeTab === "my-trips" && (
        <div className="px-4 pt-6 pb-6 text-center">
          <h1 className="text-xl font-bold text-foreground tracking-tight">
            Schengen Visit Calculator
          </h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Track your stays and ensure compliance with Schengen visa rules
          </p>
        </div>
      )}

      {/* My Trips tab content */}
      {activeTab === "my-trips" && (
        <div className="pb-20">
          {/* Segmented control */}
          <div className="px-4 pt-3 pb-2">
            <div className="flex bg-muted rounded-lg p-1">
              <button
                onClick={() => setActiveSegment("recorded")}
                className={cn(
                  "flex-1 text-center py-2 text-xs font-semibold rounded-md transition-all",
                  activeSegment === "recorded"
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground",
                )}
              >
                Recorded Stays
              </button>
              <button
                onClick={() => setActiveSegment("proposed")}
                className={cn(
                  "flex-1 text-center py-2 text-xs font-semibold rounded-md transition-all",
                  activeSegment === "proposed"
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground",
                )}
              >
                Proposed Trips
              </button>
            </div>
          </div>

          {props.dataLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            </div>
          ) : (
            <>
              {activeSegment === "recorded" && (
                <RecordedStaysView
                  stays={props.stays}
                  sortedStays={props.sortedStays}
                  stayColorMap={props.stayColorMap}
                  stayColors={props.stayColors}
                  entryDate={props.entryDate}
                  exitDate={props.exitDate}
                  setEntryDate={props.setEntryDate}
                  setExitDate={props.setExitDate}
                  addOrUpdateStay={props.addOrUpdateStay}
                  editStay={props.editStay}
                  deleteStay={props.deleteStay}
                  toggleStayVisibility={props.toggleStayVisibility}
                  referenceDate={props.referenceDate}
                  setReferenceDate={props.setReferenceDate}
                  editingId={props.editingId}
                  disabledRanges={props.disabledRanges}
                  daysUsed={props.daysUsed}
                  daysRemaining={props.daysRemaining}
                  isOverstay={props.isOverstay}
                />
              )}
              {activeSegment === "proposed" && (
                <ProposedTripsView
                  openAddProposedDialog={props.openAddProposedDialog}
                  editProposedTrip={props.editProposedTrip}
                  deleteProposedTrip={props.deleteProposedTrip}
                  toggleProposedTripVisibility={props.toggleProposedTripVisibility}
                  proposedTripResults={props.proposedTripResults}
                />
              )}
            </>
          )}
        </div>
      )}

      {/* Timeline tab content */}
      {activeTab === "timeline" && (
        <div className="pb-20 pt-2">
          <TimelineView
            visibleStays={props.visibleStays}
            visibleProposedTrips={props.visibleProposedTrips}
            referenceDate={props.referenceDate}
            stayColorMap={props.stayColorMap}
            hasPaid={props.hasPaid}
            isAuthenticated={props.isAuthenticated}
            paymentLoading={props.paymentLoading}
            dataLoading={props.dataLoading}
          />
        </div>
      )}
    </div>
  )
}

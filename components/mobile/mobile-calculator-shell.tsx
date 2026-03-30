"use client"

import Link from "next/link"
import { Loader2 } from "lucide-react"
import { useMobileTab } from "@/contexts/mobile-tab-context"
import { MobileStatusBar } from "@/components/mobile-status-bar"
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
  proposedEntry: Date | undefined
  proposedExit: Date | undefined
  setProposedEntry: (date: Date | undefined) => void
  setProposedExit: (date: Date | undefined) => void
  addProposedTrip: () => void
  editProposedTrip: (id: string) => void
  deleteProposedTrip: (id: string) => void
  toggleProposedTripVisibility: (id: string) => void
  editingProposedId: string | null
  currentProposedResult: { isLegal: boolean; message: string } | null
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
      {/* Page header */}
      <div className="px-4 pt-4 pb-2 text-center">
        <h1 className="text-xl font-bold text-foreground tracking-tight">
          Schengen Visit Calculator
        </h1>
        <p className="text-xs text-muted-foreground mt-0.5">
          Track your stays and ensure compliance with Schengen visa rules
        </p>
      </div>

      {/* Status bar */}
      {props.dataLoading ? (
        <div className="flex items-center justify-center py-3 bg-muted/50">
          <Loader2 className="h-4 w-4 animate-spin text-muted-foreground mr-2" />
          <span className="text-xs text-muted-foreground">Loading...</span>
        </div>
      ) : (
        <MobileStatusBar
          daysUsed={props.daysUsed}
          daysRemaining={props.daysRemaining}
          isOverstay={props.isOverstay}
        />
      )}

      {/* Login prompt for unauthenticated users */}
      {!props.paymentLoading && !props.isAuthenticated && (
        <div className="px-4 py-2 bg-muted/30 border-b text-center">
          <p className="text-[12px] text-muted-foreground">
            Have an account?{" "}
            <Link href="/log-in" className="text-foreground font-semibold hover:underline">
              Log in
            </Link>{" "}
            to sync your data
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
                />
              )}
              {activeSegment === "proposed" && (
                <ProposedTripsView
                  proposedEntry={props.proposedEntry}
                  proposedExit={props.proposedExit}
                  setProposedEntry={props.setProposedEntry}
                  setProposedExit={props.setProposedExit}
                  addProposedTrip={props.addProposedTrip}
                  editProposedTrip={props.editProposedTrip}
                  deleteProposedTrip={props.deleteProposedTrip}
                  toggleProposedTripVisibility={props.toggleProposedTripVisibility}
                  editingProposedId={props.editingProposedId}
                  currentProposedResult={props.currentProposedResult}
                  proposedTripResults={props.proposedTripResults}
                  disabledRanges={props.disabledRanges}
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

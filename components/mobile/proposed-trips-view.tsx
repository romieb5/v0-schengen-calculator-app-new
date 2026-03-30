"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Calendar } from "@/components/ui/calendar"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { PlusCircle, CheckCircle2, AlertTriangle, Pencil, Trash2, Eye, EyeOff } from "lucide-react"
import { format } from "date-fns"
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

interface ProposedTripsViewProps {
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
  disabledRanges: Array<{ start: Date; end: Date }>
}

export function ProposedTripsView({
  proposedEntry,
  proposedExit,
  setProposedEntry,
  setProposedExit,
  addProposedTrip,
  editProposedTrip,
  deleteProposedTrip,
  toggleProposedTripVisibility,
  editingProposedId,
  currentProposedResult,
  proposedTripResults,
  disabledRanges,
}: ProposedTripsViewProps) {
  const [entrySheetOpen, setEntrySheetOpen] = useState(false)
  const [exitSheetOpen, setExitSheetOpen] = useState(false)

  return (
    <div className="space-y-3 px-4">
      {/* Check proposed trip form */}
      <div className="bg-card p-4 rounded-lg border-2 shadow-sm space-y-3">
        <div className="text-sm font-semibold">Check a future trip</div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="flex-1 justify-start text-left font-normal h-10 text-sm bg-transparent"
            onClick={() => setEntrySheetOpen(true)}
          >
            {proposedEntry ? format(proposedEntry, "MMM d, yyyy") : "Entry date"}
          </Button>
          <Button
            variant="outline"
            className="flex-1 justify-start text-left font-normal h-10 text-sm bg-transparent"
            onClick={() => setExitSheetOpen(true)}
          >
            {proposedExit ? format(proposedExit, "MMM d, yyyy") : "Exit date"}
          </Button>
        </div>
        <Button
          onClick={addProposedTrip}
          disabled={!proposedEntry || !proposedExit}
          className="w-full h-10 font-semibold"
        >
          <PlusCircle className="h-4 w-4 mr-2" />
          {editingProposedId ? "Update Trip" : "Check & Add Trip"}
        </Button>
      </div>

      {/* Entry date bottom sheet */}
      <Sheet open={entrySheetOpen} onOpenChange={setEntrySheetOpen}>
        <SheetContent side="bottom" className="max-h-[70vh] overflow-y-auto rounded-t-2xl">
          <SheetHeader className="pb-2">
            <SheetTitle>Proposed Entry Date</SheetTitle>
          </SheetHeader>
          <Calendar
            mode="single"
            selected={proposedEntry}
            onSelect={(date) => {
              setProposedEntry(date)
              setEntrySheetOpen(false)
            }}
            disabled={(date) =>
              disabledRanges.some((range) => date >= range.start && date <= range.end)
            }
          />
        </SheetContent>
      </Sheet>

      {/* Exit date bottom sheet */}
      <Sheet open={exitSheetOpen} onOpenChange={setExitSheetOpen}>
        <SheetContent side="bottom" className="max-h-[70vh] overflow-y-auto rounded-t-2xl">
          <SheetHeader className="pb-2">
            <SheetTitle>Proposed Exit Date</SheetTitle>
          </SheetHeader>
          <Calendar
            mode="single"
            selected={proposedExit}
            onSelect={(date) => {
              setProposedExit(date)
              setExitSheetOpen(false)
            }}
            disabled={(date) =>
              disabledRanges.some((range) => date >= range.start && date <= range.end)
            }
          />
        </SheetContent>
      </Sheet>

      {/* Current check result */}
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
            <AlertTitle className="font-bold text-foreground">Trip Exceeds Limit</AlertTitle>
          )}
          <AlertDescription className="font-medium text-foreground">
            {currentProposedResult.message.split(". ").map((sentence, idx, arr) => (
              <div key={idx}>
                {sentence}
                {idx < arr.length - 1 ? "." : ""}
              </div>
            ))}
          </AlertDescription>
        </Alert>
      )}

      {/* Saved proposed trips */}
      {proposedTripResults.length > 0 && (
        <div className="space-y-2 pt-2 border-t">
          <div className="text-sm font-semibold">Saved Proposed Trips</div>
          {proposedTripResults.map(({ trip, result }) => (
            <div
              key={trip.id}
              className={cn(
                "p-3 rounded-lg border-2 transition-colors",
                trip.hidden
                  ? "bg-muted/50 border-muted-foreground/20 opacity-60"
                  : result.isLegal
                    ? "bg-success/5 border-success/30"
                    : "bg-destructive/5 border-destructive/30",
              )}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  {result.isLegal ? (
                    <CheckCircle2 className="h-4 w-4 text-success flex-shrink-0" />
                  ) : (
                    <AlertTriangle className="h-4 w-4 text-destructive flex-shrink-0" />
                  )}
                  <div className="text-xs font-medium break-words">
                    {format(trip.entryDate, "MMM d, yyyy")} → {format(trip.exitDate, "MMM d, yyyy")}
                  </div>
                </div>
                <div className="flex gap-1 flex-shrink-0">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => toggleProposedTripVisibility(trip.id)}
                    className={cn("h-7 w-7 p-0 shadow-sm", trip.hidden && "opacity-50")}
                  >
                    {trip.hidden ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => editProposedTrip(trip.id)}
                    className="h-7 w-7 p-0 shadow-sm"
                  >
                    <Pencil className="h-3 w-3" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => deleteProposedTrip(trip.id)}
                    className="h-7 w-7 p-0 text-destructive hover:bg-destructive hover:text-destructive-foreground shadow-sm"
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
              <div
                className={cn(
                  "text-xs font-medium mt-1",
                  result.isLegal ? "text-success" : "text-destructive",
                )}
              >
                {(() => {
                  const sentences = result.message.split(". ")
                  const firstSentence = sentences[0].replace("Maximum", "Max") + "."
                  const secondSentence = sentences[1] || ""
                  return (
                    <>
                      <div>{firstSentence}</div>
                      {secondSentence && <div>{secondSentence}</div>}
                    </>
                  )
                })()}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

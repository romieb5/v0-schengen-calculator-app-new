"use client"

import { Button } from "@/components/ui/button"
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
  openAddProposedDialog: () => void
  editProposedTrip: (id: string) => void
  deleteProposedTrip: (id: string) => void
  toggleProposedTripVisibility: (id: string) => void
  proposedTripResults: ProposedTripResult[]
}

export function ProposedTripsView({
  openAddProposedDialog,
  editProposedTrip,
  deleteProposedTrip,
  toggleProposedTripVisibility,
  proposedTripResults,
}: ProposedTripsViewProps) {
  return (
    <div className="space-y-3 px-4">
      {/* Add proposed trip button */}
      <Button
        onClick={openAddProposedDialog}
        className="w-full h-10 font-semibold bg-foreground text-background hover:bg-foreground/90"
      >
        <PlusCircle className="h-4 w-4 mr-2" />
        Add Proposed Trip
      </Button>

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
                  : !result.isLegal
                    ? "bg-destructive/5 border-destructive/30"
                    : result.daysRemaining !== undefined && result.daysRemaining <= 10
                      ? "bg-warning/5 border-warning/30"
                      : "bg-success/5 border-success/30",
              )}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  {!result.isLegal ? (
                    <AlertTriangle className={cn("h-4 w-4 flex-shrink-0", trip.hidden ? "text-muted-foreground" : "text-destructive")} />
                  ) : result.daysRemaining !== undefined && result.daysRemaining <= 10 ? (
                    <AlertTriangle className={cn("h-4 w-4 flex-shrink-0", trip.hidden ? "text-muted-foreground" : "text-warning")} />
                  ) : (
                    <CheckCircle2 className={cn("h-4 w-4 flex-shrink-0", trip.hidden ? "text-muted-foreground" : "text-success")} />
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
                  trip.hidden ? "text-muted-foreground" : !result.isLegal ? "text-destructive" : result.daysRemaining !== undefined && result.daysRemaining <= 10 ? "text-warning" : "text-success",
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

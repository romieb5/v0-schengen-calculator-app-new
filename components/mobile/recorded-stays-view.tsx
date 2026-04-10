"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { PlusCircle, Pencil, Trash2, Eye, EyeOff } from "lucide-react"
import { format, differenceInDays } from "date-fns"
import { cn } from "@/lib/utils"
import { SingleMonthCalendar } from "@/components/single-month-calendar"
import { MobileStatusBar } from "@/components/mobile-status-bar"
import { useMobileTab } from "@/contexts/mobile-tab-context"

interface Stay {
  id: string
  entryDate: Date
  exitDate: Date
  stayType: "short" | "residence"
  countryCode?: string
  hidden?: boolean
}

interface RecordedStaysViewProps {
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
  referenceDate: Date
  setReferenceDate: (date: Date) => void
  editingId: string | null
  disabledRanges: Array<{ start: Date; end: Date }>
  daysUsed: number
  daysRemaining: number
  isOverstay: boolean
}

export function RecordedStaysView({
  stays,
  sortedStays,
  stayColorMap,
  stayColors,
  entryDate,
  exitDate,
  setEntryDate,
  setExitDate,
  addOrUpdateStay,
  editStay,
  deleteStay,
  toggleStayVisibility,
  referenceDate,
  setReferenceDate,
  editingId,
  disabledRanges,
  daysUsed,
  daysRemaining,
  isOverstay,
}: RecordedStaysViewProps) {
  const [addSheetOpen, setAddSheetOpen] = useState(false)
  const [refSheetOpen, setRefSheetOpen] = useState(false)
  const { barsVisible } = useMobileTab()

  const handleAddStay = () => {
    addOrUpdateStay()
    setAddSheetOpen(false)
  }

  return (
    <div className="space-y-3 px-4">
      {/* Add Stay button */}
      <button
        onClick={() => setAddSheetOpen(true)}
        className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm shadow-lg shadow-primary/25 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
      >
        <PlusCircle className="h-4.5 w-4.5" />
        Add Stay
      </button>

      {/* Add Stay dialog — full screen on mobile, centered modal on desktop */}
      <Dialog open={addSheetOpen} onOpenChange={setAddSheetOpen}>
        <DialogContent className="w-full h-full max-w-none max-h-none sm:max-w-2xl sm:h-auto sm:min-h-[520px] sm:max-h-[90vh] m-0 sm:m-auto rounded-none sm:rounded-lg border-0 sm:border overflow-y-auto p-4 sm:p-6 flex flex-col gap-0 [&>button]:top-3 [&>button]:right-3">
          <DialogHeader className="flex-shrink-0">
            <DialogTitle className="text-lg sm:text-2xl">{editingId ? "Edit Stay" : "Add Stay"}</DialogTitle>
          </DialogHeader>
          <div className="flex-1 flex flex-col justify-between py-2 sm:py-4 gap-3">
            <SingleMonthCalendar
              entryDate={entryDate ?? null}
              exitDate={exitDate ?? null}
              onDateSelect={(date) => {
                if (!entryDate || (entryDate && exitDate)) {
                  setEntryDate(date)
                  setExitDate(undefined)
                } else {
                  if (date < entryDate) {
                    setExitDate(entryDate)
                    setEntryDate(date)
                  } else {
                    setExitDate(date)
                  }
                }
              }}
              initialMonth={entryDate || new Date()}
              disabledRanges={disabledRanges}
            />

            <div className="space-y-3">
              {entryDate && (
                <div className="flex items-center justify-between gap-2 text-xs">
                  <div className="flex items-center gap-3 bg-muted/50 rounded-lg px-3 py-2">
                    <div>
                      <span className="font-medium">Entry:</span>{" "}
                      <span className="text-muted-foreground">{format(entryDate, "MMM d, yyyy")}</span>
                    </div>
                    {exitDate && (
                      <div>
                        <span className="font-medium">Exit:</span>{" "}
                        <span className="text-muted-foreground">{format(exitDate, "MMM d, yyyy")}</span>
                      </div>
                    )}
                    {exitDate && (
                      <span className="font-semibold text-primary">
                        {differenceInDays(exitDate, entryDate) + 1}d
                      </span>
                    )}
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-primary h-auto py-0.5 px-2 text-xs"
                    onClick={() => {
                      setEntryDate(undefined)
                      setExitDate(undefined)
                    }}
                  >
                    Clear
                  </Button>
                </div>
              )}

              <Button
                onClick={handleAddStay}
                disabled={!entryDate || !exitDate}
                className="w-full h-11 font-semibold shadow-md hover:shadow-lg transition-shadow"
              >
                <PlusCircle className="h-4 w-4 mr-2" />
                {editingId ? "Update Stay" : "Add Stay"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Sticky status + reference date */}
      <div className={cn(
        "sticky top-16 z-10 space-y-2 bg-gradient-to-br from-blue-50 via-white to-blue-50 pb-2 -mx-4 px-4 pt-1",
      )}>
        {/* Status bar */}
        <MobileStatusBar
          daysUsed={daysUsed}
          daysRemaining={daysRemaining}
          isOverstay={isOverstay}
        />

        {/* Reference date */}
        <div className="bg-card border rounded-lg p-3 flex items-center justify-between">
          <div>
            <div className="text-[10px] text-muted-foreground font-medium uppercase tracking-wide">Reference Date</div>
            <div className="text-sm font-semibold">{format(referenceDate, "MMM d, yyyy")}</div>
          </div>
          <Button variant="outline" size="sm" className="text-xs" onClick={() => setRefSheetOpen(true)}>
            Change
          </Button>
        </div>
      </div>

      {/* Recorded stays list */}
      {sortedStays.length > 0 ? (
        <div className="space-y-2">
          {sortedStays.map((stay, index) => {
            const duration = differenceInDays(stay.exitDate, stay.entryDate) + 1
            const stayColor = stayColorMap.get(stay.id) || stayColors[0]

            return (
              <div
                key={stay.id}
                className={cn(
                  "bg-card p-3 rounded-lg border-2 transition-colors shadow-sm",
                  stay.hidden ? "opacity-60 border-muted-foreground/20" : "hover:border-primary/50",
                )}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`flex-shrink-0 w-7 h-7 rounded-full ${stayColor} text-white flex items-center justify-center font-bold text-xs shadow-sm`}
                  >
                    {index + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="text-xs leading-tight">
                        <div className="font-semibold text-foreground">
                          {format(stay.entryDate, "MMM d, yyyy")} →
                        </div>
                        <div className="font-semibold text-foreground">
                          {format(stay.exitDate, "MMM d, yyyy")}
                        </div>
                      </div>
                      <div className="flex gap-1 flex-shrink-0">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => toggleStayVisibility(stay.id)}
                          className={cn("shadow-sm h-7 w-7 p-0", stay.hidden && "opacity-50")}
                          title={stay.hidden ? "Include in calculations" : "Exclude from calculations"}
                        >
                          {stay.hidden ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => editStay(stay)}
                          className="shadow-sm h-7 w-7 p-0"
                        >
                          <Pencil className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => deleteStay(stay.id)}
                          className="text-destructive hover:bg-destructive hover:text-destructive-foreground shadow-sm h-7 w-7 p-0"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">{duration} day(s)</div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        <div className="text-center py-8 text-sm text-muted-foreground">
          No stays recorded yet. Tap "Add Stay" to get started.
        </div>
      )}

      {/* Reference date dialog — full screen on mobile */}
      <Dialog open={refSheetOpen} onOpenChange={setRefSheetOpen}>
        <DialogContent className="w-full h-full max-w-none max-h-none sm:max-w-2xl sm:h-auto sm:max-h-[90vh] m-0 sm:m-auto rounded-none sm:rounded-lg border-0 sm:border overflow-y-auto p-4 sm:p-6 flex flex-col gap-0 [&>button]:top-3 [&>button]:right-3">
          <DialogHeader className="flex-shrink-0">
            <DialogTitle className="text-lg sm:text-2xl">Reference Date</DialogTitle>
          </DialogHeader>
          <div className="flex-1 flex flex-col justify-between py-2 sm:py-4 gap-3">
            <div>
              <p className="text-xs sm:text-sm text-muted-foreground mb-4">
                Change this date to adjust the 180-day window and see your status at different points in time.
              </p>
              <SingleMonthCalendar
                entryDate={referenceDate}
                exitDate={null}
                onDateSelect={(date) => {
                  setReferenceDate(date)
                  setRefSheetOpen(false)
                }}
                initialMonth={referenceDate}
              />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

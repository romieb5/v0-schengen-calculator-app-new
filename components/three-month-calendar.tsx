"use client"

import { useState, useEffect } from "react"
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  isWithinInterval,
  isBefore,
} from "date-fns"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface ThreeMonthCalendarProps {
  entryDate?: Date
  exitDate?: Date
  onEntryDateChange: (date: Date) => void
  onExitDateChange: (date: Date) => void
  onClear: () => void
  initialMonth?: Date
}

export function ThreeMonthCalendar({
  entryDate,
  exitDate,
  onEntryDateChange,
  onExitDateChange,
  onClear,
  initialMonth,
}: ThreeMonthCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(() => {
    if (initialMonth) {
      return startOfMonth(subMonths(initialMonth, 1))
    }
    return startOfMonth(new Date())
  })

  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Check if screen is mobile size
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  useEffect(() => {
    if (initialMonth) {
      setCurrentMonth(startOfMonth(subMonths(initialMonth, 1)))
    }
  }, [initialMonth])

  const month1 = currentMonth
  const month2 = addMonths(currentMonth, 1)
  const month3 = addMonths(currentMonth, 2)

  const handlePrevious = () => {
    setCurrentMonth(subMonths(currentMonth, isMobile ? 1 : 3))
  }

  const handleNext = () => {
    setCurrentMonth(addMonths(currentMonth, isMobile ? 1 : 3))
  }

  const handleDateClick = (date: Date) => {
    if (!entryDate) {
      onEntryDateChange(date)
      onExitDateChange(date)
    } else if (!exitDate || isSameDay(entryDate, exitDate)) {
      if (isBefore(date, entryDate)) {
        onExitDateChange(entryDate)
        onEntryDateChange(date)
      } else {
        onExitDateChange(date)
      }
    } else {
      onEntryDateChange(date)
      onExitDateChange(date)
    }
  }

  const isDayInRange = (date: Date) => {
    if (!entryDate || !exitDate) return false
    try {
      return isWithinInterval(date, { start: entryDate, end: exitDate })
    } catch {
      return false
    }
  }

  const isDaySelected = (date: Date) => {
    if (!entryDate) return false
    if (isSameDay(date, entryDate)) return true
    if (exitDate && isSameDay(date, exitDate)) return true
    return false
  }

  const renderMonth = (monthDate: Date) => {
    const monthStart = startOfMonth(monthDate)
    const monthEnd = endOfMonth(monthDate)
    const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd })

    const firstDayOfWeek = monthStart.getDay()
    const paddingDays = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1

    return (
      <div className="flex-1 min-w-0">
        {isMobile ? (
          <div className="flex items-center justify-between mb-4 gap-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={handlePrevious}
              className="h-8 w-8 hover:bg-muted flex-shrink-0"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <div className="text-center font-bold text-base text-primary flex-1 min-w-0 truncate px-1">
              {format(monthDate, "MMMM yyyy")}
            </div>
            <Button variant="ghost" size="icon" onClick={handleNext} className="h-8 w-8 hover:bg-muted flex-shrink-0">
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        ) : (
          <div className="text-center font-bold text-lg mb-4 text-primary">{format(monthDate, "MMMM yyyy")}</div>
        )}
        <div className={cn("grid grid-cols-7", isMobile ? "gap-2" : "gap-1")}>
          {["M", "T", "W", "T", "F", "S", "S"].map((day, i) => (
            <div key={i} className="text-center text-xs font-bold text-muted-foreground py-2">
              {day}
            </div>
          ))}

          {Array.from({ length: paddingDays }).map((_, i) => (
            <div key={`pad-${i}`} />
          ))}

          {daysInMonth.map((day) => {
            const isSelected = isDaySelected(day)
            const isInRange = isDayInRange(day)

            return (
              <button
                key={day.toISOString()}
                onClick={() => handleDateClick(day)}
                className={cn(
                  "aspect-square flex items-center justify-center rounded-lg transition-all font-medium",
                  isMobile ? "text-base p-1" : "text-sm p-2",
                  "hover:bg-primary/20 hover:scale-105 hover:shadow-sm",
                  isSelected && "bg-primary text-primary-foreground hover:bg-primary/90 font-bold shadow-md scale-105",
                  isInRange && !isSelected && "bg-primary/15 font-semibold",
                  !isSameMonth(day, monthDate) && "text-muted-foreground/30",
                )}
              >
                {format(day, "d")}
              </button>
            )
          })}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-6 p-4 lg:p-6 bg-muted/30 rounded-xl border-2 relative">
        <Button
          variant="outline"
          size="icon"
          onClick={handlePrevious}
          className="hidden lg:flex h-10 w-10 shadow-sm hover:shadow-md transition-shadow bg-card absolute left-2 top-1/2 -translate-y-1/2 z-10"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>

        <div className={cn("flex-1 flex gap-6", isMobile ? "px-2" : "px-8 lg:px-8")}>
          {isMobile ? (
            renderMonth(month1)
          ) : (
            <>
              {renderMonth(month1)}
              {renderMonth(month2)}
              {renderMonth(month3)}
            </>
          )}
        </div>

        <Button
          variant="outline"
          size="icon"
          onClick={handleNext}
          className="hidden lg:flex h-10 w-10 shadow-sm hover:shadow-md transition-shadow bg-card absolute right-2 top-1/2 -translate-y-1/2 z-10"
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>

      <div className="flex justify-end">
        <Button variant="link" onClick={onClear} className="text-primary font-semibold hover:text-primary/80">
          Clear Calendar
        </Button>
      </div>
    </div>
  )
}

"use client"

import { useState, useEffect } from "react"
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameDay,
  addMonths,
  subMonths,
  isWithinInterval,
} from "date-fns"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface SingleMonthCalendarProps {
  entryDate: Date | null
  exitDate: Date | null
  onDateSelect: (date: Date) => void
  initialMonth?: Date
  disabledRanges?: { start: Date; end: Date }[]
}

export function SingleMonthCalendar({
  entryDate,
  exitDate,
  onDateSelect,
  initialMonth,
  disabledRanges = [],
}: SingleMonthCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(initialMonth || new Date())

  useEffect(() => {
    if (initialMonth) {
      setCurrentMonth(initialMonth)
    }
  }, [initialMonth])

  const monthStart = startOfMonth(currentMonth)
  const monthEnd = endOfMonth(currentMonth)
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd })

  const firstDayOfWeek = monthStart.getDay()
  const emptyDays = Array(firstDayOfWeek).fill(null)

  const isInRange = (day: Date) => {
    if (!entryDate || !exitDate) return false
    return day >= entryDate && day <= exitDate
  }

  const isStartDate = (day: Date) => entryDate && isSameDay(day, entryDate)
  const isEndDate = (day: Date) => exitDate && isSameDay(day, exitDate)

  const isDateDisabled = (day: Date) => {
    return disabledRanges.some((range) => {
      try {
        return isWithinInterval(day, { start: range.start, end: range.end })
      } catch {
        return false
      }
    })
  }

  const handlePreviousMonth = () => setCurrentMonth(subMonths(currentMonth, 1))
  const handleNextMonth = () => setCurrentMonth(addMonths(currentMonth, 1))

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Month header with navigation */}
      <div className="grid grid-cols-[auto_1fr_auto] items-center gap-2 mb-4">
        <Button variant="ghost" size="sm" onClick={handlePreviousMonth} className="h-8 w-8 p-0">
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <h3 className="text-xl font-semibold text-primary text-center">{format(currentMonth, "MMMM yyyy")}</h3>
        <Button variant="ghost" size="sm" onClick={handleNextMonth} className="h-8 w-8 p-0">
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-3">
        {/* Day headers */}
        {["M", "T", "W", "T", "F", "S", "S"].map((day, i) => (
          <div
            key={i}
            className="text-center text-sm font-medium text-muted-foreground h-10 flex items-center justify-center"
          >
            {day}
          </div>
        ))}

        {/* Empty cells for alignment */}
        {emptyDays.map((_, index) => (
          <div key={`empty-${index}`} />
        ))}

        {/* Day cells */}
        {daysInMonth.map((day) => {
          const inRange = isInRange(day)
          const isStart = isStartDate(day)
          const isEnd = isEndDate(day)
          const isSelected = isStart || isEnd
          const disabled = isDateDisabled(day)

          return (
            <button
              key={day.toISOString()}
              onClick={() => !disabled && onDateSelect(day)}
              disabled={disabled}
              className={`
                h-12 w-full rounded-md text-sm font-medium transition-all
                ${disabled ? "opacity-40 cursor-not-allowed bg-muted/50 text-muted-foreground line-through" : ""}
                ${!disabled && isSelected ? "bg-primary text-primary-foreground ring-2 ring-primary" : ""}
                ${!disabled && inRange && !isSelected ? "bg-primary/20" : ""}
                ${!disabled && !inRange && !isSelected ? "hover:bg-accent" : ""}
              `}
            >
              {format(day, "d")}
            </button>
          )
        })}
      </div>

      {/* Clear button */}
      <div className="flex justify-end mt-4">
        <Button
          variant="ghost"
          className="text-primary"
          onClick={() => {
            onDateSelect(null as any)
          }}
        >
          Clear Calendar
        </Button>
      </div>
    </div>
  )
}

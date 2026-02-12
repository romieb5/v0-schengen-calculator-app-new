import { differenceInDays, subDays, isAfter, isBefore, startOfDay } from "date-fns"

interface Stay {
  id: string
  entryDate: Date
  exitDate: Date
  stayType: "short" | "residence"
  countryCode?: string
}

interface ProposedTrip {
  id: string
  entryDate: Date
  exitDate: Date
}

/**
 * Calculates the maximum days used within any 180-day rolling window
 * for a specific reference date
 */
export function calculateDaysUsedForDate(
  referenceDate: Date,
  stays: Stay[],
  proposedTrips: ProposedTrip[] = [],
): { daysUsed: number; daysLeft: number } {
  // Normalize all dates to start of day to avoid time-based inconsistencies
  const windowEnd = startOfDay(referenceDate)
  const windowStart = subDays(windowEnd, 179) // 180 days including end date

  let daysUsed = 0

  // Count days from actual stays
  stays.forEach((stay) => {
    if (stay.stayType !== "short") return

    // Normalize entry and exit dates
    const stayEntry = startOfDay(stay.entryDate)
    const stayExit = startOfDay(stay.exitDate)

    // Only count days that fall within the 180-day window
    const effectiveEntry = isAfter(stayEntry, windowStart) ? stayEntry : windowStart
    const effectiveExit = isBefore(stayExit, windowEnd) ? stayExit : windowEnd

    if (isBefore(effectiveEntry, effectiveExit) || effectiveEntry.getTime() === effectiveExit.getTime()) {
      const stayDays = differenceInDays(effectiveExit, effectiveEntry) + 1
      daysUsed += stayDays
    }
  })

  // Count days from proposed trips
  proposedTrips.forEach((trip) => {
    // Normalize entry and exit dates
    const tripEntry = startOfDay(trip.entryDate)
    const tripExit = startOfDay(trip.exitDate)

    const effectiveEntry = isAfter(tripEntry, windowStart) ? tripEntry : windowStart
    const effectiveExit = isBefore(tripExit, windowEnd) ? tripExit : windowEnd

    if (isBefore(effectiveEntry, effectiveExit) || effectiveEntry.getTime() === effectiveExit.getTime()) {
      const tripDays = differenceInDays(effectiveExit, effectiveEntry) + 1
      daysUsed += tripDays
    }
  })

  const daysLeft = 90 - daysUsed

  return { daysUsed, daysLeft }
}

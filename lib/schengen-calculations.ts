import { differenceInDays, subDays, isAfter, isBefore } from "date-fns"

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
  const windowEnd = referenceDate
  const windowStart = subDays(windowEnd, 179) // 180 days including end date

  let daysUsed = 0

  // Count days from actual stays
  stays.forEach((stay) => {
    if (stay.stayType !== "short") return

    // Only count days that fall within the 180-day window
    const effectiveEntry = isAfter(stay.entryDate, windowStart) ? stay.entryDate : windowStart
    const effectiveExit = isBefore(stay.exitDate, windowEnd) ? stay.exitDate : windowEnd

    if (isBefore(effectiveEntry, effectiveExit) || effectiveEntry.getTime() === effectiveExit.getTime()) {
      const stayDays = differenceInDays(effectiveExit, effectiveEntry) + 1
      daysUsed += stayDays
    }
  })

  // Count days from proposed trips
  proposedTrips.forEach((trip) => {
    const effectiveEntry = isAfter(trip.entryDate, windowStart) ? trip.entryDate : windowStart
    const effectiveExit = isBefore(trip.exitDate, windowEnd) ? trip.exitDate : windowEnd

    if (isBefore(effectiveEntry, effectiveExit) || effectiveEntry.getTime() === effectiveExit.getTime()) {
      const tripDays = differenceInDays(effectiveExit, effectiveEntry) + 1
      daysUsed += tripDays
    }
  })

  const daysLeft = 90 - daysUsed

  return { daysUsed, daysLeft }
}

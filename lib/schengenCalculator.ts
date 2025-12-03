// lib/schengenCalculator.ts

/**
 * Schengen Short-Stay (90/180) Calculator
 * Legal basis: Regulation (EU) 2016/399 (Schengen Borders Code)
 */

export const StayType = {
  SHORT_STAY: 'short_stay' as const,
  LONG_STAY: 'long_stay' as const
};

export type StayTypeValue = typeof StayType[keyof typeof StayType];

export interface StayData {
  entryDate: string;    // YYYY-MM-DD
  exitDate: string;     // YYYY-MM-DD
  stayType: StayTypeValue;
  countryCode?: string;
}

export class Stay {
  entryDate: string;
  exitDate: string;
  stayType: StayTypeValue;
  countryCode?: string;

  constructor(entryDate: string, exitDate: string, stayType: StayTypeValue, countryCode?: string) {
    this.entryDate = entryDate;
    this.exitDate = exitDate;
    this.stayType = stayType;
    this.countryCode = countryCode;
  }

  toDateRange(): { entry: Date; exit: Date } {
    const entry = new Date(this.entryDate);
    const exit = new Date(this.exitDate);
    
    if (exit < entry) {
      throw new Error(`Exit date ${this.exitDate} is before entry date ${this.entryDate}`);
    }
    
    return { entry, exit };
  }

  getDatesInWindow(windowStart: Date, windowEnd: Date): Set<string> {
    const { entry, exit } = this.toDateRange();
    
    const effectiveStart = new Date(Math.max(entry.getTime(), windowStart.getTime()));
    const effectiveEnd = new Date(Math.min(exit.getTime(), windowEnd.getTime()));
    
    if (effectiveStart > effectiveEnd) {
      return new Set();
    }
    
    const dates = new Set<string>();
    const current = new Date(effectiveStart);
    
    while (current <= effectiveEnd) {
      dates.add(current.toISOString().split('T')[0]);
      current.setDate(current.getDate() + 1);
    }
    
    return dates;
  }
}

export class SchengenCalculator {
  private stays: Stay[] = [];

  addStay(stay: Stay): void {
    this.stays.push(stay);
  }

  addStays(stays: Stay[]): void {
    this.stays.push(...stays);
  }

  clearStays(): void {
    this.stays = [];
  }

  getStays(): Stay[] {
    return [...this.stays];
  }

  private _get180DayWindow(referenceDate: string): { windowStart: Date; windowEnd: Date } {
    const refDate = new Date(referenceDate);
    const windowStart = new Date(refDate);
    windowStart.setDate(windowStart.getDate() - 179);
    const windowEnd = refDate;
    
    return { windowStart, windowEnd };
  }

  private _getShortStayDates(referenceDate: string): Set<string> {
    const { windowStart, windowEnd } = this._get180DayWindow(referenceDate);
    const allShortStayDates = new Set<string>();
    
    for (const stay of this.stays) {
      if (stay.stayType === StayType.SHORT_STAY) {
        const dates = stay.getDatesInWindow(windowStart, windowEnd);
        dates.forEach(date => allShortStayDates.add(date));
      }
    }
    
    return allShortStayDates;
  }

  getShortStayDaysUsed(referenceDate: string): number {
    return this._getShortStayDates(referenceDate).size;
  }

  getShortStayDaysRemaining(referenceDate: string): number {
    const daysUsed = this.getShortStayDaysUsed(referenceDate);
    return 90 - daysUsed;
  }

  hasOverstayed(referenceDate: string): {
    isOverstay: boolean;
    daysUsed: number;
    daysOver: number;
    windowStart: string;
    windowEnd: string;
  } {
    const daysUsed = this.getShortStayDaysUsed(referenceDate);
    const { windowStart, windowEnd } = this._get180DayWindow(referenceDate);
    
    return {
      isOverstay: daysUsed > 90,
      daysUsed: daysUsed,
      daysOver: Math.max(0, daysUsed - 90),
      windowStart: windowStart.toISOString().split('T')[0],
      windowEnd: windowEnd.toISOString().split('T')[0]
    };
  }

  canStayForDuration(entryDate: string, durationDays: number): {
    isLegal: boolean;
    entryDate: string;
    proposedExitDate: string;
    durationDays: number;
    maxLegalDays: number;
    firstOverstayDate: string | null;
    daysUsedOnEntry: number;
  } {
    const entry = new Date(entryDate);
    const exit = new Date(entry);
    exit.setDate(exit.getDate() + durationDays - 1);
    
    let firstOverstayDate: Date | null = null;
    let maxLegalDays = 0;
    
    for (let dayOffset = 0; dayOffset < durationDays; dayOffset++) {
      const checkDate = new Date(entry);
      checkDate.setDate(checkDate.getDate() + dayOffset);
      const checkDateStr = checkDate.toISOString().split('T')[0];
      
      const daysRemaining = this.getShortStayDaysRemaining(checkDateStr);
      
      if (daysRemaining < 0 && firstOverstayDate === null) {
        firstOverstayDate = checkDate;
        maxLegalDays = dayOffset;
        break;
      }
    }
    
    if (firstOverstayDate === null) {
      maxLegalDays = durationDays;
    }
    
    return {
      isLegal: firstOverstayDate === null,
      entryDate: entryDate,
      proposedExitDate: exit.toISOString().split('T')[0],
      durationDays: durationDays,
      maxLegalDays: maxLegalDays,
      firstOverstayDate: firstOverstayDate ? firstOverstayDate.toISOString().split('T')[0] : null,
      daysUsedOnEntry: this.getShortStayDaysUsed(entryDate)
    };
  }

  getNextFullEntryDate(desiredStayDays: number = 90, startSearchDate?: string): {
    earliestEntryDate: string | null;
    desiredStayDays: number;
    daysUsedOnEntry?: number;
    daysRemainingOnEntry?: number;
    error?: string;
  } {
    const searchDateStr = startSearchDate || new Date().toISOString().split('T')[0];
    const searchDate = new Date(searchDateStr);
    
    for (let dayOffset = 0; dayOffset < 365; dayOffset++) {
      const candidateDate = new Date(searchDate);
      candidateDate.setDate(candidateDate.getDate() + dayOffset);
      const candidateDateStr = candidateDate.toISOString().split('T')[0];
      
      const result = this.canStayForDuration(candidateDateStr, desiredStayDays);
      
      if (result.isLegal) {
        return {
          earliestEntryDate: candidateDateStr,
          desiredStayDays: desiredStayDays,
          daysUsedOnEntry: result.daysUsedOnEntry,
          daysRemainingOnEntry: 90 - result.daysUsedOnEntry
        };
      }
    }
    
    return {
      earliestEntryDate: null,
      desiredStayDays: desiredStayDays,
      error: 'Could not find legal entry date within 365 days'
    };
  }
}

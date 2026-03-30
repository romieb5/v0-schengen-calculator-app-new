"use client"

import { cn } from "@/lib/utils"

interface MobileStatusBarProps {
  daysUsed: number
  daysRemaining: number
  isOverstay: boolean
}

export function MobileStatusBar({ daysUsed, daysRemaining, isOverstay }: MobileStatusBarProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-between px-4 py-2 text-sm font-semibold rounded-lg",
        isOverstay
          ? "bg-destructive/10 text-destructive"
          : daysRemaining <= 10
            ? "bg-warning/10 text-warning"
            : "bg-success/10 text-success",
      )}
    >
      <span>{daysUsed} / 90 days used</span>
      <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-background/60">
        {isOverstay
          ? `${daysUsed - 90} over limit`
          : `${daysRemaining} remaining`}
      </span>
    </div>
  )
}

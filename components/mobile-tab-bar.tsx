"use client"

import { CalendarDays, BarChart3 } from "lucide-react"
import { useMobileTab, type MobileTab } from "@/contexts/mobile-tab-context"
import { cn } from "@/lib/utils"

interface MobileTabBarProps {
  isVisible: boolean
}

export function MobileTabBar({ isVisible }: MobileTabBarProps) {
  const { activeTab, setActiveTab } = useMobileTab()

  const tabs: { id: MobileTab; label: string; icon: typeof CalendarDays }[] = [
    { id: "my-trips", label: "My Trips", icon: CalendarDays },
    { id: "timeline", label: "Timeline", icon: BarChart3 },
  ]

  return (
    <div
      className={cn(
        "fixed bottom-0 left-0 right-0 z-40 md:hidden",
        "bg-background/95 backdrop-blur-sm border-t",
        "transition-transform duration-300 ease-in-out",
        !isVisible && "translate-y-full",
      )}
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="flex">
        {tabs.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={cn(
              "flex-1 flex flex-col items-center gap-0.5 py-2 transition-colors",
              activeTab === id
                ? "text-primary"
                : "text-muted-foreground",
            )}
          >
            <Icon className="h-5 w-5" />
            <span className="text-[10px] font-semibold">{label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

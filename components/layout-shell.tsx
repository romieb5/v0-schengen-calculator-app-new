"use client"

import { usePathname } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { MobileTabBar } from "@/components/mobile-tab-bar"
import { MobileTabProvider } from "@/contexts/mobile-tab-context"
import { useScrollDirection } from "@/hooks/use-scroll-direction"

const AUTH_ROUTES = ["/log-in", "/sign-up", "/reset-password"]

export function LayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isAuthPage = AUTH_ROUTES.includes(pathname)
  const { barsVisible } = useScrollDirection()
  const isCalculatorPage = pathname === "/"

  if (isAuthPage) {
    return <>{children}</>
  }

  return (
    <MobileTabProvider barsVisible={barsVisible}>
      <Navigation />
      <div className="h-16" /> {/* Spacer for fixed nav */}
      {/* Calculator page carries the soft blue tint across the whole page,
          including behind the footer. Other pages stay on the default bg. */}
      <div className={isCalculatorPage ? "bg-blue-50 dark:bg-background" : undefined}>
        {children}
        {/* Footer: hide on mobile when on calculator page (tab bar replaces it) */}
        <div className={isCalculatorPage ? "hidden md:block" : undefined}>
          <Footer />
        </div>
      </div>
      {/* Bottom tab bar: only on calculator page, mobile only */}
      {isCalculatorPage && <MobileTabBar isVisible={barsVisible} />}
    </MobileTabProvider>
  )
}

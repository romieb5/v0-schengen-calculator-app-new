"use client"

import { usePathname } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"

const AUTH_ROUTES = ["/sign-in", "/sign-up", "/reset-password"]

export function LayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isAuthPage = AUTH_ROUTES.includes(pathname)

  if (isAuthPage) {
    return <>{children}</>
  }

  return (
    <>
      <Navigation />
      {children}
      <Footer />
    </>
  )
}

import type { Metadata } from "next"
import { Suspense } from "react"
import { headers } from "next/headers"
import { auth } from "@/lib/auth"
import { SchengenCalculator } from "@/components/schengen-calculator"
import { HomeHero, HomeSections } from "@/components/home-marketing"

export const metadata: Metadata = {
  title: "Schengen 90/180 Calculator & Trip Planner | Schengen Monitor",
  description:
    "Free Schengen 90/180-day calculator and trip planner. Track your past stays, check whether upcoming trips stay compliant, and see your rolling 180-day window.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Schengen 90/180 Calculator & Trip Planner",
    description:
      "Free Schengen calculator and trip planner. Track past stays and check future trips against the 90/180-day rule.",
  },
}

export default async function Home() {
  // Logged-in visitors get the lean calculator. Logged-out visitors (and search
  // crawlers, which are never logged in) get the full SEO homepage.
  let isLoggedIn = false
  try {
    const session = await auth.api.getSession({ headers: await headers() })
    isLoggedIn = Boolean(session)
  } catch {
    isLoggedIn = false
  }

  if (isLoggedIn) {
    return (
      <div className="min-h-screen bg-background">
        <Suspense>
          <SchengenCalculator />
        </Suspense>
      </div>
    )
  }

  return (
    <div className="bg-background">
      <HomeHero />
      <Suspense>
        <SchengenCalculator hideHeading />
      </Suspense>
      <HomeSections />
    </div>
  )
}

"use client"

import { Suspense } from "react"
import { SchengenCalculator } from "@/components/schengen-calculator"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Suspense>
        <SchengenCalculator />
      </Suspense>
    </div>
  )
}

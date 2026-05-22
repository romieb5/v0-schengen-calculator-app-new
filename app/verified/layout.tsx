import type { Metadata } from "next"
import type { ReactNode } from "react"

export const metadata: Metadata = {
  title: "Email Verified | Schengen Monitor",
  robots: { index: false },
}

export default function VerifiedLayout({ children }: { children: ReactNode }) {
  return children
}

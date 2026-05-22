import type { Metadata } from "next"
import type { ReactNode } from "react"

export const metadata: Metadata = {
  title: "Log In | Schengen Monitor",
  robots: { index: false },
}

export default function LogInLayout({ children }: { children: ReactNode }) {
  return children
}

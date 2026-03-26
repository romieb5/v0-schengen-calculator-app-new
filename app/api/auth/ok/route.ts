import { NextResponse } from "next/server"

// Minimal endpoint that returns 200. Used by the sign-in page's hidden form
// submission trick to trigger the browser's "Save password?" prompt in SPAs.
export async function POST() {
  return NextResponse.json({ ok: true })
}

import { NextRequest, NextResponse } from "next/server"
import { getAuthenticatedUser } from "@/lib/api-auth"
import { getPool } from "@/lib/db"
import { rateLimit } from "@/lib/rate-limit"

export async function GET(request: NextRequest) {
  const limited = rateLimit(request, { limit: 20, windowSeconds: 60 })
  if (limited) return limited

  const user = await getAuthenticatedUser()
  if (!user) {
    return NextResponse.json({ hasPaid: false, isAuthenticated: false })
  }

  const result = await getPool().query(
    "SELECT has_paid FROM payment_status WHERE user_id = $1",
    [user.id]
  )

  return NextResponse.json({
    hasPaid: result.rows[0]?.has_paid ?? false,
    isAuthenticated: true,
  })
}

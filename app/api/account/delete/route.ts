import { NextResponse } from "next/server"
import { getAuthenticatedUser } from "@/lib/api-auth"
import { getPool } from "@/lib/db"
import { rateLimit } from "@/lib/rate-limit"
import { logSecurityEvent, requestInfo } from "@/lib/security-logger"
import { z } from "zod"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"

const schema = z.object({
  password: z.string().min(1),
})

export async function POST(request: Request) {
  const limited = rateLimit(request, { limit: 5, windowSeconds: 60 })
  if (limited) return limited

  const user = await getAuthenticatedUser()
  if (!user) {
    logSecurityEvent({ ...requestInfo(request), type: "api.unauthorized" })
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  // Require password confirmation for account deletion
  const body = await request.json().catch(() => null)
  const parsed = schema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: "Password is required to delete your account" }, { status: 400 })
  }

  // Verify the password by attempting a sign-in check via BetterAuth
  try {
    const verifyRes = await auth.api.signInEmail({
      body: { email: user.email, password: parsed.data.password },
      headers: await headers(),
    })
    if (!verifyRes?.user) {
      logSecurityEvent({ ...requestInfo(request), type: "auth.sign_in_failure", userId: user.id, message: "Incorrect password on account deletion" })
      return NextResponse.json({ error: "Incorrect password" }, { status: 403 })
    }
  } catch {
    logSecurityEvent({ ...requestInfo(request), type: "auth.sign_in_failure", userId: user.id, message: "Incorrect password on account deletion" })
    return NextResponse.json({ error: "Incorrect password" }, { status: 403 })
  }

  // Delete all user data in a single transaction to avoid partial deletion
  const client = await getPool().connect()
  try {
    await client.query("BEGIN")
    await client.query("DELETE FROM payment_status WHERE user_id = $1", [user.id])
    await client.query("DELETE FROM proposed_trips WHERE user_id = $1", [user.id])
    await client.query("DELETE FROM stays WHERE user_id = $1", [user.id])
    await client.query("DELETE FROM session WHERE \"userId\" = $1", [user.id])
    await client.query("DELETE FROM account WHERE \"userId\" = $1", [user.id])
    await client.query("DELETE FROM \"user\" WHERE id = $1", [user.id])
    await client.query("COMMIT")
  } catch {
    await client.query("ROLLBACK")
    logSecurityEvent({ ...requestInfo(request), type: "api.error", userId: user.id, message: "Failed to delete account" })
    return NextResponse.json({ error: "Failed to delete account" }, { status: 500 })
  } finally {
    client.release()
  }

  logSecurityEvent({ ...requestInfo(request), type: "auth.account_deleted", userId: user.id })
  return NextResponse.json({ success: true })
}

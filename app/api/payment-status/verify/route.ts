import { NextRequest, NextResponse } from "next/server"
import { getAuthenticatedUser } from "@/lib/api-auth"
import { getPool } from "@/lib/db"
import { getStripe } from "@/lib/stripe"
import { rateLimit } from "@/lib/rate-limit"

/**
 * POST /api/payment-status/verify
 *
 * Checks Stripe directly for a completed checkout session for this user,
 * and updates the database if payment is confirmed. This handles cases
 * where the webhook hasn't arrived yet (e.g. local dev, delayed delivery).
 */
export async function POST(request: NextRequest) {
  const limited = rateLimit(request, { limit: 5, windowSeconds: 60 })
  if (limited) return limited

  const user = await getAuthenticatedUser()
  if (!user) {
    return NextResponse.json({ hasPaid: false, isAuthenticated: false })
  }

  // Check if already marked as paid in DB
  const existing = await getPool().query(
    "SELECT has_paid, stripe_customer_id FROM payment_status WHERE user_id = $1",
    [user.id]
  )

  if (existing.rows[0]?.has_paid) {
    return NextResponse.json({ hasPaid: true, isAuthenticated: true })
  }

  const stripeCustomerId = existing.rows[0]?.stripe_customer_id
  if (!stripeCustomerId) {
    return NextResponse.json({ hasPaid: false, isAuthenticated: true })
  }

  // Query Stripe for completed checkout sessions for this customer
  try {
    const sessions = await getStripe().checkout.sessions.list({
      customer: stripeCustomerId,
      status: "complete",
      limit: 5,
    })

    const paidSession = sessions.data.find(
      (s) =>
        s.payment_status === "paid" &&
        s.mode === "payment" &&
        s.metadata?.userId === user.id
    )

    if (paidSession) {
      // Update database — mirrors the webhook logic
      await getPool().query(
        `INSERT INTO payment_status (user_id, has_paid, stripe_customer_id, stripe_payment_id, paid_at)
         VALUES ($1, TRUE, $2, $3, NOW())
         ON CONFLICT (user_id) DO UPDATE SET
           has_paid = TRUE,
           stripe_customer_id = COALESCE($2, payment_status.stripe_customer_id),
           stripe_payment_id = $3,
           paid_at = NOW()`,
        [user.id, stripeCustomerId, paidSession.payment_intent as string]
      )

      return NextResponse.json({ hasPaid: true, isAuthenticated: true })
    }
  } catch {
    // If Stripe call fails, fall back to DB state
  }

  return NextResponse.json({ hasPaid: false, isAuthenticated: true })
}

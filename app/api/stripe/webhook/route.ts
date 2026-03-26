import { NextRequest, NextResponse } from "next/server"
import { getStripe } from "@/lib/stripe"
import { getPool } from "@/lib/db"
import Stripe from "stripe"
import { sendPaymentReceiptEmail } from "@/lib/email"
import { rateLimit } from "@/lib/rate-limit"
import { logSecurityEvent, requestInfo } from "@/lib/security-logger"

export async function POST(request: NextRequest) {
  const limited = rateLimit(request, { limit: 20, windowSeconds: 60 })
  if (limited) return limited

  const body = await request.text()
  const signature = request.headers.get("stripe-signature")

  if (!signature) {
    logSecurityEvent({ ...requestInfo(request), type: "payment.webhook_invalid_signature", message: "Missing stripe-signature header" })
    return NextResponse.json({ error: "Missing signature" }, { status: 400 })
  }

  let event: Stripe.Event
  try {
    event = getStripe().webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch {
    logSecurityEvent({ ...requestInfo(request), type: "payment.webhook_invalid_signature", message: "Stripe signature verification failed" })
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 })
  }

  // Idempotency: skip already-processed events
  const { rows: existingEvent } = await getPool().query(
    "SELECT 1 FROM processed_webhook_events WHERE event_id = $1",
    [event.id]
  )
  if (existingEvent.length > 0) {
    return NextResponse.json({ received: true })
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session
    const userId = session.metadata?.userId

    if (
      userId &&
      session.payment_status === "paid" &&
      session.mode === "payment"
    ) {
      await getPool().query(
        `INSERT INTO payment_status (user_id, has_paid, stripe_customer_id, stripe_payment_id, paid_at)
         VALUES ($1, TRUE, $2, $3, NOW())
         ON CONFLICT (user_id) DO UPDATE SET
           has_paid = TRUE,
           stripe_customer_id = COALESCE($2, payment_status.stripe_customer_id),
           stripe_payment_id = $3,
           paid_at = NOW()`,
        [userId, session.customer as string, session.payment_intent as string]
      )

      // Send payment receipt email
      if (session.customer_details?.email) {
        const amount = session.amount_total
          ? `$${(session.amount_total / 100).toFixed(2)}`
          : "$4.99"
        try {
          await sendPaymentReceiptEmail(session.customer_details.email, amount)
        } catch {
          // Don't fail the webhook if email fails
        }
      }
    }
  }

  // Mark event as processed
  await getPool().query(
    "INSERT INTO processed_webhook_events (event_id) VALUES ($1) ON CONFLICT DO NOTHING",
    [event.id]
  )

  logSecurityEvent({ ...requestInfo(request), type: "payment.webhook_received", message: event.type, metadata: { eventId: event.id } })
  return NextResponse.json({ received: true })
}

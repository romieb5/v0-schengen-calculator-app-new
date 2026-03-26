import { NextRequest, NextResponse } from "next/server"
import { getStripe } from "@/lib/stripe"
import { getAuthenticatedUser } from "@/lib/api-auth"
import { getPool } from "@/lib/db"
import { rateLimit } from "@/lib/rate-limit"
import { logSecurityEvent, requestInfo } from "@/lib/security-logger"

const CURRENCY_AMOUNTS: Record<string, number> = {
  usd: 500,
  eur: 500,
  gbp: 500,
}

const VALID_CURRENCIES = new Set(Object.keys(CURRENCY_AMOUNTS))

function currencyFromCountry(countryCode: string | null): string {
  if (!countryCode) return "eur"
  const upper = countryCode.toUpperCase()
  if (upper === "GB") return "gbp"
  if (upper === "US" || upper === "CA") return "usd"
  return "eur"
}

export async function POST(request: NextRequest) {
  const limited = rateLimit(request, { limit: 10, windowSeconds: 60 })
  if (limited) return limited

  const user = await getAuthenticatedUser()
  if (!user) {
    logSecurityEvent({ ...requestInfo(request), type: "api.unauthorized" })
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const country = request.headers.get("x-vercel-ip-country")
  const currency = currencyFromCountry(country)
  const unitAmount = CURRENCY_AMOUNTS[currency]

  // Check if user already paid
  const existing = await getPool().query(
    "SELECT has_paid, stripe_customer_id FROM payment_status WHERE user_id = $1",
    [user.id]
  )
  if (existing.rows[0]?.has_paid) {
    return NextResponse.json({ error: "Already paid" }, { status: 400 })
  }

  // Find or create Stripe customer
  let stripeCustomerId: string | null = existing.rows[0]?.stripe_customer_id ?? null

  if (!stripeCustomerId) {
    const customer = await getStripe().customers.create({
      email: user.email,
      metadata: { userId: user.id },
    })
    stripeCustomerId = customer.id

    // Upsert payment_status row with customer ID
    await getPool().query(
      `INSERT INTO payment_status (user_id, stripe_customer_id)
       VALUES ($1, $2)
       ON CONFLICT (user_id) DO UPDATE SET stripe_customer_id = $2`,
      [user.id, stripeCustomerId]
    )
  }

  const session = await getStripe().checkout.sessions.create({
    customer: stripeCustomerId,
    mode: "payment",
    line_items: [
      {
        price_data: {
          currency,
          product_data: {
            name: "Timeline Visualization",
            description: "One-time unlock — track your 90/180 day Schengen status visually",
          },
          unit_amount: unitAmount,
        },
        quantity: 1,
      },
    ],
    metadata: { userId: user.id },
    success_url: `${process.env.BETTER_AUTH_URL || "http://localhost:3000"}/?payment=success`,
    cancel_url: `${process.env.BETTER_AUTH_URL || "http://localhost:3000"}/?payment=cancelled`,
  })

  logSecurityEvent({ ...requestInfo(request), type: "payment.checkout_created", userId: user.id, metadata: { currency } })
  return NextResponse.json({ url: session.url })
}

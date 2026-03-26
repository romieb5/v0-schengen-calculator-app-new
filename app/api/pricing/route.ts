import { NextRequest, NextResponse } from "next/server"
import { rateLimit } from "@/lib/rate-limit"

const CURRENCY_MAP: Record<string, { currency: string; label: string }> = {
  GB: { currency: "gbp", label: "£5" },
  US: { currency: "usd", label: "$5" },
  CA: { currency: "usd", label: "$5" },
}

const DEFAULT_PRICING = { currency: "eur", label: "€5" }

export async function GET(request: NextRequest) {
  const limited = rateLimit(request, { limit: 30, windowSeconds: 60 })
  if (limited) return limited

  const country = request.headers.get("x-vercel-ip-country")
  const pricing = (country && CURRENCY_MAP[country.toUpperCase()]) || DEFAULT_PRICING
  return NextResponse.json(pricing)
}

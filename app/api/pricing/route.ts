import { NextRequest, NextResponse } from "next/server"
import { rateLimit } from "@/lib/rate-limit"

const USD_PRICING = { currency: "usd", label: "$5" }

const CURRENCY_MAP: Record<string, { currency: string; label: string }> = {
  GB: { currency: "gbp", label: "£5" },
  US: USD_PRICING,
  CA: USD_PRICING,
  // Latin America: USD is more familiar than EUR across the region.
  MX: USD_PRICING, GT: USD_PRICING, BZ: USD_PRICING, SV: USD_PRICING,
  HN: USD_PRICING, NI: USD_PRICING, CR: USD_PRICING, PA: USD_PRICING,
  CO: USD_PRICING, VE: USD_PRICING, EC: USD_PRICING, PE: USD_PRICING,
  BO: USD_PRICING, CL: USD_PRICING, AR: USD_PRICING, PY: USD_PRICING,
  UY: USD_PRICING, BR: USD_PRICING, GY: USD_PRICING, SR: USD_PRICING,
  DO: USD_PRICING, CU: USD_PRICING,
}

const DEFAULT_PRICING = { currency: "eur", label: "€5" }

export async function GET(request: NextRequest) {
  const limited = rateLimit(request, { limit: 30, windowSeconds: 60 })
  if (limited) return limited

  const country = request.headers.get("x-vercel-ip-country")
  const pricing = (country && CURRENCY_MAP[country.toUpperCase()]) || DEFAULT_PRICING
  return NextResponse.json(pricing)
}

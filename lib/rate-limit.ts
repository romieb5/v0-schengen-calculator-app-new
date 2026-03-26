import { NextResponse } from "next/server"
import { logSecurityEvent } from "./security-logger"

interface RateLimitEntry {
  count: number
  resetAt: number
}

const store = new Map<string, RateLimitEntry>()

// Clean up expired entries periodically
setInterval(() => {
  const now = Date.now()
  for (const [key, entry] of store) {
    if (now > entry.resetAt) store.delete(key)
  }
}, 60_000)

interface RateLimitOptions {
  /** Max requests allowed in the window */
  limit: number
  /** Window duration in seconds */
  windowSeconds: number
}

/**
 * Simple in-memory rate limiter keyed by IP.
 * Returns null if allowed, or a 429 NextResponse if rate-limited.
 */
export function rateLimit(
  request: Request,
  { limit, windowSeconds }: RateLimitOptions
): NextResponse | null {
  const forwarded = request.headers.get("x-forwarded-for")
  const ip = forwarded?.split(",")[0]?.trim() ?? request.headers.get("x-real-ip") ?? "127.0.0.1"
  const path = new URL(request.url).pathname
  const key = `${ip}:${path}`
  const now = Date.now()

  const entry = store.get(key)

  if (!entry || now > entry.resetAt) {
    store.set(key, { count: 1, resetAt: now + windowSeconds * 1000 })
    return null
  }

  entry.count++

  if (entry.count > limit) {
    logSecurityEvent({
      type: "rate_limit.exceeded",
      ip,
      path,
      method: request.method,
      message: `${entry.count} requests in ${windowSeconds}s (limit: ${limit})`,
    })

    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429 }
    )
  }

  return null
}

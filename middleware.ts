import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { Ratelimit } from "@upstash/ratelimit"
import { Redis } from "@upstash/redis"

// ---------------------------------------------------------------------------
// Rate limiting — Upstash Redis in production, in-memory fallback for dev
// ---------------------------------------------------------------------------

interface RateLimitResult {
  success: boolean
}

interface RateLimiter {
  limit(key: string): Promise<RateLimitResult>
}

const isRedisConfigured =
  !!process.env.UPSTASH_REDIS_REST_URL && !!process.env.UPSTASH_REDIS_REST_TOKEN

function createUpstashLimiters() {
  const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL!,
    token: process.env.UPSTASH_REDIS_REST_TOKEN!,
  })

  return {
    global: new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(120, "60 s"),
      prefix: "rl:global",
    }),
  }
}

// Simple in-memory fallback for local dev (same logic as before)
function createMemoryLimiters() {
  interface Entry { count: number; resetAt: number }
  const store = new Map<string, Entry>()

  // Periodic cleanup
  setInterval(() => {
    const now = Date.now()
    for (const [key, entry] of store) {
      if (now > entry.resetAt) store.delete(key)
    }
  }, 30_000)

  function makeMemoryLimiter(maxRequests: number, windowMs: number): RateLimiter {
    return {
      async limit(key: string) {
        const now = Date.now()
        const entry = store.get(key)
        if (!entry || now > entry.resetAt) {
          store.set(key, { count: 1, resetAt: now + windowMs })
          return { success: true }
        }
        entry.count++
        return { success: entry.count <= maxRequests }
      },
    }
  }

  return {
    global: makeMemoryLimiter(120, 60_000),
  }
}

const limiters = isRedisConfigured ? createUpstashLimiters() : createMemoryLimiters()


// ---------------------------------------------------------------------------
// Bot detection signals
// ---------------------------------------------------------------------------
function hasBotSignals(request: NextRequest): boolean {
  const ua = request.headers.get("user-agent") ?? ""

  // Block requests with no user-agent (most browsers always send one)
  if (!ua) return true

  // Block well-known bot / scraper user-agents hitting auth or API routes
  const botPatterns = /bot|crawl|spider|scrape|curl|wget|httpie|python-requests|axios\/|node-fetch|go-http-client|java\/|perl|ruby/i
  const path = request.nextUrl.pathname

  // Only block bots on API and auth routes, not on public pages (let search engines crawl those)
  if (path.startsWith("/api/") && botPatterns.test(ua)) {
    return true
  }

  return false
}

function getIp(request: NextRequest): string {
  return (
    request.headers.get("x-real-ip") ??
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "127.0.0.1"
  )
}

// ---------------------------------------------------------------------------
// Middleware
// ---------------------------------------------------------------------------
export async function middleware(request: NextRequest) {
  // 1. Enforce HTTPS in production
  if (
    process.env.NODE_ENV === "production" &&
    request.headers.get("x-forwarded-proto") !== "https"
  ) {
    const httpsUrl = new URL(request.url)
    httpsUrl.protocol = "https:"
    return NextResponse.redirect(httpsUrl, 301)
  }

  const ip = getIp(request)

  // 2. Block bots on API routes
  if (hasBotSignals(request)) {
    return NextResponse.json(
      { error: "Forbidden" },
      { status: 403 }
    )
  }

  // 3. Global per-IP rate limit across all routes
  const { success } = await limiters.global.limit(ip)
  if (!success) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429 }
    )
  }

  return NextResponse.next()
}

export const config = {
  // Run on all routes except static assets and Next.js internals
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
}

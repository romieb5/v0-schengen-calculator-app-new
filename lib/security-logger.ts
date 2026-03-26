type SecurityEventType =
  | "auth.sign_in_success"
  | "auth.sign_in_failure"
  | "auth.sign_up"
  | "auth.password_reset_request"
  | "auth.password_reset_complete"
  | "auth.password_change"
  | "auth.email_verified"
  | "auth.account_deleted"
  | "rate_limit.exceeded"
  | "api.error"
  | "api.unauthorized"
  | "api.validation_error"
  | "payment.checkout_created"
  | "payment.webhook_received"
  | "payment.webhook_invalid_signature"
  | "suspicious.repeated_failures"

interface SecurityEvent {
  type: SecurityEventType
  ip: string
  userId?: string
  email?: string
  path?: string
  method?: string
  statusCode?: number
  message?: string
  metadata?: Record<string, unknown>
}

// Track repeated failures per IP for anomaly detection
const failureTracker = new Map<string, { count: number; firstSeen: number }>()
const FAILURE_WINDOW_MS = 5 * 60 * 1000 // 5 minutes
const FAILURE_THRESHOLD = 10

function getIp(request?: Request): string {
  if (!request) return "unknown"
  const forwarded = request.headers.get("x-forwarded-for")
  return forwarded?.split(",")[0]?.trim() ?? "unknown"
}

function formatEvent(event: SecurityEvent): string {
  const timestamp = new Date().toISOString()
  const parts = [
    `[security] ${timestamp}`,
    `type=${event.type}`,
    `ip=${event.ip}`,
  ]

  if (event.userId) parts.push(`userId=${event.userId}`)
  if (event.email) parts.push(`email=${maskEmail(event.email)}`)
  if (event.path) parts.push(`path=${event.path}`)
  if (event.method) parts.push(`method=${event.method}`)
  if (event.statusCode) parts.push(`status=${event.statusCode}`)
  if (event.message) parts.push(`msg="${event.message}"`)
  if (event.metadata) parts.push(`meta=${JSON.stringify(event.metadata)}`)

  return parts.join(" ")
}

function maskEmail(email: string): string {
  const [local, domain] = email.split("@")
  if (!local || !domain) return "***"
  const masked = local.length <= 2
    ? "*".repeat(local.length)
    : local[0] + "*".repeat(local.length - 2) + local[local.length - 1]
  return `${masked}@${domain}`
}

function trackFailure(ip: string, event: SecurityEvent): void {
  const now = Date.now()
  const entry = failureTracker.get(ip)

  if (!entry || now - entry.firstSeen > FAILURE_WINDOW_MS) {
    failureTracker.set(ip, { count: 1, firstSeen: now })
    return
  }

  entry.count++

  if (entry.count === FAILURE_THRESHOLD) {
    // Log anomaly — this IP has hit too many failures in the window
    console.warn(formatEvent({
      type: "suspicious.repeated_failures",
      ip,
      message: `${entry.count} failures in ${Math.round((now - entry.firstSeen) / 1000)}s`,
      metadata: { triggeringEvent: event.type },
    }))
  }
}

// Clean up old failure tracking entries
setInterval(() => {
  const now = Date.now()
  for (const [ip, entry] of failureTracker) {
    if (now - entry.firstSeen > FAILURE_WINDOW_MS) failureTracker.delete(ip)
  }
}, 60_000)

/**
 * Log a structured security event to stdout/stderr.
 * In production, these are picked up by Vercel's log drain or any log aggregator.
 */
export function logSecurityEvent(event: SecurityEvent): void {
  const formatted = formatEvent(event)
  const isError = event.type.includes("failure") ||
    event.type.includes("error") ||
    event.type.includes("invalid") ||
    event.type.includes("suspicious") ||
    event.type === "rate_limit.exceeded"

  if (isError) {
    console.warn(formatted)
  } else {
    console.info(formatted)
  }

  // Track failures for anomaly detection
  if (event.type.includes("failure") || event.type === "rate_limit.exceeded" || event.type === "api.unauthorized") {
    trackFailure(event.ip, event)
  }
}

/**
 * Helper to extract common request info for logging.
 */
export function requestInfo(request: Request): { ip: string; path: string; method: string } {
  return {
    ip: getIp(request),
    path: new URL(request.url).pathname,
    method: request.method,
  }
}

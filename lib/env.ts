import { z } from "zod"

const serverEnvSchema = z.object({
  DATABASE_URL: z.string().min(1, "DATABASE_URL is required"),
  BETTER_AUTH_SECRET: z.string().min(16, "BETTER_AUTH_SECRET must be at least 16 characters"),
  BETTER_AUTH_URL: z.string().url("BETTER_AUTH_URL must be a valid URL"),
  RESEND_API_KEY: z.string().min(1, "RESEND_API_KEY is required"),
  STRIPE_SECRET_KEY: z.string().min(1, "STRIPE_SECRET_KEY is required"),
  STRIPE_WEBHOOK_SECRET: z.string().min(1, "STRIPE_WEBHOOK_SECRET is required"),
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1, "SUPABASE_SERVICE_ROLE_KEY is required"),
  NEXT_PUBLIC_SUPABASE_URL: z.string().url("NEXT_PUBLIC_SUPABASE_URL must be a valid URL"),
})

let validated = false

/**
 * Validate that all required environment variables are present and well-formed.
 * Call once at app startup (e.g., in auth.ts or a top-level API route).
 * Throws immediately if any are missing — fail fast, don't serve requests with broken config.
 */
export function validateEnv(): void {
  if (validated) return
  const result = serverEnvSchema.safeParse(process.env)
  if (!result.success) {
    const missing = result.error.issues.map((i) => `  - ${i.path.join(".")}: ${i.message}`)
    console.error(`[env] Missing or invalid environment variables:\n${missing.join("\n")}`)
    if (process.env.NODE_ENV === "production") {
      throw new Error("Server misconfigured — missing required environment variables")
    }
  }
  validated = true
}

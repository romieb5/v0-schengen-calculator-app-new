import { createClient } from "@supabase/supabase-js"

// Server-side client with service role key (bypasses RLS)
// Only use in API routes / server code
export function getSupabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!url || !key) {
    throw new Error("Missing Supabase environment variables")
  }

  return createClient(url, key)
}

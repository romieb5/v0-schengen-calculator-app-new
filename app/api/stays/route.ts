import { NextResponse } from "next/server"
import { getAuthenticatedUser } from "@/lib/api-auth"
import { getSupabaseAdmin } from "@/lib/supabase"
import { rateLimit } from "@/lib/rate-limit"
import { logSecurityEvent, requestInfo } from "@/lib/security-logger"
import { z } from "zod"

const staySchema = z.object({
  entryDate: z.string().date(),
  exitDate: z.string().date(),
  stayType: z.enum(["short", "residence"]),
  countryCode: z.string().max(3).optional(),
  hidden: z.boolean().optional(),
}).refine((d) => d.exitDate >= d.entryDate, {
  message: "exitDate must be on or after entryDate",
})

export async function GET(request: Request) {
  const limited = rateLimit(request, { limit: 60, windowSeconds: 60 })
  if (limited) return limited

  const user = await getAuthenticatedUser()
  if (!user) {
    logSecurityEvent({ ...requestInfo(request), type: "api.unauthorized" })
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const supabase = getSupabaseAdmin()
  const { data, error } = await supabase
    .from("stays")
    .select("*")
    .eq("user_id", user.id)
    .order("entry_date", { ascending: true })

  if (error) return NextResponse.json({ error: "Failed to fetch stays" }, { status: 500 })

  return NextResponse.json(data)
}

export async function POST(request: Request) {
  const limited = rateLimit(request, { limit: 30, windowSeconds: 60 })
  if (limited) return limited

  const user = await getAuthenticatedUser()
  if (!user) {
    logSecurityEvent({ ...requestInfo(request), type: "api.unauthorized" })
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const body = await request.json().catch(() => null)
  const parsed = staySchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid stay data", details: parsed.error.issues }, { status: 400 })
  }

  const { entryDate, exitDate, stayType, countryCode, hidden } = parsed.data

  const supabase = getSupabaseAdmin()
  const { data, error } = await supabase
    .from("stays")
    .insert({
      user_id: user.id,
      entry_date: entryDate,
      exit_date: exitDate,
      stay_type: stayType,
      country_code: countryCode || null,
      hidden: hidden ?? false,
    })
    .select()
    .single()

  if (error) return NextResponse.json({ error: "Failed to create stay" }, { status: 500 })

  return NextResponse.json(data, { status: 201 })
}

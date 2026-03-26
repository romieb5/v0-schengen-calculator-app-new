import { NextResponse } from "next/server"
import { getAuthenticatedUser } from "@/lib/api-auth"
import { getSupabaseAdmin } from "@/lib/supabase"
import { rateLimit } from "@/lib/rate-limit"
import { logSecurityEvent, requestInfo } from "@/lib/security-logger"
import { z } from "zod"

// Extract "YYYY-MM-DD" from any date string (ISO datetime or date-only).
// Never round-trips through a Date object, so timezone cannot shift the date.
function toDateOnly(s: string): string {
  return s.slice(0, 10)
}

const DATE_REGEX = /^\d{4}-\d{2}-\d{2}/

const localStaySchema = z.object({
  entryDate: z.string().refine((s) => DATE_REGEX.test(s), { message: "Invalid date" }),
  exitDate: z.string().refine((s) => DATE_REGEX.test(s), { message: "Invalid date" }),
  stayType: z.enum(["short", "residence"]),
  countryCode: z.string().max(3).optional(),
  hidden: z.boolean().optional(),
}).refine((d) => toDateOnly(d.exitDate) >= toDateOnly(d.entryDate), {
  message: "exitDate must be on or after entryDate",
})

const localTripSchema = z.object({
  entryDate: z.string().refine((s) => DATE_REGEX.test(s), { message: "Invalid date" }),
  exitDate: z.string().refine((s) => DATE_REGEX.test(s), { message: "Invalid date" }),
  hidden: z.boolean().optional(),
}).refine((d) => toDateOnly(d.exitDate) >= toDateOnly(d.entryDate), {
  message: "exitDate must be on or after entryDate",
})

const importSchema = z.object({
  stays: z.array(localStaySchema).max(500).optional(),
  proposedTrips: z.array(localTripSchema).max(500).optional(),
})

export async function POST(request: Request) {
  const limited = rateLimit(request, { limit: 5, windowSeconds: 60 })
  if (limited) return limited

  const user = await getAuthenticatedUser()
  if (!user) {
    logSecurityEvent({ ...requestInfo(request), type: "api.unauthorized" })
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const body = await request.json().catch(() => null)
  const parsed = importSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid import data" }, { status: 400 })
  }

  const { stays, proposedTrips } = parsed.data
  const supabase = getSupabaseAdmin()
  const results = { staysImported: 0, tripsImported: 0 }

  if (stays?.length) {
    const { data: existing } = await supabase
      .from("stays")
      .select("entry_date, exit_date, stay_type")
      .eq("user_id", user.id)

    const existingSet = new Set(
      (existing ?? []).map((s) => `${s.entry_date}|${s.exit_date}|${s.stay_type}`),
    )

    const newStays = stays
      .filter((s) => {
        const entryDate = toDateOnly(s.entryDate)
        const exitDate = toDateOnly(s.exitDate)
        return !existingSet.has(`${entryDate}|${exitDate}|${s.stayType}`)
      })
      .map((s) => ({
        user_id: user.id,
        entry_date: toDateOnly(s.entryDate),
        exit_date: toDateOnly(s.exitDate),
        stay_type: s.stayType,
        country_code: s.countryCode || null,
        hidden: s.hidden ?? false,
      }))

    if (newStays.length) {
      const { error } = await supabase.from("stays").insert(newStays)
      if (error) return NextResponse.json({ error: "Failed to import stays" }, { status: 500 })
      results.staysImported = newStays.length
    }
  }

  if (proposedTrips?.length) {
    const { data: existing } = await supabase
      .from("proposed_trips")
      .select("entry_date, exit_date")
      .eq("user_id", user.id)

    const existingSet = new Set(
      (existing ?? []).map((t) => `${t.entry_date}|${t.exit_date}`),
    )

    const newTrips = proposedTrips
      .filter((t) => {
        const entryDate = toDateOnly(t.entryDate)
        const exitDate = toDateOnly(t.exitDate)
        return !existingSet.has(`${entryDate}|${exitDate}`)
      })
      .map((t) => ({
        user_id: user.id,
        entry_date: toDateOnly(t.entryDate),
        exit_date: toDateOnly(t.exitDate),
        hidden: t.hidden ?? false,
      }))

    if (newTrips.length) {
      const { error } = await supabase.from("proposed_trips").insert(newTrips)
      if (error) return NextResponse.json({ error: "Failed to import trips" }, { status: 500 })
      results.tripsImported = newTrips.length
    }
  }

  return NextResponse.json(results, { status: 201 })
}

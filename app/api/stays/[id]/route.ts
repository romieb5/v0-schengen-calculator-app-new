import { NextResponse } from "next/server"
import { getAuthenticatedUser } from "@/lib/api-auth"
import { getSupabaseAdmin } from "@/lib/supabase"
import { rateLimit } from "@/lib/rate-limit"
import { z } from "zod"

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

const stayUpdateSchema = z.object({
  entryDate: z.string().date(),
  exitDate: z.string().date(),
  stayType: z.enum(["short", "residence"]),
  countryCode: z.string().max(3).optional(),
  hidden: z.boolean().optional(),
}).refine((d) => d.exitDate >= d.entryDate, {
  message: "exitDate must be on or after entryDate",
})

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const limited = rateLimit(request, { limit: 30, windowSeconds: 60 })
  if (limited) return limited

  const user = await getAuthenticatedUser()
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { id } = await params
  if (!UUID_REGEX.test(id)) {
    return NextResponse.json({ error: "Invalid stay ID" }, { status: 400 })
  }

  const body = await request.json().catch(() => null)
  const parsed = stayUpdateSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid stay data", details: parsed.error.issues }, { status: 400 })
  }

  const { entryDate, exitDate, stayType, countryCode, hidden } = parsed.data

  const supabase = getSupabaseAdmin()
  const { data, error } = await supabase
    .from("stays")
    .update({
      entry_date: entryDate,
      exit_date: exitDate,
      stay_type: stayType,
      country_code: countryCode || null,
      hidden: hidden ?? false,
    })
    .eq("id", id)
    .eq("user_id", user.id)
    .select()
    .single()

  if (error) {
    console.error("[PUT /api/stays] Supabase error:", error)
    return NextResponse.json({ error: "Failed to update stay", details: error.message }, { status: 500 })
  }

  return NextResponse.json(data)
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const limited = rateLimit(request, { limit: 30, windowSeconds: 60 })
  if (limited) return limited

  const user = await getAuthenticatedUser()
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { id } = await params
  if (!UUID_REGEX.test(id)) {
    return NextResponse.json({ error: "Invalid stay ID" }, { status: 400 })
  }

  const supabase = getSupabaseAdmin()
  const { error } = await supabase
    .from("stays")
    .delete()
    .eq("id", id)
    .eq("user_id", user.id)

  if (error) return NextResponse.json({ error: "Failed to delete stay" }, { status: 500 })

  return NextResponse.json({ success: true })
}

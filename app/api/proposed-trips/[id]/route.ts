import { NextResponse } from "next/server"
import { getAuthenticatedUser } from "@/lib/api-auth"
import { getSupabaseAdmin } from "@/lib/supabase"
import { rateLimit } from "@/lib/rate-limit"
import { z } from "zod"

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

const tripUpdateSchema = z.object({
  entryDate: z.string().date(),
  exitDate: z.string().date(),
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
    return NextResponse.json({ error: "Invalid trip ID" }, { status: 400 })
  }

  const body = await request.json().catch(() => null)
  const parsed = tripUpdateSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid trip data", details: parsed.error.issues }, { status: 400 })
  }

  const { entryDate, exitDate, hidden } = parsed.data

  const supabase = getSupabaseAdmin()
  const { data, error } = await supabase
    .from("proposed_trips")
    .update({
      entry_date: entryDate,
      exit_date: exitDate,
      hidden: hidden ?? false,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .eq("user_id", user.id)
    .select()
    .single()

  if (error) return NextResponse.json({ error: "Failed to update trip" }, { status: 500 })

  return NextResponse.json(data)
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const limited = rateLimit(request, { limit: 30, windowSeconds: 60 })
  if (limited) return limited

  const user = await getAuthenticatedUser()
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { id } = await params
  if (!UUID_REGEX.test(id)) {
    return NextResponse.json({ error: "Invalid trip ID" }, { status: 400 })
  }

  const supabase = getSupabaseAdmin()
  const { error } = await supabase
    .from("proposed_trips")
    .delete()
    .eq("id", id)
    .eq("user_id", user.id)

  if (error) return NextResponse.json({ error: "Failed to delete trip" }, { status: 500 })

  return NextResponse.json({ success: true })
}

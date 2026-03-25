import { NextResponse } from "next/server"
import { getAuthenticatedUser } from "@/lib/api-auth"
import { getSupabaseAdmin } from "@/lib/supabase"

export async function GET() {
  const user = await getAuthenticatedUser()
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const supabase = getSupabaseAdmin()
  const { data, error } = await supabase
    .from("stays")
    .select("*")
    .eq("user_id", user.id)
    .order("entry_date", { ascending: true })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  return NextResponse.json(data)
}

export async function POST(request: Request) {
  const user = await getAuthenticatedUser()
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const body = await request.json()
  const { entryDate, exitDate, stayType, countryCode, hidden } = body

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

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  return NextResponse.json(data, { status: 201 })
}

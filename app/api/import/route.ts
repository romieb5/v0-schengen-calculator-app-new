import { NextResponse } from "next/server"
import { getAuthenticatedUser } from "@/lib/api-auth"
import { getSupabaseAdmin } from "@/lib/supabase"

interface LocalStay {
  entryDate: string
  exitDate: string
  stayType: string
  countryCode?: string
  hidden?: boolean
}

interface LocalTrip {
  entryDate: string
  exitDate: string
  hidden?: boolean
}

export async function POST(request: Request) {
  const user = await getAuthenticatedUser()
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const body = await request.json()
  const { stays, proposedTrips } = body as {
    stays?: LocalStay[]
    proposedTrips?: LocalTrip[]
  }

  const supabase = getSupabaseAdmin()
  const results = { staysImported: 0, tripsImported: 0 }

  if (stays?.length) {
    // Check for existing stays to avoid duplicates
    const { data: existing } = await supabase
      .from("stays")
      .select("entry_date, exit_date, stay_type")
      .eq("user_id", user.id)

    const existingSet = new Set(
      (existing ?? []).map((s) => `${s.entry_date}|${s.exit_date}|${s.stay_type}`),
    )

    const newStays = stays
      .filter((s) => {
        const entryDate = new Date(s.entryDate).toISOString().split("T")[0]
        const exitDate = new Date(s.exitDate).toISOString().split("T")[0]
        return !existingSet.has(`${entryDate}|${exitDate}|${s.stayType}`)
      })
      .map((s) => ({
        user_id: user.id,
        entry_date: new Date(s.entryDate).toISOString().split("T")[0],
        exit_date: new Date(s.exitDate).toISOString().split("T")[0],
        stay_type: s.stayType,
        country_code: s.countryCode || null,
        hidden: s.hidden ?? false,
      }))

    if (newStays.length) {
      const { error } = await supabase.from("stays").insert(newStays)
      if (error) return NextResponse.json({ error: error.message }, { status: 500 })
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
        const entryDate = new Date(t.entryDate).toISOString().split("T")[0]
        const exitDate = new Date(t.exitDate).toISOString().split("T")[0]
        return !existingSet.has(`${entryDate}|${exitDate}`)
      })
      .map((t) => ({
        user_id: user.id,
        entry_date: new Date(t.entryDate).toISOString().split("T")[0],
        exit_date: new Date(t.exitDate).toISOString().split("T")[0],
        hidden: t.hidden ?? false,
      }))

    if (newTrips.length) {
      const { error } = await supabase.from("proposed_trips").insert(newTrips)
      if (error) return NextResponse.json({ error: error.message }, { status: 500 })
      results.tripsImported = newTrips.length
    }
  }

  return NextResponse.json(results, { status: 201 })
}

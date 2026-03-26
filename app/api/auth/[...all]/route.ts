import { auth } from "@/lib/auth"
import { toNextJsHandler } from "better-auth/next-js"

const handler = toNextJsHandler(auth)

export const GET = handler.GET

export async function POST(request: Request) {
  try {
    return await handler.POST(request)
  } catch (error) {
    console.error("[auth POST] Unhandled error:", error instanceof Error ? error.message : error)
    console.error("[auth POST] Stack:", error instanceof Error ? error.stack : "no stack")
    throw error
  }
}

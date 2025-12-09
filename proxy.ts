import { type NextRequest, NextResponse } from "next/server"
import { locales, defaultLocale } from "./i18n/config"

export function proxy(request: NextRequest) {
  // Get locale from cookie or accept-language header
  const cookieLocale = request.cookies.get("NEXT_LOCALE")?.value
  const headerLocale = request.headers.get("accept-language")?.split(",")[0]?.split("-")[0]

  const locale = (
    cookieLocale && locales.includes(cookieLocale as any)
      ? cookieLocale
      : locales.includes(headerLocale as any)
        ? headerLocale
        : defaultLocale
  ) as string

  const response = NextResponse.next()
  response.cookies.set("NEXT_LOCALE", locale)

  return response
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
}

import { getRequestConfig } from "next-intl/server"
import { cookies, headers } from "next/headers"
import { defaultLocale, locales } from "./config"

export default getRequestConfig(async () => {
  let locale = defaultLocale

  try {
    // Try to get locale from cookies (runtime only)
    const cookieStore = await cookies()
    const cookieLocale = cookieStore.get("NEXT_LOCALE")?.value

    if (cookieLocale && locales.includes(cookieLocale as any)) {
      locale = cookieLocale
    } else {
      // Fallback to accept-language header
      const headersList = await headers()
      const acceptLanguage = headersList.get("accept-language")
      const headerLocale = acceptLanguage?.split(",")[0]?.split("-")[0]

      if (headerLocale && locales.includes(headerLocale as any)) {
        locale = headerLocale
      }
    }
  } catch (error) {
    // During build time, cookies/headers aren't available, use default locale
    locale = defaultLocale
  }

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  }
})

// Pings IndexNow (Bing, Yandex, and other participating search engines) with
// the site's content URLs after a production build, so new and updated pages
// get crawled quickly. Wired into `pnpm build` via the build script.
//
// This never fails the build: it skips on non-production environments and
// catches every error.

import { readdirSync } from "node:fs"
import { join } from "node:path"

const KEY = "4cabb7e361000eed4883f4e03fb294fb"
const HOST = "www.schengenmonitor.com"
const BASE = `https://${HOST}`

// Only ping on real production deploys. Local builds leave VERCEL_ENV unset;
// Vercel preview deploys set it to "preview".
if (process.env.VERCEL_ENV !== "production") {
  console.log("[indexnow] skipped (not a production deploy)")
  process.exit(0)
}

const staticRoutes = ["/", "/how-it-works", "/faq", "/blog", "/about", "/contact"]

let blogRoutes = []
try {
  blogRoutes = readdirSync(join(process.cwd(), "lib", "blog", "posts"))
    .filter((file) => file.endsWith(".tsx"))
    .map((file) => `/blog/${file.replace(/\.tsx$/, "")}`)
} catch (error) {
  console.warn("[indexnow] could not read blog posts:", error?.message ?? error)
}

const urlList = [...staticRoutes, ...blogRoutes].map((path) => BASE + path)

try {
  const response = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({
      host: HOST,
      key: KEY,
      keyLocation: `${BASE}/${KEY}.txt`,
      urlList,
    }),
  })
  console.log(`[indexnow] submitted ${urlList.length} URLs, response ${response.status}`)
} catch (error) {
  console.warn("[indexnow] submission failed (ignored):", error?.message ?? error)
}

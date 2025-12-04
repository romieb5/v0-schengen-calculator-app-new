import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",            // API routes shouldn't be indexed
          "/private/",        // in case you add protected pages later
          "/dashboard/",      // optional if you plan logged-in features
          "/server-sitemap.xml", // Next.js internal sitemap route (if used)
        ],
      },
      // Optional: block AI crawlers if desired
      {
        userAgent: "GPTBot",
        disallow: "/",       // blocks OpenAI's crawler
      },
      {
        userAgent: "CCBot",
        disallow: "/",       // blocks CommonCrawl (optional)
      },
      {
        userAgent: "anthropic-ai",
        disallow: "/",       // blocks Claude crawler (optional)
      },
    ],
    sitemap: "https://www.schengenmonitor.com/sitemap.xml",
    host: "https://www.schengenmonitor.com",
  };
}

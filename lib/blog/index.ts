export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  category: string
  date: string // ISO date string (first published)
  updated?: string // ISO date string (last meaningful edit); falls back to date
  readTime: string
  heroImage?: string // path in /public/blog/
  author: {
    name: string
    avatar: string // path in /public/blog/
  }
}

export const authors = {
  romie: {
    name: "Romie Bajwa",
    avatar: "/blog/author-romie.webp",
  },
} as const

// Add new posts to the top of this array
export const posts: BlogPost[] = [
  {
    slug: "etias-2026-launch-guide",
    title: "ETIAS Launches in Late 2026: What It Is, Who Needs It, and How to Prepare",
    excerpt:
      "Europe's new travel authorisation goes live in the last quarter of 2026. Here's exactly what ETIAS is, who needs one, what the €20 fee and 3-year validity mean, and why it does not add a single day to your 90/180 allowance.",
    category: "Border Control",
    date: "2026-07-13",
    readTime: "7 min read",
    heroImage: "/blog/etias-2026-launch-hero.webp",
    author: authors.romie,
  },
  {
    slug: "schengen-90-180-rule-uk-citizens",
    title: "The 90/180 Rule for British Citizens: How Brexit Changed Everything (And Will France or Spain Ever Scrap It?)",
    excerpt:
      "Since Brexit, British travelers get just 90 days in any 180 across the whole Schengen Area. Here's exactly how it works for UK passport holders, what it means for second-home owners in France and Spain, and whether the campaigns to scrap it are going anywhere.",
    category: "Compliance",
    date: "2026-06-01",
    readTime: "7 min read",
    heroImage: "/blog/uk-90-180-rule-hero.webp",
    author: authors.romie,
  },
  {
    slug: "how-to-reset-schengen-days",
    title: "How to Reset Your Schengen 90/180 Days (And Why There Is No Reset Button)",
    excerpt:
      "There is no button that gives you a fresh 90 days. Your Schengen days come back one at a time, exactly 180 days after each one was used. Here is how the reset actually works and how long you need to stay out.",
    category: "Compliance",
    date: "2026-05-22",
    readTime: "6 min read",
    heroImage: "/blog/reset-schengen-days-hero.webp",
    author: authors.romie,
  },
  {
    slug: "digital-nomad-visas-europe-2026",
    title: "Digital Nomad Visas in Europe: A 2026 Country-by-Country Comparison",
    excerpt:
      "Almost every Schengen country now has a digital nomad visa. Income thresholds, tax treatment, and lifestyle vary wildly. Here's how the main options actually compare in 2026.",
    category: "Digital Nomads",
    date: "2026-05-11",
    readTime: "8 min read",
    heroImage: "/blog/digital-nomad-visas-2026-hero.webp",
    author: authors.romie,
  },
  {
    slug: "etias-ees-schengen-visa-difference",
    title: "ETIAS, EES, and the Schengen Visa: What Each One Is and Who Actually Needs Which",
    excerpt:
      "Three acronyms, one trip, and a lot of confusion. Here's what EES, ETIAS, and Schengen visas actually are, how they relate to each other, and which ones apply to you.",
    category: "Border Control",
    date: "2026-04-22",
    readTime: "7 min read",
    heroImage: "/blog/etias-ees-schengen-hero.webp",
    author: authors.romie,
  },
  {
    slug: "ees-entry-exit-system",
    title: "The EU's New Entry/Exit System (EES) Is Live. Here's What Changed.",
    excerpt:
      "After years of delays, Europe's digital border system went live on April 10, 2026. No more passport stamps, and every entry and exit is now tracked automatically.",
    category: "Border Control",
    date: "2026-04-12",
    readTime: "5 min read",
    heroImage: "/blog/ees-system-hero.webp",
    author: authors.romie,
  },
  {
    slug: "schengen-overstay-consequences",
    title: "What Happens If You Overstay in the Schengen Area (And How to Make Sure You Don't)",
    excerpt:
      "Overstaying can mean fines, entry bans, or worse. Here's what actually happens and how to make sure it never happens to you.",
    category: "Compliance",
    date: "2026-04-03",
    readTime: "5 min read",
    heroImage: "/blog/overstay-consequences-hero.webp",
    author: authors.romie,
  },
  {
    slug: "digital-nomad-schengen-compliance",
    title: "The Digital Nomad's Guide to Schengen Compliance",
    excerpt:
      "Working remotely from Europe? Here's how to track your 90/180-day limit without the spreadsheet headaches.",
    category: "Digital Nomads",
    date: "2026-04-02",
    readTime: "3 min read",
    heroImage: "/blog/digital-nomad-hero.webp",
    author: authors.romie,
  },
]

export function getPostBySlug(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug)
}

export function getRelatedPosts(currentSlug: string, limit = 3): BlogPost[] {
  return posts.filter((p) => p.slug !== currentSlug).slice(0, limit)
}

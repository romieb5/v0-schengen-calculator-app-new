export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  category: string
  date: string // ISO date string
  readTime: string
  featured?: boolean
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
    slug: "etias-ees-schengen-visa-difference",
    title: "ETIAS, EES, and the Schengen Visa: What Each One Is and Who Actually Needs Which",
    excerpt:
      "Three acronyms, one trip, and a lot of confusion. Here's what EES, ETIAS, and Schengen visas actually are, how they relate to each other, and which ones apply to you.",
    category: "Border Control",
    date: "2026-04-22",
    readTime: "7 min read",
    featured: true,
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
    featured: false,
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
    featured: false,
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
    featured: false,
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

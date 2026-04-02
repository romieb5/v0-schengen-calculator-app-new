import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { posts, getPostBySlug, getRelatedPosts } from "@/lib/blog"

// Import post content components
import { Content as DigitalNomadContent } from "@/lib/blog/posts/digital-nomad-schengen-compliance"
import { Content as OverstayContent } from "@/lib/blog/posts/schengen-overstay-consequences"

const contentMap: Record<string, React.ComponentType> = {
  "digital-nomad-schengen-compliance": DigitalNomadContent,
  "schengen-overstay-consequences": OverstayContent,
}

// Table of contents per post
const tocMap: Record<string, { id: string; label: string }[]> = {
  "digital-nomad-schengen-compliance": [
    { id: "the-90-180-rule", label: "The 90/180 Rule" },
    { id: "why-spreadsheets-fail", label: "Why Spreadsheets Fail" },
    { id: "see-your-days-visually", label: "See Your Days, Visually" },
    { id: "planning-your-exit", label: "Planning Your Exit" },
    { id: "where-to-reset", label: "Where to Reset" },
    { id: "getting-started", label: "Getting Started" },
  ],
  "schengen-overstay-consequences": [
    { id: "what-counts-as-overstaying", label: "What Counts as Overstaying?" },
    { id: "the-real-consequences", label: "The Real Consequences" },
    { id: "how-overstays-get-detected", label: "How They Get Detected" },
    { id: "common-mistakes", label: "Common Mistakes" },
    { id: "how-to-stay-compliant", label: "How to Stay Compliant" },
    { id: "what-to-do-if-youve-overstayed", label: "If You've Already Overstayed" },
    { id: "stay-on-the-right-side", label: "Stay on the Right Side" },
  ],
}

export async function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return {}

  return {
    title: `${post.title} | Schengen Monitor Blog`,
    description: post.excerpt,
    authors: [{ name: post.author.name }],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `https://www.schengenmonitor.com/blog/${post.slug}`,
      siteName: "Schengen Monitor",
      type: "article",
      publishedTime: post.date,
      authors: [post.author.name],
      ...(post.heroImage && {
        images: [
          {
            url: `https://www.schengenmonitor.com${post.heroImage}`,
            width: 1200,
            height: 630,
            alt: post.title,
          },
        ],
      }),
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
    },
  }
}

function CategoryTag({ category }: { category: string }) {
  return (
    <span className="self-start text-xs font-medium px-2.5 py-0.5 rounded-full bg-secondary text-foreground">
      {category}
    </span>
  )
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) notFound()

  const PostContent = contentMap[slug]
  if (!PostContent) notFound()

  const toc = tocMap[slug] || []
  const related = getRelatedPosts(slug)

  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: {
      "@type": "Person",
      name: post.author.name,
    },
    publisher: {
      "@type": "Organization",
      name: "Schengen Monitor",
      url: "https://www.schengenmonitor.com",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://www.schengenmonitor.com/blog/${post.slug}`,
    },
  }

  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Back link */}
        <div className="mb-6">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Blog
          </Link>
        </div>

        {/* Post header */}
        <CategoryTag category={post.category} />
        <h1 className="text-3xl md:text-4xl font-bold mt-3 mb-4 leading-tight">
          {post.title}
        </h1>

        {/* Author bar */}
        <div className="flex items-center gap-3 mb-8">
          <Image
            src={post.author.avatar}
            alt={post.author.name}
            width={40}
            height={40}
            className="rounded-full"
          />
          <div className="text-sm">
            <div className="font-semibold">{post.author.name}</div>
            <div className="text-muted-foreground">
              <time dateTime={post.date}>{formattedDate}</time> · {post.readTime}
            </div>
          </div>
        </div>

        {/* Sidebar layout */}
        <div className="grid lg:grid-cols-[1fr_260px] gap-10 items-start">
          {/* Main content */}
          <div>
            {/* Hero image */}
            {post.heroImage && (
              <div className="relative aspect-[2/1] rounded-xl overflow-hidden mb-8 bg-muted">
                <Image
                  src={post.heroImage}
                  alt={post.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            )}

            {/* Prose */}
            <article className="prose-blog">
              <PostContent />
            </article>

            {/* Inline CTA */}
            <div className="bg-primary text-primary-foreground rounded-xl p-6 md:p-8 mt-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold mb-1">See Your Schengen Days at a Glance</h3>
                <p className="text-sm opacity-85">
                  Track your 90/180-day balance visually — no spreadsheets needed.
                </p>
              </div>
              <Link
                href="/sign-up"
                className="inline-flex items-center px-5 py-2.5 rounded-md bg-primary-foreground text-primary text-sm font-semibold hover:opacity-90 transition-opacity whitespace-nowrap"
              >
                Start Tracking Your Days →
              </Link>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="hidden lg:flex flex-col gap-5 sticky top-24">
            {/* Table of contents */}
            {toc.length > 0 && (
              <div className="bg-card border border-border rounded-xl p-5">
                <h4 className="text-sm font-semibold mb-3">Contents</h4>
                <nav className="flex flex-col gap-1">
                  {toc.map((item) => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className="text-[13px] text-muted-foreground hover:text-foreground transition-colors py-1"
                    >
                      {item.label}
                    </a>
                  ))}
                </nav>
              </div>
            )}

            {/* Related posts */}
            {related.length > 0 && (
              <div className="bg-card border border-border rounded-xl p-5">
                <h4 className="text-sm font-semibold mb-3">Related Posts</h4>
                <div className="flex flex-col">
                  {related.map((relPost, i) => (
                    <Link
                      key={relPost.slug}
                      href={`/blog/${relPost.slug}`}
                      className={`text-[13px] text-foreground hover:text-primary transition-colors py-2 ${
                        i < related.length - 1 ? "border-b border-border" : ""
                      }`}
                    >
                      {relPost.title}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Sidebar CTA */}
            <div className="bg-primary text-primary-foreground rounded-xl p-5 text-center">
              <h4 className="text-sm font-semibold mb-2">Visual Timeline</h4>
              <p className="text-[13px] opacity-85 mb-3">
                See your remaining Schengen days at a glance.
              </p>
              <Link
                href="/sign-up"
                className="inline-flex items-center px-4 py-2 rounded-md bg-primary-foreground text-primary text-[13px] font-semibold hover:opacity-90 transition-opacity"
              >
                Start Tracking →
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}

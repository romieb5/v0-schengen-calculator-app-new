import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { posts } from "@/lib/blog"

export const metadata: Metadata = {
  title: "Blog | Schengen Monitor",
  description:
    "Tips, guides, and insights for Schengen Area travelers. Learn about the 90/180-day rule, plan your European travel, and stay compliant.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Blog | Schengen Monitor",
    description: "Tips, guides, and insights for Schengen Area travelers.",
    url: "https://www.schengenmonitor.com/blog",
    siteName: "Schengen Monitor",
    type: "website",
  },
}

function CategoryTag({ category }: { category: string }) {
  return (
    <span className="self-start text-xs font-medium px-2.5 py-0.5 rounded-full bg-secondary text-foreground">
      {category}
    </span>
  )
}

export default function BlogPage() {
  // The newest post becomes the hero; the rest fill the grid below.
  const sortedPosts = [...posts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  )
  const [heroPost, ...otherPosts] = sortedPosts

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Blog</h1>
          <p className="text-lg text-muted-foreground">
            Tips, guides, and insights for Schengen Area travelers
          </p>
        </div>

        {/* Hero post: the newest article, magazine layout */}
        {heroPost && (
          <Link href={`/blog/${heroPost.slug}`} className="block mb-8">
            <article className="bg-card border border-border rounded-xl overflow-hidden transition-shadow hover:shadow-md grid md:grid-cols-2">
              <div className="relative aspect-[16/10] md:aspect-auto md:min-h-[280px] bg-muted">
                {heroPost.heroImage ? (
                  <Image
                    src={heroPost.heroImage}
                    alt={heroPost.title}
                    fill
                    className="object-cover"
                    priority
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-muted to-accent" />
                )}
              </div>
              <div className="p-6 md:p-8 flex flex-col justify-center">
                <CategoryTag category={heroPost.category} />
                <h2 className="text-xl md:text-2xl font-bold mt-3 mb-2 leading-tight">
                  {heroPost.title}
                </h2>
                <p className="text-muted-foreground mb-4">{heroPost.excerpt}</p>
                <div className="text-xs text-muted-foreground flex items-center gap-2">
                  <span>{heroPost.readTime}</span>
                  <span>·</span>
                  <time dateTime={heroPost.date}>
                    {new Date(heroPost.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                </div>
              </div>
            </article>
          </Link>
        )}

        {/* Remaining posts — 2-col grid */}
        {otherPosts.length > 0 && (
          <div className="grid sm:grid-cols-2 gap-6">
            {otherPosts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="block">
                <article className="bg-card border border-border rounded-xl overflow-hidden transition-shadow hover:shadow-md h-full">
                  <div className="relative aspect-[16/9] bg-muted">
                    {post.heroImage ? (
                      <Image
                        src={post.heroImage}
                        alt={post.title}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-muted to-accent" />
                    )}
                  </div>
                  <div className="p-5">
                    <CategoryTag category={post.category} />
                    <h3 className="text-lg font-semibold mt-2 mb-2 leading-tight">
                      {post.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3">{post.excerpt}</p>
                    <div className="text-xs text-muted-foreground flex items-center gap-2">
                      <span>{post.readTime}</span>
                      <span>·</span>
                      <time dateTime={post.date}>
                        {new Date(post.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </time>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

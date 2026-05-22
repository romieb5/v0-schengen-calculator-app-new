import Link from "next/link"
import Image from "next/image"
import { addDays, addMonths, format } from "date-fns"
import { AlertTriangle, Check, CheckCircle2 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { posts } from "@/lib/blog"

/**
 * Server-rendered marketing content for the logged-out homepage. Rendered
 * around <SchengenCalculator /> in app/page.tsx. Logged-in users never see
 * this — they get the lean calculator only.
 */

export function HomeHero() {
  return (
    <section>
      <div className="container mx-auto px-4 py-12 sm:py-16 max-w-3xl text-center">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
          Schengen 90/180 Calculator &amp; Trip Planner
        </h1>
        <p className="mt-4 text-base sm:text-lg text-muted-foreground max-w-xl mx-auto">
          Track your past stays and check future trips against the Schengen 90/180-day rule.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm font-medium text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <Check className="h-4 w-4 text-success" /> Free calculator
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Check className="h-4 w-4 text-success" /> No sign-up to start
          </span>
        </div>
      </div>
    </section>
  )
}

const steps = [
  {
    title: "Add your past stays",
    body: "Enter the entry and exit dates of every Schengen trip you have taken.",
  },
  {
    title: "Check proposed trips",
    body: "Test future travel dates and see instantly whether they keep you compliant.",
  },
  {
    title: "Check any date",
    body: "Move the reference date to see your status on any day and when past stays roll off your window.",
  },
]

const freeFeatures = [
  "Record all your past Schengen stays",
  "Check whether proposed future trips stay compliant",
  "See your days used and days remaining",
  "Move the reference date to check any day",
]

const paidFeatures = [
  "The visual timeline: every stay drawn against your rolling 180-day window",
  "See which trip rolls off next and when your days come back",
  "Lifetime access, no subscription",
]

const faqs = [
  {
    q: "What is the Schengen 90/180 day rule?",
    a: "It lets non-EU visitors stay up to 90 days in the Schengen Area within any rolling 180-day period. The window moves forward every day.",
  },
  {
    q: "Do entry and exit days both count?",
    a: "Yes. Both the day you arrive and the day you leave count toward your 90 days.",
  },
  {
    q: "Can I reset the 180-day period by leaving for a day?",
    a: "No. The window is rolling and continuous. It does not reset when you leave the Schengen Area.",
  },
  {
    q: "What can I use for free?",
    a: "The calculator, recorded stays, proposed trip checks, and compliance status are all free. The visual timeline is a one-time payment to unlock.",
  },
]

type ExampleTone = "success" | "warning" | "destructive"

// Static parts of the "Plan ahead" examples. Trip dates are computed at render
// time in HomeSections so they always sit a couple of months in the future.
const proposedExampleConfig: {
  trip: string
  startMonths: number
  lengthDays: number
  verdict: string
  tone: ExampleTone
}[] = [
  {
    trip: "Proposed trip to Greece",
    startMonths: 2,
    lengthDays: 16,
    verdict: "Compliant, 12 days to spare",
    tone: "success",
  },
  {
    trip: "Proposed trip to Italy",
    startMonths: 3,
    lengthDays: 24,
    verdict: "Cutting it close, 3 days to spare",
    tone: "warning",
  },
  {
    trip: "Proposed trip to Spain",
    startMonths: 4,
    lengthDays: 40,
    verdict: "Over by 8 days, adjust the dates",
    tone: "destructive",
  },
]

const toneStyles: Record<ExampleTone, string> = {
  success: "bg-success/10 text-success",
  warning: "bg-warning/10 text-warning",
  destructive: "bg-destructive/10 text-destructive",
}

function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-center text-sm font-semibold uppercase tracking-wide text-primary">
      {children}
    </p>
  )
}

export function HomeSections() {
  const latestPosts = posts.slice(0, 3)

  // Compute the example trip dates relative to today so they always read as
  // upcoming trips, whenever the page is requested.
  const today = new Date()
  const proposedExamples = proposedExampleConfig.map((example) => {
    const start = addMonths(today, example.startMonths)
    const end = addDays(start, example.lengthDays - 1)
    return {
      ...example,
      dates: `${format(start, "d MMM yyyy")} to ${format(end, "d MMM yyyy")}, ${example.lengthDays} days`,
    }
  })

  return (
    <>
      {/* Intro */}
      <section>
        <div className="container mx-auto px-4 py-10 max-w-2xl">
          <p className="text-center text-muted-foreground leading-relaxed">
            The Schengen 90/180-day rule lets most non-EU visitors spend up to 90 days in the
            Schengen Area within any rolling 180-day period. Staying compliant means counting every
            entry and exit day across a window that moves forward each day. This free calculator does
            the counting for you, and the trip planner lets you test upcoming travel before you book.
          </p>
        </div>
      </section>

      {/* How it works */}
      <section>
        <div className="container mx-auto px-4 py-12 max-w-4xl">
          <SectionEyebrow>How it works</SectionEyebrow>
          <h2 className="mt-2 text-center text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            From passport stamps to a clear answer
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {steps.map((step, i) => (
              <Card key={step.title}>
                <CardContent className="p-5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground text-sm font-bold">
                    {i + 1}
                  </div>
                  <h3 className="mt-3 font-semibold text-foreground">{step.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{step.body}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Free vs paid */}
      <section>
        <div className="container mx-auto px-4 py-12 max-w-3xl">
          <SectionEyebrow>Pricing made simple</SectionEyebrow>
          <h2 className="mt-2 text-center text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            What is free, and what costs a one-time fee
          </h2>
          <p className="mt-3 text-center text-muted-foreground max-w-xl mx-auto">
            No subscription, ever. The calculator does the hard part for free. One optional payment
            unlocks the visual timeline.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <Card className="border-t-4 border-t-success">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold text-foreground">Free</h3>
                <p className="text-sm text-muted-foreground">No account, no payment</p>
                <ul className="mt-4 space-y-2">
                  {freeFeatures.map((f) => (
                    <li key={f} className="flex gap-2 text-sm text-foreground">
                      <Check className="h-4 w-4 flex-shrink-0 mt-0.5 text-success" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 border-t border-border pt-3 text-xs text-muted-foreground">
                  Optional free account to sync across your devices.
                </p>
              </CardContent>
            </Card>
            <Card className="border-t-4 border-t-primary">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold text-foreground">One-time unlock</h3>
                <p className="text-sm text-muted-foreground">Free account required</p>
                <ul className="mt-4 space-y-2">
                  {paidFeatures.map((f) => (
                    <li key={f} className="flex gap-2 text-sm text-foreground">
                      <Check className="h-4 w-4 flex-shrink-0 mt-0.5 text-primary" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <Button asChild className="mt-5 w-full">
                  <Link href="/sign-up">Unlock the visual timeline</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Proposed trips */}
      <section>
        <div className="container mx-auto px-4 py-12 max-w-3xl">
          <SectionEyebrow>Plan ahead</SectionEyebrow>
          <h2 className="mt-2 text-center text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            Know if your next trip works before you book it
          </h2>
          <p className="mt-3 text-center text-muted-foreground max-w-xl mx-auto">
            Add a planned trip and the calculator tells you straight away whether it stays inside the
            90-day limit, and how much room you have left.
          </p>
          <div className="mt-8 space-y-3">
            {proposedExamples.map((example) => (
              <Card key={example.trip}>
                <CardContent className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-5">
                  <div>
                    <p className="font-semibold text-foreground">{example.trip}</p>
                    <p className="text-sm text-muted-foreground">{example.dates}</p>
                  </div>
                  <span
                    className={`inline-flex items-center gap-1.5 self-start rounded-md px-3 py-1.5 text-sm font-semibold ${toneStyles[example.tone]}`}
                  >
                    {example.tone === "success" ? (
                      <CheckCircle2 className="h-4 w-4 flex-shrink-0" />
                    ) : (
                      <AlertTriangle className="h-4 w-4 flex-shrink-0" />
                    )}
                    {example.verdict}
                  </span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ teaser */}
      <section>
        <div className="container mx-auto px-4 py-12 max-w-3xl">
          <SectionEyebrow>Good to know</SectionEyebrow>
          <h2 className="mt-2 text-center text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            Common questions about the 90/180 rule
          </h2>
          <div className="mt-8 space-y-3">
            {faqs.map((faq) => (
              <Card key={faq.q}>
                <CardContent className="p-5">
                  <h3 className="font-semibold text-foreground">{faq.q}</h3>
                  <p className="mt-1.5 text-sm text-muted-foreground">{faq.a}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="mt-6 text-center">
            <Link
              href="/faq"
              className="text-sm font-semibold text-primary hover:underline"
            >
              See all questions in the FAQ
            </Link>
          </div>
        </div>
      </section>

      {/* Blog teaser */}
      <section>
        <div className="container mx-auto px-4 py-12 max-w-4xl">
          <SectionEyebrow>Learn more</SectionEyebrow>
          <h2 className="mt-2 text-center text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            From the blog
          </h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-3">
            {latestPosts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="block">
                <article className="h-full overflow-hidden rounded-xl border border-border bg-card transition-shadow hover:shadow-md">
                  <div className="relative aspect-[16/9] bg-muted">
                    {post.heroImage && (
                      <Image
                        src={post.heroImage}
                        alt={post.title}
                        fill
                        className="object-cover"
                      />
                    )}
                  </div>
                  <div className="p-4">
                    <span className="text-xs font-semibold uppercase tracking-wide text-primary">
                      {post.category}
                    </span>
                    <h3 className="mt-1.5 font-semibold leading-tight text-foreground">
                      {post.title}
                    </h3>
                  </div>
                </article>
              </Link>
            ))}
          </div>
          <div className="mt-6 text-center">
            <Link
              href="/blog"
              className="text-sm font-semibold text-primary hover:underline"
            >
              Read the blog
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

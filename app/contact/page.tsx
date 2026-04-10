import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export const metadata: Metadata = {
  title: "Contact | Schengen Monitor",
  description: "Get in touch with Schengen Monitor for support, feedback, or questions.",
}

export default function ContactPage() {
  return (
    <main className="container mx-auto px-4 py-8 max-w-4xl">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Calculator
      </Link>

      <div className="prose prose-slate max-w-none">
        <h1 className="text-4xl font-bold mb-2">Contact</h1>
        <p className="text-lg text-muted-foreground mb-8">
          Have a question, found a bug, or just want to say hello? I&apos;d love to hear from you.
        </p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
          <p className="mb-4">
            The best way to reach me is by email:
          </p>
          <p className="mb-4">
            <a href="mailto:support@schengenmonitor.com" className="text-primary hover:underline font-medium">
              support@schengenmonitor.com
            </a>
          </p>
          <p className="text-muted-foreground">
            I typically respond within 1&ndash;2 business days.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">What to Include</h2>
          <p className="mb-2">To help me get back to you quickly, please include:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>A description of what you were doing when the issue occurred</li>
            <li>What you expected to happen vs. what actually happened</li>
            <li>Your browser and device (e.g. Chrome on iPhone, Safari on Mac)</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">A Note on Visa Advice</h2>
          <p>
            Schengen Monitor helps you track and visualise your days under the 90/180 rule, but it is
            not a substitute for professional legal advice. If you have questions about your specific visa
            situation, please consult your nearest embassy or an immigration lawyer.
          </p>
        </section>

        <section className="mb-8">
          <p className="text-muted-foreground">
            For common questions about how the 90/180 rule works, check out the{" "}
            <Link href="/faq" className="text-primary hover:underline">
              FAQ
            </Link>
            .
          </p>
        </section>
      </div>
    </main>
  )
}

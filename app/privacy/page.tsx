import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export const metadata: Metadata = {
  title: "Privacy Policy | Schengen Visit Calculator",
  description: "Privacy Policy for the Schengen Visit Calculator application.",
}

export default function PrivacyPage() {
  const lastUpdated = "March 2026"

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
        <h1 className="text-4xl font-bold mb-2">Privacy Policy</h1>
        <p className="text-sm text-muted-foreground mb-8">Last Updated: {lastUpdated}</p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
          <p>
            This Privacy Policy describes how the Schengen Visit Calculator ("we," "us," or "our") collects, uses, and
            protects your information when you use our calculator tool.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">2. Information We Collect</h2>
          <h3 className="text-xl font-semibold mb-3">2.1 Information You Provide</h3>
          <p className="mb-2">When you use our calculator, you may enter:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Entry and exit dates for your Schengen Area visits</li>
            <li>Reference dates for calculating compliance</li>
            <li>Proposed trip dates for planning purposes</li>
          </ul>
          <p className="mb-2">If you create an account, we also collect:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Your email address (for account verification and login)</li>
            <li>Your password (stored securely using industry-standard hashing)</li>
          </ul>

          <h3 className="text-xl font-semibold mb-3">2.2 Data Storage</h3>
          <p className="font-medium mb-2">Anonymous users (no account):</p>
          <p className="mb-2">All data you enter into the calculator is stored locally in your browser's local storage. This means:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Your data never leaves your device</li>
            <li>We do not have access to your travel information</li>
            <li>Your data is not transmitted to our servers or any third parties</li>
            <li>Clearing your browser data will delete your saved information</li>
          </ul>
          <p className="font-medium mb-2">Account holders:</p>
          <p className="mb-2">If you create an account, your travel data is stored on our servers (hosted by Supabase) to enable cross-device syncing. This means:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Your stay and trip data is stored securely in our database</li>
            <li>Your data is accessible from any device where you sign in</li>
            <li>You can delete your data and account at any time through account settings</li>
          </ul>

          <h3 className="text-xl font-semibold mb-3">2.3 Payment Information</h3>
          <p className="mb-4">
            If you purchase a paid feature, payment is processed by Stripe. We do not store your credit card
            details or full payment information on our servers. We only store a record that a payment was
            successfully completed and the associated account. For details on how Stripe handles your payment data,
            see Stripe's privacy policy.
          </p>

          <h3 className="text-xl font-semibold mb-3">2.4 Analytics</h3>
          <p>We use Vercel Analytics to collect anonymous usage statistics, including:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Page views and navigation patterns</li>
            <li>General location data (country/region level only)</li>
            <li>Device and browser information</li>
            <li>Performance metrics</li>
          </ul>
          <p>
            This data is aggregated and does not include any personal travel information you enter into the calculator.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">3. How We Use Your Information</h2>
          <p>The information collected through analytics is used solely to:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Improve the calculator's functionality and user experience</li>
            <li>Understand how users interact with the tool</li>
            <li>Identify and fix technical issues</li>
            <li>Monitor application performance</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">4. Data Security</h2>
          <p className="mb-4">
            For anonymous users, your travel data is stored locally on your device and the security of this data is
            dependent on your device's security measures.
          </p>
          <p className="mb-4">
            For account holders, we use industry-standard security measures to protect your data, including encrypted
            database connections, secure password hashing, and HTTPS for all data transmission.
          </p>
          <p className="mb-2">We recommend:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Using secure, password-protected devices</li>
            <li>Keeping your browser and operating system updated</li>
            <li>Using a strong, unique password for your account</li>
            <li>Using caution when accessing the calculator on public or shared devices</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">5. Cookies and Tracking Technologies</h2>
          <p>Our calculator uses minimal cookies and tracking technologies:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Local storage for saving your calculator data on your device</li>
            <li>Analytics cookies for anonymous usage tracking (via Vercel Analytics)</li>
          </ul>
          <p>You can control cookie preferences through your browser settings.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">6. Third-Party Services</h2>
          <p>We use the following third-party services:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>
              <strong>Vercel Analytics:</strong> For anonymous usage analytics. Vercel's privacy policy can be found at{" "}
              <a
                href="https://vercel.com/legal/privacy-policy"
                className="text-primary hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://vercel.com/legal/privacy-policy
              </a>
            </li>
            <li>
              <strong>Supabase:</strong> For secure database hosting and user authentication for account holders.{" "}
              <a
                href="https://supabase.com/privacy"
                className="text-primary hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://supabase.com/privacy
              </a>
            </li>
            <li>
              <strong>Stripe:</strong> For secure payment processing. Stripe may collect payment-related information
              in accordance with their privacy policy.{" "}
              <a
                href="https://stripe.com/privacy"
                className="text-primary hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://stripe.com/privacy
              </a>
            </li>
            <li>
              <strong>Resend:</strong> For sending account verification and password reset emails.{" "}
              <a
                href="https://resend.com/legal/privacy-policy"
                className="text-primary hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://resend.com/legal/privacy-policy
              </a>
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">7. Children's Privacy</h2>
          <p>
            Our calculator is not directed to individuals under the age of 18. We do not knowingly collect personal
            information from children.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">8. International Data Transfers</h2>
          <p className="mb-4">
            For anonymous users, all your travel data remains on your local device and there are no international
            data transfers of your personal travel information.
          </p>
          <p>
            For account holders, your data may be processed and stored by our third-party service providers
            (Supabase, Stripe, Resend, Vercel) in data centres outside your country of residence. These providers
            maintain appropriate safeguards for international data transfers in accordance with their respective
            privacy policies.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">9. Your Rights</h2>
          <p className="mb-2">You have control over your data:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Anonymous users can delete their data at any time by clearing their browser's local storage</li>
            <li>Account holders can delete their account and all associated data through the account settings page</li>
            <li>You can request a copy of your data by contacting us at support@schengenmonitor.com</li>
            <li>You can opt out of analytics by using browser privacy extensions or settings</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">10. Changes to This Privacy Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated
            "Last Updated" date. We encourage you to review this policy periodically.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">11. Contact Information</h2>
          <p>If you have questions about this Privacy Policy or your data, you can reach us at:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>
              Email:{" "}
              <a href="mailto:support@schengenmonitor.com" className="text-primary hover:underline">
                support@schengenmonitor.com
              </a>
            </li>
            <li>
              For general questions, please refer to our{" "}
              <Link href="/faq" className="text-primary hover:underline">
                FAQ page
              </Link>
            </li>
          </ul>
        </section>
      </div>
    </main>
  )
}

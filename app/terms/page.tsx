import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export const metadata: Metadata = {
  title: "Terms and Conditions | Schengen Visit Calculator",
  description: "Terms and Conditions for the Schengen Visit Calculator application.",
}

export default function TermsPage() {
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
        <h1 className="text-4xl font-bold mb-2">Terms and Conditions</h1>
        <p className="text-sm text-muted-foreground mb-8">Last Updated: {lastUpdated}</p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
          <p>
            By accessing and using the Schengen Visit Calculator (the "Service"), you accept and agree to be bound by
            these Terms and Conditions. If you do not agree to these terms, please do not use the Service.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">2. Description of Service</h2>
          <p className="mb-4">
            The Schengen Visit Calculator is an informational tool designed to help users track their stays in the
            Schengen Area and understand the 90/180-day rule. The Service provides:
          </p>
          <h3 className="text-xl font-semibold mb-3">2.1 Free Features</h3>
          <p className="mb-2">The following features are available to all users without charge:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>A calculator for tracking past and proposed Schengen Area visits</li>
            <li>Compliance checking against the 90/180-day rule</li>
            <li>Educational information about Schengen visa regulations</li>
          </ul>
          <p className="mb-4">
            Anonymous users can use the calculator without creating an account. All data is stored locally in the
            browser. Users who create a free account can sync their data across devices.
          </p>
          <h3 className="text-xl font-semibold mb-3">2.2 Paid Features</h3>
          <p>
            The Timeline Visualization feature is available as a one-time purchase. Once unlocked, it remains
            accessible indefinitely on the account that made the purchase. This feature provides a visual
            representation of stay durations within the rolling 180-day window.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">3. Disclaimer of Warranties and Limitation of Liability</h2>

          <p className="mb-6 text-muted-foreground">
            This service is provided &ldquo;as is&rdquo; without any warranties of any kind.
          </p>

          <h3 className="text-xl font-semibold mb-3">3.1 No Legal Advice</h3>
          <p className="mb-4">
            The Service is an informational tool only and does NOT constitute legal advice, immigration advice, or
            professional consultation of any kind. The information provided:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Is for general informational purposes only</li>
            <li>Should not be relied upon as a substitute for professional legal or immigration advice</li>
            <li>May not reflect the most current legal developments or interpretations</li>
            <li>May not account for individual circumstances or exceptions to general rules</li>
          </ul>

          <h3 className="text-xl font-semibold mb-3">3.2 Accuracy and Reliability</h3>
          <p className="mb-4">We make no representations or warranties regarding:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>The accuracy, completeness, or reliability of calculations performed by the Service</li>
            <li>The suitability of the Service for any particular purpose</li>
            <li>The interpretation of Schengen visa regulations by border authorities</li>
            <li>Changes to immigration laws, regulations, or enforcement practices</li>
          </ul>

          <h3 className="text-xl font-semibold mb-3">3.3 User Responsibility</h3>
          <p className="mb-4">YOU ARE SOLELY RESPONSIBLE FOR:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Verifying the accuracy of information you enter into the calculator</li>
            <li>Understanding and complying with all applicable visa regulations</li>
            <li>Consulting with qualified legal or immigration professionals for advice specific to your situation</li>
            <li>Confirming your visa status and compliance with official government sources</li>
            <li>Any consequences resulting from reliance on this Service</li>
          </ul>

          <h3 className="text-xl font-semibold mb-3">3.4 Limitation of Liability</h3>
          <p className="mb-4">TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>
              We shall not be liable for any direct, indirect, incidental, special, consequential, or punitive damages
            </li>
            <li>
              We shall not be liable for any damages arising from visa denials, deportation, fines, travel disruptions,
              or other immigration-related consequences
            </li>
            <li>
              We shall not be liable for any losses or damages resulting from the use of, or inability to use, the
              Service
            </li>
            <li>We shall not be liable for any errors, omissions, or inaccuracies in the Service</li>
            <li>
              Our total liability, if any, shall not exceed the amount you paid to use the Service
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">4. Official Sources</h2>
          <p>For official information about Schengen visa regulations, you should consult:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>The official website of the European Commission</li>
            <li>The embassy or consulate of the Schengen country you plan to visit</li>
            <li>Official government immigration websites</li>
            <li>Qualified immigration attorneys or consultants</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">5. No Guarantee of Entry</h2>
          <p>Even if the calculator indicates compliance with the 90/180-day rule:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Border authorities have final discretion over entry and exit decisions</li>
            <li>Additional factors may affect your ability to enter or remain in the Schengen Area</li>
            <li>Border control officers may interpret regulations differently</li>
            <li>Other visa conditions or restrictions may apply to your situation</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">6. Intellectual Property</h2>
          <p>
            The Service, including its design, functionality, and content, is provided for personal, non-commercial use.
            All intellectual property rights remain with the Service provider.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">7. User Conduct</h2>
          <p>You agree not to:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Use the Service for any unlawful purpose</li>
            <li>Attempt to gain unauthorized access to the Service or its systems</li>
            <li>Interfere with or disrupt the Service or servers</li>
            <li>Use automated systems to access the Service without permission</li>
            <li>Misrepresent the Service as providing official legal or immigration advice</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">8. User Accounts</h2>
          <p className="mb-4">
            You may create an account to sync your data across devices. When you create an account:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>You are responsible for maintaining the confidentiality of your login credentials</li>
            <li>You are responsible for all activity that occurs under your account</li>
            <li>You must provide a valid email address for account verification</li>
            <li>You may delete your account at any time through the account settings page</li>
          </ul>
          <p>
            We reserve the right to suspend or terminate accounts that violate these Terms and Conditions or are
            used for fraudulent purposes.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">9. Payments and Refunds</h2>
          <h3 className="text-xl font-semibold mb-3">9.1 Payment Terms</h3>
          <p className="mb-4">
            Certain features of the Service require a one-time payment. Payments are processed securely through
            Stripe. The price is displayed in your local currency at the time of purchase. By making a payment, you
            agree to Stripe's terms of service.
          </p>
          <h3 className="text-xl font-semibold mb-3">9.2 Refund Policy</h3>
          <p className="mb-4">
            All purchases are final. Due to the nature of digital goods and the fact that paid features are
            accessible immediately upon purchase, we do not offer refunds. Please ensure you understand what is
            included before purchasing.
          </p>
          <h3 className="text-xl font-semibold mb-3">9.3 Access to Paid Features</h3>
          <p>
            Once a feature is unlocked, it remains accessible for as long as the Service is available and your
            account is in good standing. We do not guarantee perpetual availability of the Service (see Service
            Availability section).
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">10. Data and Privacy</h2>
          <p className="mb-4">
            Your use of the Service is subject to our{" "}
            <Link href="/privacy" className="text-primary hover:underline">
              Privacy Policy
            </Link>
            .
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Anonymous users: all data is stored locally on your device and is your sole responsibility to manage and protect</li>
            <li>Account holders: your travel data is stored on our servers to enable cross-device syncing and is subject to our Privacy Policy</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">11. Changes to Schengen Regulations</h2>
          <p>
            Schengen visa regulations may change at any time. The Service may not immediately reflect such changes. You
            are responsible for staying informed about current regulations through official sources.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">12. Service Availability</h2>
          <p>We reserve the right to:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Modify, suspend, or discontinue the Service at any time without notice</li>
            <li>Update or change these Terms and Conditions at any time</li>
            <li>Refuse service to anyone for any reason</li>
          </ul>
          <p>We are not liable for any modification, suspension, or discontinuation of the Service.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">13. Indemnification</h2>
          <p>
            You agree to indemnify, defend, and hold harmless the Service, its operators, and affiliates from any
            claims, damages, losses, liabilities, and expenses (including legal fees) arising from:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Your use of the Service</li>
            <li>Your violation of these Terms and Conditions</li>
            <li>Your violation of any rights of another party</li>
            <li>Any immigration-related consequences or decisions</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">14. Governing Law and Jurisdiction</h2>
          <p>
            These Terms and Conditions shall be governed by and construed in accordance with applicable international
            law. Any disputes shall be resolved in accordance with the laws of the jurisdiction where the Service
            operator is located, without regard to conflict of law principles.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">15. Severability</h2>
          <p>
            If any provision of these Terms and Conditions is found to be invalid or unenforceable, the remaining
            provisions shall continue in full force and effect.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">16. Entire Agreement</h2>
          <p>
            These Terms and Conditions, together with our Privacy Policy, constitute the entire agreement between you
            and the Service regarding your use of the Service.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">17. Professional Consultation Required</h2>
          <p className="font-semibold mb-4">
            STRONGLY RECOMMENDED: Before making any travel plans or decisions based on calculations from this Service,
            consult with:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>A qualified immigration attorney</li>
            <li>The embassy or consulate of your destination country</li>
            <li>Official government immigration authorities</li>
            <li>Professional immigration consultants</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">18. Contact</h2>
          <p>
            If you have questions about these Terms and Conditions, please contact us at{" "}
            <a href="mailto:support@schengenmonitor.com" className="text-primary hover:underline">
              support@schengenmonitor.com
            </a>
            .
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">19. Acknowledgment</h2>
          <p>BY USING THIS SERVICE, YOU ACKNOWLEDGE THAT:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>You have read and understood these Terms and Conditions</li>
            <li>You agree to be bound by these Terms and Conditions</li>
            <li>You understand this is an informational tool only, not professional advice</li>
            <li>You accept all risks associated with using the Service</li>
            <li>You will not hold the Service or its operators liable for any consequences</li>
          </ul>
        </section>
      </div>
    </main>
  )
}

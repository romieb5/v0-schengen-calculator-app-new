import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Schengen 90/180 Calculator | EU Visa Day Counter",
  description:
    "Free Schengen calculator for tracking your 90/180-day short-stay limit. Calculate remaining days, detect overstays, and plan European travel. Based on EU Regulation 2016/399.",
  keywords:
    "schengen calculator, 90/180 rule, schengen visa, europe travel, visa calculator, schengen days, EU travel, visa-free travel",
  authors: [{ name: "Romie Bajwa" }],
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/browser-icon.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/browser-icon.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
  openGraph: {
    title: "Schengen 90/180 Calculator",
    description: "Calculate your Schengen short-stay days accurately. Free tool based on official EU regulations.",
    url: "https://www.schengenmonitor.com",
    siteName: "Schengen Monitor",
    images: [
      {
        url: "https://www.schengenmonitor.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Schengen 90/180 Calculator",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Schengen 90/180 Calculator",
    description: "Free calculator for tracking your Schengen 90/180-day limit",
    images: ["https://www.schengenmonitor.com/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: "google-site-verification=JQdxIkQONDxqCLmtmprvwp13r8oz97TXP-CZQ3MdD2g",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Schengen 90/180 Calculator",
    description:
      "Free Schengen calculator for tracking your 90/180-day short-stay limit. Calculate remaining days, detect overstays, and plan European travel.",
    url: "https://www.schengenmonitor.com",
    applicationCategory: "TravelApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    author: {
      "@type": "Person",
      name: "Romie Bajwa",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      ratingCount: "250",
    },
  }

  return (
    <html lang="en">
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body className={`${inter.className} font-sans antialiased`}>
        <Navigation />
        {children}
        <Footer />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}

"use client"

import Link from "next/link"
import { useTranslations } from "next-intl"

export function Footer() {
  const currentYear = new Date().getFullYear()
  const t = useTranslations("footer")

  return (
    <footer className="border-t bg-muted/30 mt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-muted-foreground">{t("copyright", { year: currentYear })}</div>
          <div className="flex gap-6 text-sm">
            <Link href="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">
              {t("privacyPolicy")}
            </Link>
            <Link href="/terms" className="text-muted-foreground hover:text-foreground transition-colors">
              {t("termsConditions")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

"use client"

import { useState, useEffect, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, Loader2 } from "lucide-react"

export default function VerifiedPage() {
  return (
    <Suspense>
      <VerifiedPageContent />
    </Suspense>
  )
}

function VerifiedPageContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const error = searchParams.get("error")
  const [isLoading, setIsLoading] = useState(false)
  const [priceLabel, setPriceLabel] = useState<string | null>(null)
  const [importFailed, setImportFailed] = useState(false)

  useEffect(() => {
    fetch("/api/pricing")
      .then((res) => res.json())
      .then((data) => setPriceLabel(data.label))
      .catch(() => setPriceLabel("€5"))
  }, [])

  // Import localStorage data now that user is signed in
  useEffect(() => {
    if (error) return
    if (typeof window === "undefined") return

    const pending = localStorage.getItem("schengen-pending-import")
    if (!pending) return

    const localStays = localStorage.getItem("schengen-stays")
    const localTrips = localStorage.getItem("schengen-proposed-trips")

    if (localStays || localTrips) {
      fetch("/api/import", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          stays: localStays ? JSON.parse(localStays) : [],
          proposedTrips: localTrips ? JSON.parse(localTrips) : [],
        }),
      })
        .then((res) => {
          if (!res.ok) throw new Error("Import failed")
          localStorage.removeItem("schengen-stays")
          localStorage.removeItem("schengen-proposed-trips")
          localStorage.removeItem("schengen-pending-import")
        })
        .catch(() => {
          // Keep pending-import flag so it retries on next sign-in
          setImportFailed(true)
        })
    } else {
      localStorage.removeItem("schengen-pending-import")
    }
  }, [error])

  const handleUnlock = async () => {
    setIsLoading(true)
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
      })
      const data = await res.json()
      if (data.url) {
        window.location.href = data.url
      }
    } catch {
      setIsLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 overflow-auto flex flex-col">
      {/* Background */}
      <div className="absolute inset-0">
        {/* Blurred placeholder */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAASABIAAD/4QCARXhpZgAATU0AKgAAAAgABAEaAAUAAAABAAAAPgEbAAUAAAABAAAARgEoAAMAAAABAAIAAIdpAAQAAAABAAAATgAAAAAAAABIAAAAAQAAAEgAAAABAAOgAQADAAAAAQABAACgAgAEAAAAAQAAAB6gAwAEAAAAAQAAABQAAAAA/+0AOFBob3Rvc2hvcCAzLjAAOEJJTQQEAAAAAAAAOEJJTQQlAAAAAAAQ1B2M2Y8AsgTpgAmY7PhCfv/CABEIABQAHgMBIgACEQEDEQH/xAAfAAABBQEBAQEBAQAAAAAAAAADAgQBBQAGBwgJCgv/xADDEAABAwMCBAMEBgQHBgQIBnMBAgADEQQSIQUxEyIQBkFRMhRhcSMHgSCRQhWhUjOxJGIwFsFy0UOSNIII4VNAJWMXNfCTc6JQRLKD8SZUNmSUdMJg0oSjGHDiJ0U3ZbNVdaSVw4Xy00Z2gONHVma0CQoZGigpKjg5OkhJSldYWVpnaGlqd3h5eoaHiImKkJaXmJmaoKWmp6ipqrC1tre4ubrAxMXGx8jJytDU1dbX2Nna4OTl5ufo6erz9PX29/j5+v/EAB8BAAMBAQEBAQEBAQEAAAAAAAECAAMEBQYHCAkKC//EAMMRAAICAQMDAwIDBQIFAgQEhwEAAhEDEBIhBCAxQRMFMCIyURRABjMjYUIVcVI0gVAkkaFDsRYHYjVT8NElYMFE4XLxF4JjNnAmRVSSJ6LSCAkKGBkaKCkqNzg5OkZHSElKVVZXWFlaZGVmZ2hpanN0dXZ3eHl6gIOEhYaHiImKkJOUlZaXmJmaoKOkpaanqKmqsLKztLW2t7i5usDCw8TFxsfIycrQ09TV1tfY2drg4uPk5ebn6Onq8vP09fb3+Pn6/9sAQwAWFhYWFhYmFhYmNiYmJjZJNjY2NklcSUlJSUlcb1xcXFxcXG9vb29vb29vhoaGhoaGnJycnJyvr6+vr6+vr6+v/9sAQwEbHR0tKS1MKSlMt3xmfLe3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3/9oADAMBAAIRAxEAAAEsixRwsByGEJTnoQzYhv/aAAgBAQABBQL7lQ8g8uxU8i8i8zX/2gAIAQMRAT8B2hIrQv8A/9oACAECEQE/Adzegf/aAAgBAQAGPwL+bo//xAAzEAEAAwACAgICAgMBAQAAAgsBEQAhMUFRYXGBkaGxwfDREOHxIDBAUGBwgJCgsMDQ4P/aAAgBAQABPyGzT/rD5oPP/EFjxNmY9xRKfSX/2gAMAwEAAhEDEQAAEJQP0f/EADMRAQEBAAMAAQIFBQEBAAEBCQEAESExEEFRYSBx8JGBobHRweHxMEBQYHCAkKCwwNDg/9oACAEDEQE/EK0edL//2gAIAQIRAT8Q1GvO1//aAAgBAQABPxA+NpSo2I58+euaIiRMee9rQ5nuhS0GRZ7iiqiI8OomgExpPHqiGE1f/9k=')` }}
        />
        <Image
          src="/auth-bg.jpg"
          alt=""
          fill
          priority
          quality={85}
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/5" />
      </div>

      {/* Centered Panel */}
      <div className="relative flex-1 flex items-center justify-center p-4 md:p-8">
        <main className="w-full max-w-md rounded-3xl bg-card p-6 border lg:p-8">
          <div className="text-center mb-6">
            <Link href="/" className="font-semibold text-lg">
              Schengen Monitor
            </Link>
          </div>

          {error ? (
            <div className="space-y-6 text-center">
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  {error === "TOKEN_EXPIRED"
                    ? "This verification link has expired. Please sign up again."
                    : "This verification link is invalid. Please try again."}
                </AlertDescription>
              </Alert>
              <div className="flex flex-col gap-2">
                <Button onClick={() => router.push("/sign-up")}>
                  Sign Up Again
                </Button>
                <Button variant="ghost" onClick={() => router.push("/sign-in")}>
                  Go to Log In
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-6 text-center">
              <div>
                <h1 className="text-2xl font-bold tracking-tight">Email verified!</h1>
                <p className="mt-2 text-muted-foreground">
                  Your account is ready. Unlock the Timeline Visualization to track your 90/180 day Schengen status at a glance.
                </p>
              </div>

              {importFailed && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    We couldn&apos;t import your existing stays. They&apos;re still saved locally and will be imported automatically next time you log in.
                  </AlertDescription>
                </Alert>
              )}

              <div className="flex flex-col gap-3">
                <Button
                  size="lg"
                  className="w-full"
                  onClick={handleUnlock}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Redirecting to checkout...
                    </>
                  ) : (
                    `Unlock Timeline — ${priceLabel ?? "€5"}`
                  )}
                </Button>
                <p className="text-xs text-muted-foreground">
                  One-time payment &middot; Lifetime access &middot; No subscription
                </p>
                <Button
                  variant="outline"
                  onClick={() => router.push("/")}
                >
                  Go to calculator instead
                </Button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

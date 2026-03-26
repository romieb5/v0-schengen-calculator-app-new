"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, Loader2, Eye, EyeOff } from "lucide-react"
import { authClient } from "@/lib/auth-client"

export default function SignInPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [forgotEmail, setForgotEmail] = useState("")
  const [forgotError, setForgotError] = useState("")
  const [forgotLoading, setForgotLoading] = useState(false)
  const [forgotSent, setForgotSent] = useState(false)
  const [showForgot, setShowForgot] = useState(false)
  const [honeypot, setHoneypot] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (honeypot) return

    setIsLoading(true)

    try {
      const result = await authClient.signIn.email({
        email,
        password,
      })

      if (result.error) {
        setError("Invalid email or password")
        setIsLoading(false)
        return
      }

      // Trigger Chrome/Safari password save by submitting a hidden form to a hidden iframe.
      // SPA client-side navigations don't trigger the browser's built-in save-password prompt,
      // but a real form submission to an iframe does.
      try {
        const iframe = document.createElement("iframe")
        iframe.name = "password-save-frame"
        iframe.style.display = "none"
        document.body.appendChild(iframe)

        const form = document.createElement("form")
        form.method = "POST"
        form.action = "/api/auth/ok" // returns 200 — doesn't need to exist as a real endpoint
        form.target = "password-save-frame"

        const emailInput = document.createElement("input")
        emailInput.type = "email"
        emailInput.name = "email"
        emailInput.autocomplete = "email"
        emailInput.value = email

        const passwordInput = document.createElement("input")
        passwordInput.type = "password"
        passwordInput.name = "password"
        passwordInput.autocomplete = "current-password"
        passwordInput.value = password

        form.appendChild(emailInput)
        form.appendChild(passwordInput)
        document.body.appendChild(form)
        form.submit()

        // Clean up after a short delay
        setTimeout(() => {
          form.remove()
          iframe.remove()
        }, 2000)
      } catch {
        // Non-critical — login still works without password save
      }

      // Import localStorage data if pending from sign-up
      if (localStorage.getItem("schengen-pending-import")) {
        const localStays = localStorage.getItem("schengen-stays")
        const localTrips = localStorage.getItem("schengen-proposed-trips")
        if (localStays || localTrips) {
          try {
            const importRes = await fetch("/api/import", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                stays: localStays ? JSON.parse(localStays) : [],
                proposedTrips: localTrips ? JSON.parse(localTrips) : [],
              }),
            })
            if (!importRes.ok) throw new Error("Import failed")
            localStorage.removeItem("schengen-stays")
            localStorage.removeItem("schengen-proposed-trips")
            localStorage.removeItem("schengen-pending-import")
          } catch {
            // Keep pending-import flag so it retries on next sign-in.
            // Data stays in localStorage as fallback.
          }
        } else {
          localStorage.removeItem("schengen-pending-import")
        }
      }

      router.push("/")
      router.refresh()
    } catch {
      setError("An unexpected error occurred. Please try again.")
      setIsLoading(false)
    }
  }

  const handleForgotSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setForgotError("")
    setForgotLoading(true)

    try {
      const result = await authClient.requestPasswordReset({
        email: forgotEmail,
        redirectTo: "/reset-password",
      })

      if (result.error) {
        // Always show success to prevent email enumeration
      }

      setForgotSent(true)
    } catch {
      setForgotError("An unexpected error occurred. Please try again.")
    } finally {
      setForgotLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 overflow-auto flex flex-col">
      {/* Background */}
      <div className="absolute inset-0">
        {/* Blurred placeholder – visible instantly while the full image loads */}
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
          {showForgot ? (
            // Forgot password form
            forgotSent ? (
              <div className="text-center space-y-4">
                <h1 className="text-2xl font-bold tracking-tight">Check your email</h1>
                <p className="text-muted-foreground">
                  If an account exists for <strong>{forgotEmail}</strong>, we&apos;ve sent a
                  password reset link.
                </p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowForgot(false)
                    setForgotSent(false)
                    setForgotEmail("")
                  }}
                  className="mt-2"
                >
                  Back to Log In
                </Button>
              </div>
            ) : (
              <div className="space-y-6">
                <div>
                  <h1 className="text-2xl font-bold tracking-tight">Forgot your password?</h1>
                  <p className="mt-1 text-muted-foreground">
                    Enter your email and we&apos;ll send you a reset link.
                  </p>
                </div>

                <form onSubmit={handleForgotSubmit} className="space-y-4">
                  {forgotError && (
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>{forgotError}</AlertDescription>
                    </Alert>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="forgot-email">Email</Label>
                    <Input
                      id="forgot-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      value={forgotEmail}
                      onChange={(e) => setForgotEmail(e.target.value)}
                      placeholder="you@example.com"
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full" size="lg" disabled={forgotLoading}>
                    {forgotLoading ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      "Send Reset Link"
                    )}
                  </Button>

                  <p className="text-center text-sm text-muted-foreground">
                    <button
                      type="button"
                      onClick={() => setShowForgot(false)}
                      className="text-primary font-medium hover:underline"
                    >
                      Back to Log In
                    </button>
                  </p>
                </form>
              </div>
            )
          ) : (
            // Log in form
            <div className="space-y-6">
              <div className="text-center">
                <h1 className="text-2xl font-bold tracking-tight">Welcome back</h1>
                <p className="mt-1 text-muted-foreground">
                  Log in to your Schengen Monitor account
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Honeypot — invisible to real users, bots auto-fill it */}
                <div aria-hidden="true" className="absolute opacity-0 h-0 w-0 overflow-hidden" tabIndex={-1}>
                  <label htmlFor="company">Company</label>
                  <input
                    id="company"
                    name="company"
                    type="text"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                    autoComplete="off"
                    tabIndex={-1}
                  />
                </div>

                {error && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <button
                      type="button"
                      onClick={() => {
                        setShowForgot(true)
                        setForgotEmail(email)
                      }}
                      className="text-xs text-muted-foreground hover:text-foreground hover:underline"
                    >
                      Forgot password?
                    </button>
                  </div>
                  <div className="relative">
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="current-password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Your password"
                      className="pr-10"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      tabIndex={-1}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Logging in...
                    </>
                  ) : (
                    "Log in"
                  )}
                </Button>
              </form>

              <p className="text-center text-sm text-muted-foreground">
                Don&apos;t have an account?{" "}
                <Link href="/sign-up" className="font-medium text-foreground hover:underline">
                  Sign up
                </Link>
              </p>
            </div>
          )}
        </main>
      </div>

      {/* Footer */}
      <footer className="relative z-20 shrink-0 px-6 pb-6 pt-2 text-center">
        <p className="text-xs text-white font-medium tracking-wide drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
          By entering, you agree to our{" "}
          <Link
            href="/terms"
            className="underline decoration-white/50 hover:decoration-white transition-all"
          >
            Terms of Service
          </Link>{" "}
          &{" "}
          <Link
            href="/privacy"
            className="underline decoration-white/50 hover:decoration-white transition-all"
          >
            Privacy Policy
          </Link>
          .
        </p>
      </footer>
    </div>
  )
}

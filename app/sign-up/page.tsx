"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, Loader2, Eye, EyeOff, Check } from "lucide-react"
import { authClient } from "@/lib/auth-client"

export default function SignUpPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [emailSent, setEmailSent] = useState(false)
  const [honeypot, setHoneypot] = useState("")

  const passwordChecks = [
    { label: "8+ characters", example: "", met: password.length >= 8 },
    { label: "Capital letter", example: "", met: /[A-Z]/.test(password) },
    { label: "Number", example: "", met: /[0-9]/.test(password) },
    {
      label: "Special character",
      example: " (!@#$)",
      met: /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password),
    },
  ]

  const allChecksMet = passwordChecks.every((check) => check.met)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (honeypot) return

    setIsLoading(true)

    try {
      const normalizedEmail = email.trim().toLowerCase()
      const result = await authClient.signUp.email({
        email: normalizedEmail,
        password,
        name: normalizedEmail.split("@")[0],
        callbackURL: "/verified",
      })

      if (result.error) {
        // Don't reveal whether the email is already registered
        setError("Could not create account. Please try again or log in if you already have one.")
        setIsLoading(false)
        return
      }

      // Mark that we should import localStorage data after email verification + first sign-in
      const localStays = localStorage.getItem("schengen-stays")
      const localTrips = localStorage.getItem("schengen-proposed-trips")
      if (localStays || localTrips) {
        localStorage.setItem("schengen-pending-import", "true")
      }

      setEmailSent(true)
    } catch {
      setError("An unexpected error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="relative flex min-h-screen">
      {/* Background image — full-bleed on mobile, left half on desktop */}
      <div className="absolute inset-0 overflow-hidden lg:relative lg:inset-auto lg:w-1/2">
        {/* Blurred placeholder – visible instantly while the full image loads */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAASABIAAD/4QCARXhpZgAATU0AKgAAAAgABAEaAAUAAAABAAAAPgEbAAUAAAABAAAARgEoAAMAAAABAAIAAIdpAAQAAAABAAAATgAAAAAAAABIAAAAAQAAAEgAAAABAAOgAQADAAAAAQABAACgAgAEAAAAAQAAABSgAwAEAAAAAQAAAB4AAAAA/+0AOFBob3Rvc2hvcCAzLjAAOEJJTQQEAAAAAAAAOEJJTQQlAAAAAAAQ1B2M2Y8AsgTpgAmY7PhCfv/CABEIAB4AFAMBIgACEQEDEQH/xAAfAAABBQEBAQEBAQAAAAAAAAADAgQBBQAGBwgJCgv/xADDEAABAwMCBAMEBgQHBgQIBnMBAgADEQQSIQUxEyIQBkFRMhRhcSMHgSCRQhWhUjOxJGIwFsFy0UOSNIII4VNAJWMXNfCTc6JQRLKD8SZUNmSUdMJg0oSjGHDiJ0U3ZbNVdaSVw4Xy00Z2gONHVma0CQoZGigpKjg5OkhJSldYWVpnaGlqd3h5eoaHiImKkJaXmJmaoKWmp6ipqrC1tre4ubrAxMXGx8jJytDU1dbX2Nna4OTl5ufo6erz9PX29/j5+v/EAB8BAAMBAQEBAQEBAQEAAAAAAAECAAMEBQYHCAkKC//EAMMRAAICAQMDAwIDBQIFAgQEhwEAAhEDEBIhBCAxQRMFMCIyURRABjMjYUIVcVI0gVAkkaFDsRYHYjVT8NElYMFE4XLxF4JjNnAmRVSSJ6LSCAkKGBkaKCkqNzg5OkZHSElKVVZXWFlaZGVmZ2hpanN0dXZ3eHl6gIOEhYaHiImKkJOUlZaXmJmaoKOkpaanqKmqsLKztLW2t7i5usDCw8TFxsfIycrQ09TV1tfY2drg4uPk5ebn6Onq8vP09fb3+Pn6/9sAQwAWFhYWFhYmFhYmNiYmJjZJNjY2NklcSUlJSUlcb1xcXFxcXG9vb29vb29vhoaGhoaGnJycnJyvr6+vr6+vr6+v/9sAQwEbHR0tKS1MKSlMt3xmfLe3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3/9oADAMBAAIRAxEAAAEbZwoqQmUCwnEpxKZx0//aAAgBAQABBQJQq8S0poMnwAJZaVV7hh//2gAIAQMRAT8B0g0H/9oACAECEQE/AdJeHcX/2gAIAQEABj8C+5X+Y//EADMQAQADAAICAgICAwEBAAACCwERACExQVFhcYGRobHB8NEQ4fEgMEBQYHCAkKCwwNDg/9oACAEBAAE/IX41Dm9be4lndzWk1IKVADRYo0G0QRf/2gAMAwEAAhEDEQAAECFiF//EADMRAQEBAAMAAQIFBQEBAAEBCQEAESExEEFRYSBx8JGBobHRweHxMEBQYHCAkKCwwNDg/9oACAEDEQE/EAc4kuTjfav/2gAIAQIRAT8QU3mGeavuX//aAAgBAQABPxDQ6ZDUIHzWMdOtGvDGXJqjS49B1PilQSbMdX4wl8lJDKkJ01EH4PVgUz7v/9k=')` }}
        />
        <img
          src="/signup-bg.jpg"
          alt="Vintage camera, passport, and travel journal on a world map"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/15 lg:bg-black/30" />
        {/* Desktop-only overlay text */}
        <div className="relative z-10 hidden h-full w-full flex-col items-center justify-center p-12 text-center text-white lg:flex">
          <h2 className="text-3xl font-bold leading-tight [text-shadow:_0_2px_12px_rgba(0,0,0,0.7)]">
            Never overstay your Schengen visa again
          </h2>
          <p className="mt-3 text-lg font-semibold text-white/90 max-w-md [text-shadow:_0_2px_12px_rgba(0,0,0,0.8),_0_0_4px_rgba(0,0,0,0.5)]">
            Track your 90/180 day status at a glance with a visual timeline of all your stays.
          </p>
        </div>
      </div>

      {/* Form side */}
      <div className="relative z-10 flex min-h-screen flex-1 flex-col">
        {/* Top bar — desktop only */}
        <div className="hidden items-center justify-between px-6 py-4 sm:px-10 lg:flex">
          <Link href="/" className="font-semibold text-lg">
            Schengen Monitor
          </Link>
          <p className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/log-in" className="font-medium text-foreground hover:underline">
              Log in
            </Link>
          </p>
        </div>

        {/* Form area */}
        <div className="flex flex-1 items-center justify-center px-4 py-8 sm:px-6 lg:px-10 lg:py-0">
          <div className="w-full max-w-sm rounded-3xl border bg-card p-6 shadow-2xl lg:rounded-none lg:border-0 lg:bg-transparent lg:p-0 lg:shadow-none">
            {/* Brand — mobile only, centered at the top of the card */}
            <div className="mb-6 text-center lg:hidden">
              <Link href="/" className="font-semibold text-lg">
                Schengen Monitor
              </Link>
            </div>

            {emailSent ? (
              <div className="text-center space-y-4">
                <h1 className="text-2xl font-bold tracking-tight">Check your email</h1>
                <p className="text-muted-foreground">
                  We&apos;ve sent a verification link to <strong>{email}</strong>. Click the link to verify
                  your account and get started.
                </p>
                <Button variant="outline" onClick={() => router.push("/log-in")} className="mt-2">
                  Go to Log In
                </Button>
              </div>
            ) : (
              <>
                <div className="space-y-6">
                  <div className="text-center lg:text-left">
                    <h1 className="text-2xl font-bold tracking-tight">Create your account</h1>
                    <p className="mt-1 hidden text-muted-foreground lg:block">
                      Sign up to unlock the Timeline Visualization
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} action="/sign-up" method="post" className="space-y-4">
                    {/* Honeypot — invisible to real users, bots auto-fill it */}
                    <div aria-hidden="true" className="absolute opacity-0 h-0 w-0 overflow-hidden" tabIndex={-1}>
                      <label htmlFor="website">Website</label>
                      <input
                        id="website"
                        name="website"
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
                        autoCapitalize="none"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <div className="relative">
                        <Input
                          id="password"
                          name="password"
                          type={showPassword ? "text" : "password"}
                          autoComplete="new-password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="Create a password"
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
                      {/* Password requirement indicators */}
                      <div className="grid grid-cols-2 gap-x-4 gap-y-1 mt-2">
                        {passwordChecks.map((check) => (
                          <div key={check.label} className="flex items-center gap-1.5 text-xs">
                            <div
                              className={`h-3.5 w-3.5 rounded-full border flex items-center justify-center transition-colors ${
                                check.met
                                  ? "bg-primary border-primary text-primary-foreground"
                                  : "border-muted-foreground/40"
                              }`}
                            >
                              {check.met && <Check className="h-2.5 w-2.5" />}
                            </div>
                            <span className={check.met ? "text-foreground" : "text-muted-foreground"}>
                              {check.label}
                              {check.example && <span className="hidden lg:inline">{check.example}</span>}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Button type="submit" className="w-full" size="lg" disabled={isLoading || !allChecksMet}>
                      {isLoading ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Creating account...
                        </>
                      ) : (
                        "Sign up"
                      )}
                    </Button>
                  </form>
                </div>

                {/* Sign-in link — mobile only, below the form */}
                <p className="mt-6 text-center text-sm text-muted-foreground lg:hidden">
                  Already have an account?{" "}
                  <Link href="/log-in" className="font-medium text-foreground hover:underline">
                    Log in
                  </Link>
                </p>
              </>
            )}
          </div>
        </div>

        {/* Footer */}
        {!emailSent && (
          <div className="px-4 pb-6 pt-2 text-center sm:px-6 lg:px-10 lg:py-4">
            <p className="text-xs text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.85)] lg:text-muted-foreground lg:drop-shadow-none">
              By signing up, you agree to our{" "}
              <Link href="/terms" className="underline lg:hover:text-foreground">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="/privacy" className="underline lg:hover:text-foreground">
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

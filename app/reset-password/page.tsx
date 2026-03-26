"use client"

import { Suspense, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, Loader2, CheckCircle2, Check } from "lucide-react"
import { authClient } from "@/lib/auth-client"

function ResetPasswordForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get("token")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const passwordChecks = [
    { label: "8+ characters", met: password.length >= 8 },
    { label: "Capital letter", met: /[A-Z]/.test(password) },
    { label: "Number", met: /[0-9]/.test(password) },
    { label: "Special character (!@#$)", met: /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password) },
  ]

  const allChecksMet = passwordChecks.every((check) => check.met)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!allChecksMet) {
      setError("Please meet all password requirements")
      return
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match")
      return
    }

    if (!token) {
      setError("Invalid or missing reset link. Please request a new password reset.")
      return
    }

    setIsLoading(true)

    try {
      const result = await authClient.resetPassword({
        newPassword: password,
        token,
      })

      if (result.error) {
        setError(result.error.message || "Failed to reset password")
        setIsLoading(false)
        return
      }

      setSuccess(true)
    } catch {
      setError("An unexpected error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  if (success) {
    return (
      <div className="text-center space-y-4">
        <h1 className="text-2xl font-bold tracking-tight">Password reset</h1>
        <p className="text-muted-foreground">
          Your password has been updated. You can now log in with your new password.
        </p>
        <Button onClick={() => router.push("/log-in")} className="mt-2">
          Go to Log In
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Set a new password</h1>
        <p className="mt-1 text-muted-foreground">Enter your new password below.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="space-y-2">
          <Label htmlFor="password">New Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="At least 8 characters"
            required
          />
          {password.length > 0 && (
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
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirm-password">Confirm New Password</Label>
          <Input
            id="confirm-password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm your new password"
            required
          />
        </div>

        <Button type="submit" className="w-full" size="lg" disabled={isLoading || !allChecksMet}>
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Resetting...
            </>
          ) : (
            "Reset Password"
          )}
        </Button>

        <p className="text-center text-sm text-muted-foreground">
          <Link href="/log-in" className="text-primary font-medium hover:underline">
            Back to Log In
          </Link>
        </p>
      </form>
    </div>
  )
}

export default function ResetPasswordPage() {
  return (
    <div className="fixed inset-0 z-50 overflow-auto flex flex-col">
      {/* Background */}
      <div className="absolute inset-0">
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
          <Suspense fallback={<div className="flex justify-center py-8"><Loader2 className="h-8 w-8 animate-spin text-muted-foreground" /></div>}>
            <ResetPasswordForm />
          </Suspense>
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

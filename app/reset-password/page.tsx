"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, Loader2, CheckCircle2 } from "lucide-react"
import { authClient } from "@/lib/auth-client"

export default function ResetPasswordPage() {
  const router = useRouter()
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (password.length < 8) {
      setError("Password must be at least 8 characters")
      return
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match")
      return
    }

    setIsLoading(true)

    try {
      const result = await authClient.resetPassword({
        newPassword: password,
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
          {success ? (
            <div className="text-center space-y-4">
              <div className="flex justify-center">
                <CheckCircle2 className="h-12 w-12 text-green-600" />
              </div>
              <h1 className="text-2xl font-bold tracking-tight">Password reset</h1>
              <p className="text-muted-foreground">
                Your password has been updated. You can now log in with your new password.
              </p>
              <Button onClick={() => router.push("/sign-in")} className="mt-2">
                Go to Log In
              </Button>
            </div>
          ) : (
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
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="At least 8 characters"
                    required
                  />
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

                <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
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
                  <Link href="/sign-in" className="text-primary font-medium hover:underline">
                    Back to Log In
                  </Link>
                </p>
              </form>
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

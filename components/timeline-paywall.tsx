"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Loader2, Check } from "lucide-react"
import { useRouter } from "next/navigation"

interface TimelinePaywallProps {
  isAuthenticated: boolean
}

export function TimelinePaywall({ isAuthenticated }: TimelinePaywallProps) {
  const router = useRouter()
  const [isRedirecting, setIsRedirecting] = useState(false)
  const [priceLabel, setPriceLabel] = useState<string | null>(null)

  useEffect(() => {
    fetch("/api/pricing")
      .then((res) => res.json())
      .then((data) => setPriceLabel(data.label))
      .catch(() => setPriceLabel("€5"))
  }, [])

  const handleCTA = async () => {
    if (!isAuthenticated) {
      router.push("/sign-up")
      return
    }

    setIsRedirecting(true)
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
      })
      const data = await res.json()
      if (data.url) {
        window.location.href = data.url
      } else {
        setIsRedirecting(false)
      }
    } catch {
      setIsRedirecting(false)
    }
  }

  return (
    <div className="flex-1 flex flex-col items-center text-center px-2">
      <div className="flex-1 flex flex-col items-center justify-center">
        <p className="text-3xl font-bold text-primary mb-1">
          {priceLabel ?? "\u00A0"}
        </p>
        <h4 className="font-semibold text-sm mb-3">Unlock Your Timeline</h4>
        <Button
          onClick={handleCTA}
          disabled={isRedirecting}
          size="sm"
          className="w-full font-semibold text-xs"
        >
          {isRedirecting ? (
            <>
              <Loader2 className="h-3 w-3 mr-1.5 animate-spin" />
              Redirecting...
            </>
          ) : (
            "Get Access"
          )}
        </Button>
        <div className="flex flex-col gap-1 mt-3 self-start pl-2">
          <div className="flex items-center gap-1.5 text-xs text-foreground">
            <Check className="h-3.5 w-3.5 text-green-500 flex-shrink-0" />
            One-time payment
          </div>
          <div className="flex items-center gap-1.5 text-xs text-foreground">
            <Check className="h-3.5 w-3.5 text-green-500 flex-shrink-0" />
            Lifetime access
          </div>
          <div className="flex items-center gap-1.5 text-xs text-foreground">
            <Check className="h-3.5 w-3.5 text-green-500 flex-shrink-0" />
            No subscription
          </div>
        </div>
      </div>
      {!isAuthenticated && (
        <p className="text-[11px] text-foreground mt-8 -mb-2">
          Already paid?{" "}
          <button
            onClick={() => router.push("/sign-in")}
            className="text-foreground font-semibold hover:underline"
          >
            Log in
          </button>
        </p>
      )}
    </div>
  )
}

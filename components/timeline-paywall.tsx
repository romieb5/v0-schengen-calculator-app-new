"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
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
        <p className="text-[10px] text-muted-foreground mt-2">
          Pay once &middot; Lifetime access
        </p>
      </div>
      {!isAuthenticated && (
        <p className="text-[11px] text-muted-foreground pb-4">
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

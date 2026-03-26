"use client"

import { useState, useEffect, useCallback } from "react"
import { useAuth } from "@/components/auth-provider"

interface PaymentStatus {
  hasPaid: boolean
  isAuthenticated: boolean
  isLoading: boolean
  refresh: () => Promise<void>
}

export function usePaymentStatus(): PaymentStatus {
  const { isAuthenticated, isLoading: authLoading } = useAuth()
  const [hasPaid, setHasPaid] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const refresh = useCallback(async () => {
    if (!isAuthenticated) {
      setHasPaid(false)
      setIsLoading(false)
      return
    }

    try {
      const res = await fetch("/api/payment-status")
      const data = await res.json()
      setHasPaid(data.hasPaid)
    } catch {
      setHasPaid(false)
    } finally {
      setIsLoading(false)
    }
  }, [isAuthenticated])

  useEffect(() => {
    if (authLoading) return
    refresh()
  }, [authLoading, refresh])

  return {
    hasPaid,
    isAuthenticated,
    isLoading: authLoading || isLoading,
    refresh,
  }
}

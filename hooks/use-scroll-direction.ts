"use client"

import { useState, useEffect, useRef } from "react"

const THRESHOLD = 10

export function useScrollDirection() {
  const [barsVisible, setBarsVisible] = useState(true)
  const prevScrollY = useRef(0)
  const ticking = useRef(false)

  useEffect(() => {
    // Only enable on mobile
    const mql = window.matchMedia("(max-width: 767px)")
    if (!mql.matches) return

    const update = () => {
      const currentY = Math.max(0, window.scrollY) // clamp for iOS rubber-banding

      // Always show bars at top of page
      if (currentY <= 0) {
        setBarsVisible(true)
        prevScrollY.current = currentY
        ticking.current = false
        return
      }

      const delta = currentY - prevScrollY.current

      if (delta > THRESHOLD) {
        setBarsVisible(false)
        prevScrollY.current = currentY
      } else if (delta < -THRESHOLD) {
        setBarsVisible(true)
        prevScrollY.current = currentY
      }

      ticking.current = false
    }

    const onScroll = () => {
      if (!ticking.current) {
        requestAnimationFrame(update)
        ticking.current = true
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true })

    // Re-check on resize (crossing mobile/desktop boundary)
    const onResize = () => {
      if (!mql.matches) {
        setBarsVisible(true)
      }
    }
    window.addEventListener("resize", onResize)

    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onResize)
    }
  }, [])

  return { barsVisible }
}

# Schengen Monitor

## What This Is

A web app for tracking Schengen Area visa compliance under the **90/180-day rule**. Travelers enter their past stays and proposed future trips to check whether they comply with EU short-stay visa limits. The core calculator is free; the timeline visualization requires a one-time payment.

**Live site:** https://www.schengenmonitor.com
**Author:** Romie Bajwa

## Tech Stack

- **Framework:** Next.js 16 (App Router) with React 19 and TypeScript
- **Styling:** Tailwind CSS 4 with OKLCH color variables, dark mode via next-themes
- **UI Components:** shadcn/ui (new-york style) built on Radix UI primitives
- **Forms:** React Hook Form + Zod validation
- **Dates:** date-fns, React Day Picker
- **Charts:** Recharts (timeline visualization)
- **Auth:** BetterAuth (email/password)
- **Database:** Supabase (Postgres) — user data, stays, payment status
- **Email:** Resend — verification emails, password resets, payment receipts
- **Payments:** Stripe — one-time checkout
- **Analytics:** Vercel Analytics, Vercel Speed Insights, Google Analytics (AW-17780766572)
- **Package Manager:** pnpm
- **Deployment:** Vercel

## Project Structure

```
app/
  page.tsx                  # Home — main calculator
  faq/page.tsx              # FAQ about 90/180 rule
  how-it-works/page.tsx     # Educational guide
  privacy/page.tsx          # Privacy policy
  terms/page.tsx            # Terms and conditions
  sign-in/page.tsx          # Sign-in page
  sign-up/page.tsx          # Sign-up page
  reset-password/page.tsx   # Password reset
  verified/page.tsx         # Email verification landing
  account/page.tsx          # Account settings (password, deletion)
  layout.tsx                # Root layout (metadata, analytics, fonts)
  globals.css               # Global styles

  api/
    stays/                  # CRUD for recorded stays
    proposed-trips/         # CRUD for proposed trips
    import/                 # localStorage → database import
    stripe/checkout/        # Stripe checkout session creation
    stripe/webhook/         # Stripe webhook handler
    payment-status/         # Payment status check
    payment-status/verify/  # Stripe-direct payment verification (webhook fallback)
    pricing/                # Geo-based price label
    account/delete/         # Account deletion

components/
  schengen-calculator.tsx   # Main calculator component
  three-month-calendar.tsx  # 3-month date range picker
  single-month-calendar.tsx # Single month calendar
  timeline-visualization.tsx # Visual timeline of stays
  timeline-paywall.tsx      # Paywall overlay with CTA
  payment-success-modal.tsx # Post-payment success dialog
  account-deleted-modal.tsx # Post-deletion confirmation
  layout-shell.tsx          # Conditional layout (hides nav on auth pages)
  navigation.tsx            # Top nav bar
  footer.tsx                # Footer
  theme-provider.tsx        # Dark mode provider
  ui/                       # shadcn/ui primitives

lib/
  schengen-calculations.ts  # Core rolling-window calculation logic
  schengenCalculator.ts     # OOP calculator class
  auth.ts                   # BetterAuth configuration
  db.ts                     # Postgres connection pool
  stripe.ts                 # Stripe client singleton
  email.ts                  # Resend email helpers
  env.ts                    # Zod-based env validation
  rate-limit.ts             # In-memory rate limiter
  security-logger.ts        # Structured security event logging
  utils.ts                  # cn() Tailwind utility

hooks/
  use-stays.ts              # Stay/trip CRUD (Supabase for auth'd, localStorage for anon)
  use-payment-status.ts     # Payment status with refresh

middleware.ts               # Rate limiting, bot detection, HTTPS enforcement
supabase/schema.sql         # Database schema
```

## Architecture

- **Anonymous users:** calculator works client-side via localStorage
- **Signed-in users:** stay/trip data stored in Supabase, syncs across devices
- **Payment:** one-time Stripe checkout unlocks timeline visualization
- **Payment verification:** webhook-primary with direct Stripe API fallback on redirect

### What's Free vs Paid

- **Free (no account):** Calculator, recorded stays, proposed trips, hide/show toggles — all via localStorage
- **Free (signed in):** Same features but data syncs across devices via Supabase
- **Paid (one-time):** Timeline visualization unlocked

## Key Data Models

```typescript
interface Stay {
  id: string
  entryDate: Date
  exitDate: Date
  stayType: "short" | "residence"
  countryCode?: string
  hidden?: boolean  // excluded from calculations/timeline, dimmed in list
}
```

**localStorage keys:** `schengen-stays`, `schengen-proposed-trips`

## Core Logic

The 90/180 rule calculation lives in `lib/schengen-calculations.ts` and `lib/schengenCalculator.ts`:
- Rolling 180-day window from a reference date
- Both entry and exit dates count toward the 90-day limit
- Handles overlapping stays and proposed trips
- Reference date is adjustable to check compliance on any date

## Commands

```bash
pnpm dev        # Start dev server
pnpm build      # Production build
pnpm start      # Run production server
pnpm lint       # ESLint
```

## Environment Variables

See `.env.example` for the full list. Key groups:
- **Database:** `DATABASE_URL`
- **Auth:** `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`
- **Email:** `RESEND_API_KEY`
- **Stripe:** `STRIPE_SECRET_KEY`, `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`, `STRIPE_WEBHOOK_SECRET`
- **Rate limiting (production):** `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN`

## Image Handling

All images committed to `public/` (especially `public/blog/`) must be WebP. Convert before committing — never commit raw JPG/PNG from the user.

Use `cwebp` (already installed). Pick settings by image role:

- **Hero / photographic blog images:** `cwebp -q 85 -sharp_yuv -resize 1800 0 input.jpg -o output.webp`. Width capped at 1800px covers the largest render size (post hero at ~900px display × 2x DPR) while keeping file sizes small. Do not resize if the source is already smaller.
- **UI screenshots (dashboards, calculator captures):** `cwebp -lossless -m 6 input.png -o output.webp`. Lossless keeps text crisp and typically still beats PNG by 5–8x.
- **Avatars / small icons under 300px:** `cwebp -q 90 -sharp_yuv input.jpg -o output.webp`. No resize needed.

After converting:
1. Delete the original JPG/PNG so the repo only carries the WebP.
2. Update every code reference (image manifests like `lib/blog/index.ts`, inline `<Image src>` props) to point at the new `.webp` path.
3. Verify with `grep -rn "\.jpg\|\.png" lib/blog app/blog components` — should return nothing for the migrated files.

Next.js's `<Image>` component serves WebP directly, so no `<picture>` fallback or dual-format is needed.

## Notes

- No test framework configured
- Origin: initially built with v0.app, now maintained in this repo
- Images are unoptimized (configured in next.config.mjs)
- TypeScript build errors are ignored in next.config.mjs
- 5 pre-existing TS errors in schengen-calculator.tsx (type mismatches, not from our changes)

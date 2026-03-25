# Schengen Monitor

## What This Is

A free, client-side web calculator for tracking Schengen Area visa compliance under the **90/180-day rule**. Travelers enter their past stays and proposed future trips to check whether they comply with EU short-stay visa limits. All data is stored in the browser via localStorage — there is no backend or database.

**Live site:** https://www.schengenmonitor.com
**Author:** Romie Bajwa

## Tech Stack

- **Framework:** Next.js 16 (App Router) with React 19 and TypeScript
- **Styling:** Tailwind CSS 4 with OKLCH color variables, dark mode via next-themes
- **UI Components:** shadcn/ui (new-york style) built on Radix UI primitives
- **Forms:** React Hook Form + Zod validation
- **Dates:** date-fns, React Day Picker
- **Charts:** Recharts (timeline visualization)
- **Analytics:** Vercel Analytics, Vercel Speed Insights, Google Analytics (AW-17780766572)
- **Package Manager:** pnpm
- **Deployment:** Vercel

## Project Structure

```
app/                        # Next.js App Router pages
  page.tsx                  # Home — main calculator
  faq/page.tsx              # FAQ about 90/180 rule
  how-it-works/page.tsx     # Educational guide
  privacy/page.tsx          # Privacy policy
  terms/page.tsx            # Terms and conditions
  layout.tsx                # Root layout (metadata, analytics, fonts)
  globals.css               # Global styles
  robots.ts / sitemap.ts    # SEO generation

components/
  schengen-calculator.tsx   # Main calculator component (~1100 lines)
  three-month-calendar.tsx  # 3-month date range picker
  single-month-calendar.tsx # Single month calendar
  timeline-visualization.tsx # Visual timeline of stays
  navigation.tsx            # Top nav bar
  footer.tsx                # Footer
  theme-provider.tsx        # Dark mode provider
  ui/                       # shadcn/ui primitives (18+ components)

lib/
  schengen-calculations.ts  # Core rolling-window calculation logic
  schengenCalculator.ts     # OOP calculator class
  utils.ts                  # cn() Tailwind utility
```

## Key Data Models

```typescript
// Stay — stored in localStorage as JSON
interface Stay {
  id: string
  entryDate: Date
  exitDate: Date
  stayType: "short" | "residence"
  countryCode?: string
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

## Notes

- No test framework configured
- Origin: initially built with v0.app, now maintained in this repo
- Images are unoptimized (configured in next.config.mjs)
- TypeScript build errors are ignored in next.config.mjs
- 5 pre-existing TS errors in schengen-calculator.tsx (type mismatches — not from our changes)
- Stays have a `hidden?: boolean` field — hidden stays/proposed trips are excluded from calculations and timeline but remain visible (dimmed) in the list

---

## Paywall & Auth Feature (Planned)

**Branch:** `paywall-timeline` (to be created off `main`)

### Overview

The timeline visualization is moving behind a one-time payment paywall. The rest of the calculator remains free and works without an account.

### Tech Stack Additions

- **Auth:** BetterAuth (email/password)
- **Database:** Supabase (Postgres) — user data, stays, payment status
- **Email:** Resend — verification emails, password resets, payment receipts
- **Payments:** Stripe — one-time checkout

### Architecture Changes

- Anonymous users: calculator works client-side via localStorage (unchanged)
- Signed-in users: stay/trip data stored in Supabase, syncs across devices
- Payment status stored in Supabase, validated server-side
- BetterAuth uses Supabase Postgres as its user/session store

### What's Free vs Paid

- **Free (no account):** Calculator, recorded stays, proposed trips, hide/show toggles — all via localStorage
- **Free (signed in):** Same features but data syncs across devices via Supabase
- **Paid (one-time):** Timeline visualization unlocked

### Timeline Paywall UX

**For non-paying users:** The timeline section shows the example timeline **blurred/dimmed** behind an overlay with:

> **Never Overstay Again**
> Track your 90/180 day status at a glance with a visual timeline of all your Schengen stays.
> [Unlock Timeline — $X one-time]
> One-time payment. No subscription.

- Anonymous users: CTA says "Sign up to unlock"
- Signed-in free users: CTA says "Unlock Timeline — $X one-time"

**Remove** the current empty-state copy that tells users to add stays to build their timeline (this gives away value). Replace with the paywall overlay using the example data as a visual teaser.

### User Flows

**Anonymous user → CTA → Payment:**
1. Sees blurred timeline with "Never Overstay Again" overlay
2. Clicks CTA → redirected to sign-up page
3. Sign-up page mentions: "Create an account to unlock the Timeline Visualization"
4. Signs up (email/password, verified via Resend)
5. Immediately redirected to Stripe Checkout
6. Stripe redirects back on success
7. **If localStorage stays exist** → imported into account, timeline unlocked and visible. Success modal: "You're all set! Your timeline is now unlocked and your recorded stays have been imported. You can view your complete Schengen travel history below." [Got it]
8. **If no localStorage stays** → timeline shows current empty-state copy (add stays for timeline to appear). Success modal: "You're all set! Your timeline is now unlocked. Start recording your Schengen area visits and your personalized timeline will build out automatically." [Got it]

**Signed-in free user → CTA → Payment:**
1. Same blurred overlay
2. Clicks CTA → goes straight to Stripe Checkout (no sign-up needed)
3. Returns → same success logic as above

**Edge cases:**
- User closes Stripe before paying → returns unpaid, timeline stays locked
- User signs up but abandons payment → has account with synced data, timeline locked, CTA shows "Unlock Timeline" (not "Sign up")
- localStorage data vs existing account data on import → skip duplicates, database takes priority

### Implementation Phases

**Phase 1 — Auth & Database:**
- Supabase schema (users, stays, trips, payment status)
- BetterAuth setup with email/password
- Resend integration for verification emails
- Sign-in/sign-up UI (mention timeline unlock on sign-up page)
- Data layer: signed-in users read/write to Supabase, anonymous users use localStorage
- Import localStorage data on first sign-up

**Phase 2 — Paywall:**
- Stripe one-time checkout integration
- Store payment status in Supabase
- Timeline paywall overlay (blurred example + CTA copy)
- Gate timeline rendering behind payment check
- Success modal after payment (two variants: with/without existing stays)
- Post-payment redirect flow

**Phase 3 — Polish:**
- Account management (change password, delete account)
- Payment receipts via Resend
- Error handling edge cases

### Required Environment Variables (to be set up)

- `DATABASE_URL` — Supabase Postgres connection string
- `NEXT_PUBLIC_SUPABASE_URL` — Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` — Supabase anon key
- `BETTER_AUTH_SECRET` — random string for signing tokens
- `RESEND_API_KEY` — Resend API key
- `STRIPE_SECRET_KEY` — Stripe secret key
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` — Stripe publishable key
- `STRIPE_WEBHOOK_SECRET` — Stripe webhook signing secret

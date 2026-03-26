-- Schengen Monitor Database Schema
-- BetterAuth manages its own tables (user, session, verification, account)
-- Run BetterAuth migrations first, then run this schema.

-- Recorded stays
CREATE TABLE stays (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL REFERENCES "user"(id) ON DELETE CASCADE,
  entry_date DATE NOT NULL,
  exit_date DATE NOT NULL,
  stay_type TEXT NOT NULL CHECK (stay_type IN ('short', 'residence')),
  country_code TEXT,
  hidden BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Proposed trips
CREATE TABLE proposed_trips (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL REFERENCES "user"(id) ON DELETE CASCADE,
  entry_date DATE NOT NULL,
  exit_date DATE NOT NULL,
  hidden BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Payment status (for Phase 2 - Stripe integration)
CREATE TABLE payment_status (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL UNIQUE REFERENCES "user"(id) ON DELETE CASCADE,
  has_paid BOOLEAN NOT NULL DEFAULT FALSE,
  stripe_customer_id TEXT,
  stripe_payment_id TEXT,
  paid_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Webhook idempotency: prevent duplicate event processing
CREATE TABLE processed_webhook_events (
  event_id TEXT PRIMARY KEY,
  processed_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_stays_user_id ON stays(user_id);
CREATE INDEX idx_proposed_trips_user_id ON proposed_trips(user_id);
CREATE INDEX idx_payment_status_user_id ON payment_status(user_id);

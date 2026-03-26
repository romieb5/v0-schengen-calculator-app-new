import { Pool } from "pg"

let _pool: Pool | null = null

/**
 * Shared Postgres pool with SSL enforced in production.
 * Reuses a single pool across all API routes to avoid connection exhaustion.
 */
export function getPool(): Pool {
  if (!_pool) {
    const isProduction = process.env.NODE_ENV === "production"
    _pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: isProduction ? { rejectUnauthorized: true } : undefined,
      max: 10,
      idleTimeoutMillis: 30_000,
    })
  }
  return _pool
}

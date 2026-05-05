/**
 * SUG Grappling — Supabase Row Types
 *
 * Services use `select('*')` on events so Postgres never rejects the query
 * when the admin schema uses different column names than older mobile code.
 * Mappers read rows via pickers that try several common aliases.
 */

// ─── Events (loose row — actual columns depend on admin schema) ─

/** Raw row from `from('events').select('*')`. All known fields optional. */
export interface EventRow extends Record<string, unknown> {
  id: string;
  title?: string | null;
  name?: string | null;
  event_title?: string | null;
  event_name?: string | null;
  subtitle?: string | null;
  city?: string | null;
  venue?: string | null;
  address?: string | null;
  event_date?: string | null;
  date?: string | null;
  starts_at?: string | null;
  start_date?: string | null;
  doors_time?: string | null;
  description?: string | null;
  hero_image_url?: string | null;
  poster_image_url?: string | null;
  ticket_url?: string | null;
  status?: string | null;
  featured?: boolean | null;
  is_featured?: boolean | null;
  created_at?: string | null;
  updated_at?: string | null;
}

// ─── Athletes (matches public.athletes schema) ───────────────
// Note: weightClass is stored camelCase in the DB, so it must be quoted
// in PostgREST selects (e.g. select('"weightClass"')).

export interface AthleteRow {
  id: string;
  name?: string | null;
  weightClass?: string | null;
  record?: string | null;
  status?: string | null;
  rank?: number | null;
  avatar_url?: string | null;
  created_at?: string | null;
}

// ─── Articles (matches public.articles schema) ───────────────

export interface ArticleRow {
  id: string;
  title?: string | null;
  category?: string | null;
  excerpt?: string | null;
  body?: string | null;
  cover_image_url?: string | null;
  author_name?: string | null;
  author_role?: string | null;
  author_avatar_url?: string | null;
  published_at?: string | null;
  featured?: boolean | null;
  status?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
}

// ─── Helpers ─────────────────────────────────────────────────

/**
 * Returns true when the Supabase error indicates the underlying
 * table does not exist (PostgREST/Postgres "relation does not exist").
 * Used by screens to decide whether to show a labeled mock preview.
 */
export function isMissingTableError(message: string | undefined | null): boolean {
  if (!message) return false;
  const m = message.toLowerCase();
  return m.includes('relation') && m.includes('does not exist');
}

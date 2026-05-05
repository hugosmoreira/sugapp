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

// ─── Athletes (loose — exact schema not yet confirmed) ───────

export interface AthleteRow {
  id: string;
  name?: string | null;
  full_name?: string | null;
  nickname?: string | null;
  gym?: string | null;
  academy?: string | null;
  country?: string | null;
  country_code?: string | null;
  weight_class?: string | null;
  belt?: string | null;
  ranking?: number | null;
  rank?: number | null;
  rating?: number | null;
  category?: string | null;
  status?: string | null;
  bio?: string | null;
  fights?: number | null;
  wins?: number | null;
  losses?: number | null;
  avatar_url?: string | null;
  image_url?: string | null;
  hero_image_url?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
}

// ─── Articles (loose — exact schema not yet confirmed) ───────

export interface ArticleRow {
  id: string;
  title?: string | null;
  category?: string | null;
  summary?: string | null;
  content?: string | null;
  hero_image_url?: string | null;
  image_url?: string | null;
  author_name?: string | null;
  author_role?: string | null;
  author_avatar_url?: string | null;
  read_time?: string | null;
  tags?: string[] | null;
  featured?: boolean | null;
  published_at?: string | null;
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

/**
 * SUG Grappling — Supabase Row Types
 *
 * Single source of truth for the row shapes returned by Supabase.
 * Services convert these rows into the UI types in `./types.ts`.
 *
 * Keep these in sync with the actual Supabase schema. If a column is
 * missing here, services should not select it.
 */

// ─── Events (confirmed schema) ───────────────────────────────

export interface EventRow {
  id: string;
  title: string;
  subtitle: string | null;
  city: string;
  venue: string;
  address: string | null;
  event_date: string;
  doors_time: string | null;
  description: string | null;
  hero_image_url: string | null;
  poster_image_url: string | null;
  ticket_url: string | null;
  /**
   * Admin app emits one of: upcoming | live | past | completed.
   * Anything else is treated by date.
   */
  status: 'upcoming' | 'live' | 'past' | 'completed' | string;
  featured: boolean;
  created_at: string;
  updated_at: string;
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

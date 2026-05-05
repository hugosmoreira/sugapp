/**
 * SUG Grappling — Athletes Service
 *
 * Reads athletes from public.athletes. The `weightClass` column is stored
 * camelCase in the DB, so it must be quoted in PostgREST selects.
 */
import { supabase } from '../lib/supabase';
import type { AthleteRow } from '../types/database';
import type { Athlete, AthleteProfile } from '../types/types';

const ATHLETE_COLUMNS =
  'id, name, "weightClass", record, status, rank, avatar_url, created_at';

// ─── Helpers ─────────────────────────────────────────────────

function pickString(...values: Array<string | null | undefined>): string | undefined {
  for (const v of values) {
    if (typeof v === 'string' && v.trim().length > 0) return v;
  }
  return undefined;
}

function pickNumber(...values: Array<number | null | undefined>): number | undefined {
  for (const v of values) {
    if (typeof v === 'number' && Number.isFinite(v)) return v;
  }
  return undefined;
}

// ─── Row → UI mappers ────────────────────────────────────────

export function mapRowToAthlete(row: AthleteRow): Athlete {
  return {
    id: row.id,
    name: pickString(row.name) ?? 'Unknown Athlete',
    image: pickString(row.avatar_url) ?? '',
    weightClass: pickString(row.weightClass),
    record: pickString(row.record),
    rank: pickNumber(row.rank),
    status: pickString(row.status),
  };
}

export function mapRowToAthleteProfile(row: AthleteRow): AthleteProfile {
  return {
    id: row.id,
    name: pickString(row.name) ?? 'Unknown Athlete',
    avatar: pickString(row.avatar_url) ?? '',
    weightClass: pickString(row.weightClass),
    record: pickString(row.record),
    rank: pickNumber(row.rank),
    status: pickString(row.status),
  };
}

// ─── Public API ──────────────────────────────────────────────

export async function listAthletes(): Promise<Athlete[]> {
  const { data, error } = await supabase
    .from('athletes')
    .select(ATHLETE_COLUMNS)
    .order('rank', { ascending: true, nullsFirst: false });

  if (error) {
    throw new Error(error.message);
  }
  return ((data ?? []) as AthleteRow[]).map(mapRowToAthlete);
}

/**
 * Returns up to 10 active athletes ordered by rank for the Home screen
 * "Featured Athletes" rail. There is no `featured` column yet, so we use
 * status='active' as the filter.
 */
export async function listFeaturedAthletes(): Promise<Athlete[]> {
  const { data, error } = await supabase
    .from('athletes')
    .select(ATHLETE_COLUMNS)
    .eq('status', 'active')
    .order('rank', { ascending: true, nullsFirst: false })
    .limit(10);

  if (error) {
    throw new Error(error.message);
  }
  return ((data ?? []) as AthleteRow[]).map(mapRowToAthlete);
}

export async function getAthleteById(
  id: string,
): Promise<AthleteProfile | null> {
  const { data, error } = await supabase
    .from('athletes')
    .select(ATHLETE_COLUMNS)
    .eq('id', id)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }
  return data ? mapRowToAthleteProfile(data as AthleteRow) : null;
}

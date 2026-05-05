/**
 * SUG Grappling — Athletes Service
 *
 * Reads athletes from the public.athletes Supabase table and maps rows
 * permissively into the UI types. Uses `select('*')` because the exact
 * schema is admin-driven; missing columns are tolerated.
 *
 * Errors are surfaced to the screen verbatim so schema/connection
 * problems are diagnosable. No mock fallback inside the service.
 */
import { supabase } from '../lib/supabase';
import type { AthleteRow } from '../types/database';
import type {
  Athlete,
  AthleteCategory,
  AthleteProfile,
} from '../types/types';

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

function normalizeCategory(value: string | null | undefined): AthleteCategory | undefined {
  if (!value) return undefined;
  const v = value.toLowerCase().replace(/[\s-]/g, '_');
  if (v === 'pro_league' || v === 'pro') return 'pro_league';
  if (v === 'top_rated' || v === 'top') return 'top_rated';
  if (v === 'all') return 'all';
  return undefined;
}

function logError(scope: string, error: unknown) {
  console.error(`[athletes] ${scope}`, error);
}

// ─── Row → UI mappers ────────────────────────────────────────

export function mapRowToAthlete(row: AthleteRow): Athlete {
  const name =
    pickString(row.name, row.full_name, row.nickname) ?? 'Unknown Athlete';
  const image = pickString(row.avatar_url, row.image_url, row.hero_image_url) ?? '';

  return {
    id: row.id,
    name,
    image,
    gym: pickString(row.gym, row.academy),
    country: pickString(row.country) ?? undefined,
    countryCode: pickString(row.country_code) ?? undefined,
    ranking: pickNumber(row.ranking, row.rank),
    academy: pickString(row.academy, row.gym),
    rating: pickNumber(row.rating),
    weightClass: pickString(row.weight_class),
    category: normalizeCategory(row.category),
  };
}

export function mapRowToAthleteProfile(row: AthleteRow): AthleteProfile {
  const name =
    pickString(row.name, row.full_name, row.nickname) ?? 'Unknown Athlete';
  const avatar =
    pickString(row.avatar_url, row.image_url, row.hero_image_url) ?? '';

  return {
    id: row.id,
    name,
    nickname: pickString(row.nickname),
    academy: pickString(row.academy, row.gym) ?? '',
    country: pickString(row.country) ?? '',
    belt: pickString(row.belt) ?? '',
    avatar,
    bio: pickString(row.bio) ?? '',
    stats: {
      fights: pickNumber(row.fights) ?? 0,
      wins: pickNumber(row.wins) ?? 0,
      losses: pickNumber(row.losses) ?? 0,
    },
    pastFights: [],
    eventsParticipated: [],
  };
}

// ─── Public API ──────────────────────────────────────────────

export async function listAthletes(): Promise<Athlete[]> {
  const { data, error } = await supabase.from('athletes').select('*');

  if (error) {
    logError('listAthletes', error);
    throw new Error(error.message);
  }
  console.info('[athletes] listAthletes rows=', data?.length ?? 0);
  return (data ?? []).map((row) => mapRowToAthlete(row as AthleteRow));
}

export async function getAthleteById(
  id: string,
): Promise<AthleteProfile | null> {
  const { data, error } = await supabase
    .from('athletes')
    .select('*')
    .eq('id', id)
    .maybeSingle();

  if (error) {
    logError('getAthleteById', error);
    throw new Error(error.message);
  }
  console.info('[athletes] getAthleteById id=', id, 'found=', Boolean(data));
  return data ? mapRowToAthleteProfile(data as AthleteRow) : null;
}

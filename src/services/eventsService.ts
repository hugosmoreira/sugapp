/**
 * SUG Grappling — Events Service
 *
 * Uses `select('*')` and in-memory filter/sort so we never ask Postgres for
 * columns that don't exist (avoids e.g. "column events.title does not exist").
 * Field pickers try common admin naming variants.
 */
import { supabase } from '../lib/supabase';
import type { EventRow } from '../types/database';
import type {
  Event,
  EventDetail,
  EventStatus,
  TicketStatus,
} from '../types/types';

function firstNonEmptyString(
  row: Record<string, unknown>,
  keys: string[],
): string | undefined {
  for (const k of keys) {
    const v = row[k];
    if (typeof v === 'string' && v.trim().length > 0) return v;
  }
  return undefined;
}

function pickEventDate(row: EventRow): string | null {
  return (
    firstNonEmptyString(row, [
      'event_date',
      'date',
      'starts_at',
      'start_date',
      'event_datetime',
      'start_time',
    ]) ?? null
  );
}

function pickTitle(row: EventRow): string {
  return (
    firstNonEmptyString(row, [
      'title',
      'name',
      'event_title',
      'event_name',
      'label',
      'headline',
    ]) ?? 'Untitled Event'
  );
}

function pickFeatured(row: EventRow): boolean {
  if (typeof row.featured === 'boolean') return row.featured;
  if (typeof row.is_featured === 'boolean') return row.is_featured;
  const raw: unknown = row.featured ?? row.is_featured;
  if (raw === true || raw === 1) return true;
  if (typeof raw === 'string' && raw.toLowerCase() === 'true') return true;
  return false;
}

// ─── Helpers ─────────────────────────────────────────────────

function normalizeStatus(
  status: string | null | undefined,
  date: string | null,
): EventStatus {
  const s = status?.toLowerCase();
  if (s === 'upcoming' || s === 'live') return 'upcoming';
  if (s === 'past' || s === 'completed') return 'past';
  if (!date) return 'upcoming';
  return new Date(date).getTime() < Date.now() ? 'past' : 'upcoming';
}

function pickImage(
  primary: string | undefined,
  fallback: string | undefined,
): string | undefined {
  const a = primary?.trim();
  const b = fallback?.trim();
  return a || b || undefined;
}

function ticketStatusFrom(row: EventRow): TicketStatus {
  const ticket = firstNonEmptyString(row, ['ticket_url', 'tickets_url', 'ticket_link']);
  if (ticket) return 'available';
  if (normalizeStatus(row.status as string | undefined, pickEventDate(row)) === 'past')
    return 'sold_out';
  return 'coming_soon';
}

function logError(scope: string, error: unknown) {
  console.error(`[events] ${scope}`, error);
}

async function fetchAllEventRows(): Promise<EventRow[]> {
  const { data, error } = await supabase.from('events').select('*');

  if (error) {
    logError('fetchAllEventRows', error);
    throw new Error(error.message);
  }
  console.info('[events] fetchAllEventRows rows=', data?.length ?? 0);
  return (data ?? []) as EventRow[];
}

function eventTimestamp(row: EventRow): number {
  const d = pickEventDate(row);
  if (!d) return 0;
  const t = new Date(d).getTime();
  return Number.isNaN(t) ? 0 : t;
}

// ─── Row → UI mappers ────────────────────────────────────────

export function mapRowToEvent(row: EventRow): Event {
  const status = normalizeStatus(row.status as string | undefined, pickEventDate(row));
  const hero = firstNonEmptyString(row, ['hero_image_url', 'hero_url', 'image_url']);
  const poster = firstNonEmptyString(row, [
    'poster_image_url',
    'poster_url',
    'cover_image_url',
    'thumbnail_url',
  ]);
  const image = pickImage(poster, hero) ?? '';

  const ticketUrl = firstNonEmptyString(row, ['ticket_url', 'tickets_url', 'ticket_link']);

  return {
    id: String(row.id),
    title: pickTitle(row),
    city: firstNonEmptyString(row, ['city', 'location', 'city_name']) ?? '',
    state: '',
    date: pickEventDate(row) ?? new Date().toISOString(),
    image,
    featured: pickFeatured(row),
    description:
      firstNonEmptyString(row, ['description', 'body', 'summary', 'details']) ?? undefined,
    venue: firstNonEmptyString(row, ['venue', 'venue_name', 'location_name']) ?? undefined,
    status,
    ticketsAvailable: Boolean(ticketUrl),
  };
}

export interface EventDetailWithExtras extends EventDetail {
  ticketUrl?: string;
  posterImageUrl?: string;
}

export function mapRowToEventDetail(row: EventRow): EventDetailWithExtras {
  const heroRaw = firstNonEmptyString(row, ['hero_image_url', 'hero_url', 'image_url']);
  const posterRaw = firstNonEmptyString(row, [
    'poster_image_url',
    'poster_url',
    'cover_image_url',
    'thumbnail_url',
  ]);
  const heroImage = pickImage(heroRaw, posterRaw) ?? '';

  const city = firstNonEmptyString(row, ['city', 'location', 'city_name']) ?? '';
  const venue = firstNonEmptyString(row, ['venue', 'venue_name', 'location_name']) ?? '';
  const sub = firstNonEmptyString(row, ['subtitle', 'tagline']);
  const fallbackSubtitle = [city, venue].filter(Boolean).join(' • ');
  const subtitle =
    sub && sub.trim().length > 0 ? sub : fallbackSubtitle || undefined;

  const ticketUrl = firstNonEmptyString(row, ['ticket_url', 'tickets_url', 'ticket_link']);

  return {
    id: String(row.id),
    title: pickTitle(row),
    subtitle,
    type: 'MAIN_EVENT',
    city,
    state: '',
    venue,
    address: firstNonEmptyString(row, ['address', 'street_address', 'venue_address']) ?? '',
    date: pickEventDate(row) ?? new Date().toISOString(),
    doorsTime:
      firstNonEmptyString(row, ['doors_time', 'doors_open', 'doors']) ?? '',
    heroImage,
    description:
      firstNonEmptyString(row, ['description', 'body', 'summary', 'details']) ?? '',
    mapImage: '',
    ruleset: {
      format: 'Sub Only',
      timeLimit: '—',
      overtime: '—',
      uniform: 'No-Gi',
    },
    ticketStatus: ticketStatusFrom(row),
    ticketUrl: ticketUrl ?? undefined,
    posterImageUrl: posterRaw ?? undefined,
  };
}

// ─── Public API ──────────────────────────────────────────────

export async function listUpcomingEvents(): Promise<Event[]> {
  const rows = await fetchAllEventRows();
  const filtered = rows.filter(
    (row) =>
      normalizeStatus(row.status as string | undefined, pickEventDate(row)) ===
      'upcoming',
  );
  filtered.sort((a, b) => eventTimestamp(a) - eventTimestamp(b));
  console.info('[events] listUpcomingEvents rows=', filtered.length);
  return filtered.map(mapRowToEvent);
}

export async function listPastEvents(): Promise<Event[]> {
  const rows = await fetchAllEventRows();
  const filtered = rows.filter(
    (row) =>
      normalizeStatus(row.status as string | undefined, pickEventDate(row)) === 'past',
  );
  filtered.sort((a, b) => eventTimestamp(b) - eventTimestamp(a));
  console.info('[events] listPastEvents rows=', filtered.length);
  return filtered.map(mapRowToEvent);
}

export async function getFeaturedEvent(): Promise<Event | null> {
  const rows = await fetchAllEventRows();
  const candidates = rows.filter((row) => {
    if (!pickFeatured(row)) return false;
    return (
      normalizeStatus(row.status as string | undefined, pickEventDate(row)) === 'upcoming'
    );
  });
  if (candidates.length === 0) {
    console.info('[events] getFeaturedEvent found=', false);
    return null;
  }
  candidates.sort((a, b) => eventTimestamp(a) - eventTimestamp(b));
  const winner = candidates[0];
  console.info('[events] getFeaturedEvent found=', true);
  return mapRowToEvent(winner);
}

export async function getEventById(
  id: string,
): Promise<EventDetailWithExtras | null> {
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .eq('id', id)
    .maybeSingle();

  if (error) {
    logError('getEventById', error);
    throw new Error(error.message);
  }
  console.info('[events] getEventById id=', id, 'found=', Boolean(data));
  return data ? mapRowToEventDetail(data as EventRow) : null;
}

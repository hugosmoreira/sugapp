/**
 * SUG Grappling — Events Service
 *
 * Reads events from the public.events Supabase table and maps rows
 * into the UI types used across the mobile app.
 *
 * Supabase row shape lives in `../types/database.ts` (single source of truth).
 */
import { supabase } from '../lib/supabase';
import type { EventRow } from '../types/database';
import type {
  Event,
  EventDetail,
  EventStatus,
  TicketStatus,
} from '../types/types';

const EVENT_COLUMNS =
  'id, title, subtitle, city, venue, address, event_date, doors_time, description, hero_image_url, poster_image_url, ticket_url, status, featured, created_at, updated_at';

const UPCOMING_FILTER = (nowIso: string) =>
  `status.in.(upcoming,live),event_date.gte.${nowIso}`;
const PAST_FILTER = (nowIso: string) =>
  `status.in.(past,completed),event_date.lt.${nowIso}`;

// ─── Helpers ─────────────────────────────────────────────────

function normalizeStatus(
  status: string | null,
  date: string | null,
): EventStatus {
  if (status === 'upcoming' || status === 'live') return 'upcoming';
  if (status === 'past' || status === 'completed') return 'past';
  if (!date) return 'upcoming';
  return new Date(date).getTime() < Date.now() ? 'past' : 'upcoming';
}

function pickImage(
  primary: string | null,
  fallback: string | null,
): string | undefined {
  return primary?.trim() || fallback?.trim() || undefined;
}

function ticketStatusFrom(row: EventRow): TicketStatus {
  if (row.ticket_url && row.ticket_url.trim().length > 0) return 'available';
  if (normalizeStatus(row.status, row.event_date) === 'past') return 'sold_out';
  return 'coming_soon';
}

function logError(scope: string, error: unknown) {
  console.error(`[events] ${scope}`, error);
}

// ─── Row → UI mappers ────────────────────────────────────────

export function mapRowToEvent(row: EventRow): Event {
  const status = normalizeStatus(row.status, row.event_date);
  const image = pickImage(row.poster_image_url, row.hero_image_url) ?? '';

  return {
    id: row.id,
    title: row.title ?? 'Untitled Event',
    city: row.city ?? '',
    state: '',
    date: row.event_date ?? new Date().toISOString(),
    image,
    featured: Boolean(row.featured),
    description: row.description ?? undefined,
    venue: row.venue ?? undefined,
    status,
    ticketsAvailable: Boolean(
      row.ticket_url && row.ticket_url.trim().length > 0,
    ),
  };
}

export interface EventDetailWithExtras extends EventDetail {
  ticketUrl?: string;
  posterImageUrl?: string;
}

export function mapRowToEventDetail(row: EventRow): EventDetailWithExtras {
  const heroImage = pickImage(row.hero_image_url, row.poster_image_url) ?? '';
  const fallbackSubtitle = [row.city, row.venue].filter(Boolean).join(' • ');
  const subtitle =
    row.subtitle && row.subtitle.trim().length > 0
      ? row.subtitle
      : fallbackSubtitle || undefined;

  return {
    id: row.id,
    title: row.title ?? 'Untitled Event',
    subtitle,
    type: 'MAIN_EVENT',
    city: row.city ?? '',
    state: '',
    venue: row.venue ?? '',
    address: row.address ?? '',
    date: row.event_date ?? new Date().toISOString(),
    doorsTime: row.doors_time ?? '',
    heroImage,
    description: row.description ?? '',
    mapImage: '',
    ruleset: {
      format: 'Sub Only',
      timeLimit: '—',
      overtime: '—',
      uniform: 'No-Gi',
    },
    ticketStatus: ticketStatusFrom(row),
    ticketUrl: row.ticket_url ?? undefined,
    posterImageUrl: row.poster_image_url ?? undefined,
  };
}

// ─── Public API ──────────────────────────────────────────────

export async function listUpcomingEvents(): Promise<Event[]> {
  const nowIso = new Date().toISOString();
  const { data, error } = await supabase
    .from('events')
    .select(EVENT_COLUMNS)
    .or(UPCOMING_FILTER(nowIso))
    .order('event_date', { ascending: true });

  if (error) {
    logError('listUpcomingEvents', error);
    throw new Error(error.message);
  }
  console.info('[events] listUpcomingEvents rows=', data?.length ?? 0);
  return (data ?? []).map((row) => mapRowToEvent(row as EventRow));
}

export async function listPastEvents(): Promise<Event[]> {
  const nowIso = new Date().toISOString();
  const { data, error } = await supabase
    .from('events')
    .select(EVENT_COLUMNS)
    .or(PAST_FILTER(nowIso))
    .order('event_date', { ascending: false });

  if (error) {
    logError('listPastEvents', error);
    throw new Error(error.message);
  }
  console.info('[events] listPastEvents rows=', data?.length ?? 0);
  return (data ?? []).map((row) => mapRowToEvent(row as EventRow));
}

export async function getFeaturedEvent(): Promise<Event | null> {
  const nowIso = new Date().toISOString();
  const { data, error } = await supabase
    .from('events')
    .select(EVENT_COLUMNS)
    .eq('featured', true)
    .or(UPCOMING_FILTER(nowIso))
    .order('event_date', { ascending: true })
    .limit(1)
    .maybeSingle();

  if (error) {
    logError('getFeaturedEvent', error);
    throw new Error(error.message);
  }
  console.info('[events] getFeaturedEvent found=', Boolean(data));
  return data ? mapRowToEvent(data as EventRow) : null;
}

export async function getEventById(
  id: string,
): Promise<EventDetailWithExtras | null> {
  const { data, error } = await supabase
    .from('events')
    .select(EVENT_COLUMNS)
    .eq('id', id)
    .maybeSingle();

  if (error) {
    logError('getEventById', error);
    throw new Error(error.message);
  }
  console.info('[events] getEventById id=', id, 'found=', Boolean(data));
  return data ? mapRowToEventDetail(data as EventRow) : null;
}

/**
 * SUG Grappling — Events Service
 *
 * Reads events from the public.events Supabase table and maps rows
 * into the UI types used across the mobile app.
 *
 * Expected columns:
 *   id, title, city, state, venue, address, date,
 *   description, status, type, featured,
 *   ticket_url, hero_image_url, poster_image_url
 */
import { supabase } from '../lib/supabase';
import type {
  Event,
  EventDetail,
  EventStatus,
  EventType,
  TicketStatus,
} from '../types/types';

// ─── Row shape from Supabase ─────────────────────────────────

export interface EventRow {
  id: string;
  title: string | null;
  city: string | null;
  state: string | null;
  venue: string | null;
  address: string | null;
  date: string | null;
  description: string | null;
  status: string | null;
  type: string | null;
  featured: boolean | null;
  ticket_url: string | null;
  hero_image_url: string | null;
  poster_image_url: string | null;
}

const EVENT_COLUMNS =
  'id, title, city, state, venue, address, date, description, status, type, featured, ticket_url, hero_image_url, poster_image_url';

// ─── Helpers ─────────────────────────────────────────────────

const VALID_TYPES: EventType[] = ['MAIN_EVENT', 'OPEN_TOURNAMENT', 'QUALIFIER'];

function normalizeType(value: string | null): EventType | undefined {
  if (!value) return undefined;
  const upper = value.toUpperCase().replace(/[\s-]/g, '_');
  return (VALID_TYPES as string[]).includes(upper)
    ? (upper as EventType)
    : undefined;
}

function normalizeStatus(
  status: string | null,
  date: string | null,
): EventStatus {
  if (status === 'past' || status === 'upcoming') return status;
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
  if (normalizeStatus(row.status, row.date) === 'past') return 'sold_out';
  return 'coming_soon';
}

// ─── Row → UI mappers ────────────────────────────────────────

export function mapRowToEvent(row: EventRow): Event {
  const status = normalizeStatus(row.status, row.date);
  const image = pickImage(row.poster_image_url, row.hero_image_url) ?? '';

  return {
    id: row.id,
    title: row.title ?? 'Untitled Event',
    city: row.city ?? '',
    state: row.state ?? '',
    date: row.date ?? new Date().toISOString(),
    image,
    featured: Boolean(row.featured),
    description: row.description ?? undefined,
    type: normalizeType(row.type),
    venue: row.venue ?? undefined,
    status,
    ticketsAvailable: Boolean(row.ticket_url && row.ticket_url.trim().length > 0),
  };
}

export interface EventDetailWithExtras extends EventDetail {
  ticketUrl?: string;
  posterImageUrl?: string;
}

export function mapRowToEventDetail(row: EventRow): EventDetailWithExtras {
  const heroImage = pickImage(row.hero_image_url, row.poster_image_url) ?? '';
  const subtitleParts = [
    [row.city, row.state].filter(Boolean).join(', '),
    row.venue ?? '',
  ].filter(Boolean);

  return {
    id: row.id,
    title: row.title ?? 'Untitled Event',
    subtitle: subtitleParts.length ? subtitleParts.join(' • ') : undefined,
    type: normalizeType(row.type) ?? 'MAIN_EVENT',
    city: row.city ?? '',
    state: row.state ?? '',
    venue: row.venue ?? '',
    address: row.address ?? '',
    date: row.date ?? new Date().toISOString(),
    doorsTime: '',
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
    .or(`status.eq.upcoming,date.gte.${nowIso}`)
    .order('date', { ascending: true });

  if (error) throw new Error(error.message);
  return (data ?? []).map(mapRowToEvent);
}

export async function listPastEvents(): Promise<Event[]> {
  const nowIso = new Date().toISOString();
  const { data, error } = await supabase
    .from('events')
    .select(EVENT_COLUMNS)
    .or(`status.eq.past,date.lt.${nowIso}`)
    .order('date', { ascending: false });

  if (error) throw new Error(error.message);
  return (data ?? []).map(mapRowToEvent);
}

export async function getFeaturedEvent(): Promise<Event | null> {
  const nowIso = new Date().toISOString();
  const { data, error } = await supabase
    .from('events')
    .select(EVENT_COLUMNS)
    .eq('featured', true)
    .gte('date', nowIso)
    .order('date', { ascending: true })
    .limit(1)
    .maybeSingle();

  if (error) throw new Error(error.message);
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

  if (error) throw new Error(error.message);
  return data ? mapRowToEventDetail(data as EventRow) : null;
}

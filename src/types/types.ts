/**
 * SUG Grappling — Core TypeScript Types
 */

// ─── Event Types ─────────────────────────────────────────────

export type EventType = 'MAIN_EVENT' | 'OPEN_TOURNAMENT' | 'QUALIFIER';
export type EventStatus = 'upcoming' | 'past';
export type TicketStatus = 'available' | 'sold_out' | 'coming_soon';

export interface Ruleset {
  format: string;
  timeLimit: string;
  overtime: string;
  uniform: string;
}

export interface Event {
  id: string;
  title: string;
  city: string;
  state: string;
  date: string;
  image: number | string;
  featured: boolean;
  description?: string;
  /** Events screen fields */
  type?: EventType;
  venue?: string;
  status?: EventStatus;
  ticketsAvailable?: boolean;
}

/** Extended event for the detail screen */
export interface EventDetail {
  id: string;
  title: string;
  subtitle?: string;
  type: EventType;
  city: string;
  state: string;
  venue: string;
  address: string;
  date: string;
  doorsTime: string;
  heroImage: number | string;
  description: string;
  mapImage: number | string;
  ruleset: Ruleset;
  ticketStatus: TicketStatus;
}

export type AthleteCategory = 'all' | 'pro_league' | 'top_rated';

export interface Athlete {
  id: string;
  name: string;
  image: number | string;
  gym?: string;
  country?: string;
  countryCode?: string;
  ranking?: number;
  academy?: string;
  rating?: number;
  weightClass?: string;
  category?: AthleteCategory;
}

export interface AthleteStats {
  fights: number;
  wins: number;
  losses: number;
}

export interface PastFight {
  id: string;
  opponent: string;
  result: 'win' | 'loss';
  method: string;
  date: string;
}

export interface UpcomingFight {
  event: string;
  opponent: string;
  date: string;
  location: string;
}

export interface EventParticipated {
  eventId: string;
  eventName: string;
  posterImage: number | string;
}

export interface AthleteProfile {
  id: string;
  name: string;
  nickname?: string;
  academy: string;
  country: string;
  belt: string;
  avatar: number | string;
  bio: string;
  stats: AthleteStats;
  upcomingFight?: UpcomingFight;
  pastFights: PastFight[];
  eventsParticipated: EventParticipated[];
}

// ─── News ────────────────────────────────────────────────────
export type NewsCategory = 'Competitions' | 'Interviews' | 'Training' | 'Health' | 'Events';

export interface NewsArticle {
  id: string;
  title: string;
  category: string;
  image: number | string;
  publishedAt: string;
  summary?: string;
  date?: string;
  featured?: boolean;
}

export interface AuthorInfo {
  name: string;
  role: string;
  avatar: number | string;
}

export type ArticleSectionType = 'paragraph' | 'heading' | 'quote' | 'image';

export interface ArticleSection {
  type: ArticleSectionType;
  content?: string;
  image?: number | string;
}

export interface ArticleDetail {
  id: string;
  title: string;
  category: string;
  heroImage: number | string;
  author: AuthorInfo;
  date: string;
  readTime: string;
  sections: ArticleSection[];
  tags: string[];
}
// ─── Fight Card ──────────────────────────────────────────────

export interface FightMatchup {
  id: string;
  leftFighterName: string;
  rightFighterName: string;
  leftGym: string;
  rightGym: string;
  leftImage: number | string;
  rightImage: number | string;
  weightClass: string;
  label?: string;
  leftRank?: number;
  rightRank?: number;
  featured?: boolean;
}

export interface PrelimFight {
  id: string;
  title: string;
  subtitle: string;
}

export interface FightCardEvent {
  id: string;
  eventTitle: string;
  eventSubtitle: string;
  heroImage: number | string;
  heroTitle: string;
  heroSubtitle: string;
  mainCard: FightMatchup[];
  preliminaries: PrelimFight[];
}

// ─── Schedule ────────────────────────────────────────────────

export type ScheduleLabel =
  | 'MAIN EVENT'
  | 'CO-MAIN'
  | 'FEATURE BOUT'
  | 'MATCH 3'
  | 'MATCH 2'
  | 'MATCH 1';

export type ScheduleStatus = 'upcoming' | 'live' | 'finished';

export type ScheduleIconType =
  | 'trophy'
  | 'swords'
  | 'timer'
  | 'flag';

export interface ScheduleItem {
  id: string;
  time: string;
  label: ScheduleLabel;
  title: string;
  description: string;
  mat: string;
  status: ScheduleStatus;
  iconType: ScheduleIconType;
  featured?: boolean;
}

export interface ScheduleEvent {
  id: string;
  eventTitle: string;
  eventSubtitle: string;
  heroImage: number | string;
  heroTitle: string;
  heroSubtitle: string;
  mainCard: ScheduleItem[];
  prelims: ScheduleItem[];
  grappling: ScheduleItem[];
}

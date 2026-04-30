/**
 * SUG Grappling — Mock Data
 *
 * Consolidated mock data for Home screen.
 * Structured to mirror future Supabase table shapes.
 */
import { Event, EventDetail, FightCardEvent, ScheduleEvent, AthleteProfile, ArticleDetail, Athlete, NewsArticle } from '../types/types';

// ─── Article Detail Data ─────────────────────────────────────

export const articleDetails: Record<string, ArticleDetail> = {
  'nf-001': {
    id: 'nf-001',
    title: 'The Future of SUG: Driving Innovation and Sustainable Growth in 2024',
    category: 'INNOVATION',
    heroImage: require('../../assets/images/articles/innovation-hero.png'),
    author: {
      name: 'Alex Rivera',
      role: 'Chief Strategy Officer',
      avatar: require('../../assets/images/athletes-grid/rivera.png'),
    },
    date: 'Oct 24, 2023',
    readTime: '5 min read',
    sections: [
      {
        type: 'paragraph',
        content: 'As we navigate through a rapidly evolving digital era, we at the precipice of a new era. The convergence of AI, decentralized systems, and user-centric design is reshaping how we deliver, how we are forced to level up our models for the community. Third-year focus area should stand too firmly. Our focus areas are steadfast on three pillars: ecosystem experience, transparency, and radical inclusivity. These aren\'t just buzzwords; they represent the foundation of every line of code we write and every decision we make.',
      },
      {
        type: 'quote',
        content: '"Our goal is not just to keep pace with the industry, but to set the benchmark for what a modern digital collective can achieve."',
      },
      {
        type: 'heading',
        content: 'Breaking Down Barriers',
      },
      {
        type: 'paragraph',
        content: 'We\'ve embarked on a journey to dismantle existing structures that no longer serve our collective purpose. We\'ve identified key friction points in the current SUG ecosystem and are implementing a series of significant updates designed to streamline interactions and reduce barrier-to-entry for new participants.',
      },
      {
        type: 'image',
        image: require('../../assets/images/articles/world-map.png'),
      },
      {
        type: 'paragraph',
        content: 'Each initiative is designed with a dual purpose: to auto-multiply good beyond its original scope, and to ensure lasting impact for the ecosystem. This isn\'t a feature-centric pursuit. Whether it\'s revamping our governance model, seeking to enable new partnerships, or building new tools, we want to ensure a better state than we inherited.',
      },
      {
        type: 'paragraph',
        content: 'As we move forward, your feedback is invaluable. Every suggestion, every critique helps us refine our path. Together, we\'re not just building a platform; we\'re crafting a community that thrives on collective intelligence and shared purpose, by working alongside our team. Stay tuned for more updates, and as always, let\'s keep the conversation going.',
      },
    ],
    tags: ['Innovation', 'Technology', 'Sustainability'],
  },
};


// ─── Athlete Profile Data ────────────────────────────────────

export const athleteProfiles: Record<string, AthleteProfile> = {
  'ath-g1': {
    id: 'ath-g1',
    name: "Alex 'The Titan' Rivera",
    nickname: 'The Titan',
    academy: 'Gracie Barra Academy',
    country: 'United States',
    belt: 'Black Belt',
    avatar: require('../../assets/images/athletes-grid/rivera.png'),
    bio: "A multi-time grappling champion known for explosive takedowns and technical submissions. Alex has been competing professionally since 2018, representing SUG at the highest levels across the globe.",
    stats: { fights: 24, wins: 18, losses: 6 },
    upcomingFight: {
      event: 'SUG INVITATIONAL 42',
      opponent: "vs. Marcus 'The Wolf' Chen",
      date: 'December 15th, 2024',
      location: 'Portland, OR',
    },
    pastFights: [
      { id: 'pf-1', opponent: 'vs. Leo Santos', result: 'win', method: 'Submission (RNC)', date: 'Oct 2023' },
      { id: 'pf-2', opponent: 'vs. Dave Miller', result: 'win', method: 'Decision', date: 'July 2023' },
      { id: 'pf-3', opponent: 'vs. Gordon Ryan', result: 'loss', method: 'Submission (Heel Hook)', date: 'Mar 2023' },
    ],
    eventsParticipated: [
      { eventId: 'evts-001', eventName: 'SUG 30', posterImage: require('../../assets/images/posters/sug-30.png') },
      { eventId: 'ep-2', eventName: 'Portland Open', posterImage: require('../../assets/images/posters/portland-open.png') },
      { eventId: 'ep-3', eventName: 'Worlds', posterImage: require('../../assets/images/posters/worlds.png') },
    ],
  },
  'ath-g2': {
    id: 'ath-g2',
    name: "Sarah 'Tsunami' Costa",
    nickname: 'Tsunami',
    academy: 'Gracie Barra',
    country: 'Brazil',
    belt: 'Black Belt',
    avatar: require('../../assets/images/athletes-grid/costa.png'),
    bio: "An elite featherweight grappler from São Paulo, Sarah combines relentless pressure passing with creative leg lock attacks. She is a two-time Pan champion and rising star in the SUG circuit.",
    stats: { fights: 19, wins: 16, losses: 3 },
    upcomingFight: {
      event: 'SUG 31: WOMEN\'S CHAMPIONSHIP',
      opponent: "vs. Yuki 'Lightning' Tanaka",
      date: 'January 20th, 2025',
      location: 'Las Vegas, NV',
    },
    pastFights: [
      { id: 'pf-4', opponent: 'vs. Amanda Leve', result: 'win', method: 'Submission (Armbar)', date: 'Sep 2023' },
      { id: 'pf-5', opponent: 'vs. Gabi Garcia', result: 'loss', method: 'Decision', date: 'Jun 2023' },
      { id: 'pf-6', opponent: 'vs. Mackenzie Dern', result: 'win', method: 'Submission (Triangle)', date: 'Feb 2023' },
    ],
    eventsParticipated: [
      { eventId: 'evts-001', eventName: 'SUG 30', posterImage: require('../../assets/images/posters/sug-30.png') },
      { eventId: 'ep-3', eventName: 'Worlds', posterImage: require('../../assets/images/posters/worlds.png') },
    ],
  },
};

// ─── Schedule Data ───────────────────────────────────────────

export const scheduleData: Record<string, ScheduleEvent> = {
  'evts-001': {
    id: 'evts-001',
    eventTitle: 'SUBMISSION UNDERGROUND',
    eventSubtitle: 'SUG 29 • EVENT SCHEDULE',
    heroImage: require('../../assets/images/events/schedule-hero.png'),
    heroTitle: 'Mason Fowler vs. Vinny Magalhaes',
    heroSubtitle: 'Heavyweight Championship Match • Mat 1',
    mainCard: [
      {
        id: 'sched-001',
        time: '9:30 PM',
        label: 'MAIN EVENT',
        title: 'Fowler vs. Magalhaes',
        description: 'Heavyweight Championship Title Defense',
        mat: 'MAT 1',
        status: 'upcoming',
        iconType: 'trophy',
        featured: true,
      },
      {
        id: 'sched-002',
        time: '9:00 PM',
        label: 'CO-MAIN',
        title: 'Cyborg Abreu vs. Craig Jones',
        description: 'Special Super Fight Feature',
        mat: 'MAT 1',
        status: 'upcoming',
        iconType: 'swords',
      },
      {
        id: 'sched-003',
        time: '8:30 PM',
        label: 'FEATURE BOUT',
        title: 'Amanda Leve vs. Gabi Garcia',
        description: 'Lightweight Grappling Match',
        mat: 'MAT 2',
        status: 'upcoming',
        iconType: 'timer',
      },
      {
        id: 'sched-004',
        time: '8:00 PM',
        label: 'MATCH 3',
        title: 'Fighter E vs. Fighter F',
        description: 'Winner: Fighter E via RNC (2:45)',
        mat: 'FINISHED',
        status: 'finished',
        iconType: 'flag',
      },
    ],
    prelims: [
      {
        id: 'sched-p1',
        time: '6:30 PM',
        label: 'MATCH 2',
        title: 'Santos vs. Lee',
        description: '155 LBS Division',
        mat: 'MAT 1',
        status: 'finished',
        iconType: 'flag',
      },
      {
        id: 'sched-p2',
        time: '6:00 PM',
        label: 'MATCH 1',
        title: 'Park vs. Rodriguez',
        description: '170 LBS Division',
        mat: 'MAT 2',
        status: 'finished',
        iconType: 'flag',
      },
    ],
    grappling: [
      {
        id: 'sched-g1',
        time: '5:30 PM',
        label: 'MATCH 2',
        title: 'Williams vs. Chen',
        description: 'Gi Super Fight',
        mat: 'MAT 1',
        status: 'finished',
        iconType: 'flag',
      },
      {
        id: 'sched-g2',
        time: '5:00 PM',
        label: 'MATCH 1',
        title: 'Davis vs. Kim',
        description: 'Absolute Division',
        mat: 'MAT 2',
        status: 'finished',
        iconType: 'flag',
      },
    ],
  },
};

// ─── Fight Card Data ─────────────────────────────────────────

export const fightCardData: Record<string, FightCardEvent> = {
  'evts-001': {
    id: 'evts-001',
    eventTitle: 'SUBMISSION UNDERGROUND',
    eventSubtitle: 'Tournament 24 • Live Now',
    heroImage: require('../../assets/images/events/fight-hero.png'),
    heroTitle: 'MASON VS HENDERSON',
    heroSubtitle: 'SUG Absolute Championship • 5:00 EBI',
    mainCard: [
      {
        id: 'mc-001',
        leftFighterName: 'Ryan Hall',
        rightFighterName: 'Garry Tonon',
        leftGym: '50/50 BJJ',
        rightGym: 'New Wave',
        leftImage: require('../../assets/images/fighters/hall.png'),
        rightImage: require('../../assets/images/fighters/tonon.png'),
        weightClass: '170 LBS',
        label: 'CO-MAIN EVENT',
        leftRank: 2,
        rightRank: 5,
        featured: true,
      },
      {
        id: 'mc-002',
        leftFighterName: 'Bea Malecki',
        rightFighterName: 'Mackenzie Dern',
        leftGym: 'Renzo Gracie',
        rightGym: 'Checkpoint',
        leftImage: require('../../assets/images/fighters/malecki.png'),
        rightImage: require('../../assets/images/fighters/dern.png'),
        weightClass: '135 LBS',
      },
      {
        id: 'mc-003',
        leftFighterName: 'Nicky Rod',
        rightFighterName: 'Gordon Ryan',
        leftGym: 'B Team',
        rightGym: 'New Wave',
        leftImage: require('../../assets/images/fighters/nicky.png'),
        rightImage: require('../../assets/images/fighters/gordon.png'),
        weightClass: 'HEAVYWEIGHT',
      },
    ],
    preliminaries: [
      {
        id: 'prelim-001',
        title: 'SILVA vs JONES',
        subtitle: '155 LBS • 3:00 PM PST',
      },
      {
        id: 'prelim-002',
        title: 'GARCIA vs THOMPSON',
        subtitle: '170 LBS • 3:30 PM PST',
      },
      {
        id: 'prelim-003',
        title: 'PETROSYAN vs AOKI',
        subtitle: '145 LBS • 4:00 PM PST',
      },
    ],
  },
};

// ─── Event Detail Screen Data ────────────────────────────────

export const eventDetails: Record<string, EventDetail> = {
  'evts-001': {
    id: 'evts-001',
    title: 'SUG 30: Championship Night',
    subtitle: 'Portland, OR • Roseland Theater',
    type: 'MAIN_EVENT',
    city: 'Portland',
    state: 'OR',
    venue: 'Roseland Theater',
    address: '8 NW 6th Ave, Portland, OR 97209',
    date: '2023-10-25T18:00:00.000Z',
    doorsTime: '6:00 PM',
    heroImage: require('../../assets/images/events/sug-30.png'),
    description:
      'Submission Underground returns for its landmark 30th edition with a night of high-stakes grappling. Featuring a main event title defense and a loaded card of world-class Brazilian Jiu-Jitsu black belts and UFC veterans. Don\'t miss the most exciting submission-only event in the Pacific Northwest.',
    mapImage: require('../../assets/images/venues/roseland-map.png'),
    ruleset: {
      format: 'Sub Only',
      timeLimit: '5 Minutes',
      overtime: 'EBI Style',
      uniform: 'No-Gi',
    },
    ticketStatus: 'available',
  },
  'evts-002': {
    id: 'evts-002',
    title: 'SUG: Absolute Championship',
    subtitle: 'Las Vegas, NV • UFC APEX CENTER',
    type: 'OPEN_TOURNAMENT',
    city: 'Las Vegas',
    state: 'NV',
    venue: 'UFC APEX CENTER',
    address: '6650 Lonedale Ave, Las Vegas, NV 89118',
    date: '2025-01-22T19:00:00.000Z',
    doorsTime: '5:30 PM',
    heroImage: require('../../assets/images/events/sug-absolute.png'),
    description:
      'The absolute division championship brings together the best grapplers regardless of weight class for an open-weight tournament bracket.',
    mapImage: require('../../assets/images/venues/roseland-map.png'),
    ruleset: {
      format: 'Sub Only',
      timeLimit: '8 Minutes',
      overtime: 'EBI Style',
      uniform: 'No-Gi',
    },
    ticketStatus: 'available',
  },
  'evts-003': {
    id: 'evts-003',
    title: 'West Coast Trials',
    subtitle: 'San Diego, CA • SD SPORTS ARENA',
    type: 'QUALIFIER',
    city: 'San Diego',
    state: 'CA',
    venue: 'SD SPORTS ARENA',
    address: '3500 Sports Arena Blvd, San Diego, CA 92110',
    date: '2025-02-12T17:00:00.000Z',
    doorsTime: '4:00 PM',
    heroImage: require('../../assets/images/events/west-coast-trials.png'),
    description:
      'Regional qualifier for the SUG Championship circuit. Top finishers earn their spot on the next SUG pro card.',
    mapImage: require('../../assets/images/venues/roseland-map.png'),
    ruleset: {
      format: 'Sub Only',
      timeLimit: '5 Minutes',
      overtime: 'Points',
      uniform: 'No-Gi',
    },
    ticketStatus: 'coming_soon',
  },
};

// ─── Events Screen Data ──────────────────────────────────────

export const eventsScreenUpcoming: Event[] = [
  {
    id: 'evts-001',
    title: 'Submission Underground 30',
    city: 'Portland',
    state: 'OR',
    date: '2024-12-15T18:00:00.000Z',
    image: require('../../assets/images/events/sug-30.png'),
    featured: true,
    type: 'MAIN_EVENT',
    venue: 'Roseland Theater',
    status: 'upcoming',
    ticketsAvailable: true,
    description: 'The premier submission grappling event featuring championship bouts.',
  },
  {
    id: 'evts-002',
    title: 'SUG: Absolute Championship',
    city: 'Las Vegas',
    state: 'NV',
    date: '2025-01-22T19:00:00.000Z',
    image: require('../../assets/images/events/sug-absolute.png'),
    featured: false,
    type: 'OPEN_TOURNAMENT',
    venue: 'UFC APEX CENTER',
    status: 'upcoming',
    ticketsAvailable: true,
    description: 'Open weight absolute division championship tournament.',
  },
  {
    id: 'evts-003',
    title: 'West Coast Trials',
    city: 'San Diego',
    state: 'CA',
    date: '2025-02-12T17:00:00.000Z',
    image: require('../../assets/images/events/west-coast-trials.png'),
    featured: false,
    type: 'QUALIFIER',
    venue: 'SD SPORTS ARENA',
    status: 'upcoming',
    ticketsAvailable: false,
    description: 'Regional qualifier for the SUG Championship circuit.',
  },
];

export const eventsScreenPast: Event[] = [
  {
    id: 'evts-004',
    title: 'Submission Underground 29',
    city: 'Portland',
    state: 'OR',
    date: '2024-10-05T18:00:00.000Z',
    image: require('../../assets/images/events/sug-30.png'),
    featured: false,
    type: 'MAIN_EVENT',
    venue: 'Roseland Theater',
    status: 'past',
    ticketsAvailable: false,
    description: 'An epic night of championship grappling action.',
  },
  {
    id: 'evts-005',
    title: 'SUG Pro Card 17',
    city: 'Las Vegas',
    state: 'NV',
    date: '2024-09-14T20:00:00.000Z',
    image: require('../../assets/images/events/sug-absolute.png'),
    featured: false,
    type: 'MAIN_EVENT',
    venue: 'UFC APEX CENTER',
    status: 'past',
    ticketsAvailable: false,
    description: 'Stacked pro card with top ranked athletes.',
  },
  {
    id: 'evts-006',
    title: 'Northwest Open',
    city: 'Seattle',
    state: 'WA',
    date: '2024-08-20T17:00:00.000Z',
    image: require('../../assets/images/events/west-coast-trials.png'),
    featured: false,
    type: 'OPEN_TOURNAMENT',
    venue: 'KeyArena Convention Hall',
    status: 'past',
    ticketsAvailable: false,
    description: 'Open division tournament with cash prizes.',
  },
];

// ─── Featured Event ──────────────────────────────────────────

export const featuredEvent: Event = {
  id: 'evt-001',
  title: 'SUG Championship 52',
  city: 'Portland',
  state: 'OR',
  date: '2024-12-20T19:00:00.000Z',
  image: require('../../assets/images/events/featured-event.png'),
  featured: true,
  description:
    'The premier submission grappling event returns to Portland with an all-star card.',
};

// ─── Upcoming Events ─────────────────────────────────────────

export const upcomingEvents: Event[] = [
  {
    id: 'evt-002',
    title: 'Portland Open Invitational',
    city: 'Portland',
    state: 'OR',
    date: '2025-01-15T18:00:00.000Z',
    image: require('../../assets/images/events/portland-open.png'),
    featured: false,
    description: 'Open division tournament with cash prizes.',
  },
  {
    id: 'evt-003',
    title: 'EBI Qualifiers Northwest',
    city: 'Seattle',
    state: 'WA',
    date: '2025-02-02T17:00:00.000Z',
    image: require('../../assets/images/events/ebi-qualifiers.png'),
    featured: false,
    description: 'Regional qualifier for the Eddie Bravo Invitational.',
  },
  {
    id: 'evt-004',
    title: 'SUG Pro Card 18',
    city: 'Las Vegas',
    state: 'NV',
    date: '2025-02-22T20:00:00.000Z',
    image: require('../../assets/images/events/featured-event.png'),
    featured: false,
    description: 'Stacked pro card featuring top 10 ranked athletes.',
  },
  {
    id: 'evt-005',
    title: 'West Coast Trials',
    city: 'San Diego',
    state: 'CA',
    date: '2025-03-08T17:00:00.000Z',
    image: require('../../assets/images/events/portland-open.png'),
    featured: false,
    description: 'Regional trials for the SUG Championship circuit.',
  },
  {
    id: 'evt-006',
    title: 'SUG Contender Series 9',
    city: 'Denver',
    state: 'CO',
    date: '2025-03-29T19:00:00.000Z',
    image: require('../../assets/images/events/ebi-qualifiers.png'),
    featured: false,
    description: 'Up-and-coming athletes compete for a pro contract.',
  },
];

// ─── Featured Athletes ───────────────────────────────────────

export const featuredAthletes: Athlete[] = [
  {
    id: 'ath-001',
    name: 'Mason R.',
    image: require('../../assets/images/athletes/mason.png'),
    gym: '10th Planet Portland',
    country: 'USA',
    ranking: 1,
  },
  {
    id: 'ath-002',
    name: 'Leo H.',
    image: require('../../assets/images/athletes/leo.png'),
    gym: 'Atos HQ',
    country: 'Brazil',
    ranking: 2,
  },
  {
    id: 'ath-003',
    name: 'Sarah K.',
    image: require('../../assets/images/athletes/sarah.png'),
    gym: 'Unity Jiu Jitsu',
    country: 'USA',
    ranking: 3,
  },
  {
    id: 'ath-004',
    name: 'Alex P.',
    image: require('../../assets/images/athletes/alex.png'),
    gym: 'B-Team',
    country: 'USA',
    ranking: 4,
  },
  {
    id: 'ath-005',
    name: 'Diego M.',
    image: require('../../assets/images/athletes/mason.png'),
    gym: 'Fight Sports',
    country: 'Mexico',
    ranking: 5,
  },
  {
    id: 'ath-006',
    name: 'Jordan W.',
    image: require('../../assets/images/athletes/leo.png'),
    gym: 'Alliance',
    country: 'Canada',
    ranking: 6,
  },
];

// ─── Latest News ─────────────────────────────────────────────

export const latestNews: NewsArticle[] = [
  {
    id: 'news-001',
    title: 'Chael Sonnen Announces New Absolute Bracket Rules',
    category: 'COMPETITION',
    image: require('../../assets/images/news/competition.png'),
    publishedAt: '2 hours ago',
    summary:
      'Major rule changes announced for the upcoming SUG absolute division bracket format.',
  },
  {
    id: 'news-002',
    title: 'How To Prepare For Your First Submissions Only Match',
    category: 'TRAINING',
    image: require('../../assets/images/news/training.png'),
    publishedAt: '5 hours ago',
    summary:
      'Expert tips and training strategies for your debut in submission-only competition.',
  },
  {
    id: 'news-003',
    title: 'Inside the Mind of the SUG Lightweight Champion',
    category: 'INTERVIEW',
    image: require('../../assets/images/news/interview.png'),
    publishedAt: '1 day ago',
    summary:
      'An exclusive sit-down with the reigning SUG lightweight champion.',
  },
  {
    id: 'news-004',
    title: 'Top 5 Submissions From SUG Championship 51',
    category: 'HIGHLIGHTS',
    image: require('../../assets/images/news/competition.png'),
    publishedAt: '2 days ago',
    summary:
      'Relive the most spectacular finishes from last month\'s championship card.',
  },
  {
    id: 'news-005',
    title: 'SUG Announces Partnership With FloGrappling',
    category: 'ANNOUNCEMENT',
    image: require('../../assets/images/news/training.png'),
    publishedAt: '3 days ago',
    summary:
      'All future SUG events will be broadcast live on FloGrappling.',
  },
];

// ─── Athletes Grid Data ──────────────────────────────────────

export const athletesGrid: Athlete[] = [
  {
    id: 'ath-g1',
    name: 'Alex Rivera',
    academy: 'Elite Academy',
    rating: 4.9,
    weightClass: 'Lightweight',
    country: 'USA',
    countryCode: '🇺🇸',
    image: require('../../assets/images/athletes-grid/rivera.png'),
    category: 'pro_league',
  },
  {
    id: 'ath-g2',
    name: 'Sarah Costa',
    academy: 'Gracie Barra',
    rating: 5.0,
    weightClass: 'Featherweight',
    country: 'Brazil',
    countryCode: '🇧🇷',
    image: require('../../assets/images/athletes-grid/costa.png'),
    category: 'top_rated',
  },
  {
    id: 'ath-g3',
    name: 'Marcus Thorne',
    academy: 'Victory Club',
    rating: 4.8,
    weightClass: 'Heavyweight',
    country: 'USA',
    countryCode: '🇺🇸',
    image: require('../../assets/images/athletes-grid/thorne.png'),
    category: 'pro_league',
  },
  {
    id: 'ath-g4',
    name: 'Yuki Tanaka',
    academy: 'Zenith Pro',
    rating: 4.7,
    weightClass: 'Flyweight',
    country: 'Japan',
    countryCode: '🇯🇵',
    image: require('../../assets/images/athletes-grid/tanaka.png'),
    category: 'top_rated',
  },
  {
    id: 'ath-g5',
    name: 'Julien Bernard',
    academy: 'Paris Combat',
    rating: 4.9,
    weightClass: 'Middleweight',
    country: 'France',
    countryCode: '🇫🇷',
    image: require('../../assets/images/athletes-grid/bernard.png'),
    category: 'pro_league',
  },
  {
    id: 'ath-g6',
    name: "Liam O'Connor",
    academy: 'Maple MMA',
    rating: 4.6,
    weightClass: 'Welterweight',
    country: 'Canada',
    countryCode: '🇨🇦',
    image: require('../../assets/images/athletes-grid/oconnor.png'),
    category: 'all',
  },
];

// ─── News Feed Data ──────────────────────────────────────────

export const newsFeed: NewsArticle[] = [
  {
    id: 'nf-001',
    title: 'Championship Finals: What to Expect in the Arena',
    category: 'Competitions',
    image: require('../../assets/images/news-feed/championship.png'),
    publishedAt: 'Oct 24, 2023',
    date: 'OCT 24, 2023',
    summary:
      'The final stage of the season is here, bringing together the elite athletes for a historic...',
    featured: true,
  },
  {
    id: 'nf-002',
    title: 'New Training Regimen for Pro Athletes',
    category: 'Training',
    image: require('../../assets/images/news-feed/training.png'),
    publishedAt: 'Oct 22, 2023',
    date: 'Oct 22, 2023',
    summary:
      'Discover the science behind the new training protocols adopted by top-tier performers this...',
  },
  {
    id: 'nf-003',
    title: 'Nutrition Myths Debunked by Experts',
    category: 'Health',
    image: require('../../assets/images/news-feed/nutrition.png'),
    publishedAt: 'Oct 21, 2023',
    date: 'Oct 21, 2023',
    summary:
      'Top nutritionists break down the most common misconceptions in sports dieting and performance...',
  },
  {
    id: 'nf-004',
    title: 'Upcoming Global Games: Host Cities Announced',
    category: 'Events',
    image: require('../../assets/images/news-feed/stadium.png'),
    publishedAt: 'Oct 19, 2023',
    date: 'Oct 19, 2023',
    summary:
      'The committee has revealed the five cities that will host the international qualifiers next summer.',
  },
];

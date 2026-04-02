import { Player, Game, NewsItem, Staff } from './types';

export const ROSTER: Player[] = [
  {
    id: '1',
    name: 'Alex Thompson',
    number: '19',
    position: 'Forward',
    height: "6'1\"",
    weight: '195 lbs',
    hometown: 'Toronto, ON',
    previousTeam: 'Oakville Blades (OJHL)',
    year: 'Junior',
    stats: { gp: 24, g: 12, a: 18, pts: 30 }
  },
  {
    id: '2',
    name: 'Marcus Rossi',
    number: '44',
    position: 'Defense',
    height: "6'3\"",
    weight: '210 lbs',
    hometown: 'Hamilton, ON',
    previousTeam: 'Hamilton Kilty B\'s (GOJHL)',
    year: 'Senior',
    stats: { gp: 24, g: 4, a: 15, pts: 19 }
  },
  {
    id: '3',
    name: 'Jake Miller',
    number: '31',
    position: 'Goalie',
    height: "6'0\"",
    weight: '180 lbs',
    hometown: 'St. Catharines, ON',
    previousTeam: 'St. Catharines Falcons (GOJHL)',
    year: 'Sophomore'
  }
];

export const SCHEDULE: Game[] = [
  {
    id: '1',
    date: '2025-10-15',
    time: '7:30 PM',
    opponent: 'Niagara University',
    location: 'Canada Games Park',
    isHome: true,
    result: 'W',
    score: '4-2'
  },
  {
    id: '2',
    date: '2025-10-22',
    time: '8:00 PM',
    opponent: 'Adrian College',
    location: 'Arrington Ice Arena',
    isHome: false,
    result: 'L',
    score: '1-3'
  },
  {
    id: '3',
    date: '2025-11-05',
    time: '7:00 PM',
    opponent: 'Liberty University',
    location: 'Canada Games Park',
    isHome: true
  }
];

export const NEWS: NewsItem[] = [
  {
    id: '1',
    title: 'Badgers Secure Massive Win Over Niagara',
    excerpt: 'A third-period rally led by Thompson secures a crucial conference victory at home.',
    date: 'Oct 16, 2025',
    category: 'Game Recap',
    image: 'https://picsum.photos/seed/hockey1/800/600'
  },
  {
    id: '2',
    title: 'Recruiting Spotlight: The Next Generation',
    excerpt: 'Coach Miller discusses what it takes to wear the Brock jersey and the 2026 recruitment cycle.',
    date: 'Oct 12, 2025',
    category: 'Recruiting',
    image: 'https://picsum.photos/seed/hockey2/800/600'
  }
];

export const COACHING_STAFF: Staff[] = [
  {
    id: '1',
    name: 'David Miller',
    role: 'Head Coach',
    bio: 'Over 15 years of coaching experience at the Junior and Collegiate levels. Focused on player development and tactical excellence.',
    image: 'https://picsum.photos/seed/coach1/400/400'
  }
];

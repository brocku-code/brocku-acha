export interface Player {
  id: string;
  name: string;
  number: string;
  position: 'Forward' | 'Defense' | 'Goalie';
  height: string;
  weight: string;
  hometown: string;
  previousTeam: string;
  year: string;
  image?: string;
  stats?: {
    gp: number;
    g: number;
    a: number;
    pts: number;
  };
}

export interface Game {
  id: string;
  date: string;
  time: string;
  opponent: string;
  location: string;
  isHome: boolean;
  result?: string;
  score?: string;
  ticketUrl?: string;
}

export interface NewsItem {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  category: 'Game Recap' | 'Player Feature' | 'Recruiting' | 'Team News';
  image: string;
}

export interface Staff {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
}

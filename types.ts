
export enum Platform {
  INSTAGRAM = 'instagram',
  TIKTOK = 'tiktok',
  LINKEDIN = 'linkedin',
  TWITTER = 'twitter',
  FACEBOOK = 'facebook',
  YOUTUBE = 'youtube'
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar: string;
  businessName?: string;
  category?: string;
}

export interface NicheProfile {
  primary: {
    name: string;
    percentage: number;
    confidence: number;
  };
  secondary: { name: string; percentage: number }[];
  keywords: string[];
}

export interface Metric {
  label: string;
  value: string | number;
  change: string;
  isPositive: boolean;
}

export interface ContentIdea {
  id: string;
  platform: Platform;
  format: string;
  topic: string;
  priority: 'high' | 'medium' | 'low';
  bestTime: string;
  reasoning: string;
  outline: any;
}

export interface Trend {
  platform: Platform;
  name: string;
  relevance: number;
  urgency: 'hot' | 'rising' | 'steady';
  contentSuggestion: string;
  potentialReach: string;
}

export interface PostHistory {
  id: string;
  title: string;
  platform: Platform;
  likes: number;
  comments: number;
  shares: number;
  reach: number;
  growth: string;
  date: string;
}

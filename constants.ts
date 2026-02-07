
import { Platform } from './types';

export const PLATFORM_RULES = {
  [Platform.INSTAGRAM]: {
    caption_max_length: 2200,
    optimal_length: '125-150 words',
    emoji_usage: 'frequent',
    tone: 'casual, authentic',
    aspectRatio: '1:1'
  },
  [Platform.TIKTOK]: {
    caption_max_length: 2200,
    optimal_length: '50-100 words',
    emoji_usage: 'high',
    tone: 'very casual, trend-aware',
    aspectRatio: '9:16'
  },
  [Platform.LINKEDIN]: {
    caption_max_length: 3000,
    optimal_length: '150-300 words',
    emoji_usage: 'minimal',
    tone: 'professional, insightful',
    aspectRatio: '1.91:1'
  },
  [Platform.TWITTER]: {
    caption_max_length: 280,
    optimal_length: '200-250 chars',
    emoji_usage: 'moderate',
    tone: 'conversational',
    aspectRatio: '16:9'
  },
  [Platform.FACEBOOK]: {
    caption_max_length: 63206,
    optimal_length: '40-80 words',
    emoji_usage: 'moderate',
    tone: 'warm, community-focused',
    aspectRatio: '1.91:1'
  }
};

export const MOCK_CHART_DATA = [
  { name: 'Jan', reach: 4000, engagement: 2400 },
  { name: 'Feb', reach: 3000, engagement: 1398 },
  { name: 'Mar', reach: 2000, engagement: 9800 },
  { name: 'Apr', reach: 2780, engagement: 3908 },
  { name: 'May', reach: 1890, engagement: 4800 },
  { name: 'Jun', reach: 2390, engagement: 3800 },
];

export const MOCK_POST_HISTORY = [
  { id: '1', title: '5 AI Tools You Need', platform: Platform.INSTAGRAM, likes: 1240, comments: 85, shares: 310, reach: 15400, growth: '+24%', date: '2 days ago' },
  { id: '2', title: 'Viral Hook Tutorial', platform: Platform.TIKTOK, likes: 8900, comments: 450, shares: 1200, reach: 102000, growth: '+142%', date: '4 days ago' },
  { id: '3', title: 'Future of Content Creator', platform: Platform.LINKEDIN, likes: 420, comments: 62, shares: 15, reach: 5200, growth: '+8%', date: '1 week ago' },
  { id: '4', title: 'Why Attention is Currency', platform: Platform.TWITTER, likes: 2100, comments: 120, shares: 450, reach: 45000, growth: '+32%', date: 'Yesterday' },
  { id: '5', title: 'New Growth Strategy', platform: Platform.YOUTUBE, likes: 5600, comments: 290, shares: 890, reach: 89000, growth: '+56%', date: '3 days ago' },
];


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


import { Post, Anniversary } from './types';

export const INITIAL_POSTS: Post[] = [
  {
    id: '1',
    author: 'Me',
    imageUrl: 'https://picsum.photos/seed/couple1/600/600',
    caption: '우리 첫 데이트 날! 정말 행복했어 ❤️',
    date: '2024-01-15'
  }
];

export const INITIAL_ANNIVERSARIES: Anniversary[] = [
  { id: 'base-date', title: '처음 만난 날', date: '2025-01-01', isMain: true }
];

export const GEMINI_MODEL = 'gemini-3-flash-preview';

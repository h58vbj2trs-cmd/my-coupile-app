export interface Post {
  id: string;
  author: 'Me' | 'Partner';
  imageUrl: string;
  caption: string;
  date: string;
}

export interface PetState {
  name: string;
  level: number;
  exp: number;
  hunger: number;
  happiness: number;
  lastUpdated: string;
}

export interface ScheduleEvent {
  id: string;
  title: string;
  date: string;
  type: 'DATE' | 'TRAVEL' | 'DAILY' | 'ETC';
}

export interface BucketItem {
  id: string;
  content: string;
  isCompleted: boolean;
}

export interface Anniversary {
  id: string;
  title: string;
  date: string;
  isMain?: boolean;
}

export type TabType = 'HOME' | 'FEED' | 'CALENDAR' | 'BUCKET' | 'QUESTION' | 'GAME';


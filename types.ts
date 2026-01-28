export interface Article {
  id: string;
  category: string;
  title: string;
  author: string;
  date: string;
  imageUrl: string;
  description: string;
  themeColor: string;
  content: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export enum SearchState {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}

export interface SearchResult {
  answer: string;
  relatedTopics: string[];
}
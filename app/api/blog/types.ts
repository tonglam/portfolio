/**
 * Type definitions for Notion API responses and processed blog posts
 */

// Notion API Types
export interface NotionRichTextItem {
  plain_text?: string;
  text?: {
    content: string;
  };
}

export interface NotionProperty {
  title?: NotionRichTextItem[];
  rich_text?: NotionRichTextItem[];
  select?: {
    name: string;
  };
  multi_select?: Array<{
    name: string;
  }>;
  url?: string;
  date?: {
    start: string;
  };
  number?: number;
  checkbox?: boolean;
}

export interface NotionBlock {
  type: string;
  [key: string]: unknown;
}

export interface NotionPost {
  id: string;
  properties: Record<string, NotionProperty>;
  children?: NotionBlock[];
  url?: string;
  created_time?: string;
  last_edited_time?: string;
}

// Processed Blog Post Types
export interface ProcessedBlogPost {
  id: string;
  title: string;
  summary: string;
  excerpt: string;
  slug: string;
  category: string;
  tags: string[];
  coverImage?: string;
  originalCoverImage?: string;
  dateCreated: string;
  published?: boolean;
  featured?: boolean;
  notionUrl?: string;
  readingTime?: string;
  content?: string | NotionBlock[];

  r2ImageUrl?: string;
  date?: string;
  minRead?: string;
  originalPageUrl?: string;
  noteCreated?: string;
  noteEdited?: string;
}

// API Response Types
export interface BlogApiResponse {
  posts: ProcessedBlogPost[];
  pagination: {
    page: number;
    limit: number;
    totalPosts: number;
    totalPages: number;
    hasMore: boolean;
  };

  totalPages?: number;
  totalPosts?: number;
  currentPage?: number;
}

export interface SearchResult {
  post: ProcessedBlogPost;
  score: number;
  matches?: string[];
}

export interface SearchApiResponse {
  results: SearchResult[];
  query: string;
  pagination: {
    page: number;
    limit: number;
    totalResults: number;
    totalPages: number;
    hasMore: boolean;
  };

  totalPages?: number;
  totalResults?: number;
  currentPage?: number;
}

export interface CategoriesApiResponse {
  categories: string[];
}

export interface BlogPostApiResponse {
  post: ProcessedBlogPost;
}

/**
 * Helper function to extract plain text from Notion rich text array
 */
export function extractPlainText(richTextArray: NotionRichTextItem[] | undefined): string {
  if (!richTextArray || !Array.isArray(richTextArray) || richTextArray.length === 0) {
    return '';
  }

  return richTextArray
    .map(item => item.plain_text || (item.text && item.text.content) || '')
    .join('');
}

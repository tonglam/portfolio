/**
 * Type definitions for Notion API responses and processed blog posts
 */

// Common API Response Types
export interface ApiError {
  success: false;
  error: string;
}

export interface ApiSuccess<T> {
  success: true;
  data: T;
}

export interface SuccessResponse {
  success: true;
  data: {
    post: ProcessedBlogPost;
  };
}

// Notion API Types
export interface NotionRichText {
  plain_text: string;
  text?: {
    content: string;
    link?: {
      url: string;
    } | null;
  };
  annotations?: {
    bold: boolean;
    italic: boolean;
    strikethrough: boolean;
    underline: boolean;
    code: boolean;
    color: string;
  };
  href?: string | null;
}

export type NotionRichTextItem = NotionRichText;

export interface NotionTitle {
  title: NotionRichText[];
}

export interface NotionRichTextProperty {
  rich_text: NotionRichText[];
}

export interface NotionSelect {
  select: {
    name: string;
    color?: string;
  };
}

export interface NotionMultiSelect {
  multi_select: Array<{
    name: string;
    color?: string;
  }>;
}

export interface NotionDate {
  date: {
    start: string;
    end?: string | null;
    time_zone?: string | null;
  };
}

export interface NotionNumber {
  number: number;
}

export interface NotionCheckbox {
  checkbox: boolean;
}

export interface NotionFile {
  url: string;
}

export interface NotionUrlProperty {
  type: 'url';
  url: string;
}

export interface NotionProperty {
  title?: NotionRichText[];
  rich_text?: NotionRichText[];
  select?: {
    name: string;
    color?: string;
  };
  multi_select?: Array<{
    name: string;
    color?: string;
  }>;
  url?: string;
  date?: {
    start: string;
    end?: string | null;
    time_zone?: string | null;
  };
  number?: number;
  checkbox?: boolean;
}

export interface NotionProperties {
  Title?: NotionTitle;
  Summary?: NotionRichTextProperty;
  Excerpt?: NotionRichTextProperty;
  Slug?: NotionRichTextProperty;
  Category?: NotionSelect;
  Tags?: NotionMultiSelect;
  CoverImage?: NotionFile;
  OriginalCoverImage?: NotionFile;
  DateCreated?: NotionDate;
  Published?: NotionCheckbox;
  Featured?: NotionCheckbox;
  ReadingTime?: NotionRichTextProperty;
  Content?: NotionRichTextProperty;
  R2ImageUrl?: NotionUrlProperty;
  Image?: NotionUrlProperty;
  'Original Page'?: NotionUrlProperty;
  'Mins Read'?: NotionNumber;
  'Date Created'?: NotionDate;
  [key: string]: NotionProperty | undefined;
}

export interface NotionBlock {
  type: string;
  [key: string]: unknown;
}

export interface NotionPost {
  id: string;
  properties: NotionProperties;
  blocks?: NotionBlock[];
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

import type { ApiResponse, PaginatedResponse, PaginationData } from './common.type';

/**
 * =============================================
 * Core Blog Types
 * =============================================
 */

/**
 * Base blog post interface with essential fields
 */
export interface BlogPost {
  id?: string;
  slug: string;
  title: string;
  summary: string;
  content: string;
  date: string;
  minRead: string | number;
  r2ImageUrl: string;
  originalPageUrl: string;
  category?: string;
  tags?: string[];
}

/**
 * Blog post with guaranteed ID, used after processing
 */
export interface ProcessedBlogPost extends Omit<BlogPost, 'id'> {
  id: string;
}

/**
 * =============================================
 * Search & Pagination Types
 * =============================================
 */

export interface SearchResult {
  post: ProcessedBlogPost;
  score: number;
  matches?: string[];
}

/**
 * =============================================
 * API Data Types
 * =============================================
 */

export interface BlogPostsData {
  posts: ProcessedBlogPost[];
  pagination: PaginationData;
}

export interface SearchData {
  results: SearchResult[];
  pagination: PaginationData;
}

export interface CategoriesData {
  categories: string[];
}

export interface BlogPostData {
  post: ProcessedBlogPost;
}

/**
 * =============================================
 * API Response Types
 * =============================================
 */

export type BlogPostsApiResponse = PaginatedResponse<BlogPostsData>;
export type BlogSearchApiResponse = PaginatedResponse<SearchData>;
export type CategoriesApiResponse = ApiResponse<CategoriesData>;
export type BlogPostApiResponse = ApiResponse<BlogPostData>;

/**
 * =============================================
 * Database Types
 * =============================================
 */

export interface DatabasePost {
  // Core fields
  id: string;
  title: string;
  summary: string | null;
  category: string;
  author: string;

  // Timestamps
  created_at: string;
  updated_at: string;
  notion_last_edited_at: string;

  // Content and metadata
  notion_url: string;
  excerpt: string | null;
  mins_read: number | null;

  // Image related
  image_task_id: string | null;
  image_url: string | null;
  r2_image_url: string | null;

  // Additional metadata
  tags: string | null; // JSON string of tags
}

export interface QueryResponse<T> {
  success: boolean;
  errors?: string[];
  messages?: string[];
  result?: [
    {
      results: T[];
    },
  ];
}

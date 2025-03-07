/**
 * Type definitions for blog API responses and processed blog posts
 */
import type { ApiResponse, Pagination } from '../common';
import type {
  ExtendedNotionPost,
  extractPlainText,
  NotionBlock,
  NotionDate,
  NotionPost,
  NotionText,
  RichTextItem,
} from './notion';

// Re-export Notion API types for backward compatibility
export { extractPlainText };

export type { ExtendedNotionPost, NotionBlock, NotionDate, NotionPost, NotionText, RichTextItem };

// Legacy type aliases for backward compatibility
export type RichTextItemResponse = RichTextItem;

// API Request Types
export interface BlogPostParams {
  slug: string;
}

export interface BlogListParams {
  page?: number;
  limit?: number;
  category?: string;
}

export interface BlogSearchParams extends BlogListParams {
  q: string;
}

// Blog post types
export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  summary: string;
  category: string;
  tags: string[];
  coverImage: {
    url: string;
    alt: string;
  };
  published: boolean;
  featured: boolean;
  notionUrl: string;
  readingTime: string;
  content: string;
  excerpt: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * Processed Blog Post Types
 */
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

  // Additional fields used in the UI
  r2ImageUrl?: string;
  date?: string;
  minRead?: string;
  originalPageUrl?: string;
  noteCreated?: string;
  noteEdited?: string;
}

// Fallback post for when a post cannot be found
export interface FallbackPost {
  id: string;
  title: string;
  summary: string;
  r2ImageUrl: string;
  date: string;
  minRead: string;
  category: string;
  tags: string[];
  originalPageUrl: string;
  blocks: unknown[];
  content: string;
}

/**
 * API Response Types
 */
export interface BlogPostsResponse
  extends ApiResponse<{
    posts: ProcessedBlogPost[];
    pagination: Pagination;
  }> {}

export interface SearchResult {
  post: ProcessedBlogPost;
  score: number;
  matches?: string[];
}

export interface SearchResponse
  extends ApiResponse<{
    results: SearchResult[];
    query: string;
    pagination: Pagination;
  }> {}

export interface CategoriesResponse
  extends ApiResponse<{
    categories: string[];
  }> {}

export interface BlogPostResponse
  extends ApiResponse<{
    post: ProcessedBlogPost;
  }> {}

// API Response Types with simplified structure for direct use
export interface BlogApiResponse {
  posts: ProcessedBlogPost[];
  pagination: {
    page: number;
    limit: number;
    totalPosts: number;
    totalPages: number;
    hasMore: boolean;
  };
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
}

export interface CategoriesApiResponse {
  categories: string[];
}

export interface BlogPostApiResponse {
  post: ProcessedBlogPost;
}

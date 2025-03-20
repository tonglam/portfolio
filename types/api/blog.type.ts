/**
 * Type definitions for blog API responses and processed blog posts
 */
import type { BlogPost as BaseBlogPost } from '@/types/data/blog.type';
import type { ApiResponse, PaginatedResponse } from './common.type';
import type {
  ExtendedNotionPost,
  extractPlainText,
  NotionBlock,
  NotionDate,
  NotionPost,
  NotionText,
  RichTextItem,
} from './notion.type';

// Re-export Notion API types for backward compatibility
export { extractPlainText };

export type { ExtendedNotionPost, NotionBlock, NotionDate, NotionPost, NotionText, RichTextItem };

// Legacy type aliases for backward compatibility
export type RichTextItemResponse = RichTextItem;

/**
 * API Request Parameter Types
 */
export interface BlogPostParams {
  /** Unique identifier for the blog post */
  slug: string;
}

export interface BlogListParams {
  /** Page number for pagination */
  page?: number;
  /** Number of items per page */
  limit?: number;
  /** Filter posts by category */
  category?: string;
}

export interface BlogSearchParams extends BlogListParams {
  /** Search query string */
  q: string;
}

/**
 * Core Blog Post Type
 * Represents the base structure of a blog post
 */
export interface BlogPost extends BaseBlogPost {
  id: string; // Make id required
  minRead: string | number;
  r2ImageUrl: string;
}

/**
 * Processed Blog Post Type
 * Extended version of BlogPost with additional UI-specific fields
 */
export interface ProcessedBlogPost extends BlogPost {
  originalPageUrl: string;
}

/**
 * Search Result Type
 * Represents a blog post search result with relevance score
 */
export interface SearchResult {
  post: ProcessedBlogPost;
  score: number;
  matches?: string[];
}

/**
 * API Response Data Types
 */
export interface BlogPostsData {
  posts: ProcessedBlogPost[];
  pagination: {
    totalPages: number;
    currentPage: number;
    totalItems: number;
    itemsPerPage: number;
  };
}

export interface SearchData {
  results: SearchResult[];
  pagination: {
    totalPages: number;
    currentPage: number;
    totalItems: number;
    itemsPerPage: number;
  };
}

export interface CategoriesData {
  categories: string[];
}

export interface BlogPostData {
  post: ProcessedBlogPost;
}

/**
 * API Response Types
 */
export type BlogPostsApiResponse = PaginatedResponse<BlogPostsData>;
export type BlogSearchApiResponse = PaginatedResponse<SearchData>;
export type CategoriesApiResponse = ApiResponse<CategoriesData>;
export type BlogPostApiResponse = ApiResponse<BlogPostData>;

// Legacy format for backward compatibility
export interface LegacyBlogResponse {
  posts: ProcessedBlogPost[];
  totalPages: number;
}

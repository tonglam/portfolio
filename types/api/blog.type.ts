/**
 * Type definitions for blog API responses and processed blog posts
 */
import type { ApiResponse, Pagination } from '@/types/common.type';
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
 * Processed Blog Post Type
 * Extended version of BlogPost with additional UI-specific fields
 */
export interface ProcessedBlogPost {
  // Core fields
  id: string;
  title: string;
  summary: string;
  excerpt: string;
  slug: string;
  category: string;
  tags: string[];

  // Optional metadata
  coverImage?: string;
  originalCoverImage?: string;
  dateCreated: string;
  published?: boolean;
  featured?: boolean;
  notionUrl?: string;
  readingTime?: string;
  content?: string | NotionBlock[];

  // UI-specific fields
  r2ImageUrl?: string;
  date?: string;
  minRead?: string;
  originalPageUrl?: string;
  noteCreated?: string;
  noteEdited?: string;
}

/**
 * Fallback Post Type
 * Used when a post cannot be found or processed
 */
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
 * Search Result Type
 * Represents a blog post search result with relevance score
 */
export interface SearchResult {
  post: ProcessedBlogPost;
  score: number;
  matches?: string[];
}

/**
 * API Response Types
 * Using ApiResponse utility type from common.type.ts
 */
export interface BlogPostsResponse
  extends ApiResponse<{
    posts: ProcessedBlogPost[];
    pagination: Pagination;
  }> {}

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

/**
 * Page-specific Blog Post Type
 * Used in blog/[slug]/page.tsx for rendering
 * Extends ProcessedBlogPost but makes certain fields required
 */
export interface PageBlogPost extends Partial<ProcessedBlogPost> {
  title: string;
  date: string;
  minRead: string;
  r2ImageUrl: string;
  category: string;
  summary: string;
  content?: string;
  originalPageUrl?: string;
}

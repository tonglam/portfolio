import type { ProcessedBlogPost, SearchResult } from '@/types/api/blog.type';
import type { ApiResponse, Pagination } from '@/types/common.type';

export type { ProcessedBlogPost, SearchResult };

export interface BlogPost {
  id?: string;
  slug: string;
  title: string;
  summary: string;
  date: string;
  minRead: string | number;
  r2ImageUrl: string;
  originalPageUrl: string;
  category?: string;
  tags?: string[];
}

export interface LocalSearchResult {
  post: BlogPost;
  score: number;
  matches?: string[];
}

export interface PaginationInfo {
  page: number;
  limit: number;
  totalPosts: number;
  totalPages: number;
  hasMore: boolean;
}

export interface BlogApiData {
  posts: ProcessedBlogPost[];
  pagination: Pagination;
}

export interface CategoriesApiData {
  categories: string[];
}

export interface SearchApiData {
  results: SearchResult[];
  pagination: Pagination;
}

export type LocalBlogApiResponse = ApiResponse<BlogApiData>;
export type LocalCategoriesApiResponse = ApiResponse<CategoriesApiData>;
export type LocalSearchApiResponse = ApiResponse<SearchApiData>;

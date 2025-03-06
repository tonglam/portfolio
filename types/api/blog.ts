import type {
  CheckboxPropertyItemObjectResponse,
  DatePropertyItemObjectResponse,
  FilesPropertyItemObjectResponse,
  MultiSelectPropertyItemObjectResponse,
  NumberPropertyItemObjectResponse,
  RichTextItemResponse,
  RichTextPropertyItemObjectResponse,
  SelectPropertyItemObjectResponse,
  TitlePropertyItemObjectResponse,
  UrlPropertyItemObjectResponse,
} from '@notionhq/client/build/src/api-endpoints';
import type { ApiResponse, Pagination } from '../common';

/**
 * Notion-specific types
 */
// Re-export Notion API types
export type { RichTextItemResponse };

// Base Notion types
export type NotionText = RichTextItemResponse;

export interface NotionTitle extends TitlePropertyItemObjectResponse {}

export interface NotionRichText extends RichTextPropertyItemObjectResponse {}

export interface NotionMultiSelect extends MultiSelectPropertyItemObjectResponse {}

export interface NotionCheckbox extends CheckboxPropertyItemObjectResponse {}

export interface NotionNumber extends NumberPropertyItemObjectResponse {}

export interface NotionFile extends FilesPropertyItemObjectResponse {}

export interface NotionUrl extends UrlPropertyItemObjectResponse {}

export interface NotionSelect extends SelectPropertyItemObjectResponse {}

export interface NotionDate extends DatePropertyItemObjectResponse {}

export type NotionProperty =
  | NotionTitle
  | NotionRichText
  | NotionMultiSelect
  | NotionCheckbox
  | NotionNumber
  | NotionUrl
  | NotionFile
  | NotionSelect
  | NotionDate;

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

export interface NotionProperties {
  Title: NotionTitle;
  Slug: NotionRichText;
  Summary: NotionRichText;
  Category: NotionSelect;
  Tags: NotionMultiSelect;
  Published: NotionCheckbox;
  Featured: NotionCheckbox;
  ReadingTime: NotionRichText;
  CoverImage: NotionUrl | NotionFile;
  OriginalCoverImage: NotionUrl | NotionFile;
  DateCreated: NotionDate;
  Content: NotionRichText;
  Excerpt: NotionRichText;
  [key: string]: NotionProperty;
}

export interface NotionPost {
  id: string;
  properties: NotionProperties;
  url: string;
  created_time: string;
  last_edited_time: string;
}

/**
 * Blog post types
 */
export interface ProcessedBlogPost {
  id: string;
  title: string;
  summary: string;
  excerpt: string;
  slug: string;
  category: string;
  tags: string[];
  coverImage: string;
  originalCoverImage: string;
  dateCreated: string;
  noteCreated: string;
  noteEdited: string;
  published: boolean;
  featured: boolean;
  notionUrl: string;
  readingTime: string;
  content: string;
}

/**
 * API response types
 */
export interface BlogPostsResponse
  extends ApiResponse<{
    posts: ProcessedBlogPost[];
    pagination: Pagination;
  }> {}

export interface SearchResult {
  post: ProcessedBlogPost;
  score: number;
  matches: string[];
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

/**
 * Helper functions
 */
export function extractPlainText(
  richText: RichTextItemResponse | RichTextItemResponse[] | undefined
): string {
  if (!richText) return '';

  const textArray = Array.isArray(richText) ? richText : [richText];
  return textArray.map(text => text.plain_text || '').join('');
}

export interface NotionBlock {
  id: string;
  type: 'paragraph' | 'heading_1' | 'heading_2' | 'heading_3';
  has_children: boolean;
  paragraph?: {
    rich_text: NotionText[];
  };
  heading_1?: {
    rich_text: NotionText[];
  };
  heading_2?: {
    rich_text: NotionText[];
  };
  heading_3?: {
    rich_text: NotionText[];
  };
}

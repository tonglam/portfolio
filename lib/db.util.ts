import { DEFAULTS } from '@/config';
import urls from '@/config/urls.config';
import { ENV_VARS, getEnvVar } from '@/lib/env.util';
import type { DatabasePost, ProcessedBlogPost, QueryResponse } from '@/types/blog.type';

// This file simulates a database client
// Replace with your actual database implementation

// Interfaces for database operation options
interface SearchOptions {
  query: string;
  limit: number;
  offset: number;
  category?: string;
}

interface QueryOptions {
  limit: number;
  offset: number;
  category?: string;
}

interface SearchResult {
  items: ProcessedBlogPost[];
  total: number;
}

// Direct Cloudflare D1 database access
const blog = {
  // Find multiple blog posts
  async findMany({
    limit = DEFAULTS.BLOG.LIMIT,
    offset = 0,
    category,
  }: QueryOptions): Promise<ProcessedBlogPost[]> {
    try {
      const accountId = getEnvVar(ENV_VARS.CLOUDFLARE.ACCOUNT_ID);
      const d1Token = getEnvVar(ENV_VARS.CLOUDFLARE.D1_API_TOKEN);
      const d1DatabaseId = getEnvVar(ENV_VARS.CLOUDFLARE.D1_DATABASE_ID);

      let query = 'SELECT * FROM posts';
      const params: string[] = [];

      if (category && category !== 'All') {
        query += ' WHERE category = ?';
        params.push(category);
      }

      query += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';
      params.push(limit.toString());
      params.push(offset.toString());

      const fetchUrl = urls.cloudflare.D1_QUERY(accountId, d1DatabaseId);
      const response = await fetch(fetchUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${d1Token}`,
        },
        body: JSON.stringify({
          sql: query,
          params,
        }),
        // Add caching with revalidation for 24 hours
        next: { revalidate: 86400 },
      });

      if (!response.ok) {
        console.error('D1 query failed:', response.status, response.statusText);
        return [];
      }

      const result = (await response.json()) as QueryResponse<DatabasePost>;
      const posts = result.result?.[0]?.results || [];

      return posts.map(mapDatabasePostToProcessedPost);
    } catch (error) {
      console.error('Error in findMany:', error);
      return [];
    }
  },

  // Count blog posts
  async count({ category }: { category?: string }): Promise<number> {
    try {
      const accountId = getEnvVar(ENV_VARS.CLOUDFLARE.ACCOUNT_ID);
      const d1Token = getEnvVar(ENV_VARS.CLOUDFLARE.D1_API_TOKEN);
      const d1DatabaseId = getEnvVar(ENV_VARS.CLOUDFLARE.D1_DATABASE_ID);

      let query = 'SELECT COUNT(*) as total FROM posts';
      const params: string[] = [];

      if (category && category !== 'All') {
        query += ' WHERE category = ?';
        params.push(category);
      }

      const fetchUrl = urls.cloudflare.D1_QUERY(accountId, d1DatabaseId);
      const response = await fetch(fetchUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${d1Token}`,
        },
        body: JSON.stringify({
          sql: query,
          params,
        }),
        // Add caching with revalidation for 24 hours
        next: { revalidate: 86400 },
      });

      if (!response.ok) {
        console.error('D1 count query failed:', response.status, response.statusText);
        return 0;
      }

      const result = await response.json();
      return result.result?.[0]?.results?.[0]?.total || 0;
    } catch (error) {
      console.error('Error in count:', error);
      return 0;
    }
  },

  // Search blog posts
  async search({
    query,
    limit = DEFAULTS.BLOG.LIMIT,
    offset = 0,
    category,
  }: SearchOptions): Promise<SearchResult> {
    try {
      if (!query || query.length < 2) {
        return { items: [], total: 0 };
      }

      const accountId = getEnvVar(ENV_VARS.CLOUDFLARE.ACCOUNT_ID);
      const d1Token = getEnvVar(ENV_VARS.CLOUDFLARE.D1_API_TOKEN);
      const d1DatabaseId = getEnvVar(ENV_VARS.CLOUDFLARE.D1_DATABASE_ID);

      let sqlQuery = `
        SELECT * FROM posts 
        WHERE title LIKE ? 
        OR summary LIKE ? 
        OR category LIKE ?
        OR tags LIKE ?
      `;

      const searchValue = `%${query}%`;
      const params = [searchValue, searchValue, searchValue, searchValue];

      if (category && category !== 'All') {
        sqlQuery += ' AND category = ?';
        params.push(category);
      }

      // First get total count
      const countQuery = sqlQuery.replace('*', 'COUNT(*) as total');
      const fetchUrl = urls.cloudflare.D1_QUERY(accountId, d1DatabaseId);

      const countResponse = await fetch(fetchUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${d1Token}`,
        },
        body: JSON.stringify({
          sql: countQuery,
          params,
        }),
        // No caching for search count
        cache: 'no-store',
      });

      const countData = await countResponse.json();
      const totalItems = countData.result?.[0]?.results?.[0]?.total || 0;

      // Add pagination to main query
      sqlQuery += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';
      params.push(limit.toString());
      params.push(offset.toString());

      // Execute the search query
      const response = await fetch(fetchUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${d1Token}`,
        },
        body: JSON.stringify({
          sql: sqlQuery,
          params,
        }),
        // No caching for search results
        cache: 'no-store',
      });

      if (!response.ok) {
        console.error('D1 search query failed:', response.status, response.statusText);
        return { items: [], total: 0 };
      }

      const result = (await response.json()) as QueryResponse<DatabasePost>;
      const posts = result.result?.[0]?.results || [];

      return {
        items: posts.map(mapDatabasePostToProcessedPost),
        total: totalItems,
      };
    } catch (error) {
      console.error('Error in search:', error);
      return { items: [], total: 0 };
    }
  },

  // Get all unique categories
  async getCategories(): Promise<string[]> {
    try {
      const accountId = getEnvVar(ENV_VARS.CLOUDFLARE.ACCOUNT_ID);
      const d1Token = getEnvVar(ENV_VARS.CLOUDFLARE.D1_API_TOKEN);
      const d1DatabaseId = getEnvVar(ENV_VARS.CLOUDFLARE.D1_DATABASE_ID);

      const url = urls.cloudflare.D1_QUERY(accountId, d1DatabaseId);
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${d1Token}`,
        },
        body: JSON.stringify({
          sql: 'SELECT DISTINCT category FROM posts WHERE category IS NOT NULL ORDER BY category ASC',
          params: [],
        }),
        // Add caching with revalidation for 24 hours
        next: { revalidate: 86400 },
      });

      if (!response.ok) {
        console.error('D1 categories query failed:', response.status, response.statusText);
        return [];
      }

      const data = await response.json();
      if (!data.success || !data.result?.[0]?.results) {
        return [];
      }

      return data.result[0].results.map((row: { category: string }) => row.category);
    } catch (error) {
      console.error('Error in getCategories:', error);
      return [];
    }
  },
};

export const db = {
  blog,
};

/**
 * Maps database post format to processed post format
 */
function mapDatabasePostToProcessedPost(post: DatabasePost): ProcessedBlogPost {
  return {
    r2ImageUrl: post.r2_image_url || '',
    title: post.title || 'Untitled Post',
    date: post.notion_last_edited_at || post.created_at || 'Unknown date',
    minRead: post.mins_read ? `${post.mins_read} Min Read` : DEFAULTS.BLOG.MIN_READ,
    summary: post.summary || 'No summary available',
    category: post.category || 'Uncategorized',
    tags: post.tags ? post.tags.split(',') : [post.category || 'Uncategorized'],
    slug: post.id,
    id: post.id,
    originalPageUrl: post.notion_url || '',
    content: '', // This content field is left empty as it should be fetched separately when needed
  };
}

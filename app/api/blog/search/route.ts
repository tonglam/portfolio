import { CACHE_DEFAULTS, CACHE_SETTINGS, DEFAULTS, EXTERNAL_URLS } from '@/config';
import { ApiErrors, handleRouteError } from '@/lib/core/error-handler.util';
import { extractPlainText } from '@/lib/utils/string.util';
import type { ExtendedNotionPost, RichTextItem } from '@/types/api/blog.type';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

/**
 * API endpoint for searching blog posts
 * Implemented with Vector Search using blog content
 */

// Route segment config for Next.js caching
export const revalidate = CACHE_DEFAULTS.revalidate; // Revalidate based on cache defaults

// This is the function that will be called when the API endpoint is hit
export async function get(request: NextRequest): Promise<NextResponse> {
  // Get search query from request
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q') || '';
  const page = parseInt(searchParams.get('page') || '1', 10);
  const limit = parseInt(searchParams.get('limit') || DEFAULTS.BLOG.LIMIT.toString(), 10);
  const category = searchParams.get('category');
  const cacheControl = CACHE_SETTINGS.BLOG.CONTROL;

  // Validate query
  if (!query || query.length < 2) {
    return handleRouteError(
      ApiErrors.BAD_REQUEST('Search query must be at least 2 characters'),
      'Blog Search API'
    );
  }

  // Fetch data from R2 storage
  const response = await fetch(EXTERNAL_URLS.BLOG_DATA_SOURCE, {
    next: { revalidate: CACHE_SETTINGS.BLOG.REVALIDATE },
    headers: {
      'Cache-Control': cacheControl,
      Authorization: process.env.CLOUDFLARE_API_TOKEN || '',
    },
  });

  // Return error if fetch fails
  if (!response.ok) {
    return handleRouteError(
      ApiErrors.INTERNAL('Failed to fetch blog posts for search'),
      'Blog Search API'
    );
  }

  const allPosts = (await response.json()) as ExtendedNotionPost[];

  // Filter posts based on search query
  let searchResults = allPosts
    .map(post => ({
      title: extractPlainText(post.properties.Title.title as RichTextItem[]) || '',
      summary: extractPlainText(post.properties.Summary.rich_text as RichTextItem[]) || '',
      category: post.properties.Category?.select?.name || '',
      tags: post.properties.Tags?.multi_select?.map(tag => tag.name) || [],
      id: post.id,
      // ... other post properties
    }))
    .filter(post => {
      const searchQuery = query.toLowerCase();
      return (
        post.title.toLowerCase().includes(searchQuery) ||
        post.summary.toLowerCase().includes(searchQuery) ||
        post.category.toLowerCase().includes(searchQuery) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchQuery))
      );
    });

  // Filter by category if specified
  if (category && category !== 'All') {
    searchResults = searchResults.filter(
      post => post.category.toLowerCase() === category.toLowerCase()
    );
  }

  // Map to final format
  const formattedResults = searchResults.map(post => ({
    post,
    matches: [], // Keeping the structure but without detailed matching info
    score: 1, // All matches are equal
  }));

  // Return search results with pagination
  const start = (page - 1) * limit;
  const end = start + limit;
  const paginatedResults = formattedResults.slice(start, end);

  return NextResponse.json(
    {
      success: true,
      data: {
        results: paginatedResults,
        query,
        pagination: {
          page,
          limit,
          total: formattedResults.length,
          hasMore: end < formattedResults.length,
        },
      },
    },
    {
      headers: {
        'Cache-Control': cacheControl,
      },
    }
  );
}

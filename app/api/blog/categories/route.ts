import { CACHE_SETTINGS, EXTERNAL_URLS } from '@/config/constants';
import { logger } from '@/lib/logger';
import { NextResponse } from 'next/server';

// Types
import type { CategoriesResponse, NotionPost } from '@/types/api/blog';
import type { ApiError } from '@/types/api/common';

/**
 * GET endpoint for blog categories
 * Retrieves and returns a list of unique blog categories
 * Uses shared blog service for optimized data fetching
 */
// Route segment config for Next.js caching
export const revalidate = 3600; // Revalidate every hour

// Default fallback categories if API fails
const FALLBACK_CATEGORIES = ['All', 'Development', 'Design', 'Technology', 'Career'];

export async function GET(): Promise<NextResponse<CategoriesResponse | ApiError>> {
  try {
    logger.info('Fetching categories from data source');

    // Cache control
    const cacheControl = CACHE_SETTINGS.BLOG.CONTROL;

    // Fetch data from R2 storage
    const response = await fetch(EXTERNAL_URLS.BLOG_DATA_SOURCE, {
      next: { revalidate: CACHE_SETTINGS.BLOG.REVALIDATE },
    });

    if (!response.ok) {
      logger.error(`Failed to fetch blog data: ${response.status}`);
      // Fall back to default categories
      logger.info({ categories: FALLBACK_CATEGORIES }, 'Using fallback categories');

      return NextResponse.json(
        {
          success: true,
          data: { categories: FALLBACK_CATEGORIES },
        },
        {
          headers: {
            'Cache-Control': cacheControl,
          },
        }
      );
    }

    const allPosts = (await response.json()) as NotionPost[];

    // Debug: Log the first post structure if available
    if (allPosts.length > 0) {
      logger.debug(
        { properties: Object.keys(allPosts[0].properties || {}) },
        'First post sample properties'
      );
    }

    // Extract categories from Notion API format
    const categories = allPosts.reduce<string[]>((acc, post) => {
      if (
        post.properties?.Category?.select?.name &&
        typeof post.properties.Category.select.name === 'string'
      ) {
        const category = post.properties.Category.select.name;
        if (!acc.includes(category)) {
          acc.push(category);
        }
      }
      return acc;
    }, []);

    // Sort categories alphabetically
    categories.sort();

    // Add "All" as the first category
    const finalCategories = ['All', ...categories];

    logger.info({ categories: finalCategories }, 'Extracted categories');

    // Return the categories with appropriate cache headers
    return NextResponse.json(
      {
        success: true,
        data: { categories: finalCategories },
      },
      {
        headers: {
          'Cache-Control': cacheControl,
        },
      }
    );
  } catch (error) {
    logger.error({ error }, 'Error fetching blog categories');

    // Fall back to default categories in case of any error
    logger.info({ categories: FALLBACK_CATEGORIES }, 'Using fallback categories due to error');

    return NextResponse.json(
      {
        success: true,
        data: { categories: FALLBACK_CATEGORIES },
      },
      {
        status: 200, // Still return 200 with fallback data
        headers: {
          'Cache-Control': CACHE_SETTINGS.BLOG.CONTROL,
        },
      }
    );
  }
}

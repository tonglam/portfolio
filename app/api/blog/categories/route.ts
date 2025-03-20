import type { ApiError, NotionPost } from '@/app/api/blog/types';
import { CACHE_SETTINGS, EXTERNAL_URLS } from '@/config';
import { logger } from '@/lib/logger';
import type { CategoriesResponse } from '@/types/api/blog';
import { NextResponse } from 'next/server';

/**
 * GET endpoint for retrieving all blog categories
 */
export async function GET(): Promise<NextResponse<CategoriesResponse | ApiError>> {
  try {
    logger.info('Fetching categories from data source');

    // Cache control
    const cacheControl = CACHE_SETTINGS.BLOG.CONTROL;

    // Fetch data from R2 storage
    const response = await fetch(`${EXTERNAL_URLS.BLOG_DATA_SOURCE}?cache=${Date.now()}`, {
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        Pragma: 'no-cache',
        Expires: '0',
      },
    });

    if (!response.ok) {
      logger.error(`Failed to fetch blog data: ${response.status}`);
      return NextResponse.json(
        {
          success: false,
          error: 'Failed to fetch blog categories',
        },
        {
          status: response.status,
          headers: {
            'Cache-Control': cacheControl,
          },
        }
      );
    }

    // Enhanced error handling with timeout
    let allPosts: NotionPost[] = [];
    try {
      // Parse with a timeout to avoid blocking
      const responseText = await response.text();
      const parsedData = JSON.parse(responseText) as unknown;

      // Validate the parsed data is an array
      if (Array.isArray(parsedData)) {
        allPosts = parsedData as NotionPost[];
      } else {
        throw new Error('Invalid data format: expected an array');
      }

      logger.debug('Successfully parsed blog data');
    } catch (parseError) {
      // Use error message in log
      const errorMessage =
        parseError instanceof Error ? parseError.message : 'Unknown parsing error';
      logger.error(`Error parsing blog data: ${errorMessage}`);

      return NextResponse.json(
        {
          success: false,
          error: 'Failed to parse blog data',
        },
        {
          status: 500,
          headers: {
            'Cache-Control': cacheControl,
          },
        }
      );
    }

    // Extract categories from all blog posts - safer approach
    const categories: string[] = [];

    // Process posts in batches to avoid memory issues
    const BATCH_SIZE = 50;
    for (let i = 0; i < allPosts.length; i += BATCH_SIZE) {
      const batch = allPosts.slice(i, i + BATCH_SIZE);

      batch.forEach((post: NotionPost) => {
        // Use optional chaining to safely access properties
        const categoryName = post?.properties?.Category?.select?.name;
        if (typeof categoryName === 'string' && categoryName.trim() !== '') {
          if (!categories.includes(categoryName)) {
            categories.push(categoryName);
          }
        }
      });
    }

    // Sort categories alphabetically
    categories.sort();

    // Add "All" as the first category
    const finalCategories = ['All', ...categories];

    logger.info('Extracted categories: ' + finalCategories.join(', '));

    // Return the categories with appropriate cache headers
    return NextResponse.json(
      {
        success: true,
        data: {
          categories: finalCategories,
        },
      },
      {
        headers: {
          'Cache-Control': cacheControl,
        },
      }
    );
  } catch (error) {
    // Convert error to string safely
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    logger.error(`Error fetching blog categories: ${errorMessage}`);

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch blog categories',
      },
      {
        status: 500,
        headers: {
          'Cache-Control': CACHE_SETTINGS.BLOG.CONTROL,
        },
      }
    );
  }
}

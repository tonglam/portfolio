import { CACHE_SETTINGS, DEFAULTS, EXTERNAL_URLS } from '@/config';
import { ApiErrors, handleRouteError } from '@/lib/core/error-handler.util';
import type { CategoriesApiResponse, NotionPost } from '@/types/api/blog.type';
import type { ApiError } from '@/types/common.type';
import { NextResponse } from 'next/server';

/**
 * GET endpoint for retrieving all blog categories
 * Uses longer cache duration since categories change infrequently
 */
export const revalidate = CACHE_SETTINGS.BLOG.CATEGORIES.REVALIDATE;

export async function get(): Promise<NextResponse<CategoriesApiResponse | ApiError>> {
  const cacheControl = CACHE_SETTINGS.BLOG.CATEGORIES.CONTROL;

  // Fetch data from R2 storage
  const response = await fetch(`${EXTERNAL_URLS.BLOG_DATA_SOURCE}?cache=${Date.now()}`, {
    headers: {
      'Cache-Control': cacheControl,
    },
  });

  if (!response.ok) {
    return handleRouteError(
      ApiErrors.INTERNAL('Failed to fetch blog categories'),
      'Blog Categories API'
    ) as NextResponse<ApiError>;
  }

  // Parse with a timeout to avoid blocking
  const responseText = await response.text();
  const parsedData = JSON.parse(responseText) as unknown;

  // Validate the parsed data is an array
  if (!Array.isArray(parsedData)) {
    return handleRouteError(
      ApiErrors.INTERNAL('Invalid data format: expected an array'),
      'Blog Categories API'
    ) as NextResponse<ApiError>;
  }

  const allPosts = parsedData as NotionPost[];

  // Extract categories from all blog posts - safer approach
  const categories: string[] = [];

  // Process posts in batches to avoid memory issues
  for (let i = 0; i < allPosts.length; i += DEFAULTS.BLOG.BATCH_SIZE) {
    const batch = allPosts.slice(i, i + DEFAULTS.BLOG.BATCH_SIZE);

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
  ) as NextResponse<CategoriesApiResponse>;
}

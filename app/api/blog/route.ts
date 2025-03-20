import { CACHE_DEFAULTS, CACHE_SETTINGS, DEFAULTS, EXTERNAL_URLS } from '@/config';
import { ApiErrors, handleRouteError } from '@/lib/core/error-handler.util';
import { extractPlainText, generateSlug } from '@/lib/utils/string.util';
import type { NotionPost, ProcessedBlogPost, RichTextItem } from '@/types/api/blog.type';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

/**
 * Blog API endpoint
 *
 * This endpoint provides paginated blog posts with filtering by category.
 * It extracts and returns the following fields from the Notion database:
 * - Title (Title.title.plain_text)
 * - Summary (Summary.rich_text.plain_text)
 * - Excerpt (Excerpt.rich_text.plain_text)
 * - Category (Category.select.name)
 * - Tags (Tags.multi_select.name)
 * - Date Created, R2 Image URL, Original Page URL, and other metadata
 *
 * This data structure supports the enhanced search functionality.
 */

// Route segment config for Next.js caching
export const revalidate = CACHE_DEFAULTS.revalidate; // Revalidate based on cache defaults

// This is the function that will be called when the API endpoint is hit
export async function get(request: NextRequest): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const page = parseInt(searchParams.get('page') || '1', 10);
  const limit = parseInt(searchParams.get('limit') || DEFAULTS.BLOG.LIMIT.toString(), 10);
  const cacheControl = CACHE_SETTINGS.BLOG.CONTROL;

  // Fetch data from R2 storage
  const response = await fetch(EXTERNAL_URLS.BLOG_DATA_SOURCE, {
    next: { revalidate: CACHE_SETTINGS.BLOG.REVALIDATE },
  });

  // Return error if fetch fails
  if (!response.ok) {
    return handleRouteError(ApiErrors.INTERNAL('Failed to fetch blog posts'), 'Blog API');
  }

  const rawData: unknown = await response.json();
  const allPosts = Array.isArray(rawData) ? rawData : [];

  // Process posts - extract data from Notion API format
  const processedPosts = allPosts
    .map((post: NotionPost) => {
      if (!post.properties) {
        return null;
      }

      // Extract the post ID (for slug)
      const id = post.id || '';

      // Extract title from title property
      const title =
        post.properties.Title && post.properties.Title.title
          ? extractPlainText(post.properties.Title.title as RichTextItem[])
          : 'Untitled Post';

      // Extract image URL from R2ImageUrl property
      const r2ImageUrl =
        post.properties.R2ImageUrl && post.properties.R2ImageUrl.url
          ? post.properties.R2ImageUrl.url
          : post.properties.Image && post.properties.Image.url
            ? post.properties.Image.url
            : EXTERNAL_URLS.PLACEHOLDERS.BLOG_IMAGE;

      // Extract date from Date Created property (format as MMM DD, YYYY)
      let date = 'Unknown date';
      if (
        post.properties['Date Created'] &&
        post.properties['Date Created'].date &&
        post.properties['Date Created'].date.start
      ) {
        const postDate = new Date(post.properties['Date Created'].date.start);
        date = postDate.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        });
      }

      // Extract minutes read from Mins Read property
      const minRead =
        post.properties['Mins Read'] && post.properties['Mins Read'].number
          ? `${post.properties['Mins Read'].number} Min Read`
          : DEFAULTS.BLOG.MIN_READ;

      // Extract summary from Summary property
      const summary =
        post.properties.Summary && post.properties.Summary.rich_text
          ? extractPlainText(post.properties.Summary.rich_text as RichTextItem[])
          : post.properties.Excerpt && post.properties.Excerpt.rich_text
            ? extractPlainText(post.properties.Excerpt.rich_text as RichTextItem[])
            : 'No summary available';

      // Extract excerpt from Excerpt property
      const excerpt =
        post.properties.Excerpt && post.properties.Excerpt.rich_text
          ? extractPlainText(post.properties.Excerpt.rich_text as RichTextItem[])
          : '';

      // Extract category from Category property
      const category =
        post.properties.Category &&
        post.properties.Category.select &&
        post.properties.Category.select.name
          ? post.properties.Category.select.name
          : 'Uncategorized';

      // Extract tags from Tags property
      const tags =
        post.properties.Tags && post.properties.Tags.multi_select
          ? post.properties.Tags.multi_select.map(tag => tag.name)
          : [category]; // Default to category as a tag if no tags

      // Create a slug from the title or use the ID
      const postSlug = generateSlug(title, id);

      // Get original page URL from the "Original Page" property if available
      const originalPageUrl =
        post.properties['Original Page'] && post.properties['Original Page'].url
          ? post.properties['Original Page'].url
          : EXTERNAL_URLS.NOTION.PAGE(id);

      return {
        r2ImageUrl,
        title,
        date,
        minRead,
        summary,
        excerpt,
        category,
        tags,
        slug: postSlug,
        id,
        originalPageUrl,
      };
    })
    .filter(Boolean) as Array<Partial<ProcessedBlogPost>>; // Type assertion for non-null values

  // If we have no posts after processing, return empty response
  if (processedPosts.length === 0) {
    return handleRouteError(ApiErrors.NOT_FOUND('No valid posts found'), 'Blog API');
  }

  // Filter by category if specified
  const filteredPosts = category
    ? processedPosts.filter(post => post.category === category)
    : processedPosts;

  // Calculate pagination values
  const totalPosts = filteredPosts.length;
  const totalPages = Math.max(1, Math.ceil(totalPosts / limit));
  const currentPage = Math.min(Math.max(1, page), totalPages);
  const startIndex = (currentPage - 1) * limit;
  const endIndex = Math.min(startIndex + limit, totalPosts);
  const paginatedPosts = filteredPosts.slice(startIndex, endIndex);

  // Return paginated posts with metadata
  return NextResponse.json(
    {
      success: true,
      data: {
        posts: paginatedPosts,
        pagination: {
          totalPosts,
          totalPages,
          currentPage,
          page,
          limit,
          hasMore: endIndex < totalPosts,
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

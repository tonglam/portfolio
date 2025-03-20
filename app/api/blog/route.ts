import { CACHE_SETTINGS, DEFAULTS, EXTERNAL_URLS } from '@/config';
import { logger } from '@/lib/logger';
import type { NotionPost, ProcessedBlogPost, RichTextItem } from '@/types/api/blog';
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
export const revalidate = 3600; // Revalidate every hour

// Local implementation of extractPlainText
function extractPlainText(richTextArray: RichTextItem[] | RichTextItem | undefined): string {
  if (!richTextArray) {
    return '';
  }

  // Handle array case
  if (Array.isArray(richTextArray)) {
    if (richTextArray.length === 0) return '';
    return richTextArray
      .map(item => item.plain_text || (item.text && item.text.content) || '')
      .join('');
  }

  // Handle single item case
  return richTextArray.plain_text || (richTextArray.text && richTextArray.text.content) || '';
}

// This is the function that will be called when the API endpoint is hit
export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || DEFAULTS.BLOG.LIMIT.toString(), 10);
    const cacheControl = CACHE_SETTINGS.BLOG.CONTROL;

    logger.info('Fetching blog posts from data source');

    // Fetch data from R2 storage
    const response = await fetch(EXTERNAL_URLS.BLOG_DATA_SOURCE, {
      next: { revalidate: CACHE_SETTINGS.BLOG.REVALIDATE },
    });

    // Return error if fetch fails
    if (!response.ok) {
      logger.error(`Failed to fetch blog data: ${response.status}`);
      return NextResponse.json(
        {
          success: false,
          error: 'Failed to fetch blog posts',
        },
        {
          status: response.status,
          headers: {
            'Cache-Control': cacheControl,
          },
        }
      );
    }

    const rawData: unknown = await response.json();
    const allPosts = Array.isArray(rawData) ? rawData : [];

    try {
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
          const postSlug = title
            ? title
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)/g, '')
            : id;

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
        logger.warn('No valid posts found in data source');
        return NextResponse.json(
          {
            success: true,
            data: {
              posts: [],
              pagination: {
                totalPosts: 0,
                totalPages: 0,
                currentPage: page,
                page,
                limit,
                hasMore: false,
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

      return handlePaginationAndResponse(processedPosts, category, page, limit, cacheControl);
    } catch (processError) {
      logger.error({ error: processError }, 'Error processing posts');
      return NextResponse.json(
        {
          success: false,
          error: 'Error processing blog posts',
        },
        {
          status: 500,
          headers: {
            'Cache-Control': cacheControl,
          },
        }
      );
    }
  } catch (error) {
    logger.error({ error }, 'Failed to fetch blog posts');
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch blog posts',
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

// Helper function to handle pagination and create a consistent response
function handlePaginationAndResponse(
  posts: Array<Partial<ProcessedBlogPost>>,
  category: string | null,
  page: number,
  limit: number,
  cacheControl: string
): NextResponse {
  // Filter by category if specified
  const filteredPosts = category ? posts.filter(post => post.category === category) : posts;

  // Calculate pagination
  const totalPosts = filteredPosts.length;
  const totalPages = Math.ceil(totalPosts / limit);
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedPosts = filteredPosts.slice(startIndex, endIndex);
  const hasMore = endIndex < totalPosts;

  // Return with our consistent format
  return NextResponse.json(
    {
      success: true,
      data: {
        posts: paginatedPosts,
        pagination: {
          totalPosts,
          totalPages,
          currentPage: page,
          page,
          limit,
          hasMore,
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

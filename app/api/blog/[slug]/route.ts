import { CACHE_SETTINGS, ERRORS, EXTERNAL_URLS } from '@/config';
import { logger } from '@/lib/logger';
import type { ExtendedNotionPost, FallbackPost, RichTextItemResponse } from '@/types/api/blog';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

/**
 * GET endpoint to retrieve a single blog post by slug
 * Direct fetching from R2 storage with fallback mechanism
 */
// Route segment config for Next.js caching
export const revalidate = 3600; // Revalidate every hour

// Helper function to extract plain text from Notion rich text
function extractPlainText(
  richText: RichTextItemResponse[] | RichTextItemResponse | undefined
): string {
  if (!richText) {
    return '';
  }

  // Handle array case
  if (Array.isArray(richText)) {
    if (richText.length === 0) return '';
    return richText.map(item => item.plain_text || '').join('');
  }

  // Handle single item case
  return richText.plain_text || '';
}

// Fallback post for when a post cannot be found
const getFallbackPost = (slug: string): FallbackPost => ({
  id: `mock-${Date.now()}`,
  title: 'Sample Blog Post',
  summary: 'This is a sample blog post that serves as a fallback.',
  r2ImageUrl:
    'https://res.cloudinary.com/demo/image/upload/w_1470,h_800,c_fill,q_auto,f_auto/sample',
  date: new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }),
  minRead: '3 Min Read',
  category: 'General',
  tags: ['Sample', 'Fallback', 'Demo'],
  originalPageUrl: '',
  blocks: [],
  content: `# Sample Blog Post

This is a sample blog post that serves as a fallback when the requested content cannot be found.

## Why am I seeing this?

You're seeing this fallback content because:

1. The post with the slug "${slug}" does not exist
2. There was an error fetching the blog data
3. The data source might be temporarily unavailable

## What can I do?

* Try a different blog post
* Check if the URL is correct
* Try again later
`,
});

/**
 * Creates an error response with consistent format
 */
function createErrorResponse(message: string, status = 400): NextResponse {
  return NextResponse.json(
    {
      success: false,
      error: message,
    },
    { status }
  );
}

/**
 * Creates a success response with consistent format
 */
function createSuccessResponse<T>(data: T, cacheControl: string): NextResponse {
  return NextResponse.json(
    {
      success: true,
      data,
    },
    {
      headers: {
        'Cache-Control': cacheControl,
      },
    }
  );
}

export async function GET(
  _request: NextRequest,
  { params }: { params: { slug: string } }
): Promise<NextResponse> {
  try {
    const { slug } = params;
    const cacheControl = CACHE_SETTINGS.BLOG.CONTROL;

    if (!slug) {
      logger.warn('Missing slug parameter in request');
      return createErrorResponse(ERRORS.VALIDATION.REQUIRED_FIELD('slug'));
    }

    logger.info({ slug }, 'Fetching blog post by slug');

    // Fetch data from R2 storage
    const response = await fetch(EXTERNAL_URLS.BLOG_DATA_SOURCE, {
      next: { revalidate: CACHE_SETTINGS.BLOG.REVALIDATE },
    });

    // Use fallback data if fetch fails
    if (!response.ok) {
      logger.error(`Failed to fetch blog data: ${response.status}`);
      logger.info({ slug }, 'Using fallback post data');

      return createSuccessResponse({ post: getFallbackPost(slug) }, cacheControl);
    }

    const allPosts = (await response.json()) as ExtendedNotionPost[];

    try {
      // Process posts to find the matching slug
      const post = allPosts.find(post => {
        if (!post.properties || !post.properties.Title) {
          return false;
        }

        const title = extractPlainText(post.properties.Title.title);
        const postSlug = title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, '');

        return postSlug === slug;
      });

      if (!post) {
        logger.warn({ slug }, 'Post not found, using fallback');

        // Return 200 with fallback data instead of 404
        return createSuccessResponse({ post: getFallbackPost(slug) }, cacheControl);
      }

      // Extract post data with type safety
      const id = post.id || '';

      // Safe access to title with fallback
      const title = post.properties?.Title?.title
        ? extractPlainText(post.properties.Title.title)
        : 'Untitled Post';

      // Safe access to image URL with fallback
      const r2ImageUrl = post.properties?.R2ImageUrl?.url
        ? post.properties.R2ImageUrl.url
        : post.properties?.Image?.url
          ? post.properties.Image.url
          : EXTERNAL_URLS.PLACEHOLDERS.BLOG_IMAGE;

      // Safe access to date
      let date = 'Unknown date';
      if (post.properties?.['Date Created']?.date?.start) {
        const postDate = new Date(post.properties['Date Created'].date.start);
        date = postDate.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        });
      }

      // Safe access to min read
      const minRead = post.properties?.['Mins Read']?.number
        ? `${post.properties['Mins Read'].number} Min Read`
        : '3 Min Read';

      // Safe access to summary
      const summary = post.properties?.Summary?.rich_text
        ? extractPlainText(post.properties.Summary.rich_text)
        : post.properties?.Excerpt?.rich_text
          ? extractPlainText(post.properties.Excerpt.rich_text)
          : 'No summary available';

      // Safe access to category
      const category = post.properties?.Category?.select?.name
        ? post.properties.Category.select.name
        : 'Uncategorized';

      // Safe access to tags
      const tags = post.properties?.Tags?.multi_select
        ? post.properties.Tags.multi_select.map((tag: { name: string }) => tag.name)
        : [category];

      // Extract content blocks
      const blocks = post.blocks || [];

      // Get the original page URL from the "Original Page" property if available
      const originalPageUrl = post.properties?.['Original Page']?.url
        ? post.properties['Original Page'].url
        : EXTERNAL_URLS.NOTION.PAGE(id);

      logger.info({ slug }, 'Post found, returning data');

      // Return the post data with appropriate cache headers and our consistent format
      return createSuccessResponse(
        {
          post: {
            id,
            title,
            r2ImageUrl,
            date,
            minRead,
            summary,
            category,
            tags,
            blocks,
            originalPageUrl,
          },
        },
        cacheControl
      );
    } catch (processError) {
      logger.error({ error: processError, slug }, 'Error processing post data');
      return createSuccessResponse({ post: getFallbackPost(slug) }, cacheControl);
    }
  } catch (error) {
    logger.error({ error }, 'Failed to fetch blog post');

    // Return fallback post with 200 status instead of error
    return createSuccessResponse(
      { post: getFallbackPost(params.slug) },
      CACHE_SETTINGS.BLOG.CONTROL
    );
  }
}

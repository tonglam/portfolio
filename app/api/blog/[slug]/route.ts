import type {
  BlogPostApiResponse,
  NotionPost,
  NotionRichText,
  SuccessResponse,
} from '@/app/api/blog/types';
import { CACHE_SETTINGS, EXTERNAL_URLS } from '@/config';
import { logger } from '@/lib/logger';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

/**
 * GET endpoint to retrieve a single blog post by slug
 * Direct fetching from R2 storage with fallback mechanism
 */
// Route segment config for Next.js caching
export const revalidate = 3600; // Revalidate every hour

// Helper function to create a success response
function createSuccessResponse(
  data: BlogPostApiResponse['post'],
  cacheControl: string
): NextResponse<SuccessResponse> {
  return NextResponse.json(
    {
      success: true,
      data: {
        post: data,
      },
    },
    {
      headers: {
        'Cache-Control': cacheControl,
      },
    }
  );
}

// Helper function to create an error response
function createErrorResponse(message: string, status: number, cacheControl: string): NextResponse {
  return NextResponse.json(
    {
      success: false,
      error: message,
    },
    {
      status,
      headers: {
        'Cache-Control': cacheControl,
      },
    }
  );
}

// Local implementation of extractPlainText
function extractPlainText(richTextArray: NotionRichText[] | NotionRichText | undefined): string {
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

export async function GET(
  _request: NextRequest,
  { params }: { params: { slug: string } }
): Promise<NextResponse> {
  try {
    const { slug } = params;
    const cacheControl = CACHE_SETTINGS.BLOG.CONTROL;

    logger.info({ slug }, 'Fetching blog post');

    // Fetch data from R2 storage
    const response = await fetch(EXTERNAL_URLS.BLOG_DATA_SOURCE, {
      next: { revalidate: CACHE_SETTINGS.BLOG.REVALIDATE },
    });

    if (!response.ok) {
      logger.error(`Failed to fetch blog data: ${response.status}`);
      return createErrorResponse('Failed to fetch blog post', response.status, cacheControl);
    }

    const rawData: unknown = await response.json();
    const allPosts = Array.isArray(rawData) ? (rawData as NotionPost[]) : [];

    // Find the post with matching slug
    const post = allPosts.find((p: NotionPost) => {
      if (!p.properties?.Title?.title) return false;

      const title = extractPlainText(p.properties.Title.title);
      const postSlug = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');

      return postSlug === slug;
    });

    if (!post) {
      logger.warn({ slug }, 'Post not found');
      return createErrorResponse('Post not found', 404, cacheControl);
    }

    try {
      const id = post.id || '';
      const title = post.properties?.Title?.title
        ? extractPlainText(post.properties.Title.title)
        : 'Untitled Post';

      const r2ImageUrl =
        post.properties?.R2ImageUrl?.url ||
        post.properties?.Image?.url ||
        EXTERNAL_URLS.PLACEHOLDERS.BLOG_IMAGE;

      let date = 'Unknown date';
      if (post.properties?.['Date Created']?.date?.start) {
        const postDate = new Date(post.properties['Date Created'].date.start);
        date = postDate.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        });
      }

      const minRead = post.properties?.['Mins Read']?.number
        ? `${post.properties['Mins Read'].number} Min Read`
        : '5 Min Read';

      const summary = post.properties?.Summary?.rich_text
        ? extractPlainText(post.properties.Summary.rich_text)
        : post.properties?.Excerpt?.rich_text
          ? extractPlainText(post.properties.Excerpt.rich_text)
          : 'No summary available';

      const category = post.properties?.Category?.select?.name || 'Uncategorized';
      const tags = post.properties?.Tags?.multi_select?.map(tag => tag.name) || [category];
      const originalPageUrl =
        post.properties?.['Original Page']?.url || EXTERNAL_URLS.NOTION.PAGE(id);

      logger.info({ slug }, 'Post found, returning data');

      const processedPost: BlogPostApiResponse['post'] = {
        id,
        title,
        summary,
        excerpt: summary,
        slug,
        category,
        tags,
        coverImage: r2ImageUrl,
        dateCreated: post.created_time || new Date().toISOString(),
        published: post.properties?.Published?.checkbox ?? true,
        featured: post.properties?.Featured?.checkbox ?? false,
        notionUrl: post.url || '',
        readingTime: minRead,
        r2ImageUrl,
        date,
        minRead,
        originalPageUrl,
        noteCreated: post.created_time || new Date().toISOString(),
        noteEdited: post.last_edited_time || new Date().toISOString(),
      };

      return createSuccessResponse(processedPost, cacheControl);
    } catch (processError) {
      logger.error({ error: processError, slug }, 'Error processing post data');
      return createErrorResponse('Error processing blog post', 500, cacheControl);
    }
  } catch (error) {
    logger.error({ error }, 'Failed to fetch blog post');
    return createErrorResponse('Failed to fetch blog post', 500, CACHE_SETTINGS.BLOG.CONTROL);
  }
}

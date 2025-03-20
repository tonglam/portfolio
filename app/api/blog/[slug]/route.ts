import { CACHE_DEFAULTS, CACHE_SETTINGS, EXTERNAL_URLS } from '@/config';
import { ApiErrors, handleRouteError } from '@/lib/core/error-handler.util';
import { extractPlainText, generateSlug } from '@/lib/utils/string.util';
import type { NotionPost, ProcessedBlogPost } from '@/types/api/blog.type';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

/**
 * GET endpoint to retrieve a single blog post by slug
 * Direct fetching from R2 storage with fallback mechanism
 */
// Route segment config for Next.js caching
export const revalidate = CACHE_DEFAULTS.revalidate; // Revalidate based on cache defaults

export async function get(
  _request: NextRequest,
  { params }: { params: { slug: string } }
): Promise<NextResponse> {
  const { slug } = params;
  const cacheControl = CACHE_SETTINGS.BLOG.CONTROL;

  // Fetch data from R2 storage
  const response = await fetch(EXTERNAL_URLS.BLOG_DATA_SOURCE, {
    next: { revalidate: CACHE_SETTINGS.BLOG.REVALIDATE },
  });

  if (!response.ok) {
    return handleRouteError(ApiErrors.INTERNAL('Failed to fetch blog post'), 'Blog Post API');
  }

  const rawData: unknown = await response.json();
  const allPosts = Array.isArray(rawData) ? (rawData as NotionPost[]) : [];

  // Find the post with matching slug
  const post = allPosts.find((p: NotionPost) => {
    if (!p.properties?.Title?.title) return false;
    const title = extractPlainText(p.properties.Title.title);
    return generateSlug(title) === slug;
  });

  if (!post) {
    return handleRouteError(ApiErrors.NOT_FOUND('Post not found'), 'Blog Post API');
  }

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
  const originalPageUrl = post.properties?.['Original Page']?.url || EXTERNAL_URLS.NOTION.PAGE(id);

  const processedPost: ProcessedBlogPost = {
    id,
    slug,
    title,
    summary,
    date,
    minRead,
    r2ImageUrl,
    originalPageUrl,
    category,
    tags,
  };

  return NextResponse.json(
    {
      success: true,
      data: {
        post: processedPost,
      },
    },
    {
      headers: {
        'Cache-Control': cacheControl,
      },
    }
  );
}

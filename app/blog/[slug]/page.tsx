import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CACHE_SETTINGS } from '@/config';
import type { BlogPostResponse, PageBlogPost } from '@/types';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import { ExternalBlogRedirect } from './ExternalBlogRedirect';

// Shared data fetching function
async function getBlogPost(slug: string): Promise<PageBlogPost> {
  try {
    const response = await fetch(`/api/blog/${slug}`, {
      next: { revalidate: CACHE_SETTINGS.BLOG.REVALIDATE },
    });

    if (!response.ok) {
      return notFound();
    }

    const data = (await response.json()) as BlogPostResponse;

    if (!data.success || !data.data?.post) {
      return notFound();
    }

    const post = data.data.post;

    if (!post.r2ImageUrl || !post.content) {
      return notFound();
    }

    return post;
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return notFound();
  }
}

// Generate metadata for the blog post
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  try {
    const post = await getBlogPost(params.slug);

    return {
      title: post.title,
      description: post.summary,
      openGraph: {
        title: post.title,
        description: post.summary,
        images: [{ url: post.r2ImageUrl }],
      },
      twitter: {
        card: 'summary_large_image',
        title: post.title,
        description: post.summary,
        images: [{ url: post.r2ImageUrl }],
      },
    };
  } catch {
    return {};
  }
}

export default async function BlogPost({
  params,
}: {
  params: { slug: string };
}): Promise<JSX.Element> {
  const post = await getBlogPost(params.slug);

  // If we have an originalPageUrl, show the external blog redirect
  if (post.originalPageUrl) {
    return (
      <div className="container mx-auto px-4 py-16">
        <ExternalBlogRedirect
          post={{
            ...post,
            id: params.slug,
            slug: params.slug,
            originalPageUrl: post.originalPageUrl,
          }}
        />
      </div>
    );
  }

  // Render the blog post content
  return (
    <div className="container mx-auto px-4 py-16">
      <div>
        <Link href="/#blogs" className="inline-block">
          <Button variant="outline" className="mb-6">
            &larr; Back to Blogs
          </Button>
        </Link>

        <Card className="overflow-hidden bg-white dark:bg-gray-800 shadow-lg">
          <div className="relative h-64 md:h-96 w-full">
            <Image src={post.r2ImageUrl} alt={post.title} fill className="object-cover" priority />
          </div>

          <div className="p-6 md:p-8">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-primary">{post.date}</span>
              <span className="text-sm text-gray-600 dark:text-gray-400">{post.minRead}</span>
            </div>

            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
              {post.title}
            </h1>

            <div className="inline-block mb-6 px-3 py-1 bg-primary/10 rounded-full">
              <span className="text-primary font-medium text-sm">{post.category}</span>
            </div>

            <div className="prose dark:prose-invert max-w-none prose-img:rounded-lg prose-headings:text-gray-900 dark:prose-headings:text-white prose-a:text-blue-600 dark:prose-a:text-blue-400">
              <p className="text-gray-600 dark:text-gray-300">{post.summary}</p>
              <ReactMarkdown>{post.content}</ReactMarkdown>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

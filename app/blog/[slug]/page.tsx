'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { logger } from '@/lib/logger';
import type { ProcessedBlogPost } from '@/types/api/blog';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';

// Local interface extending the API BlogPost type
interface BlogPost extends Partial<ProcessedBlogPost> {
  title: string;
  date: string;
  minRead: string;
  r2ImageUrl: string;
  category: string;
  summary: string;
  content?: string;
}

// API response interface
interface BlogPostResponse {
  success: boolean;
  data: {
    post: BlogPost;
  };
}

// Legacy format interface (for backward compatibility)
interface LegacyBlogPostResponse {
  post: BlogPost;
}

export default function BlogPost(): React.ReactNode {
  const { slug } = useParams();
  const router = useRouter();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchBlogPost(): Promise<void> {
      try {
        setIsLoading(true);
        // Fetch the specific blog post by slug
        const slugString = typeof slug === 'string' ? slug : String(slug);
        const response = await fetch(`/api/blog/${slugString}`);

        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('Blog post not found');
          }
          throw new Error('Failed to fetch blog post');
        }

        const rawResult: unknown = await response.json();

        // Create type guard functions
        const isNewApiResponse = (data: unknown): data is BlogPostResponse =>
          typeof data === 'object' &&
          data !== null &&
          'success' in data &&
          data.success === true &&
          'data' in data &&
          typeof data.data === 'object' &&
          data.data !== null &&
          'post' in data.data;

        const isLegacyResponse = (data: unknown): data is LegacyBlogPostResponse =>
          typeof data === 'object' &&
          data !== null &&
          'post' in data &&
          typeof data.post === 'object';

        // Check for new API response format (with success and data properties)
        if (isNewApiResponse(rawResult)) {
          setPost(rawResult.data.post);
        }
        // Legacy format fallback
        else if (isLegacyResponse(rawResult)) {
          setPost(rawResult.post);
        } else {
          throw new Error('Invalid response format');
        }
      } catch (error: unknown) {
        logger.error({ error }, 'Error fetching blog post');
        setError(error instanceof Error ? error.message : 'Unknown error occurred');
      } finally {
        setIsLoading(false);
      }
    }

    if (slug) {
      void fetchBlogPost();
    }
  }, [slug]);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col justify-center items-center h-64">
          <p className="text-red-500 mb-4">{error || 'Blog post not found'}</p>
          <Button onClick={() => router.push('/#blogs')}>Return to Blogs</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Button variant="outline" className="mb-6" onClick={() => router.push('/#blogs')}>
          &larr; Back to Blogs
        </Button>

        <Card className="overflow-hidden bg-white dark:bg-gray-800 shadow-lg">
          <div className="relative h-64 md:h-96 w-full">
            <Image src={post.r2ImageUrl} alt={post.title} fill className="object-cover" />
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
              {post.content && <ReactMarkdown>{post.content}</ReactMarkdown>}
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}

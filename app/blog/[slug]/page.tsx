'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { logger } from '@/lib/core/logger.util';
import type { BlogPostResponse, PageBlogPost } from '@/types/api/blog.type';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';

export default function BlogPost(): React.ReactNode {
  const { slug } = useParams();
  const router = useRouter();
  const [post, setPost] = useState<PageBlogPost | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async (): Promise<void> => {
      try {
        const slugString = Array.isArray(slug) ? slug[0] : String(slug);
        const response = await fetch(`/api/blog/${slugString}`);
        const data = (await response.json()) as BlogPostResponse;

        if (!data.success || !data.data?.post) {
          throw new Error('Post not found');
        }

        const post = data.data.post;

        // Transform the post to ensure all required fields are present
        const transformedPost: PageBlogPost = {
          ...post,
          title: post.title || '',
          date: post.date || '',
          minRead: post.minRead || '5 min read',
          r2ImageUrl: post.r2ImageUrl || '',
          category: post.category || 'Uncategorized',
          summary: post.summary || '',
          content: typeof post.content === 'string' ? post.content : '',
          originalPageUrl: post.originalPageUrl || '',
        };

        setPost(transformedPost);
        setIsLoading(false);
      } catch (error) {
        logger.error('Error fetching blog post:', error as string);
        setError('Failed to load blog post');
        setIsLoading(false);
      }
    };

    if (slug) {
      void fetchPost();
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

  // If we have an originalPageUrl but the redirect didn't happen in useEffect,
  // provide a button to visit the original page
  if (post.originalPageUrl) {
    return (
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center justify-center text-center"
        >
          <h1 className="text-2xl md:text-3xl font-bold mb-6">{post.title}</h1>
          <p className="mb-8 text-gray-600 dark:text-gray-300">{post.summary}</p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button onClick={() => router.push('/#blogs')} variant="outline">
              Back to Blogs
            </Button>
            <Button
              onClick={() => window.open(post.originalPageUrl, '_blank')}
              className="bg-primary hover:bg-primary/90"
            >
              Visit Original Page
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  // Fallback to displaying the post content if no originalPageUrl is available
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

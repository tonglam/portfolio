'use client';

import { Button } from '@/components/ui/button';
import type { BlogPost } from '@/types/api/blog.type';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

interface ExternalBlogRedirectProps {
  post: BlogPost;
}

export function ExternalBlogRedirect({ post }: ExternalBlogRedirectProps): JSX.Element {
  const router = useRouter();

  return (
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
          onClick={() => post.originalPageUrl && window.open(post.originalPageUrl, '_blank')}
          className="bg-primary hover:bg-primary/90"
          disabled={!post.originalPageUrl}
        >
          Visit Original Page
        </Button>
      </div>
    </motion.div>
  );
}

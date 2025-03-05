"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";

export default function BlogPost() {
  const { slug } = useParams();
  const router = useRouter();
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchBlogPost() {
      try {
        setIsLoading(true);
        // Fetch the specific blog post by slug
        const response = await fetch(`/api/blog/${slug}`);

        if (!response.ok) {
          if (response.status === 404) {
            throw new Error("Blog post not found");
          }
          throw new Error("Failed to fetch blog post");
        }

        const data = await response.json();
        setPost(data);
      } catch (error) {
        console.error(`Error fetching blog post with slug ${slug}:`, error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    }

    if (slug) {
      fetchBlogPost();
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
          <p className="text-red-500 mb-4">{error || "Blog post not found"}</p>
          <Button onClick={() => router.push("/#blogs")}>
            Return to Blogs
          </Button>
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
        <Button
          variant="outline"
          className="mb-6"
          onClick={() => router.push("/#blogs")}
        >
          &larr; Back to Blogs
        </Button>

        <Card className="overflow-hidden bg-white dark:bg-gray-800 shadow-lg">
          <div className="relative h-64 md:h-96 w-full">
            <Image
              src={post.r2ImageUrl}
              alt={post.title}
              fill
              className="object-cover"
            />
          </div>

          <div className="p-6 md:p-8">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-primary">
                {post.date}
              </span>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {post.minRead}
              </span>
            </div>

            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
              {post.title}
            </h1>

            <div className="inline-block mb-6 px-3 py-1 bg-primary/10 rounded-full">
              <span className="text-primary font-medium text-sm">
                {post.category}
              </span>
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

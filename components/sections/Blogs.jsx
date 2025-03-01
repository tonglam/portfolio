"use client";

import { CheckIcon, CommentIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { blogsData } from "@/data/blogs";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

export default function Blogs() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [visibleBlogs, setVisibleBlogs] = useState(3);
  const [isLoading, setIsLoading] = useState(false);

  // Extract unique categories from blogs
  const categories = [
    "All",
    ...Array.from(new Set(blogsData.map((blog) => blog.category))),
  ];

  // Filter blogs based on active category
  const filteredBlogs =
    activeCategory === "All"
      ? blogsData
      : blogsData.filter((blog) => blog.category === activeCategory);

  // Handle load more
  const handleLoadMore = () => {
    setIsLoading(true);
    // Simulate loading delay
    setTimeout(() => {
      setVisibleBlogs((prev) => Math.min(prev + 3, filteredBlogs.length));
      setIsLoading(false);
    }, 600);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  };

  const buttonVariants = {
    hover: {
      scale: 1.05,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
      },
    },
    tap: {
      scale: 0.95,
    },
  };

  return (
    <section
      id="blogs"
      className="py-16 md:py-20 bg-gray-50 dark:bg-transparent"
    >
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12 bg-clip-text text-transparent bg-gradient-to-r from-[#2563EB] to-[#4F46E5] dark:from-[#38BDF8] dark:to-[#818CF8]"
        >
          Blogs
        </motion.h2>

        {/* Category Filter */}
        <motion.div
          className="flex flex-wrap gap-2 mb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          {categories.map((category, index) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * index, duration: 0.3 }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant={activeCategory === category ? "default" : "outline"}
                  className={`rounded-full text-xs sm:text-sm ${
                    activeCategory === category
                      ? "bg-gradient-to-r from-[#3B82F6] to-[#6366F1] dark:from-[#F472B6] dark:to-[#EC4899] text-white"
                      : "border-[#3B82F6] dark:border-[#F472B6] text-gray-700 dark:text-gray-300"
                  }`}
                  onClick={() => {
                    setActiveCategory(category);
                    setVisibleBlogs(3);
                  }}
                >
                  {category}
                </Button>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          >
            {filteredBlogs.slice(0, visibleBlogs).map((blog, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="h-full"
              >
                <Card className="bg-white dark:bg-gradient-to-br dark:from-[#1E293B] dark:to-[#2D3748] border-0 overflow-hidden shadow-md h-full flex flex-col hover:shadow-xl transition-all duration-300">
                  <div className="relative h-40 sm:h-48 overflow-hidden">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                      className="h-full w-full relative"
                    >
                      <Image
                        src={blog.image}
                        alt={blog.title}
                        fill
                        className="object-cover"
                      />
                    </motion.div>
                  </div>
                  <div className="p-4 sm:p-6 flex-grow flex flex-col">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs sm:text-sm bg-clip-text text-transparent bg-gradient-to-r from-[#2563EB] to-[#4F46E5] dark:from-[#38BDF8] dark:to-[#818CF8]">
                        {blog.date}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="flex items-center text-green-500 text-xs">
                          <CheckIcon className="w-3 h-3 mr-1" />
                          {blog.likes}
                        </span>
                        <span className="flex items-center text-blue-500 text-xs">
                          <CommentIcon className="w-3 h-3 mr-1" />
                          {blog.comments}
                        </span>
                      </div>
                    </div>
                    <h3 className="text-base sm:text-lg font-bold mb-2 text-gray-900 dark:text-white line-clamp-2">
                      {blog.title}
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400 mb-3 text-xs">
                      {blog.readTime}
                    </p>
                    <p className="text-gray-700 dark:text-gray-300 mb-4 flex-grow text-sm line-clamp-3">
                      {blog.excerpt}
                    </p>
                    <motion.div
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                      className="mt-auto"
                    >
                      <Button
                        variant="outline"
                        className="w-full border-[#2563EB] dark:border-[#38BDF8] bg-gradient-to-r from-transparent to-transparent hover:from-[#2563EB]/10 hover:to-[#4F46E5]/10 dark:hover:from-[#38BDF8]/10 dark:hover:to-[#818CF8]/10 text-transparent bg-clip-text bg-gradient-to-r from-[#2563EB] to-[#4F46E5] dark:from-[#38BDF8] dark:to-[#818CF8] text-sm"
                      >
                        Read More
                      </Button>
                    </motion.div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Load More Button */}
        {visibleBlogs < filteredBlogs.length && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.3 }}
            className="flex justify-center mt-8"
          >
            <motion.div
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <Button
                onClick={handleLoadMore}
                disabled={isLoading}
                className="bg-gradient-to-r from-[#3B82F6] to-[#6366F1] dark:from-[#F472B6] dark:to-[#EC4899] hover:from-[#6366F1] hover:to-[#3B82F6] dark:hover:from-[#EC4899] dark:hover:to-[#F472B6] text-white"
              >
                {isLoading ? "Loading..." : "Load More"}
              </Button>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
}

'use client';

import { aboutData } from '@/data/about';
import { motion } from 'framer-motion';

export default function About(): JSX.Element {
  return (
    <section
      id="about"
      className="py-16 md:py-20 bg-white dark:bg-gradient-to-b dark:from-[#1E293B] dark:to-[#0F172A]"
    >
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12 bg-clip-text text-transparent bg-gradient-to-r from-[#2563EB] to-[#4F46E5] dark:from-[#38BDF8] dark:to-[#818CF8]"
        >
          {aboutData.title}
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-3xl mx-auto"
        >
          <p
            className="text-gray-700 dark:text-gray-300 leading-relaxed text-base md:text-lg text-justify md:text-left tracking-wide px-1 [&>a]:text-blue-600 dark:[&>a]:text-blue-400 [&>a]:underline [&>a]:decoration-dotted [&>a]:underline-offset-2 [&>a]:transition-all [&>a]:duration-300 [&>a:hover]:decoration-solid [&>a:hover]:text-blue-700 dark:[&>a:hover]:text-blue-300"
            dangerouslySetInnerHTML={{ __html: aboutData.content }}
          />
        </motion.div>
      </div>
    </section>
  );
}

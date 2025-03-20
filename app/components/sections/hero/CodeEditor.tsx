'use client';

import { developerProfileCode } from '@/data/codeSnippets.data';
import useTypewriter from '@/hooks/useTypewriter';
import { highlightCodeSyntax } from '@/lib/utils/syntax/codeHighlighter.util';
import { motion } from 'framer-motion';

export default function CodeEditor(): JSX.Element {
  const { displayedCode, isTyping, currentLine } = useTypewriter(developerProfileCode);

  return (
    <motion.div
      className="relative order-1 md:order-2 w-full mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-white dark:bg-gradient-to-br dark:from-[#282a36] dark:to-[#1e1f29] rounded-lg shadow-xl dark:shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-800 w-full md:w-[110%] md:-ml-5">
        <div className="flex items-center gap-2 p-2 md:p-4 bg-gray-100 dark:bg-gradient-to-r dark:from-[#1e1f29] dark:to-[#282a36] border-b border-gray-200 dark:border-gray-800 overflow-hidden">
          <div className="flex-shrink-0 w-2.5 h-2.5 md:w-4 md:h-4 rounded-full bg-red-500"></div>
          <div className="flex-shrink-0 w-2.5 h-2.5 md:w-4 md:h-4 rounded-full bg-yellow-500"></div>
          <div className="flex-shrink-0 w-2.5 h-2.5 md:w-4 md:h-4 rounded-full bg-green-500"></div>
          <div className="ml-1 text-xs md:text-base text-gray-500 dark:text-gray-400 truncate">
            developer.js
          </div>
        </div>
        <div className="p-3 sm:p-4 md:p-8 font-mono text-xs md:text-base overflow-x-auto">
          <pre className="text-gray-800 dark:text-white w-full">
            {displayedCode.map((line, index) => (
              <div
                key={index}
                className="line text-xs md:text-base leading-tight md:leading-relaxed"
              >
                <span
                  dangerouslySetInnerHTML={{
                    __html: highlightCodeSyntax(line),
                  }}
                />
                {index === currentLine && isTyping && (
                  <motion.span
                    className="inline-block w-1.5 h-3.5 md:w-2.5 md:h-5 bg-gray-800 dark:bg-white ml-0.5"
                    animate={{ opacity: [1, 0] }}
                    transition={{ repeat: Infinity, duration: 0.8 }}
                  />
                )}
              </div>
            ))}
          </pre>
        </div>
      </div>

      <motion.div
        className="absolute -bottom-3 -right-3 md:-bottom-5 md:-right-5 bg-gradient-to-r from-[#3B82F6] to-[#6366F1] dark:from-[#F472B6] dark:to-[#EC4899] text-white py-1.5 px-3 md:py-3 md:px-5 rounded-md shadow-lg"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2, duration: 0.3 }}
      >
        <div className="text-xs md:text-sm font-bold">Result:</div>
        <div className="text-sm md:text-xl">hireable() → {isTyping ? '...' : 'true'} ✓</div>
      </motion.div>
    </motion.div>
  );
}

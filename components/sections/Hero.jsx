"use client";

import { GithubIcon, LinkedinIcon, TwitterIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

export default function Hero() {
  const [isTyping, setIsTyping] = useState(true);
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);

  const codeLines = useMemo(
    () => [
      "const coder = {",
      "  name: 'Tong',",
      "  skills: ['React', 'NextJS', 'Express',",
      "          'MySQL', 'MongoDB', 'Docker', 'AWS'],",
      "  hardWorker: true,",
      "  quickLearner: true,",
      "  problemSolver: true,",
      "  hireable: function() {",
      "    return (",
      "      this.hardWorker &&",
      "      this.problemSolver",
      "    );",
      "  }",
      "};",
    ],
    []
  );

  const [displayedCode, setDisplayedCode] = useState(
    Array(codeLines.length).fill("")
  );

  useEffect(() => {
    if (!isTyping) return;

    const typingInterval = setInterval(() => {
      if (currentLine < codeLines.length) {
        if (currentChar < codeLines[currentLine].length) {
          setDisplayedCode((prev) => {
            const newCode = [...prev];
            newCode[currentLine] = codeLines[currentLine].substring(
              0,
              currentChar + 1
            );
            return newCode;
          });
          setCurrentChar((prev) => prev + 1);
        } else {
          setCurrentLine((prev) => prev + 1);
          setCurrentChar(0);
        }
      } else {
        setIsTyping(false);
        clearInterval(typingInterval);
      }
    }, 30);

    return () => clearInterval(typingInterval);
  }, [isTyping, currentLine, currentChar, codeLines]);

  const formatCodeLine = (line) => {
    // Keywords
    line = line.replace(
      /\b(const|function|return|this)\b/g,
      '<span class="text-[#ff79c6] dark:text-[#ff79c6]">$1</span>'
    );

    // Values
    line = line.replace(
      /\b(true|false)\b/g,
      '<span class="text-[#bd93f9] dark:text-[#bd93f9]">$1</span>'
    );

    // Strings
    line = line.replace(
      /'([^']*)'/g,
      "<span class=\"text-[#f1fa8c] dark:text-[#f1fa8c]\">'$1'</span>"
    );

    // Operators
    line = line.replace(
      /(&amp;&amp;|>=)/g,
      '<span class="text-[#ff79c6] dark:text-[#ff79c6]">$1</span>'
    );

    // Properties
    line = line.replace(
      /\b(name|skills|hardWorker|quickLearner|problemSolver|hireable|length)\b(?!['"])/g,
      '<span class="text-[#8be9fd] dark:text-[#8be9fd]">$1</span>'
    );

    return line;
  };

  const handleDownloadResume = () => {
    // Track download event if analytics are implemented
    console.log("Resume download initiated");
  };

  return (
    <section className="min-h-screen flex items-center pt-16 pb-8">
      <div className="container mx-auto px-4 grid md:grid-cols-2 gap-8 md:gap-12 items-center">
        <div className="space-y-6 md:space-y-8 order-2 md:order-1">
          <div className="space-y-4">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">
              Hello,
              <br />
              This is{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#3B82F6] to-[#6366F1] dark:from-[#F472B6] dark:to-[#EC4899]">
                QITONG LAN
              </span>
              ,
              <br />
              I&apos;m a Professional{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#2563EB] to-[#4F46E5] dark:from-[#38BDF8] dark:to-[#818CF8]">
                Full-stack Engineer.
              </span>
            </h1>
          </div>

          {/* AWS Certification Badges */}
          <div className="flex flex-wrap gap-4 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="flex items-center bg-white dark:bg-[#1E293B] rounded-full pl-1 pr-3 py-1 shadow-md"
            >
              <div className="w-8 h-8 mr-2">
                <Image
                  src="https://images.credly.com/size/340x340/images/00634f82-b07f-4bbd-a6bb-53de397fc3a6/image.png"
                  alt="AWS Certified Cloud Practitioner"
                  width={32}
                  height={32}
                  className="rounded-full"
                />
              </div>
              <span className="text-xs font-medium">AWS CLF</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.3 }}
              className="flex items-center bg-white dark:bg-[#1E293B] rounded-full pl-1 pr-3 py-1 shadow-md"
            >
              <div className="w-8 h-8 mr-2">
                <Image
                  src="https://images.credly.com/size/340x340/images/0e284c3f-5164-4b21-8660-0d84737941bc/image.png"
                  alt="AWS Solutions Architect"
                  width={32}
                  height={32}
                  className="rounded-full"
                />
              </div>
              <span className="text-xs font-medium">AWS SAS</span>
            </motion.div>
          </div>

          <div className="flex space-x-4">
            <Link href="https://github.com/tonglam" target="_blank">
              <Button
                variant="outline"
                size="icon"
                className="rounded-full w-10 h-10 sm:w-12 sm:h-12 border-[#3B82F6] dark:border-[#F472B6] hover:bg-gradient-to-r hover:from-[#3B82F6]/20 hover:to-[#6366F1]/20 dark:hover:from-[#F472B6]/20 dark:hover:to-[#EC4899]/20 flex items-center justify-center"
              >
                <GithubIcon
                  className="text-[#3B82F6] dark:text-[#F472B6]"
                  size={20}
                />
              </Button>
            </Link>

            <Link href="https://www.linkedin.com/in/qitonglan/" target="_blank">
              <Button
                variant="outline"
                size="icon"
                className="rounded-full w-10 h-10 sm:w-12 sm:h-12 border-[#3B82F6] dark:border-[#F472B6] hover:bg-gradient-to-r hover:from-[#3B82F6]/20 hover:to-[#6366F1]/20 dark:hover:from-[#F472B6]/20 dark:hover:to-[#EC4899]/20 flex items-center justify-center"
              >
                <LinkedinIcon
                  className="text-[#3B82F6] dark:text-[#F472B6]"
                  size={20}
                />
              </Button>
            </Link>

            <Link href="https://x.com/tong_lam_14" target="_blank">
              <Button
                variant="outline"
                size="icon"
                className="rounded-full w-10 h-10 sm:w-12 sm:h-12 border-[#3B82F6] dark:border-[#F472B6] hover:bg-gradient-to-r hover:from-[#3B82F6]/20 hover:to-[#6366F1]/20 dark:hover:from-[#F472B6]/20 dark:hover:to-[#EC4899]/20 flex items-center justify-center"
              >
                <TwitterIcon
                  className="text-[#3B82F6] dark:text-[#F472B6]"
                  size={20}
                />
              </Button>
            </Link>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <Link href="#contact" className="w-full sm:w-auto">
              <Button className="w-full bg-white dark:bg-[#1E293B] hover:bg-gray-100 dark:hover:bg-gradient-to-r dark:hover:from-[#1E293B] dark:hover:to-[#334155] text-gray-900 dark:text-white border border-[#2563EB] dark:border-[#38BDF8] text-sm h-10">
                CONTACT ME 👋
              </Button>
            </Link>
            <a
              href="/resume.pdf"
              download="Qitong_Lan_Resume.pdf"
              onClick={handleDownloadResume}
            >
              <Button className="w-full sm:w-auto bg-gradient-to-r from-[#3B82F6] to-[#6366F1] dark:from-[#F472B6] dark:to-[#EC4899] hover:from-[#6366F1] hover:to-[#3B82F6] dark:hover:from-[#EC4899] dark:hover:to-[#F472B6] text-white text-sm h-10">
                GET RESUME ⬇
              </Button>
            </a>
          </div>
        </div>

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
                      dangerouslySetInnerHTML={{ __html: formatCodeLine(line) }}
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
            <div className="text-sm md:text-xl">
              hireable() → {isTyping ? "..." : "true"} ✓
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

'use client';

import { GithubIcon, LinkedinIcon, XIcon } from '@/components/icons';
import { Button } from '@/components/ui/button';
import certificates from '@/data/certificates';
import { developerProfileCode } from '@/data/codeSnippets';
import socialProfiles from '@/data/socialLinks';
import useTypewriter from '@/hooks/useTypewriter';
import highlightCodeSyntax from '@/lib/codeHighlighter';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

// Define icon types for TypeScript
type SocialIconType = 'GithubIcon' | 'LinkedinIcon' | 'XIcon';
type IconComponent = typeof GithubIcon;

// Map of icon components for easy reference
const socialIcons: Record<SocialIconType, IconComponent> = {
  GithubIcon,
  LinkedinIcon,
  XIcon,
};

/**
 * Hero section component with animated code typing effect
 */
export default function Hero(): JSX.Element {
  // Use the typewriter effect with the developer profile code
  const { displayedCode, isTyping, currentLine } = useTypewriter(developerProfileCode);

  /**
   * Handles the resume download event
   * In a production environment, this would track analytics
   */
  const handleDownloadResume = (): void => {
    // Track download event if analytics are implemented
    // Analytics tracking would go here
  };

  return (
    <section className="min-h-screen flex items-center pt-16 pb-8">
      <div className="container mx-auto px-4 grid md:grid-cols-2 gap-8 md:gap-12 items-center">
        <div className="space-y-6 md:space-y-8 order-2 md:order-1">
          <div className="space-y-4">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">
              Hello,
              <br />
              This is{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#3B82F6] to-[#6366F1] dark:from-[#F472B6] dark:to-[#EC4899]">
                QITONG LAN
              </span>
              ,
              <br />
              I&apos;m a Professional{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#2563EB] to-[#4F46E5] dark:from-[#38BDF8] dark:to-[#818CF8]">
                Full-stack Engineer.
              </span>
            </h1>
          </div>

          {/* AWS Certification Badges */}
          <div className="flex flex-wrap gap-4 items-center">
            {certificates.map((certificate, index) => (
              <motion.div
                key={certificate.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.2 + index * 0.1 }}
                className="flex items-center bg-white dark:bg-[#1E293B] rounded-full pl-1 pr-3 py-1 shadow-md"
              >
                <a
                  href={certificate.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={`Verify ${certificate.name} Certification`}
                  className="flex items-center"
                >
                  <div className="w-8 h-8 mr-2">
                    <Image
                      src={certificate.imageUrl}
                      alt={certificate.name}
                      width={32}
                      height={32}
                      className="rounded-full"
                    />
                  </div>
                  <span className="text-xs font-medium">{certificate.shortName}</span>
                </a>
              </motion.div>
            ))}
          </div>

          <div className="flex space-x-4">
            {socialProfiles.map(profile => {
              // Type-safe icon lookup
              const iconName = profile.icon as SocialIconType;
              const IconComponent = socialIcons[iconName];

              if (!IconComponent) return null;

              return (
                <Link
                  key={profile.id}
                  href={profile.url}
                  target="_blank"
                  aria-label={profile.ariaLabel}
                >
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full w-10 h-10 sm:w-12 sm:h-12 border-[#3B82F6] dark:border-[#F472B6] hover:bg-gradient-to-r hover:from-[#3B82F6]/20 hover:to-[#6366F1]/20 dark:hover:from-[#F472B6]/20 dark:hover:to-[#EC4899]/20 flex items-center justify-center"
                  >
                    <IconComponent className="text-[#3B82F6] dark:text-[#F472B6]" size={20} />
                  </Button>
                </Link>
              );
            })}
          </div>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <Link href="#contact" className="w-full sm:w-auto">
              <Button className="w-full bg-white dark:bg-[#1E293B] hover:bg-gray-100 dark:hover:bg-gradient-to-r dark:hover:from-[#1E293B] dark:hover:to-[#334155] text-gray-900 dark:text-white border border-[#2563EB] dark:border-[#38BDF8] text-sm h-10">
                CONTACT ME 👋
              </Button>
            </Link>
            <a href="/resume.pdf" download="Qitong_Lan_Resume.pdf" onClick={handleDownloadResume}>
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
      </div>
    </section>
  );
}

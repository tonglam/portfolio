import ActionButtons from './ActionButtons';
import CertificateBadges from './CertificateBadges';
import CodeEditor from './CodeEditor';
import SocialButtons from './SocialButtons';

/**
 * Hero section component
 * This is now a server component that composes client components for interactive features
 */
export default function Hero(): JSX.Element {
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

          {/* AWS Certification Badges - Client Component */}
          <CertificateBadges />

          {/* Social Media Buttons - Client Component */}
          <SocialButtons />

          {/* Action Buttons - Client Component */}
          <ActionButtons />
        </div>

        {/* Code Editor - Client Component */}
        <CodeEditor />
      </div>
    </section>
  );
}

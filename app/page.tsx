import BackToTopButton from '@/components/BackToTopButton';
import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';
import About from '@/components/sections/about/page';
import Blogs from '@/components/sections/blogs/page';
import Contact from '@/components/sections/contact/page';
import Education from '@/components/sections/education/page';
import Experience from '@/components/sections/experience/page';
import Hero from '@/components/sections/hero/page';
import Projects from '@/components/sections/projects/page';
import Skills from '@/components/sections/skills/page';
import { ErrorBoundary } from '@/components/ui/error-boundary';
import { Suspense } from 'react';

export default function Home(): React.ReactNode {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gradient-to-b dark:from-[#0F172A] dark:to-[#1E293B] text-gray-900 dark:text-white">
      {/* Navigation */}
      <ErrorBoundary>
        <Navbar />
      </ErrorBoundary>

      {/* Hero Section */}
      <ErrorBoundary>
        <Suspense
          fallback={<div className="h-screen flex items-center justify-center">Loading...</div>}
        >
          <Hero />
        </Suspense>
      </ErrorBoundary>

      {/* About Section */}
      <ErrorBoundary>
        <Suspense
          fallback={<div className="h-96 flex items-center justify-center">Loading...</div>}
        >
          <About />
        </Suspense>
      </ErrorBoundary>

      {/* Experience Section */}
      <ErrorBoundary>
        <Suspense
          fallback={<div className="h-96 flex items-center justify-center">Loading...</div>}
        >
          <Experience />
        </Suspense>
      </ErrorBoundary>

      {/* Education Section */}
      <ErrorBoundary>
        <Suspense
          fallback={<div className="h-96 flex items-center justify-center">Loading...</div>}
        >
          <Education />
        </Suspense>
      </ErrorBoundary>

      {/* Skills Section */}
      <ErrorBoundary>
        <Suspense
          fallback={<div className="h-96 flex items-center justify-center">Loading...</div>}
        >
          <Skills />
        </Suspense>
      </ErrorBoundary>

      {/* Projects Section */}
      <ErrorBoundary>
        <Suspense
          fallback={<div className="h-96 flex items-center justify-center">Loading...</div>}
        >
          <Projects />
        </Suspense>
      </ErrorBoundary>

      {/* Blogs Section */}
      <ErrorBoundary>
        <Suspense
          fallback={<div className="h-96 flex items-center justify-center">Loading...</div>}
        >
          <Blogs />
        </Suspense>
      </ErrorBoundary>

      {/* Contact Section */}
      <ErrorBoundary>
        <Suspense
          fallback={<div className="h-96 flex items-center justify-center">Loading...</div>}
        >
          <Contact />
        </Suspense>
      </ErrorBoundary>

      {/* Footer */}
      <ErrorBoundary>
        <Footer />
      </ErrorBoundary>

      {/* Back to Top Button */}
      <ErrorBoundary>
        <BackToTopButton />
      </ErrorBoundary>
    </div>
  );
}

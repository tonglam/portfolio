import BackToTopButton from '@/components/BackToTopButton';
import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';
import About from '@/components/sections/About';
import Blogs from '@/components/sections/Blogs';
import Contact from '@/components/sections/Contact';
import Education from '@/components/sections/Education';
import Experience from '@/components/sections/Experience';
import Hero from '@/components/sections/Hero';
import Projects from '@/components/sections/Projects';
import Skills from '@/components/sections/Skills';
import type { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Home',
  description:
    'Welcome to my portfolio - Full Stack Engineer specializing in modern web technologies.',
};

export default function Home(): React.ReactNode {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gradient-to-b dark:from-[#0F172A] dark:to-[#1E293B] text-gray-900 dark:text-white">
      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <Suspense
        fallback={<div className="h-screen flex items-center justify-center">Loading...</div>}
      >
        <Hero />
      </Suspense>

      {/* About Section */}
      <Suspense fallback={<div className="h-96 flex items-center justify-center">Loading...</div>}>
        <About />
      </Suspense>

      {/* Experience Section */}
      <Suspense fallback={<div className="h-96 flex items-center justify-center">Loading...</div>}>
        <Experience />
      </Suspense>

      {/* Education Section */}
      <Suspense fallback={<div className="h-96 flex items-center justify-center">Loading...</div>}>
        <Education />
      </Suspense>

      {/* Skills Section */}
      <Suspense fallback={<div className="h-96 flex items-center justify-center">Loading...</div>}>
        <Skills />
      </Suspense>

      {/* Projects Section */}
      <Suspense fallback={<div className="h-96 flex items-center justify-center">Loading...</div>}>
        <Projects />
      </Suspense>

      {/* Blogs Section */}
      <Suspense fallback={<div className="h-96 flex items-center justify-center">Loading...</div>}>
        <Blogs />
      </Suspense>

      {/* Contact Section */}
      <Suspense fallback={<div className="h-96 flex items-center justify-center">Loading...</div>}>
        <Contact />
      </Suspense>

      {/* Footer */}
      <Footer />

      {/* Back to Top Button */}
      <BackToTopButton />
    </div>
  );
}

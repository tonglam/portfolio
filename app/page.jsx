import BackToTopButton from "@/components/BackToTopButton";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import About from "@/components/sections/About";
import Blogs from "@/components/sections/Blogs";
import Contact from "@/components/sections/Contact";
import Education from "@/components/sections/Education";
import Experience from "@/components/sections/Experience";
import Hero from "@/components/sections/Hero";
import Projects from "@/components/sections/Projects";
import Skills from "@/components/sections/Skills";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gradient-to-b dark:from-[#0F172A] dark:to-[#1E293B] text-gray-900 dark:text-white">
      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <Hero />

      {/* About Section */}
      <About />

      {/* Experience Section */}
      <Experience />

      {/* Education Section */}
      <Education />

      {/* Skills Section */}
      <Skills />

      {/* Projects Section */}
      <Projects />

      {/* Blogs Section */}
      <Blogs />

      {/* Contact Section */}
      <Contact />

      {/* Footer */}
      <Footer />

      {/* Back to Top Button */}
      <BackToTopButton />
    </div>
  );
}

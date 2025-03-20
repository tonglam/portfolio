'use client';

import { useEffect, useState } from 'react';

import { CloseIcon, MenuIcon } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { navigationItems as navigationLinks } from '@/data/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Navbar(): JSX.Element {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  const toggleMenu = (): void => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleScroll = (): void => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Update active section based on scroll position
      const sections = navigationLinks.map(link => link.href.substring(1));

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      if (
        isMenuOpen &&
        event.target &&
        event.target instanceof Element &&
        !event.target.closest('.mobile-menu-container')
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'py-2 bg-gradient-to-r from-[#0F172A]/95 to-[#1E293B]/95 shadow-md'
          : 'py-3 sm:py-4 bg-gradient-to-r from-[#0F172A]/90 to-[#1E293B]/90'
      } backdrop-blur-sm border-b border-gray-800`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <Link
            href="/"
            className="bg-clip-text text-transparent bg-gradient-to-r from-[#38BDF8] to-[#818CF8] text-xl sm:text-2xl font-bold"
          >
            TONG
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-3 lg:space-x-6">
            {navigationLinks.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                className={`text-xs lg:text-sm transition-colors duration-200 relative group ${
                  activeSection === link.href.substring(1)
                    ? 'text-[#38BDF8]'
                    : 'text-gray-300 hover:text-[#38BDF8]'
                }`}
              >
                {link.label}
                <span
                  className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-[#38BDF8] transition-all duration-200 ${
                    activeSection === link.href.substring(1) ? 'w-full' : 'group-hover:w-full'
                  }`}
                ></span>
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <Button variant="ghost" size="icon" className="text-white" onClick={toggleMenu}>
              {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="md:hidden mt-4 bg-white dark:bg-[#1E293B] rounded-lg p-4 shadow-lg mobile-menu-container"
          >
            <div className="flex flex-col space-y-2">
              {navigationLinks.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  className={`py-2 px-4 rounded-md transition-colors duration-200 ${
                    activeSection === link.href.substring(1)
                      ? 'bg-gray-100 dark:bg-[#0F172A] text-[#2563EB] dark:text-[#38BDF8]'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#0F172A] hover:text-[#2563EB] dark:hover:text-[#38BDF8]'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
}

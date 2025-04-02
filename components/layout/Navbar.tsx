'use client';

import { navigationItems } from '@/data/navigation.data';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { DesktopNav } from './navigation/DesktopNav';
import { Logo } from './navigation/Logo';
import { MobileMenuButton } from './navigation/MobileMenuButton';
import { MobileNav } from './navigation/MobileNav';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('about');

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

      const sections = navigationItems.map(link => link.href.substring(1));

      if (window.scrollY < 100) {
        setActiveSection('about');
        return;
      }

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
          ? 'py-2 bg-gradient-to-r from-[oklab(35%_-.00637898_-.0362918_/.95)] to-[oklab(35%_-.00637898_-.0362918_/.95)] shadow-md'
          : 'py-3 sm:py-4 bg-gradient-to-r from-[oklab(35%_-.00637898_-.0362918_/.9)] to-[oklab(35%_-.00637898_-.0362918_/.9)]'
      } backdrop-blur-sm border-b border-gray-800`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <Logo />
          <DesktopNav activeSection={activeSection} />
          <MobileMenuButton isOpen={isMenuOpen} onClick={toggleMenu} />
        </div>
        <MobileNav
          isOpen={isMenuOpen}
          activeSection={activeSection}
          onLinkClick={() => setIsMenuOpen(false)}
        />
      </div>
    </motion.nav>
  );
}

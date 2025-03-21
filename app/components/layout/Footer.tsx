'use client';

import { ContactInfo } from './footer/ContactInfo';
import { Copyright } from './footer/Copyright';
import { FooterLogo } from './footer/FooterLogo';
import { QuickLinks } from './footer/QuickLinks';

export default function Footer(): JSX.Element {
  return (
    <footer className="pt-16 pb-8 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gradient-to-r dark:from-[#0F172A] dark:to-[#1E293B]">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Logo and Description */}
          <div className="md:col-span-1">
            <FooterLogo />
          </div>

          {/* Quick Links */}
          <div className="md:col-span-1">
            <QuickLinks />
          </div>

          {/* Contact Info */}
          <div className="md:col-span-1">
            <ContactInfo />
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 dark:border-gray-800 my-6"></div>

        {/* Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <Copyright />
        </div>
      </div>
    </footer>
  );
}

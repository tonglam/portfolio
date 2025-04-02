import BackToTopButton from '@/components/layout/BackToTopButton';
import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';
import { Toaster } from '@/components/ui/toaster';
import { SITE } from '@/config/common.config';
import { Inter } from 'next/font/google';
import React, { Suspense } from 'react';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

const description =
  'Professional portfolio of Qitong Lan, a full-stack engineer evolving for the new era of tech.';

export const metadata = {
  metadataBase: new URL(SITE.URL),
  title: {
    default: 'Qitong Lan - Portfolio',
    template: '%s | Qitong Lan',
  },
  description: description,
  keywords: [
    'Full Stack Developer',
    'Software Engineer',
    'Web Development',
    'React',
    'TypeScript',
    'Node.js',
  ],
  authors: [{ name: 'Qitong Lan' }],
  creator: 'Qitong Lan',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
  manifest: '/site.webmanifest',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, user-scalable=yes, minimum-scale=1, maximum-scale=5"
        />
        <meta name="theme-color" content="#000000" />
      </head>
      <body className={`${inter.className} flex flex-col min-h-screen bg-[#1a2234] text-gray-200`}>
        <Suspense fallback={<div className="h-16" />}>
          <Navbar />
        </Suspense>
        <main className="flex flex-col flex-grow justify-center">{children}</main>
        <Suspense fallback={null}>
          <Footer />
        </Suspense>
        <Toaster />
        <Suspense fallback={null}>
          <BackToTopButton />
        </Suspense>
      </body>
    </html>
  );
}

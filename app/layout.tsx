import ErrorBoundary from '@/app/components/ErrorBoundary';
import { Toaster } from '@/components/ui/toaster';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Inter } from 'next/font/google';
import React from 'react';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://yourportfolio.com'),
  title: {
    default: 'Qitong Lan - Portfolio',
    template: '%s | Qitong Lan',
  },
  description:
    'Professional portfolio of Qitong Lan, a full-stack engineer evolving for the new era of tech.',
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
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    title: 'Qitong Lan - Portfolio',
    description:
      'Professional portfolio of Qitong Lan, a full-stack engineer evolving for the new era of tech.',
    siteName: 'Qitong Lan Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Qitong Lan - Portfolio',
    description:
      'Professional portfolio of Qitong Lan, a full-stack engineer evolving for the new era of tech.',
    creator: '@tonglam',
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
  manifest: '/site.webmanifest',
};

export default function RootLayout({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <meta name="theme-color" content="#000000" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/favicon.ico" />
      </head>
      <body className={inter.className}>
        <ErrorBoundary>
          {children}
          <Analytics />
          <SpeedInsights />
          <Toaster />
        </ErrorBoundary>
      </body>
    </html>
  );
}

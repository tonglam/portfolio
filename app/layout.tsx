import type { Metadata, Viewport } from 'next';
import { IBM_Plex_Mono, IBM_Plex_Sans } from 'next/font/google';
import localFont from 'next/font/local';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import type { ReactNode } from 'react';
import { SiteFooter } from '@/src/components/site-footer';
import { SiteHeader } from '@/src/components/site-header';
import { ThemeProvider } from '@/src/components/theme-provider';
import { site } from '@/src/content/site';
import './globals.css';

const display = localFont({
  src: '../public/fonts/newsreader-500-latin.woff2',
  weight: '500',
  style: 'normal',
  variable: '--font-display',
  display: 'optional',
});

const sans = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-sans',
  display: 'optional',
});

const mono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-mono',
  display: 'optional',
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: 'Qitong Lan — Software Engineer in Perth',
    template: '%s — Qitong Lan',
  },
  description: site.description,
  applicationName: 'Qitong Lan Portfolio',
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  keywords: [
    'full-stack software engineer Perth',
    'software engineer Perth',
    'React Next.js engineer',
    'TypeScript Node.js engineer',
    'backend engineer',
    'platform engineer',
    'Java Spring Boot',
  ],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'en_AU',
    url: site.url,
    siteName: 'Qitong Lan',
    title: 'Qitong Lan — Software Engineer in Perth',
    description: site.description,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Qitong Lan — Software Engineer in Perth',
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  icons: { icon: '/favicon.ico' },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f6f4ef' },
    { media: '(prefers-color-scheme: dark)', color: '#0e151c' },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${display.variable} ${sans.variable} ${mono.variable}`}
    >
      <head>
        <link
          rel="alternate"
          type="application/rss+xml"
          title="Qitong Lan — Engineering Writing"
          href={`${site.url}/rss.xml`}
        />
      </head>
      <body>
        <ThemeProvider>
          <a className="skip-link" href="#main-content">
            Skip to main content
          </a>
          <SiteHeader />
          <main id="main-content">{children}</main>
          <SiteFooter />
          {process.env.VERCEL ? (
            <>
              <Analytics />
              <SpeedInsights />
            </>
          ) : null}
        </ThemeProvider>
      </body>
    </html>
  );
}

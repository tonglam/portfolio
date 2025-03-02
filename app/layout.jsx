import { ThemeProvider } from "@/components/ThemeProvider";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Qitong Lan - Software Developer Portfolio",
  description:
    "Professional portfolio of Qitong Lan, a software developer specializing in React, NextJS, and full-stack development.",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/favicon.ico" />
        {/* Force dark mode always */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                // Always force dark mode
                document.documentElement.classList.remove('light');
                document.documentElement.classList.add('dark');
                
                // Store dark theme in localStorage
                try {
                  localStorage.setItem('theme', 'dark');
                } catch (e) {
                  console.error('Failed to save theme preference', e);
                }
                
                // Define a simple API that always returns dark
                window.__theme = {
                  get: function() {
                    return 'dark';
                  },
                  set: function() {
                    // Do nothing, always dark
                    return 'dark';
                  },
                  toggle: function() {
                    // No toggling, always returns dark
                    return 'dark';
                  }
                };
              })();
            `,
          }}
        />
      </head>
      <body className={inter.className}>
        <ThemeProvider>{children}</ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}

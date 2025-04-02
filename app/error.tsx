'use client';

import Link from 'next/link';
import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-12 bg-[#1a2234] text-gray-200">
      <div className="w-full max-w-4xl px-4 py-16 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-red-400">
          Oops! Something went wrong.
        </h2>
        <p className="text-lg md:text-xl mb-8 text-gray-300 max-w-2xl mx-auto">
          We encountered an unexpected issue. Please try again.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={() => reset()}
            className="px-8 py-3 text-base font-medium rounded-md bg-indigo-600 hover:bg-indigo-700 text-white transition-colors duration-200"
          >
            Try again
          </button>
          <Link
            href="/"
            className="px-8 py-3 text-base font-medium rounded-md bg-gray-700 hover:bg-gray-600 text-white transition-colors duration-200"
          >
            Go to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}

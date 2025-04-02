import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-12 bg-[#1a2234] text-gray-200">
      <div className="w-full max-w-4xl px-4 py-16 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">404 - Page Not Found</h2>
        <p className="text-lg md:text-xl mb-8 text-gray-300 max-w-2xl mx-auto">
          Oops! It seems like the page you were trying to reach doesn&apos;t exist or may have been
          moved.
        </p>
        <Link
          href="/"
          className="inline-flex items-center px-8 py-3 text-base font-medium rounded-md bg-indigo-600 hover:bg-indigo-700 text-white transition-colors duration-200"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}

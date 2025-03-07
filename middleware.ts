import { authMiddleware } from '@/middleware/auth';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

/**
 * Main middleware function that runs on matched routes
 * Composes multiple middleware functions together
 */
export function middleware(request: NextRequest): NextResponse {
  // Run authentication middleware for Cloudflare API routes
  const authResponse = authMiddleware(request);
  if (authResponse) {
    return authResponse;
  }

  // If all middleware passes, continue with the request
  return NextResponse.next();
}

/**
 * Configure which paths this middleware runs on
 */
export const config = {
  // Only run on API routes
  matcher: '/api/:path*',
};

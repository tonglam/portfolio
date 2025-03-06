import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

/**
 * Authentication middleware for protected API routes
 * Verifies API keys for Cloudflare API access
 */
export function authMiddleware(request: NextRequest): NextResponse | undefined {
  // Only apply to Cloudflare API routes
  if (!request.nextUrl.pathname.startsWith('/api/cloudflare')) {
    return undefined; // Skip this middleware for non-Cloudflare routes
  }

  // Skip auth for test route
  if (request.nextUrl.pathname === '/api/cloudflare/test') {
    return undefined;
  }

  // Get the Authorization header (if any)
  const authHeader = request.headers.get('Authorization');

  // Check for API key in header or query parameter
  const apiKey = authHeader
    ? authHeader.replace('Bearer ', '')
    : request.nextUrl.searchParams.get('api_key');

  // Verify that the API key matches the Cloudflare API token
  if (!apiKey || apiKey !== process.env.CLOUDFLARE_API_TOKEN) {
    // Return 401 Unauthorized if authentication fails
    return NextResponse.json({ success: false, error: 'Unauthorized access' }, { status: 401 });
  }

  // Authentication passed, continue with the request
  return undefined;
}

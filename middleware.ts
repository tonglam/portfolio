import { corsHeaders } from '@/config/cors.config';
import { authMiddleware } from '@/middleware/auth.middleware';
import { validateRequest } from '@/middleware/validation.middleware';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

/**
 * Main middleware function that runs on matched routes
 * Composes multiple middleware functions together
 */
export async function middleware(request: NextRequest): Promise<NextResponse> {
  try {
    // Check if it's a server action POST request to the root
    const isServerActionPost = request.method === 'POST' && request.nextUrl.pathname === '/';

    // Temporarily bypass validation for server action POST requests
    if (!isServerActionPost) {
      const validationResponse = await validateRequest(request);
      if (validationResponse instanceof NextResponse) {
        return validationResponse;
      }
    }

    // Run authentication middleware for Cloudflare API routes
    const authResponse = await authMiddleware(request);
    if (authResponse instanceof NextResponse) {
      return authResponse;
    }

    // If all middleware passes, continue with the request
    const response = NextResponse.next();

    // Apply CORS and security headers
    Object.entries(corsHeaders).forEach(([key, value]) => {
      if (typeof value === 'string') {
        response.headers.set(key, value);
      }
    });

    // Add security headers
    response.headers.set('X-Content-Type-Options', 'nosniff');
    response.headers.set('X-Frame-Options', 'DENY');
    response.headers.set('X-XSS-Protection', '1; mode=block');
    response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');

    return response;
  } catch (error) {
    console.error('Middleware error:', error);
    const headers = {
      'Content-Type': 'application/json',
      ...corsHeaders,
    } as const;

    return new NextResponse(JSON.stringify({ success: false, message: 'Internal server error' }), {
      status: 500,
      headers,
    });
  }
}

/**
 * Configure which paths this middleware runs on
 */
export const config = {
  matcher: ['/api/:path*', '/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)'],
};

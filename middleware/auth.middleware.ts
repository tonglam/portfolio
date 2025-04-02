import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

/**
 * CORS protection middleware for API routes
 * Only allows requests from authorized origins
 */
export async function authMiddleware(request: NextRequest): Promise<NextResponse | null> {
  const origin = request.headers.get('origin');
  const referer = request.headers.get('referer');

  // Define allowed origins
  const allowedOrigins = ['https://www.qitonglan.com', process.env.NEXT_PUBLIC_SITE_URL].filter(
    Boolean
  ); // Remove any undefined values

  // Allow requests from:
  // 1. No origin (direct API calls)
  // 2. localhost during development
  // 3. Explicitly allowed origins
  // 4. Our own referer
  if (
    !origin ||
    origin.startsWith('http://localhost:') ||
    allowedOrigins.includes(origin) ||
    (referer && allowedOrigins.includes(new URL(referer).origin))
  ) {
    return null;
  }

  // Block requests from unauthorized origins
  return new NextResponse(JSON.stringify({ success: false, message: 'Unauthorized origin' }), {
    status: 403,
    headers: { 'Content-Type': 'application/json' },
  });
}

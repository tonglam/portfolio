import { NextResponse } from "next/server";

/**
 * Middleware to protect API routes
 * Ensures that Cloudflare API routes have proper authentication
 */
export function middleware(request) {
  // Check if the request is for a Cloudflare API route
  if (request.nextUrl.pathname.startsWith("/api/cloudflare")) {
    // Skip auth for test route
    if (request.nextUrl.pathname === "/api/cloudflare/test") {
      return NextResponse.next();
    }

    // Get the Authorization header (if any)
    const authHeader = request.headers.get("Authorization");

    // Check for API key in header or query parameter
    const apiKey = authHeader
      ? authHeader.replace("Bearer ", "")
      : request.nextUrl.searchParams.get("api_key");

    // Verify that the API key matches the Cloudflare API token
    if (!apiKey || apiKey !== process.env.CLOUDFLARE_API_TOKEN) {
      // Return 401 Unauthorized if authentication fails
      return NextResponse.json(
        { success: false, error: "Unauthorized access" },
        { status: 401 }
      );
    }
  }

  // Continue with the request if authentication passes or not a protected route
  return NextResponse.next();
}

/**
 * Configure which paths this middleware runs on
 */
export const config = {
  // Only run on API routes
  matcher: "/api/:path*",
};

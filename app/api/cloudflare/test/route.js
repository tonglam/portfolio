import { NextResponse } from "next/server";

/**
 * GET handler for /api/cloudflare/test endpoint
 * Simple test to verify middleware and token handling
 */
export async function GET(request) {
  try {
    console.log("API test route: Checking Cloudflare token");

    // Get authorization header
    const authHeader = request.headers.get("Authorization");

    // Extract token
    const token = authHeader
      ? authHeader.replace("Bearer ", "")
      : request.nextUrl.searchParams.get("api_key");

    // Log masked token for debugging (only first and last 4 chars)
    const maskedToken = token
      ? `${token.substring(0, 4)}...${token.substring(token.length - 4)}`
      : "none";

    console.log(`Token received: ${maskedToken}`);
    console.log(`Token length: ${token?.length || 0}`);
    console.log(
      `Environment token length: ${
        process.env.CLOUDFLARE_API_TOKEN?.length || 0
      }`
    );

    return NextResponse.json({
      success: true,
      message: "Test route successful",
      details: {
        tokenReceived: !!token,
        tokenLength: token?.length || 0,
        envTokenLength: process.env.CLOUDFLARE_API_TOKEN?.length || 0,
        tokenMatch: token === process.env.CLOUDFLARE_API_TOKEN,
      },
    });
  } catch (error) {
    console.error("Error in test route:", error);

    return NextResponse.json(
      {
        success: false,
        error: error.message || "Test route failed",
      },
      { status: 500 }
    );
  }
}

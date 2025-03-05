import Cloudflare from "cloudflare";
import { NextResponse } from "next/server";

/**
 * GET handler for /api/cloudflare/zones endpoint
 * Fetches all Cloudflare zones for the authenticated account
 */
export async function GET(request) {
  try {
    console.log("API route: Fetching Cloudflare zones");

    // Get API token from the environment
    const cfToken = process.env.CLOUDFLARE_API_TOKEN;

    if (!cfToken) {
      console.error("Missing CLOUDFLARE_API_TOKEN in environment");
      return NextResponse.json(
        { success: false, error: "API token configuration error" },
        { status: 500 }
      );
    }

    // Create Cloudflare client directly
    const client = new Cloudflare({
      token: cfToken,
    });

    // Fetch zones
    console.log("Calling Cloudflare API to list zones");
    const response = await client.zones.list();
    console.log(`Successfully fetched ${response.result?.length || 0} zones`);

    // Return zones as JSON response
    return NextResponse.json({
      success: true,
      zones: response.result || [],
    });
  } catch (error) {
    console.error("Error in Cloudflare zones API:", error);

    // Return error response with more details
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to fetch Cloudflare zones",
        details: error.response
          ? {
              status: error.response.status,
              statusText: error.response.statusText,
            }
          : undefined,
      },
      { status: 500 }
    );
  }
}

import type { CloudflareZone } from '@/lib/cloudflare';
import { getCloudflareClient, getZones } from '@/lib/cloudflare';
import { logger } from '@/lib/logger';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

/**
 * Interface for API response
 */
interface ZonesApiResponse {
  success: boolean;
  zones?: CloudflareZone[];
  error?: string;
  details?: Record<string, unknown>;
}

/**
 * Add revalidation time for Next.js caching
 */
export const revalidate = 300; // 5 minutes

/**
 * GET handler for /api/cloudflare/zones endpoint
 * Fetches all Cloudflare zones for the authenticated account
 */
export async function GET(_request: NextRequest): Promise<NextResponse> {
  try {
    logger.info('Fetching Cloudflare zones');

    // Get authenticated client
    const client = getCloudflareClient();

    // Get zones with caching
    const result = await getZones(client);

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          error: result.error?.message || 'Failed to fetch zones',
          details: result.error?.details,
        } as ZonesApiResponse,
        { status: 500 }
      );
    }

    // Return zones as JSON response
    return NextResponse.json({
      success: true,
      zones: result.data,
    } as ZonesApiResponse);
  } catch (error) {
    logger.error({ error }, 'Error fetching Cloudflare zones');

    // Get error message safely
    const errorMessage =
      error instanceof Error ? error.message : 'Failed to fetch Cloudflare zones';

    // Return error response
    return NextResponse.json(
      {
        success: false,
        error: errorMessage,
      } as ZonesApiResponse,
      { status: 500 }
    );
  }
}

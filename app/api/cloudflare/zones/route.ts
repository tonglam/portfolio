import { getZones } from '@/lib/services/cloudflare.service.util';
import type { ZonesApiResponse } from '@/types/api/cloudflare.type';
import { REVALIDATION_TIME } from '@/types/config/cache.type';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

/**
 * Add revalidation time for Next.js caching
 */
export const revalidate = REVALIDATION_TIME.SHORT; // 5 minutes

/**
 * GET handler for /api/cloudflare/zones endpoint
 * Fetches all Cloudflare zones for the authenticated account
 */
export async function get(_request: NextRequest): Promise<NextResponse> {
  const zones = await getZones();
  return NextResponse.json({
    success: true,
    zones,
  } as ZonesApiResponse);
}

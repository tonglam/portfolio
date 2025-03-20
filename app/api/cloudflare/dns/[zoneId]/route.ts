import { ApiErrors, handleRouteError } from '@/lib/core/error-handler.util';
import { createDnsRecord, getDnsRecords } from '@/lib/services/cloudflare.service.util';
import type {
  CreateDnsRecordRequest,
  CreateRecordResponse,
  DnsRecordsResponse,
} from '@/types/api/cloudflare.type';
import { REVALIDATION_TIME } from '@/types/config/cache.type';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

/**
 * GET endpoint to retrieve DNS records for a specific Cloudflare zone
 */
export const revalidate = REVALIDATION_TIME.SHORT; // 5 minutes

/**
 * GET handler for /api/cloudflare/dns/[zoneId] endpoint
 * Fetches DNS records for a specific Cloudflare zone
 */
export async function get({ params }: { params: { zoneId?: string } }): Promise<NextResponse> {
  const zoneId = params?.zoneId;

  if (!zoneId) {
    return handleRouteError(ApiErrors.BAD_REQUEST('Missing zoneId parameter'), 'DNS Records API');
  }

  const dnsRecords = await getDnsRecords(zoneId);
  return NextResponse.json({
    success: true,
    dnsRecords,
  } as DnsRecordsResponse);
}

/**
 * POST handler for /api/cloudflare/dns/[zoneId] endpoint
 * Creates a new DNS record in the specified zone
 */
export async function post(
  request: NextRequest,
  { params }: { params: { zoneId?: string } }
): Promise<NextResponse> {
  const zoneId = params?.zoneId;

  if (!zoneId) {
    return handleRouteError(ApiErrors.BAD_REQUEST('Missing zoneId parameter'), 'DNS Records API');
  }

  const recordData = (await request.json()) as CreateDnsRecordRequest;
  if (!recordData.type || !recordData.name || !recordData.content) {
    return handleRouteError(
      ApiErrors.BAD_REQUEST('Record type, name, and content are required'),
      'DNS Records API'
    );
  }

  const result = await createDnsRecord(zoneId, recordData);
  if (!result.success) {
    return handleRouteError(
      ApiErrors.INTERNAL(result.error?.message || 'Failed to create DNS record'),
      'DNS Records API'
    );
  }

  return NextResponse.json(
    {
      success: true,
      message: 'DNS record created successfully',
      record: result.data,
    } as CreateRecordResponse,
    { status: 201 }
  );
}

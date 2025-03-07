import type { DnsRecord } from '@/lib/cloudflare';
import { createDnsRecord, getCloudflareClient, getDnsRecords } from '@/lib/cloudflare';
import { logger } from '@/lib/logger';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

/**
 * Request body interface for creating DNS records
 */
interface CreateDnsRecordRequest {
  type: string;
  name: string;
  content: string;
  [key: string]: unknown;
}

/**
 * API response interfaces
 */
interface DnsRecordsResponse {
  success: boolean;
  dnsRecords?: DnsRecord[];
  error?: string;
  details?: Record<string, unknown>;
}

interface CreateRecordResponse {
  success: boolean;
  message?: string;
  record?: DnsRecord;
  error?: string;
  details?: Record<string, unknown>;
}

/**
 * Add revalidation time for Next.js caching
 */
export const revalidate = 300; // 5 minutes

/**
 * GET handler for /api/cloudflare/dns/[zoneId] endpoint
 * Fetches DNS records for a specific Cloudflare zone
 */
export async function GET({ params }: { params: { zoneId?: string } }): Promise<NextResponse> {
  const zoneId = params?.zoneId;

  if (!zoneId) {
    logger.error('Missing zoneId parameter');
    return NextResponse.json({ error: 'Missing zoneId parameter' }, { status: 400 });
  }

  try {
    logger.info({ zoneId }, 'Fetching DNS records');
    // Get authenticated Cloudflare client
    const client = getCloudflareClient();

    // Fetch DNS records for the specified zone with caching
    const result = await getDnsRecords(client, zoneId);

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          error: result.error?.message || 'Failed to fetch DNS records',
          details: result.error?.details,
        } as DnsRecordsResponse,
        { status: 500 }
      );
    }

    // Return DNS records as JSON response
    return NextResponse.json({
      success: true,
      dnsRecords: result.data,
    } as DnsRecordsResponse);
  } catch (error) {
    logger.error({ error, zoneId }, 'Error fetching DNS records');
    // Get error message safely
    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch DNS records';

    // Return error response
    return NextResponse.json(
      {
        success: false,
        error: errorMessage,
      } as DnsRecordsResponse,
      { status: 500 }
    );
  }
}

/**
 * POST handler for /api/cloudflare/dns/[zoneId] endpoint
 * Creates a new DNS record in the specified zone
 */
export async function POST(
  request: NextRequest,
  { params }: { params: { zoneId?: string } }
): Promise<NextResponse> {
  const zoneId = params?.zoneId;

  if (!zoneId) {
    logger.error('Missing zoneId parameter');
    return NextResponse.json({ error: 'Missing zoneId parameter' }, { status: 400 });
  }

  try {
    logger.info({ zoneId }, 'Creating DNS record');
    // Parse request body
    const recordData = (await request.json()) as CreateDnsRecordRequest;

    // Validate required fields
    if (!recordData.type || !recordData.name || !recordData.content) {
      return NextResponse.json(
        {
          success: false,
          error: 'Record type, name, and content are required',
        },
        { status: 400 }
      );
    }

    // Get authenticated Cloudflare client
    const client = getCloudflareClient();

    // Create the DNS record
    const { type, name, content, ...rest } = recordData;
    const result = await createDnsRecord(client, zoneId, {
      ...rest,
      type,
      name,
      content,
    });

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          error: result.error?.message || 'Failed to create DNS record',
          details: result.error?.details,
        } as CreateRecordResponse,
        { status: 500 }
      );
    }

    // Return the created record as JSON response
    return NextResponse.json(
      {
        success: true,
        message: 'DNS record created successfully',
        record: result.data,
      } as CreateRecordResponse,
      { status: 201 }
    );
  } catch (error) {
    logger.error({ error, zoneId }, 'Error creating DNS record');
    // Get error message safely
    const errorMessage = error instanceof Error ? error.message : 'Failed to create DNS record';

    // Return error response
    return NextResponse.json(
      {
        success: false,
        error: errorMessage,
      } as CreateRecordResponse,
      { status: 500 }
    );
  }
}

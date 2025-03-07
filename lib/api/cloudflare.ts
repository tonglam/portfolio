/**
 * Cloudflare API utility functions
 * Handles authentication and common API operations
 */

import { logger } from '@/lib/logger';
import Cloudflare from 'cloudflare';

/**
 * Cloudflare Zone interface
 */
export interface CloudflareZone {
  id: string;
  name: string;
  status: string;
  paused: boolean;
  type: string;
  development_mode: number;
  name_servers: string[];
  original_name_servers: string[];
  original_registrar: string;
  original_dnshost: string;
  modified_on: string;
  created_on: string;
  activated_on: string;
  meta: Record<string, unknown>;
  owner: Record<string, unknown>;
  account: {
    id: string;
    name: string;
  };
  permissions: string[];
  plan: Record<string, unknown>;
}

/**
 * DNS Record interface
 */
export interface DnsRecord {
  id: string;
  type: string;
  name: string;
  content: string;
  proxied: boolean;
  ttl: number;
  locked: boolean;
  zone_id: string;
  zone_name: string;
  created_on: string;
  modified_on: string;
  meta: Record<string, unknown>;
  proxiable: boolean;
}

/**
 * DNS Record Creation Data
 */
export interface DnsRecordData {
  type: string;
  name: string;
  content: string;
  ttl?: number;
  proxied?: boolean;
}

/**
 * Cloudflare API Error
 */
export interface CloudflareApiError {
  message: string;
  code?: number;
  details?: unknown;
}

/**
 * Cloudflare API Response
 */
export interface CloudflareApiResponse<T> {
  success: boolean;
  data?: T;
  error?: CloudflareApiError;
}

// Cache settings
let cachedZones: CloudflareZone[] | null = null;
let lastZonesFetchTime = 0;
const dnsRecordsCache = new Map<string, { records: DnsRecord[]; timestamp: number }>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes in milliseconds

/**
 * Create an authenticated Cloudflare API client
 * @returns Authenticated Cloudflare client
 */
export function getCloudflareClient(): Cloudflare {
  // Check for required environment variables
  if (!process.env.CLOUDFLARE_API_TOKEN) {
    throw new Error('Missing CLOUDFLARE_API_TOKEN environment variable');
  }

  logger.info('Creating Cloudflare client with API token');

  // Create and return the Cloudflare client with API token authentication
  return new Cloudflare({
    apiToken: process.env.CLOUDFLARE_API_TOKEN,
  });
}

/**
 * Handle Cloudflare API errors
 * @param error The error to handle
 * @returns Standardized error object
 */
export function handleCloudflareError(error: unknown): CloudflareApiError {
  logger.error({ error }, 'Cloudflare API error');

  if (error instanceof Error) {
    // Extract response details if available
    interface CloudflareErrorResponse {
      response?: {
        status: number;
        statusText: string;
        body: unknown;
      };
      message: string;
    }

    const cfError = error as CloudflareErrorResponse;

    if (cfError.response) {
      return {
        message: cfError.message || 'Cloudflare API error',
        code: cfError.response.status,
        details: {
          status: cfError.response.status,
          statusText: cfError.response.statusText,
          body: cfError.response.body,
        },
      };
    }

    return {
      message: cfError.message,
      details: error,
    };
  }

  return {
    message: 'Unknown Cloudflare API error',
    details: error,
  };
}

/**
 * Get Cloudflare zones for the authenticated account
 * @param client Authenticated Cloudflare client
 * @param bypassCache Whether to bypass the cache
 * @returns List of zones
 */
export async function getZones(
  client: Cloudflare,
  bypassCache = false
): Promise<CloudflareApiResponse<CloudflareZone[]>> {
  try {
    // Use cache if available and fresh
    const now = Date.now();
    if (!bypassCache && cachedZones && now - lastZonesFetchTime < CACHE_DURATION) {
      logger.debug('Using cached Cloudflare zones');
      return {
        success: true,
        data: cachedZones,
      };
    }

    logger.info('Fetching fresh Cloudflare zones');
    const response = await client.zones.list();

    // Update cache
    cachedZones = response.result as CloudflareZone[];
    lastZonesFetchTime = now;

    return {
      success: true,
      data: cachedZones,
    };
  } catch (error) {
    const apiError = handleCloudflareError(error);
    return {
      success: false,
      error: apiError,
    };
  }
}

/**
 * Get DNS records for a specific zone
 * @param client Authenticated Cloudflare client
 * @param zoneId Zone ID to fetch records for
 * @param bypassCache Whether to bypass the cache
 * @returns List of DNS records
 */
export async function getDnsRecords(
  client: Cloudflare,
  zoneId: string,
  bypassCache = false
): Promise<CloudflareApiResponse<DnsRecord[]>> {
  if (!zoneId) {
    return {
      success: false,
      error: { message: 'Zone ID is required to fetch DNS records' },
    };
  }

  try {
    // Use cache if available and fresh
    const now = Date.now();
    const cachedData = dnsRecordsCache.get(zoneId);

    if (!bypassCache && cachedData && now - cachedData.timestamp < CACHE_DURATION) {
      logger.debug({ zoneId }, 'Using cached DNS records');
      return {
        success: true,
        data: cachedData.records,
      };
    }

    logger.info({ zoneId }, 'Fetching fresh DNS records');

    // Access DNS records through the zones endpoint
    // Using type assertion to unknown first to avoid type conflicts
    const cloudflareClient = client as unknown as {
      zones: {
        dns_records: {
          browse: (zoneId: string) => Promise<{ result: DnsRecord[] }>;
        };
      };
    };

    const response = await cloudflareClient.zones.dns_records.browse(zoneId);

    // Update cache
    const records = response.result;
    dnsRecordsCache.set(zoneId, { records, timestamp: now });

    return {
      success: true,
      data: records,
    };
  } catch (error) {
    const apiError = handleCloudflareError(error);
    return {
      success: false,
      error: apiError,
    };
  }
}

/**
 * Create a new DNS record in a zone
 * @param client Authenticated Cloudflare client
 * @param zoneId Zone ID to create the record in
 * @param recordData DNS record data
 * @returns Created DNS record
 */
export async function createDnsRecord(
  client: Cloudflare,
  zoneId: string,
  recordData: DnsRecordData
): Promise<CloudflareApiResponse<DnsRecord>> {
  if (!zoneId) {
    return {
      success: false,
      error: { message: 'Zone ID is required to create a DNS record' },
    };
  }

  if (!recordData.type || !recordData.name || !recordData.content) {
    return {
      success: false,
      error: { message: 'Record type, name, and content are required' },
    };
  }

  try {
    logger.info({ zoneId }, 'Creating DNS record');
    // Access DNS records through the zones endpoint with proper typing
    const cloudflareClient = client as unknown as {
      zones: {
        dns_records: {
          add: (zoneId: string, data: DnsRecordData) => Promise<{ result: DnsRecord }>;
        };
      };
    };

    const response = await cloudflareClient.zones.dns_records.add(zoneId, {
      type: recordData.type,
      name: recordData.name,
      content: recordData.content,
      ttl: recordData.ttl || 1,
      proxied: recordData.proxied || false,
    });

    // Invalidate cache for this zone
    dnsRecordsCache.delete(zoneId);

    return {
      success: true,
      data: response.result,
    };
  } catch (error) {
    const apiError = handleCloudflareError(error);
    return {
      success: false,
      error: apiError,
    };
  }
}

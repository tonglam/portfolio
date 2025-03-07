import type {
  CloudflareApiError,
  CloudflareApiResponse,
  CloudflareZone,
  DnsRecord,
  DnsRecordData,
} from '@/types/api/cloudflare';
import { default as CloudflareClient } from 'cloudflare';

interface CloudflareResponse<T> {
  result: T;
  success: boolean;
  errors: unknown[];
  messages: string[];
}

// Using a custom type to handle incomplete types in cloudflare package
type ExtendedCloudflareClient = CloudflareClient & {
  zones: {
    browse: () => Promise<CloudflareResponse<CloudflareZone[]>>;
  };
  dnsRecords: {
    browse: (zoneId: string) => Promise<CloudflareResponse<DnsRecord[]>>;
    add: (zoneId: string, data: DnsRecordData) => Promise<CloudflareResponse<DnsRecord>>;
    edit: (
      zoneId: string,
      recordId: string,
      data: Partial<DnsRecordData>
    ) => Promise<CloudflareResponse<DnsRecord>>;
    del: (zoneId: string, recordId: string) => Promise<void>;
  };
};

const client = new CloudflareClient({
  apiKey: process.env.CLOUDFLARE_API_TOKEN,
}) as ExtendedCloudflareClient;

/**
 * Gets all zones for the account
 */
export async function getZones(): Promise<CloudflareZone[]> {
  try {
    const response = await client.zones.browse();
    return response.result;
  } catch (error) {
    throw handleCloudflareError(error);
  }
}

/**
 * Gets DNS records for a zone
 */
export async function getDnsRecords(zoneId: string): Promise<DnsRecord[]> {
  try {
    const response = await client.dnsRecords.browse(zoneId);
    return response.result;
  } catch (error) {
    throw handleCloudflareError(error);
  }
}

/**
 * Creates a new DNS record
 */
export async function createDnsRecord(
  zoneId: string,
  data: DnsRecordData
): Promise<CloudflareApiResponse<DnsRecord>> {
  try {
    const response = await client.dnsRecords.add(zoneId, data);
    return {
      success: true,
      data: response.result,
    };
  } catch (error) {
    throw handleCloudflareError(error);
  }
}

/**
 * Updates an existing DNS record
 */
export async function updateDnsRecord(
  zoneId: string,
  recordId: string,
  data: Partial<DnsRecordData>
): Promise<CloudflareApiResponse<DnsRecord>> {
  try {
    const response = await client.dnsRecords.edit(zoneId, recordId, data);
    return {
      success: true,
      data: response.result,
    };
  } catch (error) {
    throw handleCloudflareError(error);
  }
}

/**
 * Deletes a DNS record
 */
export async function deleteDnsRecord(
  zoneId: string,
  recordId: string
): Promise<CloudflareApiResponse<void>> {
  try {
    await client.dnsRecords.del(zoneId, recordId);
    return {
      success: true,
      data: undefined,
    };
  } catch (error) {
    throw handleCloudflareError(error);
  }
}

/**
 * Handles Cloudflare API errors
 */
function handleCloudflareError(error: unknown): CloudflareApiError {
  console.error('Cloudflare API error:', error);

  if (error instanceof Error) {
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

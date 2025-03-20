import { logger } from '@/lib/core/logger.util';
import type {
  CloudflareApiResponse,
  CloudflareClient,
  CloudflareZone,
  DnsRecord,
  DnsRecordData,
} from '@/types/api/cloudflare.type';
import { default as CloudflareSDK } from 'cloudflare';

const client = new CloudflareSDK({
  apiKey: process.env.CLOUDFLARE_API_TOKEN,
}) as unknown as CloudflareClient;

/**
 * Gets all zones for the account
 */
export async function getZones(): Promise<CloudflareZone[]> {
  try {
    const response = await client.zones.browse();
    return response.result;
  } catch (err: unknown) {
    logger.error(err, 'Cloudflare API');
    throw err;
  }
}

/**
 * Gets DNS records for a zone
 */
export async function getDnsRecords(zoneId: string): Promise<DnsRecord[]> {
  try {
    const response = await client.dnsRecords.browse(zoneId);
    return response.result;
  } catch (err: unknown) {
    logger.error(err, 'Cloudflare API');
    throw err;
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
  } catch (err: unknown) {
    logger.error(err, 'Cloudflare API');
    throw err;
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
  } catch (err: unknown) {
    logger.error(err, 'Cloudflare API');
    throw err;
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
  } catch (err: unknown) {
    logger.error(err, 'Cloudflare API');
    throw err;
  }
}

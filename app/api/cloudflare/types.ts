import type { CloudflareZone, DnsRecord } from '@/lib/cloudflare';

/**
 * Common API Response Types
 */
export interface ApiError {
  success: false;
  error: string;
  details?: Record<string, unknown>;
}

export interface ApiSuccess<T> {
  success: true;
  data: T;
}

/**
 * Request Types
 */
export interface CreateDnsRecordRequest {
  type: string;
  name: string;
  content: string;
  [key: string]: unknown;
}

/**
 * Response Types
 */
export interface DnsRecordsResponse {
  success: boolean;
  dnsRecords?: DnsRecord[];
  error?: string;
  details?: Record<string, unknown>;
}

export interface CreateRecordResponse {
  success: boolean;
  message?: string;
  record?: DnsRecord;
  error?: string;
  details?: Record<string, unknown>;
}

export interface ZonesApiResponse {
  success: boolean;
  zones?: CloudflareZone[];
  error?: string;
  details?: Record<string, unknown>;
}

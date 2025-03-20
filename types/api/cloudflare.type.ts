/**
 * Type definitions for Cloudflare API responses and data structures
 */

/**
 * DNS record types supported by Cloudflare
 */
export type DnsRecordType = 'A' | 'AAAA' | 'CNAME' | 'TXT' | 'MX' | 'NS' | 'SRV' | 'CAA';

/**
 * Cloudflare API Types
 */

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
 * Cloudflare API Response Types
 */
export interface CloudflareResponse<T> {
  result: T;
  success: boolean;
  errors: unknown[];
  messages: string[];
}

export interface CloudflareApiResponse<T> {
  success: boolean;
  data?: T;
  error?: CloudflareApiError;
  result_info?: {
    page: number;
    per_page: number;
    total_pages: number;
    count: number;
    total_count: number;
  };
}

/**
 * Cloudflare Client Types
 */
export interface CloudflareClient {
  zones: {
    browse: () => Promise<CloudflareResponse<CloudflareZone[]>>;
  } & Record<string, unknown>;
  dnsRecords: {
    browse: (zoneId: string) => Promise<CloudflareResponse<DnsRecord[]>>;
    add: (zoneId: string, data: DnsRecordData) => Promise<CloudflareResponse<DnsRecord>>;
    edit: (
      zoneId: string,
      recordId: string,
      data: Partial<DnsRecordData>
    ) => Promise<CloudflareResponse<DnsRecord>>;
    del: (zoneId: string, recordId: string) => Promise<void>;
  } & Record<string, unknown>;
  [key: string]: unknown;
}

/**
 * Cloudflare Error Response
 */
export interface CloudflareErrorResponse {
  response?: {
    status: number;
    statusText: string;
    body: unknown;
  };
  message: string;
}

/**
 * Request Types
 */
export interface CreateDnsRecordRequest extends DnsRecordData {}

/**
 * Response Types
 * These extend the base CloudflareApiResponse with specific data types
 */
export interface DnsRecordsResponse {
  success: boolean;
  data?: DnsRecord[];
  dnsRecords?: DnsRecord[];
  error?: CloudflareApiError;
  details?: Record<string, unknown>;
  result_info?: CloudflareApiResponse<DnsRecord[]>['result_info'];
}

export interface CreateRecordResponse {
  success: boolean;
  data?: DnsRecord;
  message?: string;
  record?: DnsRecord;
  error?: CloudflareApiError;
  details?: Record<string, unknown>;
  result_info?: CloudflareApiResponse<DnsRecord>['result_info'];
}

export interface ZonesApiResponse {
  success: boolean;
  data?: CloudflareZone[];
  zones?: CloudflareZone[];
  error?: CloudflareApiError;
  details?: Record<string, unknown>;
  result_info?: CloudflareApiResponse<CloudflareZone[]>['result_info'];
}

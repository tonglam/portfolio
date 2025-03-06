/**
 * Cloudflare API types
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

export interface DnsRecordData {
  type: string;
  name: string;
  content: string;
  ttl?: number;
  proxied?: boolean;
}

export interface CloudflareApiError {
  message: string;
  code?: number;
  details?: unknown;
}

export interface CloudflareApiResponse<T> {
  success: boolean;
  data?: T;
  error?: CloudflareApiError;
}

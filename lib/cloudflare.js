/**
 * Cloudflare API utility functions
 * Handles authentication and common API operations
 */

import Cloudflare from "cloudflare";

/**
 * Create an authenticated Cloudflare API client
 * @returns {Cloudflare} Authenticated Cloudflare client
 */
export function getCloudflareClient() {
  // Check for required environment variables
  if (!process.env.CLOUDFLARE_API_TOKEN) {
    throw new Error("Missing CLOUDFLARE_API_TOKEN environment variable");
  }

  console.log("Creating Cloudflare client with API token");

  // Create and return the Cloudflare client with API token authentication
  return new Cloudflare({
    token: process.env.CLOUDFLARE_API_TOKEN,
  });
}

/**
 * Get Cloudflare zones for the authenticated account
 * @param {Cloudflare} client - Authenticated Cloudflare client
 * @returns {Promise<Array>} List of zones
 */
export async function getZones(client) {
  try {
    console.log("Attempting to fetch Cloudflare zones");
    // Using the list method based on latest Cloudflare API
    const response = await client.zones.list();
    console.log("Successfully fetched zones from Cloudflare API");
    return response.result;
  } catch (error) {
    console.error("Error fetching Cloudflare zones:", error);
    // Add more detailed error information
    if (error.response) {
      console.error("Error response status:", error.response.status);
      console.error("Error response body:", error.response.body);
    }
    throw new Error("Failed to fetch Cloudflare zones");
  }
}

/**
 * Get DNS records for a specific zone
 * @param {Cloudflare} client - Authenticated Cloudflare client
 * @param {string} zoneId - Zone ID to fetch records for
 * @returns {Promise<Array>} List of DNS records
 */
export async function getDnsRecords(client, zoneId) {
  if (!zoneId) {
    throw new Error("Zone ID is required to fetch DNS records");
  }

  try {
    console.log(`Attempting to fetch DNS records for zone ${zoneId}`);
    // Using the list method for DNS records
    const response = await client.dnsRecords.list(zoneId);
    console.log("Successfully fetched DNS records from Cloudflare API");
    return response.result;
  } catch (error) {
    console.error(`Error fetching DNS records for zone ${zoneId}:`, error);
    // Add more detailed error information
    if (error.response) {
      console.error("Error response status:", error.response.status);
      console.error("Error response body:", error.response.body);
    }
    throw new Error("Failed to fetch DNS records");
  }
}

/**
 * Create a new DNS record in a zone
 * @param {Cloudflare} client - Authenticated Cloudflare client
 * @param {string} zoneId - Zone ID to create the record in
 * @param {Object} recordData - DNS record data
 * @param {string} recordData.type - Record type (A, AAAA, CNAME, etc)
 * @param {string} recordData.name - Record name (domain/subdomain)
 * @param {string} recordData.content - Record content (IP address, domain)
 * @param {number} [recordData.ttl=1] - Time to live in seconds (1 = auto)
 * @param {boolean} [recordData.proxied=false] - Whether the record is proxied through Cloudflare
 * @returns {Promise<Object>} Created DNS record
 */
export async function createDnsRecord(client, zoneId, recordData) {
  if (!zoneId) {
    throw new Error("Zone ID is required to create a DNS record");
  }

  if (!recordData.type || !recordData.name || !recordData.content) {
    throw new Error("Record type, name, and content are required");
  }

  try {
    console.log(`Attempting to create DNS record in zone ${zoneId}`);
    // Use the create method for DNS records
    const response = await client.dnsRecords.create(zoneId, {
      type: recordData.type,
      name: recordData.name,
      content: recordData.content,
      ttl: recordData.ttl || 1,
      proxied: recordData.proxied || false,
    });

    console.log("Successfully created DNS record in Cloudflare");
    return response.result;
  } catch (error) {
    console.error(`Error creating DNS record in zone ${zoneId}:`, error);
    // Add more detailed error information
    if (error.response) {
      console.error("Error response status:", error.response.status);
      console.error("Error response body:", error.response.body);
    }
    throw new Error("Failed to create DNS record");
  }
}

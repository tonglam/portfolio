import {
  createDnsRecord,
  getCloudflareClient,
  getDnsRecords,
} from "@/lib/cloudflare";
import { NextRequest, NextResponse } from "next/server";

/**
 * GET handler for /api/cloudflare/dns/[zoneId] endpoint
 * Fetches DNS records for a specific Cloudflare zone
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { zoneId: string } }
) {
  try {
    const { zoneId } = params;

    console.log(`API route: Fetching DNS records for zone ${zoneId}`);

    if (!zoneId) {
      return NextResponse.json(
        { success: false, error: "Zone ID is required" },
        { status: 400 }
      );
    }

    // Get authenticated Cloudflare client
    const client = getCloudflareClient();

    // Fetch DNS records for the specified zone
    const dnsRecords = await getDnsRecords(client, zoneId);

    // Return DNS records as JSON response
    return NextResponse.json({ success: true, dnsRecords });
  } catch (error: any) {
    console.error(
      `Error in Cloudflare DNS records API for zone ${params?.zoneId}:`,
      error
    );

    // Return error response
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to fetch DNS records",
      },
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
  { params }: { params: { zoneId: string } }
) {
  try {
    const { zoneId } = params;

    console.log(`API route: Creating DNS record in zone ${zoneId}`);

    if (!zoneId) {
      return NextResponse.json(
        { success: false, error: "Zone ID is required" },
        { status: 400 }
      );
    }

    // Parse request body
    const recordData = await request.json();

    // Validate required fields
    if (!recordData.type || !recordData.name || !recordData.content) {
      return NextResponse.json(
        {
          success: false,
          error: "Record type, name, and content are required",
        },
        { status: 400 }
      );
    }

    // Get authenticated Cloudflare client
    const client = getCloudflareClient();

    // Create the DNS record
    const createdRecord = await createDnsRecord(client, zoneId, recordData);

    // Return the created record as JSON response
    return NextResponse.json(
      {
        success: true,
        message: "DNS record created successfully",
        record: createdRecord,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error(
      `Error creating DNS record in zone ${params?.zoneId}:`,
      error
    );

    // Return error response
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to create DNS record",
      },
      { status: 500 }
    );
  }
}

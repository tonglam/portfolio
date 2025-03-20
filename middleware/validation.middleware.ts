import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export async function validateRequest(request: NextRequest): Promise<NextResponse | null> {
  // Validate Content-Type for POST/PUT requests
  if (['POST', 'PUT'].includes(request.method)) {
    const contentType = request.headers.get('content-type');
    if (!contentType?.includes('application/json')) {
      return new NextResponse(
        JSON.stringify({
          success: false,
          message: 'Content-Type must be application/json',
        }),
        {
          status: 415,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }
  }

  // Add more validations as needed
  return null;
}

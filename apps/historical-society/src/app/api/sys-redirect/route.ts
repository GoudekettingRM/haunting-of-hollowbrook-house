import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as { search: string };

    if (body.search.toLowerCase().replace(/\s+/g, '') === 'wearestillalive') {
      return NextResponse.json({ redirectUrl: '/sys-admin/protocol-9139' }, { status: 200 });
    }
    return new Response(undefined, { status: 204 });
  } catch (error) {
    console.error('Redirect API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

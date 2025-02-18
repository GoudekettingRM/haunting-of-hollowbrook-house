import { sendEmail } from '@/actions/sendEmail';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const headerValue = request.headers.get('x-origin-authentication');

  if (headerValue !== process.env.API_ORIGIN_AUTHENTICATION) {
    return new NextResponse(null, { status: 401 });
  }
  try {
    const body = (await request.json()) as { email: string; name: string };

    const { error, success } = await sendEmail(body.email, body.name);
    if (success) {
      return NextResponse.json({ message: `Game started for ${body.name}, ${body.email}` }, { status: 200 });
    }
    console.error('Failed to send email:', error);
    return NextResponse.json(
      { error, message: `Trying to start the Curator's Request for ${body.name}, ${body.email}, but failed.` },
      { status: 500 },
    );
  } catch (error) {
    console.error('Redirect API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

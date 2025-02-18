import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { DEFAULT_OPTIONS, PLAYER_EMAIL_COOKIE_NAME, PLAYER_NAME_COOKIE_NAME } from './utils/cookieConfig';

export function middleware(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const nParam = searchParams.get('n');
  const eParam = searchParams.get('e');

  if (nParam && eParam) {
    const response = NextResponse.redirect(new URL(request.nextUrl.pathname, request.url));

    // Set name cookie
    response.cookies.set({
      name: PLAYER_NAME_COOKIE_NAME,
      value: nParam,
      path: '/',
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      expires: DEFAULT_OPTIONS.expires,
      domain: request.nextUrl.hostname,
    });

    // Set email cookie
    response.cookies.set({
      name: PLAYER_EMAIL_COOKIE_NAME,
      value: eParam,
      path: '/',
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      expires: DEFAULT_OPTIONS.expires,
      domain: request.nextUrl.hostname,
    });

    // Set both cookies in headers
    response.headers.append(
      'Set-Cookie',
      `${PLAYER_NAME_COOKIE_NAME}=${nParam}; Path=/; Max-Age=${DEFAULT_OPTIONS.expires as number}; SameSite=Lax`,
    );
    response.headers.append(
      'Set-Cookie',
      `${PLAYER_EMAIL_COOKIE_NAME}=${eParam}; Path=/; Max-Age=${DEFAULT_OPTIONS.expires as number}; SameSite=Lax`,
    );

    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * 1. /api/ (API routes)
     * 2. /_next/ (Next.js internals)
     * 3. /_static (inside /public)
     * 4. /_vercel (Vercel internals)
     * 5. /favicon.ico, /sitemap.xml (static files)
     */
    '/((?!api|_next|_static|_vercel|favicon.ico|sitemap.xml).*)',
  ],
};

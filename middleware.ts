import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const publicPaths = ['/login', '/register', '/auth/magic', '/auth/callback', '/'];

export function middleware(request: NextRequest) {
    const token = request.cookies.get('token')?.value;
    const { pathname } = request.nextUrl;

    const isPublicPath = publicPaths.some(path => pathname.startsWith(path));
    const isApiPath = pathname.startsWith('/api');

    if (isApiPath) return NextResponse.next();

    if (!token && !isPublicPath) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    if (token && (pathname === '/login' || pathname === '/register')) {
        return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const publicPaths = ['/login', '/register', '/auth/magic', '/auth/callback', '/'];

export function middleware(request: NextRequest) {
    const token = request.cookies.get('token')?.value;
    const { pathname } = request.nextUrl;

    const isPublicPath = publicPaths.some(path => pathname === path || pathname.startsWith(path));
    const isApiPath = pathname.startsWith('/api');
    const isStaticAsset = pathname.startsWith('/_next') || pathname.includes('.');

    if (isApiPath || isStaticAsset) {
        return NextResponse.next();
    }

    // ✅ Cek token
    if (!token && !isPublicPath) {
        const loginUrl = new URL('/login', request.url);
        return NextResponse.redirect(loginUrl);
    }

    // ✅ Cek token, jika ada dan di public path, redirect ke dashboard
    if (token && isPublicPath && pathname !== '/') {
        return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/((?!_next/static|_next/image|favicon.ico|public/).*)',
    ],
};

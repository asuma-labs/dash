import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const publicPaths = ['/login', '/register', '/auth/magic', '/auth/callback'];

export function middleware(request: NextRequest) {
    const token = request.cookies.get('token')?.value;
    const { pathname } = request.nextUrl;

    const isApiPath = pathname.startsWith('/api');
    const isStaticAsset = pathname.startsWith('/_next') || pathname.includes('.');

    if (isApiPath || isStaticAsset) {
        return NextResponse.next();
    }

    // Halaman root '/' juga publik
    if (pathname === '/') {
        return NextResponse.next();
    }

    // Cek apakah path termasuk public
    const isPublicPath = publicPaths.some(path => pathname === path);

    // Jika tidak punya token dan bukan public path, redirect ke login
    if (!token && !isPublicPath) {
        const loginUrl = new URL('/login', request.url);
        return NextResponse.redirect(loginUrl);
    }

    // Jika punya token dan mencoba akses halaman public (login/register)
    if (token && isPublicPath) {
        return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/((?!_next/static|_next/image|favicon.ico|public/).*)',
    ],
};

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const token = request.cookies.get('token')?.value;
    const { pathname } = request.nextUrl;

    const isApiPath = pathname.startsWith('/api');
    const isStaticAsset = pathname.startsWith('/_next') || pathname.includes('.');
    const isAuthPath = pathname === '/login' || pathname === '/register';
    const isDashboardPath = pathname === '/dashboard' || pathname.startsWith('/dashboard/');
    const isRoot = pathname === '/';

    if (isApiPath || isStaticAsset) {
        return NextResponse.next();
    }

    // Root: redirect ke dashboard jika sudah login, ke login jika belum
    if (isRoot) {
        if (token) {
            return NextResponse.redirect(new URL('/dashboard', request.url));
        }
        return NextResponse.next();
    }

    // Auth pages: redirect ke dashboard jika sudah login
    if (isAuthPath && token) {
        return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    // Dashboard pages: redirect ke login jika belum login
    if (isDashboardPath && !token) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/((?!_next/static|_next/image|favicon.ico|public/).*)',
    ],
};

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Tentukan path publik secara eksak
const publicPaths = ['/login', '/register', '/auth/magic', '/auth/callback', '/'];

export function middleware(request: NextRequest) {
    const token = request.cookies.get('token')?.value;
    const { pathname } = request.nextUrl;

    const isApiPath = pathname.startsWith('/api');
    const isStaticAsset = pathname.startsWith('/_next') || pathname.includes('.');

    if (isApiPath || isStaticAsset) {
        return NextResponse.next();
    }

    // 🔴 PERBAIKAN: Gunakan equals eksak, atau jika butuh sub-path gunakan kondisi khusus
    const isPublicPath = publicPaths.some(path => {
        if (path === '/') return pathname === '/'; // khusus root harus sama persis
        return pathname === path || pathname.startsWith(path + '/');
    });

    // ✅ Jika TIDAK punya token dan mencoba akses halaman privat -> Lempar ke /login
    if (!token && !isPublicPath) {
        const loginUrl = new URL('/login', request.url);
        return NextResponse.redirect(loginUrl);
    }

    // ✅ Jika PUNYA token dan mencoba akses halaman publik (kecuali root '/') -> Lempar ke /dashboard
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

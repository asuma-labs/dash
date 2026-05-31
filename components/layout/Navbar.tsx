'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/Button';

export default function Navbar() {
    const pathname = usePathname();
    const { isAuthenticated, user, logout } = useAuth();

    const isActive = (path: string) => pathname === path;

    return (
        <nav className="bg-gray-900 border-b border-gray-800 sticky top-0 z-50">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                <Link href="/" className="text-xl font-bold text-white hover:text-blue-400 transition">
                    Asuma MD
                </Link>

                <div className="flex items-center gap-4">
                    {isAuthenticated ? (
                        <>
                            <Link href="/dashboard" className={`px-3 py-2 rounded transition ${isActive('/dashboard') ? 'bg-gray-800 text-blue-400' : 'hover:bg-gray-800'}`}>
                                Dashboard
                            </Link>
                            <div className="flex items-center gap-3">
                                <span className="text-sm text-gray-400">{user?.username}</span>
                                <Button onClick={logout} variant="danger" className="px-3 py-1 text-sm">
                                    Logout
                                </Button>
                            </div>
                        </>
                    ) : (
                        <>
                            <Link href="/login" className={`px-3 py-2 rounded transition ${isActive('/login') ? 'bg-gray-800 text-blue-400' : 'hover:bg-gray-800'}`}>
                                Login
                            </Link>
                            <Link href="/register" className={`px-3 py-2 rounded transition ${isActive('/register') ? 'bg-gray-800 text-blue-400' : 'hover:bg-gray-800'}`}>
                                Register
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}

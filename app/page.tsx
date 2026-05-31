'use client';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/Button';

export default function HomePage() {
    const { isAuthenticated } = useAuth();

    return (
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] text-center">
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                Asuma MD
            </h1>
            <p className="text-xl text-gray-400 mb-8">Multi Device WhatsApp Bot Dashboard</p>

            <div className="flex gap-4">
                {isAuthenticated ? (
                    <Link href="/dashboard">
                        <Button>Go to Dashboard</Button>
                    </Link>
                ) : (
                    <>
                        <Link href="/login">
                            <Button>Login</Button>
                        </Link>
                        <Link href="/register">
                            <Button variant="secondary">Register</Button>
                        </Link>
                    </>
                )}
            </div>
        </div>
    );
}

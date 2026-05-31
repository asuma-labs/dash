// frontend/app/auth/callback/CallbackClient.tsx
'use client';
import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { setToken } from '@/lib/auth';
import { useAuthStore } from '@/store/auth.store';

export default function CallbackClient() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { setAuth } = useAuthStore();

    useEffect(() => {
        const token = searchParams.get('token');
        if (token) {
            setToken(token);
            // Fetch user data
            fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/me`, {
                headers: { Authorization: `Bearer ${token}` },
            })
                .then((res) => res.json())
                .then((user) => {
                    setAuth(user, token);
                    router.push('/dashboard');
                })
                .catch(() => router.push('/login'));
        } else {
            router.push('/login');
        }
    }, [router, searchParams, setAuth]);

    return <div className="text-center py-20">Processing...</div>;
}

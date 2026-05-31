'use client';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { authService } from '@/services/auth.service';
import { setToken } from '@/lib/auth';
import { useAuthStore } from '@/store/auth.store';

export default function MagicPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { setAuth } = useAuthStore();
    const [error, setError] = useState('');

    useEffect(() => {
        const token = searchParams.get('token');
        if (!token) {
            setError('Invalid token');
            setTimeout(() => router.push('/login'), 2000);
            return;
        }

        const verifyMagic = async () => {
            try {
                const res = await authService.magicLogin(token);
                setToken(res.token);
                setAuth(res.user, res.token);
                router.push('/dashboard');
            } catch (err) {
                setError('Magic link expired or invalid');
                setTimeout(() => router.push('/login'), 2000);
            }
        };
        verifyMagic();
    }, [router, searchParams, setAuth]);

    if (error) {
        return <div className="text-center text-red-400 py-20">{error}</div>;
    }

    return <div className="text-center py-20">Logging in via magic link...</div>;
}

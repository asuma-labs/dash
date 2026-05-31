'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

export default function LoginPage() {
    const { login } = useAuth();
    const router = useRouter();
    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            await login(identifier, password);
            router.push('/dashboard');
        } catch (err: any) {
            setError(err.response?.data?.error || 'Login gagal');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-gray-900 rounded-lg p-8 border border-gray-800">
            <h1 className="text-2xl font-bold text-center mb-6">Login</h1>

            <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                    <div className="bg-red-600/20 border border-red-600 text-red-400 p-3 rounded text-sm">
                        {error}
                    </div>
                )}

                <Input
                    label="Username / Phone Number"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    placeholder="asuma or 628123456789"
                    required
                />

                <Input
                    label="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                />

                <Button type="submit" disabled={loading} className="w-full">
                    {loading ? 'Loading...' : 'Login'}
                </Button>
            </form>

            <p className="text-center text-gray-400 mt-4 text-sm">
                Belum punya akun?{' '}
                <Link href="/register" className="text-blue-400 hover:underline">
                    Daftar di sini
                </Link>
            </p>
        </div>
    );
}

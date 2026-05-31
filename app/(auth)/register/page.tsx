'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

export default function RegisterPage() {
    const { register } = useAuth();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            await register(username, password, phoneNumber || undefined);
        } catch (err: any) {
            setError(err.response?.data?.error || 'Registrasi gagal');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-gray-900 rounded-lg p-8 border border-gray-800">
            <h1 className="text-2xl font-bold text-center mb-6">Register</h1>

            <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                    <div className="bg-red-600/20 border border-red-600 text-red-400 p-3 rounded text-sm">
                        {error}
                    </div>
                )}

                <Input
                    label="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="asuma"
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

                <Input
                    label="Phone Number (optional)"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="628123456789"
                />

                <Button type="submit" disabled={loading} className="w-full">
                    {loading ? 'Loading...' : 'Register'}
                </Button>
            </form>

            <p className="text-center text-gray-400 mt-4 text-sm">
                Sudah punya akun?{' '}
                <Link href="/login" className="text-blue-400 hover:underline">
                    Login di sini
                </Link>
            </p>
        </div>
    );
}

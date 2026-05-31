'use client';
import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { botService } from '@/services/bot.service';
import type { BotStatus, SystemStats, CloneBot } from '@/types/bot';

export default function DashboardPage() {
    const { user, isAuthenticated, isLoading } = useAuth();
    const [status, setStatus] = useState<BotStatus | null>(null);
    const [stats, setStats] = useState<SystemStats | null>(null);
    const [clones, setClones] = useState<CloneBot[]>([]);
    const [dataLoading, setDataLoading] = useState(true);

    useEffect(() => {
        if (!isAuthenticated) return;
        
        const fetchData = async () => {
            try {
                const [statusRes, statsRes, clonesRes] = await Promise.all([
                    botService.getStatus(),
                    botService.getStats(),
                    botService.getClones(),
                ]);
                setStatus(statusRes);
                setStats(statsRes);
                setClones(clonesRes);
            } catch (err) {
                console.error(err);
            } finally {
                setDataLoading(false);
            }
        };
        fetchData();

        const interval = setInterval(fetchData, 30000);
        return () => clearInterval(interval);
    }, [isAuthenticated]);

    if (isLoading || dataLoading) {
        return <div className="text-center py-20">Loading dashboard...</div>;
    }

    if (!isAuthenticated) {
        return null;
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold">Welcome, {user?.username}!</h1>
                <p className="text-gray-400">Dashboard bot WhatsApp Asuma MD</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                    <h3 className="text-lg font-semibold mb-4">🤖 Bot Status</h3>
                    {status && (
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                                <span className="text-gray-400">Status:</span>
                                <span className={status.status === 'connected' ? 'text-green-400' : 'text-red-400'}>
                                    {status.status || 'Unknown'}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-400">Mode:</span>
                                <span>{status.public ? 'Public' : 'Self'}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-400">Uptime:</span>
                                <span>{Math.floor(status.uptime)}s</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-400">Clone Bots:</span>
                                <span>{status.clones}</span>
                            </div>
                        </div>
                    )}
                </div>

                <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                    <h3 className="text-lg font-semibold mb-4">💻 System Stats</h3>
                    {stats && (
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                                <span className="text-gray-400">RAM Used:</span>
                                <span>{stats.ram.used.toFixed(2)} MB</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-400">Platform:</span>
                                <span>{stats.platform}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-400">Runtime:</span>
                                <span>{stats.isBun ? 'Bun' : 'Node.js'}</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                <h3 className="text-lg font-semibold mb-4">📱 Clone Bots ({clones.length})</h3>
                {clones.length === 0 ? (
                    <p className="text-gray-400 text-center">No active clone bots</p>
                ) : (
                    <div className="space-y-2">
                        {clones.map((clone) => (
                            <div key={clone.nomor} className="flex justify-between items-center p-3 bg-gray-800 rounded-lg">
                                <span className="font-mono">{clone.nomor}</span>
                                <span className="text-green-400 text-sm">● Online</span>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

'use client';
import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { botService } from '@/services/bot.service';
import type { BotStatus, SystemStats, CloneBot } from '@/types/bot';
import { BotStatusCard } from '@/components/dashboard/BotStatus';
import { CloneList } from '@/components/dashboard/CloneList';
import { SystemStatsCard } from '@/components/dashboard/SystemStats';

export default function DashboardPage() {
    const { user } = useAuth();
    const [status, setStatus] = useState<BotStatus | null>(null);
    const [stats, setStats] = useState<SystemStats | null>(null);
    const [clones, setClones] = useState<CloneBot[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
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
                setLoading(false);
            }
        };
        fetchData();

        const interval = setInterval(fetchData, 10000);
        return () => clearInterval(interval);
    }, []);

    if (loading) {
        return <div className="text-center py-20">Loading dashboard...</div>;
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold">Welcome, {user?.username}!</h1>
                <p className="text-gray-400">Dashboard bot WhatsApp Asuma MD</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                <BotStatusCard status={status} />
                <SystemStatsCard stats={stats} />
            </div>

            <CloneList clones={clones} />
        </div>
    );
}

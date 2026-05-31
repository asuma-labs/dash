'use client';
import type { SystemStats } from '@/types/bot';

export const SystemStatsCard = ({ stats }: { stats: SystemStats | null }) => {
    if (!stats) return null;

    return (
        <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
            <h3 className="text-lg font-semibold mb-4">💻 System Stats</h3>
            <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                    <span className="text-gray-400">RAM Used:</span>
                    <span>{stats.ram.used.toFixed(2)} MB</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-gray-400">Heap Total:</span>
                    <span>{stats.ram.heapTotal.toFixed(2)} MB</span>
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
        </div>
    );
};

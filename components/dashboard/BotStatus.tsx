'use client';
import type { BotStatus } from '@/types/bot';

export const BotStatusCard = ({ status }: { status: BotStatus | null }) => {
    if (!status) return null;

    return (
        <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
            <h3 className="text-lg font-semibold mb-4">🤖 Bot Status</h3>
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
        </div>
    );
};

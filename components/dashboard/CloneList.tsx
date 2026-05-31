'use client';
import { useState } from 'react';
import type { CloneBot } from '@/types/bot';
import { botService } from '@/services/bot.service';
import { Button } from '@/components/ui/Button';

export const CloneList = ({ clones }: { clones: CloneBot[] }) => {
    const [stopping, setStopping] = useState<string | null>(null);
    const [localClones, setLocalClones] = useState(clones);

    const handleStop = async (nomor: string) => {
        setStopping(nomor);
        try {
            await botService.stopClone(nomor);
            setLocalClones((prev) => prev.filter((c) => c.nomor !== nomor));
        } catch (err) {
            console.error(err);
        } finally {
            setStopping(null);
        }
    };

    if (localClones.length === 0) {
        return (
            <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                <h3 className="text-lg font-semibold mb-4">📱 Clone Bots</h3>
                <p className="text-gray-400 text-center">No active clone bots</p>
            </div>
        );
    }

    return (
        <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
            <h3 className="text-lg font-semibold mb-4">📱 Clone Bots ({localClones.length})</h3>
            <div className="space-y-2">
                {localClones.map((clone) => (
                    <div key={clone.nomor} className="flex justify-between items-center p-3 bg-gray-800 rounded-lg">
                        <div>
                            <span className="font-mono">{clone.nomor}</span>
                            <span className="ml-3 text-green-400 text-sm">● Online</span>
                        </div>
                        <Button
                            onClick={() => handleStop(clone.nomor)}
                            disabled={stopping === clone.nomor}
                            variant="danger"
                            className="px-3 py-1 text-sm"
                        >
                            {stopping === clone.nomor ? 'Stopping...' : 'Stop'}
                        </Button>
                    </div>
                ))}
            </div>
        </div>
    );
};

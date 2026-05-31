import { api } from '@/lib/axios';
import type { BotStatus, SystemStats, CloneBot } from '@/types/bot';

export const botService = {
    getStatus: async (): Promise<BotStatus> => {
        const res = await api.get('/api/bot/status');
        return res.data;
    },

    getStats: async (): Promise<SystemStats> => {
        const res = await api.get('/api/system/stats');
        return res.data;
    },

    getClones: async (): Promise<CloneBot[]> => {
        const res = await api.get('/api/clones');
        return res.data;
    },

    stopClone: async (nomor: string): Promise<{ success: boolean }> => {
        const res = await api.post('/api/clone/stop', { nomor });
        return res.data;
    },
};

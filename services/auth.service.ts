import { api } from '@/lib/axios';
import type { LoginRequest, RegisterRequest, AuthResponse } from '@/types/auth';

export const authService = {
    register: async (data: RegisterRequest): Promise<AuthResponse> => {
        const res = await api.post('/api/register', data);
        return res.data;
    },

    login: async (data: LoginRequest): Promise<AuthResponse> => {
        const res = await api.post('/api/login', data);
        return res.data;
    },

    magicLogin: async (token: string): Promise<AuthResponse> => {
        const res = await api.get(`/api/auth/magic?token=${token}`);
        return res.data;
    },

    getProfile: async (userId: string): Promise<AuthResponse['user']> => {
        const res = await api.get(`/api/user/${userId}`);
        return res.data;
    },
};

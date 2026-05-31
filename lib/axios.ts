import axios from 'axios';
import { getToken, removeToken } from '@/lib/auth';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://bot.asuma.my.id';

export const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 30000,
    withCredentials: true,
});

// ✅ KONSISTEN: Ambil token hanya dari cookie lewat helper getToken()
api.interceptors.request.use((config) => {
    const token = getToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// ✅ AMAN: Jika backend melempar 401, hapus session secara bersih tanpa memicu tabrakan redirect
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response?.status === 401) {
            // Bersihkan token dari Cookie dan LocalStorage sekaligus
            removeToken();
            localStorage.removeItem('token');
            
            // Lakukan hard reload aman agar middleware Next.js yang menangani redirect ke /login
            if (typeof window !== 'undefined') {
                window.location.reload();
            }
        }
        return Promise.reject(error);
    }
);

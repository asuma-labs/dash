import { useEffect, useState } from 'react';
import { useAuthStore } from '@/store/auth.store';
import { authService } from '@/services/auth.service';
import { setToken, removeToken, getToken, getUserFromToken } from '@/lib/auth';

export const useAuth = () => {
    const [isLoading, setIsLoading] = useState(true);
    const { user, token, setAuth, logout: storeLogout, updateUser } = useAuthStore();

    useEffect(() => {
        const initAuth = async () => {
            const storedToken = getToken();
            if (storedToken) {
                const userData = getUserFromToken();
                if (userData) {
                    setAuth(userData as any, storedToken);
                }
            }
            setIsLoading(false);
        };
        initAuth();
    }, [setAuth]);

    const login = async (identifier: string, password: string) => {
        const res = await authService.login({ identifier, password });
        // Simpan token ke tempat yang bisa dibaca oleh Middleware & Axios
        setToken(res.token);
        localStorage.setItem('token', res.token); // Opsional sebagai cadangan backward-compatibility
        setAuth(res.user, res.token);
        return res;
    };

    const register = async (username: string, password: string, phone_number?: string, email?: string) => {
        const res = await authService.register({ username, password, phone_number, email });
        setToken(res.token);
        localStorage.setItem('token', res.token);
        setAuth(res.user, res.token);
        return res;
    };

    const logout = () => {
        removeToken(); // Hapus cookie
        localStorage.removeItem('token'); // Hapus localstorage
        storeLogout(); // Reset zustand store
    };

    return {
        user,
        token,
        isAuthenticated: !!user && !!token,
        isLoading,
        login,
        register,
        logout,
        updateUser,
    };
};

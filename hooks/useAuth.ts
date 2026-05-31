import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/auth.store';
import { authService } from '@/services/auth.service';
import { setToken, removeToken, getUserFromToken } from '@/lib/auth';

export const useAuth = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const { user, token, setAuth, logout: storeLogout, updateUser } = useAuthStore();

    useEffect(() => {
        const initAuth = async () => {
            const storedToken = getToken();
            if (storedToken) {
                const userData = getUserFromToken(storedToken);
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
        setToken(res.token);
        setAuth(res.user, res.token);
        router.push('/dashboard');
        return res;
    };

    const register = async (username: string, password: string, phone_number?: string, email?: string) => {
        const res = await authService.register({ username, password, phone_number, email });
        setToken(res.token);
        setAuth(res.user, res.token);
        router.push('/dashboard');
        return res;
    };

    const logout = () => {
        removeToken();
        storeLogout();
        router.push('/login');
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

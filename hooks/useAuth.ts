import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/auth.store';
import { authService } from '@/services/auth.service';
import { setToken, removeToken } from '@/lib/auth';

export const useAuth = () => {
    const router = useRouter();
    const { user, token, setAuth, logout: storeLogout, updateUser } = useAuthStore();

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
        login,
        register,
        logout,
        updateUser,
    };
};

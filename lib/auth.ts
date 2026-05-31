import { jwtDecode } from 'jwt-decode';

interface JwtPayload {
    id: string;
    username: string;
    exp: number;
}

export const setToken = (token: string) => {
    document.cookie = `token=${token}; path=/; max-age=604800; SameSite=Lax`;
    localStorage.setItem('token', token);
};

export const getToken = (): string | null => {
    if (typeof document === 'undefined') return null;
    const match = document.cookie.match(/token=([^;]+)/);
    if (match) return match[1];
    return localStorage.getItem('token');
};

export const removeToken = () => {
    document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT';
    localStorage.removeItem('token');
};

export const isAuthenticated = (): boolean => {
    const token = getToken();
    if (!token) return false;
    try {
        const decoded = jwtDecode<JwtPayload>(token);
        return decoded.exp > Date.now() / 1000;
    } catch {
        return false;
    }
};

export const getUserFromToken = (): JwtPayload | null => {
    const token = getToken();
    if (!token) return null;
    try {
        return jwtDecode<JwtPayload>(token);
    } catch {
        return null;
    }
};

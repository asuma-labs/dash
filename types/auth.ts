export interface User {
    id: string;
    username: string;
    email?: string;
    phone_number?: string;
    level: number;
    exp: number;
    gold: number;
    avatar?: string;
    created_at: string;
    last_login?: string;
}

export interface LoginRequest {
    identifier: string;
    password: string;
}

export interface RegisterRequest {
    username: string;
    password: string;
    phone_number?: string;
    email?: string;
}

export interface AuthResponse {
    success: boolean;
    token: string;
    user: User;
}

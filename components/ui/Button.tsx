'use client';
import { ReactNode } from 'react';

interface ButtonProps {
    children: ReactNode;
    onClick?: () => void;
    type?: 'button' | 'submit' | 'reset';
    variant?: 'primary' | 'secondary' | 'danger';
    disabled?: boolean;
    className?: string;
}

export const Button = ({ children, onClick, type = 'button', variant = 'primary', disabled = false, className = '' }: ButtonProps) => {
    const variants = {
        primary: 'bg-blue-600 hover:bg-blue-700',
        secondary: 'bg-gray-700 hover:bg-gray-600',
        danger: 'bg-red-600 hover:bg-red-700',
    };

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`px-4 py-2 rounded font-semibold transition-colors disabled:opacity-50 ${variants[variant]} ${className}`}
        >
            {children}
        </button>
    );
};

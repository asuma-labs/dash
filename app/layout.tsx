import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/Navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Asuma MD - WhatsApp Bot Dashboard',
    description: 'Dashboard untuk Asuma Multi Device WhatsApp Bot',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className={`${inter.className} bg-gray-950 text-white min-h-screen`}>
                <Navbar />
                <main className="container mx-auto px-4 py-8 max-w-6xl">
                    {children}
                </main>
            </body>
        </html>
    );
}

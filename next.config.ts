import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'cdn.asuma.my.id',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: '**.vercel.app',
                port: '',
                pathname: '/**',
            },
        ],
    },
    output: 'standalone',
    swcMinify: true,
    compress: true,
    poweredByHeader: false,
    reactStrictMode: true,
    experimental: {
        optimizePackageImports: ['axios', 'jwt-decode'],
    },
};

export default nextConfig;

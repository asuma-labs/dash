import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    images: {
        domains: ['cdn.asuma.my.id'],
    },
    output: 'standalone',
    swcMinify: true,
    compress: true,
};

export default nextConfig;

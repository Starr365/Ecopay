import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  async rewrites() {
    return [
      {
        source: '/proxy-api/:path*',
        destination: 'https://ecopay-eight.vercel.app/api/:path*',
      },
    ];
  },
};

export default nextConfig;

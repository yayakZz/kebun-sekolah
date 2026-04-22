import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: [
    '192.168.0.198', 
    '192.168.100.253', 
    '192.168.1.1',
    'localhost'
  ],
  experimental: {
    serverActions: {
      allowedOrigins: [
        'localhost:3000', 
        '192.168.0.198:3000', 
        '192.168.100.253:3000', 
        '192.168.1.1:3000'
      ]
    }
  }
};

export default nextConfig;

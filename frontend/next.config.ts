import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/dmfio7two/**', 
      },
    ],
  },

  reactCompiler: true,
};

export default nextConfig;

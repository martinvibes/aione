import { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://zerepy-2.onrender.com/:path*",
      },
    ];
  },
  pwa: {
    disable: true,
    dest: "public",
  },
  images: {
    domains: ["coin-images.coingecko.com"],
  },
};

export default nextConfig;

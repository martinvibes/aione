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
};

export default nextConfig;

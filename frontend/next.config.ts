import type { NextConfig } from "next";
import { env } from "process";

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID:
      env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID,
  },
};

export default nextConfig;

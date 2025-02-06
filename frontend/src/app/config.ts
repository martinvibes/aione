import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { mainnet, base } from "wagmi/chains";

const config = getDefaultConfig({
  appName: "My RainbowKit App",
  projectId: process.env.NEXT_PUBLIC_RAINBOWKIT_PROJECT_ID || "",
  chains: [mainnet, base],
  ssr: true, // If your dApp uses server side rendering (SSR)
});

export default config;

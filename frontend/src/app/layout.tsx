import type { Metadata } from "next";
import { Inter, Merriweather, Space_Mono } from "next/font/google";
import "./globals.css";
import ChatContextProvider from "./useContext/chatContex";
import { MessageProvider } from "./useContext/message-context";
import { Providers } from "./Providers";
import CoinContextProvider from "./useContext/coinContext";
import { AgentLoadProvider } from "./useContext/agent-load-context";
import { Toaster } from "react-hot-toast";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const merriWeather = Merriweather({
  variable: "--font-merri-weather",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const space_Mono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

// export const metadata: Metadata = {
//   title: "AI ONE",
//   description: "Swap, Defi & Automate with AI-ONE",
// };

export const metadata:Metadata = {
  metadataBase: new URL("https://aione-s.vercel.app/"),
  title: {
    default: "AI ONE",
    template: "%s | AI ONE",
  },
  description: `AI ONE is an all-in-one AI-powered chat platform designed for managing DeFi transactions across the Sonic platform and various blockchain networks. It simplifies actions like token swapping, sending Sonic assets, and bridging cryptocurrencies between Solana and Sonic.`,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${merriWeather.variable} ${space_Mono.variable} antialiased bg-[#0A0F1E]`}
      >
        <Toaster
          position="bottom-right"
          reverseOrder={false}
          gutter={8}
          containerClassName=""
          containerStyle={{}}
          toastOptions={{
            // Define default options
            className: "",
            duration: 5000,
            removeDelay: 1000,
            style: {
              background: "#fff",
              color: "#363636",
            },

            // Default options for specific types
            success: {
              duration: 3000,
              iconTheme: {
                primary: "green",
                secondary: "black",
              },
            },
          }}
        />
        <Providers>
          <AgentLoadProvider>
            <MessageProvider>
              <ChatContextProvider>
                <CoinContextProvider>{children}</CoinContextProvider>
              </ChatContextProvider>
            </MessageProvider>
          </AgentLoadProvider>
        </Providers>
      </body>
    </html>
  );
}

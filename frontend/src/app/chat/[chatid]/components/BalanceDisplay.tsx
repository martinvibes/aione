import React from "react";
import { Coins, Wallet, ExternalLink } from "lucide-react";

interface BalanceDisplayProps {
  balance: string | number;
  tokenName?: string;
  walletAddress?: string;
  tokenAddress?: string;
}

const BalanceDisplay: React.FC<BalanceDisplayProps> = ({
  balance,
  tokenName = "S",
  walletAddress,
  tokenAddress,
}) => {
  const formatAddress = (address: string) =>
    `${address.slice(0, 6)}...${address.slice(-4)}`;

  return (
    <div className="relative w-full max-w-md">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-xl animate-gradient-x" />
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 mix-blend-overlay" />

      <div className="relative bg-gradient-to-r from-slate-900/90 to-slate-800/90 p-6 rounded-xl border border-white/10 backdrop-blur-sm">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="absolute inset-0 bg-blue-500/30 rounded-full blur animate-pulse" />
              <div className="relative bg-gradient-to-r from-blue-500 to-purple-500 p-3 rounded-full">
                <Coins className="w-6 h-6 text-white" />
              </div>
            </div>
            <div>
              <h3 className="text-sm text-gray-400">Current Balance</h3>
              <div className="flex items-baseline space-x-2">
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-transparent bg-clip-text">
                  {Number(balance).toFixed(4)}
                </span>
                <span className="text-lg text-gray-300">{tokenName}</span>
              </div>
            </div>
          </div>

          <div className="h-12 w-12 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-[1px] animate-spin-slow">
            <div className="h-full w-full rounded-full bg-slate-900 flex items-center justify-center">
              <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                {tokenName}
              </span>
            </div>
          </div>
        </div>

        {(walletAddress || tokenAddress) && (
          <div className="space-y-3 text-sm">
            {walletAddress && (
              <div className="flex items-center justify-between p-3 rounded-lg bg-slate-800/50 border border-white/5">
                <div className="flex items-center space-x-2">
                  <Wallet className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-400">Wallet</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-gray-300">
                    {formatAddress(walletAddress)}
                  </span>
                  <a
                    href={`https://sonicscan.org/address/${walletAddress}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            )}

            {tokenAddress && (
              <div className="flex items-center justify-between p-3 rounded-lg bg-slate-800/50 border border-white/5">
                <div className="flex items-center space-x-2">
                  <Coins className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-400">Token</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-gray-300">
                    {formatAddress(tokenAddress)}
                  </span>
                  <a
                    href={`https://sonicscan.org/token/${tokenAddress}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            )}
          </div>
        )}

        <div className="mt-4 flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="text-xs text-gray-400">Live Balance</span>
        </div>
      </div>
    </div>
  );
};

export default BalanceDisplay;

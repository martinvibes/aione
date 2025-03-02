import React, { useState } from "react";
import { Coins, Copy, ExternalLink, Check } from "lucide-react";

interface TokenTickerDisplayProps {
  tokenName: string;
  tokenAddress: string;
}

const TokenTickerDisplay: React.FC<TokenTickerDisplayProps> = ({
  tokenName,
  tokenAddress,
}) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative w-full max-w-md">
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20 rounded-xl blur-md" />

      <div className="relative bg-gradient-to-br from-slate-900/95 to-slate-800/95 p-6 rounded-xl border border-indigo-500/30 shadow-xl backdrop-blur-sm">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="absolute inset-0 bg-indigo-500/30 rounded-full blur-sm" />
              <div className="relative bg-gradient-to-r from-indigo-500 to-purple-500 p-2 rounded-full">
                <Coins className="w-5 h-5 text-white" />
              </div>
            </div>
            <div>
              <h3 className="font-bold text-indigo-400">Token Information</h3>
              <p className="text-sm text-gray-400">Contract address details</p>
            </div>
          </div>

          <div className="h-10 w-10 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-[1px]">
            <div className="h-full w-full rounded-full bg-slate-900 flex items-center justify-center">
              <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
                {tokenName}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-slate-800/50 p-3 rounded-lg mb-3 border border-indigo-500/20">
          <div className="flex justify-between items-center">
            <span className="text-gray-400 text-sm">Token Name</span>
            <span className="font-semibold text-white">{tokenName}</span>
          </div>
        </div>

        <div className="bg-slate-800/50 p-4 rounded-lg border border-indigo-500/20">
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-400 text-sm">Contract Address</span>
            <div className="flex space-x-2">
              <button
                onClick={() => copyToClipboard(tokenAddress)}
                className="text-indigo-400 hover:text-indigo-300 transition-colors"
                title="Copy to clipboard"
              >
                {copied ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
              <a
                href={`https://sonicscan.org/token/${tokenAddress}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-400 hover:text-indigo-300 transition-colors"
                title="View on blockchain explorer"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div className="bg-slate-900/50 p-3 rounded font-mono text-sm break-all text-indigo-100 border border-indigo-500/10">
            {tokenAddress}
          </div>
        </div>

        <div className="mt-4 flex justify-between">
          <span className="text-xs text-gray-500">Verified on Chain</span>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-xs text-gray-500">Network: Sonic</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TokenTickerDisplay;

// components/SwapSuccess.tsx
import React from "react";
import { Check, ExternalLink, Copy } from "lucide-react";

interface SwapSuccessProps {
  txHash: string;
  fromToken: string;
  toToken: string;
  amount: string;
}

const SwapSuccess: React.FC<SwapSuccessProps> = ({
  txHash,
  fromToken,
  toToken,
  amount,
}) => {
  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const urlHash = txHash.slice(txHash.indexOf("https"));

  return (
    <div className="bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-xl p-6 min-w-[300px]">
      <div className="flex items-center space-x-2 mb-4">
        <div className="bg-emerald-500/20 p-2 rounded-full">
          <Check className="w-6 h-6 text-emerald-500" />
        </div>
        <h3 className="text-lg font-semibold text-emerald-400">
          Swap Successful!
        </h3>
      </div>

      <div className="space-y-3 text-sm">
        <div className="flex justify-between items-center bg-black/20 p-3 rounded-lg">
          <span className="text-gray-400">Amount</span>
          <span className="font-medium">{amount}</span>
        </div>

        <div className="bg-black/20 p-3 rounded-lg space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-gray-400">From</span>
            <span className="font-medium">{formatAddress(fromToken)}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-gray-400">To</span>
            <span className="font-medium">{formatAddress(toToken)}</span>
          </div>
        </div>

        <div className="bg-black/20 p-3 rounded-lg">
          <div className="flex justify-between items-center">
            <span className="text-gray-400">Transaction Hash</span>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => copyToClipboard(txHash)}
                className="hover:text-emerald-400 transition-colors"
              >
                <Copy className="w-4 h-4" />
              </button>
              <a
                href={urlHash}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-emerald-400 transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
          <div className="mt-2 text-xs text-gray-500 break-all">{txHash}</div>
        </div>
      </div>
    </div>
  );
};

export default SwapSuccess;

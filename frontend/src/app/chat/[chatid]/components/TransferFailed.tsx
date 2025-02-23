import React from "react";
import { XCircle, AlertTriangle, Copy, Clock, Ban } from "lucide-react";

interface TransferFailedProps {
  recipientAddress: string;
  amount: string;
  error?: string;
  timestamp?: number;
  onRetry?: () => void;
}

const TransferFailed: React.FC<TransferFailedProps> = ({
  recipientAddress,
  amount,
  error,
  timestamp = Date.now(),
}) => {
  const formatAddress = (address: string | undefined) => {
    if (!address) return "Unknown";
    try {
      return `${address.slice(0, 6)}...${address.slice(-4)}`;
    } catch (error) {
      return `Invalid Address ${error}`;
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="relative w-full max-w-md">
      {/* Animated failed effect */}
      <div className="absolute -inset-1 bg-gradient-to-r from-red-500/50 via-red-800/50 to-red-500/50 rounded-xl blur-lg opacity-20 animate-pulse" />

      <div className="relative bg-gradient-to-b from-slate-900 to-slate-800/95 rounded-xl p-6 border border-red-500/20 shadow-xl backdrop-blur-sm">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="absolute inset-0 bg-red-500/30 rounded-full blur animate-pulse" />
              <div className="relative bg-red-500/20 p-2 rounded-full">
                <XCircle className="w-6 h-6 text-red-500" />
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <AlertTriangle className="w-4 h-4 text-red-500" />
                <h3 className="text-red-500 font-bold">Transfer Failed</h3>
              </div>
              <p className="text-sm text-gray-400">Transaction unsuccessful</p>
            </div>
          </div>

          {/* Animated failed badge */}
          <div className="h-14 w-14 rounded-full bg-gradient-to-r from-red-500 via-red-600 to-red-500 p-[1px]">
            <div className="h-full w-full rounded-full bg-slate-900 flex items-center justify-center relative">
              <Ban className="w-6 h-6 text-red-500 absolute animate-ping opacity-50" />
              <Ban className="w-6 h-6 text-red-500 relative" />
            </div>
          </div>
        </div>

        {/* Failed amount */}
        <div className="bg-slate-800/50 rounded-xl p-4 mb-4 border border-red-500/10">
          <span className="text-gray-400 text-sm">Failed Amount</span>
          <div className="flex items-baseline space-x-2 mt-1">
            <span className="text-2xl font-bold text-white line-through opacity-75">
              {amount}
            </span>
            <span className="text-red-500">S</span>
          </div>
        </div>

        {/* Transfer details */}
        <div className="space-y-3">
          <div className="flex justify-between items-center bg-slate-800/30 p-3 rounded-lg border border-red-500/10">
            <span className="text-gray-400">Attempted To</span>
            <div className="flex items-center space-x-2">
              <span className="text-gray-300">
                {formatAddress(recipientAddress)}
              </span>
              <button
                onClick={() => copyToClipboard(recipientAddress)}
                className="text-red-500 hover:text-red-400 transition-colors"
              >
                <Copy className="w-4 h-4" />
              </button>
            </div>
          </div>

          {error && (
            <div className="bg-red-500/10 p-4 rounded-lg border border-red-500/20">
              <div className="flex items-start space-x-2">
                <AlertTriangle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-red-200">{error}</p>
              </div>
            </div>
          )}
        </div>

        {/* Timestamp */}
        <div className="mt-4 flex items-center justify-between text-xs text-gray-400">
          <div className="flex items-center space-x-1">
            <Clock className="w-3 h-3" />
            <span>{new Date(timestamp).toLocaleString()}</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            <span>Failed</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransferFailed;

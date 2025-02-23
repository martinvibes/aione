// components/SwapFailed.tsx
import React from "react";
import { XOctagon, AlertTriangle, RefreshCcw } from "lucide-react";

interface SwapFailedProps {
  fromToken: string;
  toToken: string;
  amount: string;
  error?: string;
  onRetry?: () => void;
}

const SwapFailed: React.FC<SwapFailedProps> = ({
  fromToken,
  toToken,
  amount,
  error,
  onRetry,
}) => {
  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <div className="relative">
      <div className="absolute inset-0 bg-red-500/20 blur-xl animate-pulse rounded-xl" />

      <div className="relative bg-gradient-to-r from-red-950/90 to-red-900/90 rounded-xl p-6 min-w-[300px] border border-red-500/20 shadow-lg backdrop-blur-sm">
        <div className="flex items-center space-x-3 mb-6">
          <div className="relative">
            <div className="absolute inset-0 bg-red-500 blur-sm rounded-full animate-ping" />
            <div className="bg-red-500/20 p-2 rounded-full relative">
              <XOctagon className="w-6 h-6 text-red-500" />
            </div>
          </div>
          <div>
            <h3 className="text-lg font-bold text-red-500">
              Transaction Failed
            </h3>
            <p className="text-red-400/60 text-sm">
              Swap could not be completed
            </p>
          </div>
        </div>

        <div className="space-y-3 text-sm">
          <div className="flex justify-between items-center bg-red-950/50 p-3 rounded-lg border border-red-500/10">
            <span className="text-red-200/60">Amount</span>
            <span className="font-medium text-red-200">{amount}</span>
          </div>

          <div className="bg-red-950/50 p-3 rounded-lg border border-red-500/10 space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-red-200/60">From</span>
              <span className="font-medium text-red-200">
                {formatAddress(fromToken)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-red-200/60">To</span>
              <span className="font-medium text-red-200">
                {formatAddress(toToken)}
              </span>
            </div>
          </div>

          {error && (
            <div className="bg-red-500/10 p-4 rounded-lg border border-red-500/20">
              <div className="flex items-start space-x-2">
                <AlertTriangle className="w-4 h-4 text-red-500 mt-1 flex-shrink-0" />
                <p className="text-red-200 text-sm">{error}</p>
              </div>
            </div>
          )}

          {onRetry && (
            <button
              onClick={onRetry}
              className="w-full mt-4 bg-red-500/20 hover:bg-red-500/30 text-red-400 py-2 px-4 rounded-lg 
                       border border-red-500/20 transition-all duration-200 flex items-center justify-center space-x-2
                       hover:border-red-500/40 active:transform active:scale-98"
            >
              <RefreshCcw className="w-4 h-4" />
              <span>Retry Swap</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SwapFailed;

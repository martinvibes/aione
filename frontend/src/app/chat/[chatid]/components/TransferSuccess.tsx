import React from "react";
import {
  ArrowUpRight,
  CheckCircle2,
  Copy,
  ExternalLink,
  Clock,
} from "lucide-react";

interface TransferSuccessProps {
  txHash: string;
  recipientAddress: string;
  amount: string;
  timestamp?: number;
}

const TransferSuccess: React.FC<TransferSuccessProps> = ({
  txHash,
  recipientAddress,
  amount,
  timestamp = Date.now(),
}) => {
  const formatAddress = (address: string | undefined) => {
    if (!address) return "Unknown";
    try {
      return `${address.slice(0, 6)}...${address.slice(-4)}`;
    } catch (err) {
      return `Invalid Address ${err}`;
    }
  };

  const copyToClipboard = (text: string | undefined) => {
    if (text) {
      navigator.clipboard.writeText(text);
    }
  };

  const getTransactionUrl = (txHash: string | undefined) => {
    if (!txHash) return "#";
    const httpsIndex = txHash.indexOf("https");
    return httpsIndex >= 0
      ? txHash.slice(httpsIndex)
      : `https://sonicscan.org/tx/${txHash}`;
  };

  return (
    <div className="relative w-full max-w-md">
      <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-500 rounded-xl blur-xl opacity-20 animate-pulse" />

      <div className="relative bg-gradient-to-b from-slate-900 to-slate-800 rounded-xl p-6 border border-emerald-500/20 shadow-xl backdrop-blur-sm">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="absolute inset-0 bg-emerald-500 rounded-full blur animate-pulse" />
              <div className="relative bg-emerald-500/20 p-2 rounded-full">
                <ArrowUpRight className="w-6 h-6 text-emerald-500" />
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <h3 className="text-emerald-500 font-bold">
                  Transfer Complete
                </h3>
              </div>
              <p className="text-sm text-gray-400">Transaction successful</p>
            </div>
          </div>

          <div className="h-14 w-14 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 p-[1px] animate-spin-slow">
            <div className="h-full w-full rounded-full bg-slate-900 flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6 text-emerald-500" />
            </div>
          </div>
        </div>

        <div className="bg-slate-800/50 rounded-xl p-4 mb-4 border border-emerald-500/10">
          <span className="text-gray-400 text-sm">Amount Sent</span>
          <div className="flex items-baseline space-x-2 mt-1">
            <span className="text-2xl font-bold text-white">
              {amount || "0"}
            </span>
            <span className="text-emerald-500">S</span>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between items-center bg-slate-800/30 p-3 rounded-lg border border-emerald-500/10">
            <span className="text-gray-400">To</span>
            <div className="flex items-center space-x-2">
              <span className="text-gray-300">
                {formatAddress(recipientAddress)}
              </span>
              {recipientAddress && (
                <button
                  onClick={() => copyToClipboard(recipientAddress)}
                  className="text-emerald-500 hover:text-emerald-400 transition-colors"
                >
                  <Copy className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          <div className="flex justify-between items-center bg-slate-800/30 p-3 rounded-lg border border-emerald-500/10">
            <span className="text-gray-400 text-sm">Transaction Hash</span>
            <div className="flex items-center space-x-2">
              <span className="text-gray-300 text-sm">
                {formatAddress(txHash)}
              </span>
              {txHash && (
                <>
                  <button
                    onClick={() => copyToClipboard(txHash)}
                    className="text-emerald-500 hover:text-emerald-400 transition-colors"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                  <a
                    href={getTransactionUrl(txHash)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-500 hover:text-emerald-400 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between text-xs text-gray-400">
          <div className="flex items-center space-x-1">
            <Clock className="w-3 h-3" />
            <span>{new Date(timestamp).toLocaleString()}</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            <span>Confirmed</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransferSuccess;

import React from "react";
import { Search, AlertCircle } from "lucide-react";

interface TokenNotFoundProps {
  tokenName: string;
}

const TokenNotFound: React.FC<TokenNotFoundProps> = ({ tokenName }) => {
  return (
    <div className="bg-slate-800/80 p-4 rounded-lg border border-yellow-500/20">
      <div className="flex items-start space-x-3">
        <div className="bg-yellow-500/10 p-2 rounded-full">
          <Search className="w-5 h-5 text-yellow-500" />
        </div>
        <div>
          <div className="flex items-center mb-1">
            <AlertCircle className="w-4 h-4 text-yellow-500 mr-1.5" />
            <h3 className="font-medium text-yellow-500">Token Not Found</h3>
          </div>
          <p className="text-sm text-gray-300">
            Sorry, I couldn&apos;t find the ticker for{" "}
            <span className="font-medium">{tokenName}</span>.
          </p>
          <p className="text-xs text-gray-400 mt-1">
            Try checking the spelling or search for another token.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TokenNotFound;

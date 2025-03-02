import { useEffect, useState } from "react";
import CandleChart from "./candle-chart";
import {
  TrendingUp,
  TrendingDown,
  Clock,
  DollarSign,
  BarChart2,
  PieChart,
} from "lucide-react";

interface TradingInfoProps {
  token: string;
  pair: string;
  timeLeft: string;
  currentPrice: number;
  marketCap: number;
  forecastedPrice: string;
  chartToken: string;
}

export default function TradingInfo({
  token,
  pair,
  timeLeft,
  currentPrice,
  marketCap,
  forecastedPrice,
  chartToken,
}: TradingInfoProps) {
  // console.log(
  //   "TradingInfo",
  //   token,
  //   pair,
  //   timeLeft,
  //   currentPrice,
  //   marketCap,
  //   forecastedPrice,
  //   chartToken,
  //   "thats all"
  // );

  const [animateIn, setAnimateIn] = useState(false);
  const [priceChange, setPriceChange] = useState<"up" | "down" | null>(null);

  useEffect(() => {
    setAnimateIn(true);
    const forecastedValue = parseFloat(
      forecastedPrice.replace(/[^0-9.-]+/g, "")
    );
    if (forecastedValue > currentPrice) {
      setPriceChange("up");
    } else if (forecastedValue < currentPrice) {
      setPriceChange("down");
    }
  }, [forecastedPrice, currentPrice]);

  const formatCurrency = (value: number) => {
    if (value < 0.01) {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 6,
        maximumFractionDigits: 6,
      }).format(value);
    }
    if (value < 1) {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 4,
        maximumFractionDigits: 4,
      }).format(value);
    }
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  // Format market cap to be more readable you get
  const formatMarketCap = (value: number) => {
    if (value >= 1000000000000) {
      return `$${(value / 1000000000000).toFixed(2)}T`;
    }
    if (value >= 1000000000) {
      return `$${(value / 1000000000).toFixed(2)}B`;
    }
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(2)}M`;
    }
    return formatCurrency(value);
  };

  return (
    <div
      className={`flex flex-col gap-4 transition-opacity duration-700 ${
        animateIn ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="w-full rounded-2xl bg-gradient-to-br from-[#0F1117] to-[#161a2c] p-6 border border-blue-900/20 shadow-lg relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:20px_20px]"></div>
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl"></div>

        <div className="relative">
          <div className="flex text-[#78D9E9] items-center justify-between">
            <div className="flex items-baseline gap-2">
              <div className="bg-blue-500/10 p-1.5 rounded-lg mr-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#78D9E9] to-blue-600 flex items-center justify-center text-white font-bold">
                  {token.charAt(0)}
                </div>
              </div>
              <h2 className="text-3xl font-bold tracking-tight">{token}</h2>
              <span className="text-blue-300/70">/{pair}</span>
            </div>
            <div className="text-right flex items-center bg-blue-900/20 px-4 py-1.5 rounded-full">
              <Clock className="w-4 h-4 text-blue-300 mr-2" />
              <div className="flex justify-center items-center">
                <div className="text-xs pr-2 text-blue-300/70">Time Left</div>
                <div className="font-medium text-green-400">{timeLeft}</div>
              </div>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-3 gap-4">
            <div className="bg-[#131722]/80 p-4 rounded-xl border border-[#212746]/50">
              <div className="flex items-center text-gray-400 mb-2">
                <DollarSign className="w-4 h-4 mr-1.5 text-blue-400/70" />
                <div className="text-sm">Current Price</div>
              </div>
              <div className="font-medium text-white text-xl">
                {formatCurrency(currentPrice)}
              </div>
            </div>

            <div className="bg-[#131722]/80 p-4 rounded-xl border border-[#212746]/50">
              <div className="flex items-center text-gray-400 mb-2">
                <PieChart className="w-4 h-4 mr-1.5 text-purple-400/70" />
                <div className="text-sm">Market Cap</div>
              </div>
              <div className="font-medium text-white text-xl">
                {formatMarketCap(marketCap)}
              </div>
            </div>

            <div className="bg-[#131722]/80 p-4 rounded-xl border border-[#212746]/50 relative overflow-hidden">
              {priceChange === "up" && (
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent"></div>
              )}
              {priceChange === "down" && (
                <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent"></div>
              )}

              <div className="relative">
                <div className="flex items-center text-gray-400 mb-2">
                  {priceChange === "up" ? (
                    <TrendingUp className="w-4 h-4 mr-1.5 text-green-400" />
                  ) : priceChange === "down" ? (
                    <TrendingDown className="w-4 h-4 mr-1.5 text-red-400" />
                  ) : (
                    <BarChart2 className="w-4 h-4 mr-1.5 text-yellow-400/70" />
                  )}
                  <div className="text-sm">Forecasted Price</div>
                </div>
                <div
                  className={`font-medium text-xl ${
                    priceChange === "up"
                      ? "text-green-400"
                      : priceChange === "down"
                      ? "text-red-400"
                      : "text-white"
                  }`}
                >
                  {forecastedPrice}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-between items-center">
            <div className="px-4 py-2 bg-blue-900/10 rounded-full text-xs text-blue-300/70 flex items-center">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
              Live Data
            </div>
            <div className="text-right text-sm text-blue-400/50 italic flex items-center">
              Powered by{" "}
              <span className="text-blue-400 ml-1 font-semibold">allora</span>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full rounded-2xl bg-gradient-to-br from-[#0F1117] to-[#161a2c] p-6 border border-blue-900/20 shadow-lg relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:20px_20px]"></div>

        <div className="relative">
          <div className="flex items-center justify-between mb-6">
            <div className="text-lg text-[#78D9E9] font-medium flex items-center">
              <BarChart2 className="w-5 h-5 mr-2 text-blue-400/70" />
              Current Chart for {token}
            </div>

            <div className="flex space-x-2">
              <div className="px-3 py-1 bg-[#131722]/80 rounded-md text-xs text-blue-300/70 border border-[#212746]/50">
                8H
              </div>
              <div className="px-3 py-1 bg-blue-500/10 rounded-md text-xs text-blue-300 border border-blue-500/20">
                1D
              </div>
              <div className="px-3 py-1 bg-[#131722]/80 rounded-md text-xs text-blue-300/70 border border-[#212746]/50">
                1W
              </div>
            </div>
          </div>

          <div className="bg-[#0b0e15]/50 p-4 rounded-xl border border-[#212746]/30">
            <CandleChart token={chartToken} />
          </div>
        </div>
      </div>
    </div>
  );
}

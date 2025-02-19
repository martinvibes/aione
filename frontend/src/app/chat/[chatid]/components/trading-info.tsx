import CandleChart from "./candle-chart";

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
  console.log(
    "TradingInfo",
    token,
    pair,
    timeLeft,
    currentPrice,
    marketCap,
    forecastedPrice,
    chartToken
  );
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

  return (
    <div className="flex flex-col gap-4">
      <div className="w-full rounded-2xl bg-[#0F1117] p-6">
        <div className="flex text-[#72CCD7] items-center justify-between">
          <div className="flex items-baseline gap-2">
            <h2 className="text-3xl font-bold ">{token}</h2>
            <span>/{pair}</span>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-400">Time Left</div>
            <div className="font-medium text-green-400">{timeLeft}</div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-3 gap-8">
          <div>
            <div className="text-sm text-gray-400">Current Price</div>
            <div className="mt-1 font-medium text-white">
              {formatCurrency(currentPrice)}
            </div>
          </div>

          <div>
            <div className="text-sm text-gray-400">MarketCap</div>
            <div className="mt-1 font-medium text-white">
              {formatCurrency(marketCap)}
            </div>
          </div>

          <div>
            <div className="text-sm text-gray-400">Forcasted Price</div>
            <div className="mt-1 font-medium text-white">{forecastedPrice}</div>
          </div>
        </div>

        <div className="mt-4 text-right text-sm text-gray-500 italic">
          Powered by allora
        </div>
      </div>

      <div className="w-full rounded-2xl bg-[#0F1117] p-6">
        <div className="text-lg text-gray-400">Current Chart for {token}</div>
        <br />
        <CandleChart token={chartToken} />
      </div>
    </div>
  );
}

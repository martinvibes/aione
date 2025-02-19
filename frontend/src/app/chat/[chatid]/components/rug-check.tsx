import useFetchCoinInfo from "@/app/hooks/useCoinGeckoGetTokenInfo";
import { RugCheckProps } from "@/lib/types";
import Image from "next/image";
interface CoinInfo {
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  id: any;
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  image: any;
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  description: any;
}
export default function RugCheckComponent({ data, mint }: RugCheckProps) {
  const formattedRiskLevel =
    data.score >= 0 ? `+${data.score}` : `${data.score}`;
  const coin_info = useFetchCoinInfo(mint) as CoinInfo;
  console.log("it is", coin_info, coin_info?.id || "");
  return (
    <div className="w-full">
      <div className="mb-4 text-sm">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-red-500">🚨</span>
          <span className="font-semibold">
            Rug Check Report for Token{" "}
            {`${mint.slice(0, 4)}...${mint.slice(-4)}`}
          </span>
        </div>

        <div className="text-gray-400 mb-2">
          Token Program: <span className="font-mono">{data.tokenProgram}</span>
        </div>

        <div className="mb-4">
          <div className="flex items-center gap-2">
            <span>📊</span>
            <span>
              Risk Score: <span className="font-bold">{data.score}</span>
            </span>
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-2">
            <span>🔍</span>
            <span className="font-semibold">Findings:</span>
          </div>

          <div className="space-y-3">
            {data.risks.map((risk, index) => (
              <div key={index} className="pl-4">
                <div className="font-medium">
                  {risk.name}:{" "}
                  <span className="font-bold">{risk.value || "N/A"}</span>
                </div>
                <div className="flex items-start gap-2 text-gray-400 pl-2">
                  <span>🔹</span>
                  <span>{risk.description}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4 p-3 bg-red-900/20 rounded-lg border border-red-500/20"></div>
      </div>
      <h2 className="mb-2 text-sm text-gray-400">Rug report</h2>
      <div className="rounded-2xl bg-[#0F1117] p-6  grid-cols-[2fr,1fr] gap-6 ">
        {coin_info?.id ? (
          <div className="flex items-start justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden ring-2 ring-gray-700">
                  <Image
                    src={coin_info?.image?.thumb || "/fallback-token-image.png"}
                    alt="Token icon"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-2xl font-bold text-white">
                      {coin_info.id}
                    </h3>
                  </div>
                  <p className="text-sm text-gray-400 mt-1 max-w-[300px] truncate">
                    {(coin_info?.description?.en || "No description available")
                      .split(" ")
                      .slice(0, 20)
                      .join(" ") +
                      (coin_info?.description?.en?.split(" ").length > 20
                        ? "..."
                        : "")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-sm text-gray-400">Coin not found on CoinGecko</p>
        )}
        <br />
        <div>
          <div className="0">Risk Level:</div>
          <div
            className={`text-2xl font-bold ${
              data.score >= 0 ? "text-green-400" : "text-red-400"
            }`}
          >
            {formattedRiskLevel}
          </div>
        </div>
      </div>
    </div>
  );
}

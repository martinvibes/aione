import {RugCheckProps} from "@/lib/types";

export default function RugCheckComponent({
  data,
  mint,
}: RugCheckProps ) {
  const formattedRiskLevel =
    data.score >= 0 ? `+${data.score}` : `${data.score}`;
  return (
    <div className="max-w-md">
      <div className="mb-4 text-sm">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-red-500">🚨</span>
          <span className="font-semibold">
            Rug Check Report for Token {mint}
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

        <div className="mt-4 p-3 bg-red-900/20 rounded-lg border border-red-500/20">
          <div className="flex items-center gap-2">
            <span>⚠️</span>
            <span className="text-red-400">
              Warning: This token has a high-risk profile due to significant
              ownership concentration. Exercise caution before interacting with
              it.
            </span>
          </div>
        </div>
      </div>
      <h2 className="mb-2 text-sm text-gray-400">Rug report</h2>
      <div className="rounded-2xl bg-[#0F1117] p-6">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-semibold text-white">Name</h3>
              {/* {subtitle && (
                <span className="text-sm text-gray-400">{subtitle}</span>
              )} */} Astf
            </div>
            <div className="mt-4">
              <div className="text-sm text-gray-400">Current Price</div>
              <div className="text-2xl font-bold text-white">
                {/* {currentPrice.toLocaleString()} */}
                $0.003
              </div>
            </div>
          </div>
          <div>
            <div className="text-sm text-gray-400">Risk Level:</div>
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
    </div>
  );
}

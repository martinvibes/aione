import useFetchCoinInfo from "@/app/hooks/useCoinGeckoGetTokenInfo";
import { RugCheckProps } from "@/lib/types";
import Image from "next/image";
import {
  Shield,
  AlertTriangle,
  Zap,
  User,
  Users,
  Info,
  ExternalLink,
  Copy,
  Check,
  AlertCircle,
  Lock,
  Activity,
} from "lucide-react";
import { useState, useEffect } from "react";

interface CoinInfo {
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  id: any;
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  image: any;
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  description: any;
}

export default function RugCheckComponent({ data, mint }: RugCheckProps) {
  const [copied, setCopied] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const coin_info = useFetchCoinInfo(mint) as CoinInfo;

  useEffect(() => {
    setIsVisible(true);
    const timer = setTimeout(() => setShowDetails(true), 800);
    return () => clearTimeout(timer);
  }, []);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getRiskCategory = (score: number) => {
    if (score <= 500)
      return {
        label: "VERY SAFE",
        color: "text-green-400",
        bgColor: "bg-green-500/10",
        borderColor: "border-green-500/30",
        textShadow: "0 0 5px rgba(74, 222, 128, 0.5)",
      };
    if (score <= 1000)
      return {
        label: "SAFE",
        color: "text-green-300",
        bgColor: "bg-green-500/10",
        borderColor: "border-green-500/30",
        textShadow: "0 0 5px rgba(74, 222, 128, 0.5)",
      };
    if (score <= 2000)
      return {
        label: "NEUTRAL",
        color: "text-yellow-400",
        bgColor: "bg-yellow-500/10",
        borderColor: "border-yellow-500/30",
        textShadow: "0 0 5px rgba(250, 204, 21, 0.5)",
      };
    if (score <= 5000)
      return {
        label: "RISKY",
        color: "text-orange-400",
        bgColor: "bg-orange-500/10",
        borderColor: "border-orange-500/30",
        textShadow: "0 0 5px rgba(251, 146, 60, 0.5)",
      };
    return {
      label: "HIGH RISK",
      color: "text-red-400",
      bgColor: "bg-red-500/10",
      borderColor: "border-red-500/30",
      textShadow: "0 0 5px rgba(248, 113, 113, 0.5)",
    };
  };

  const riskCategory = getRiskCategory(data.score);
  const formattedRiskLevel = `${data.score}`;
  const isHighRisk = data.score > 2000;

  return (
    <div
      className={`w-full max-w-2xl overflow-hidden shadow-2xl transition-all duration-700 ease-in-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{
        background: "black",
        border: "2px solid",
        borderImageSlice: 1,
        borderImageSource: "linear-gradient(to right, #2463EB, #7C3AED)",
      }}
    >

      <div
        className="p-4 flex items-center justify-between border-b-2 border-blue-600"
        style={{
          background: "linear-gradient(180deg, #000000, #111827)",
          boxShadow: "0 4px 12px rgba(0, 0, 255, 0.15)",
        }}
      >
        <div className="flex items-center">
          <div className="mr-3 relative">
            <div
              className={`absolute inset-0 ${
                isHighRisk ? "bg-red-500" : "bg-green-500"
              } rounded-full blur-md animate-pulse`}
            ></div>
            <Shield
              className={`relative ${
                isHighRisk ? "text-red-500" : "text-green-500"
              } h-6 w-6`}
            />
          </div>
          <h2
            className="font-bold text-xl"
            style={{
              fontFamily: "'VT323', monospace",
              color: "#ffffff",
              textShadow: "0 0 5px #4f46e5",
            }}
          >
            RUG SCAN ANALYSIS
          </h2>
        </div>
        <div className="flex items-center space-x-2">
          <div className="bg-gray-900 px-3 py-1 rounded border border-blue-800">
            <span className="text-xs font-mono text-blue-300">
              {`${mint.slice(0, 6)}...${mint.slice(-4)}`}
            </span>
          </div>
          <button
            onClick={() => copyToClipboard(mint)}
            className="text-blue-400 hover:text-blue-300 transition-colors p-1 bg-blue-900/20 rounded"
            title="Copy token address"
          >
            {copied ? (
              <Check className="h-4 w-4 text-green-400" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>

      <div className="p-5 bg-black relative">
        <div
          className={`p-4 mb-6 relative overflow-hidden ${
            showDetails ? "opacity-100" : "opacity-0"
          } transition-opacity duration-500`}
          style={{
            background: "linear-gradient(180deg, #000000, #0F172A)",
            border: "2px solid",
            borderColor: isHighRisk ? "#EF4444" : "#22C55E",
            borderRadius: "4px",
            boxShadow: isHighRisk
              ? "0 0 15px rgba(239, 68, 68, 0.3)"
              : "0 0 15px rgba(34, 197, 94, 0.3)",
          }}
        >
          <div className="text-center relative z-10">
            <div className="text-gray-300 mb-2 font-mono uppercase tracking-widest text-sm">
              Risk Score
            </div>
            <div
              className={`text-4xl font-bold ${
                isHighRisk ? "text-red-500" : "text-green-500"
              } animate-pulse`}
              style={{
                fontFamily: "'Press Start 2P', cursive",
                textShadow: isHighRisk
                  ? "0 0 10px rgba(239, 68, 68, 0.7)"
                  : "0 0 10px rgba(34, 197, 94, 0.7)",
              }}
            >
              {formattedRiskLevel}
            </div>
            <div
              className={`mt-2 inline-block px-6 py-1 rounded-sm text-sm font-bold ${riskCategory.color}`}
              style={{
                border: "1px solid",
                borderColor: isHighRisk ? "#EF4444" : "#22C55E",
                textShadow: riskCategory.textShadow,
                animation: "blink 2s infinite",
              }}
            >
              {riskCategory.label}
            </div>
          </div>

          <div
            className="absolute inset-0 pointer-events-none opacity-20 z-0"
            style={{
              backgroundImage:
                "linear-gradient(0deg, transparent, rgba(32, 32, 32, 0.7) 50%, transparent)",
              backgroundSize: "100% 4px",
              animation: "scanline 6s linear infinite",
            }}
          ></div>
        </div>

        {/* Coin info with retro styling */}
        <div
          className={`mb-6 transition-all duration-700 ease-in-out ${
            showDetails
              ? "opacity-100 translate-x-0"
              : "opacity-0 -translate-x-8"
          }`}
          style={{
            background: "linear-gradient(180deg, #000000, #111827)",
            border: "1px solid #2563EB",
            borderRadius: "4px",
          }}
        >
          <div className="border-b border-blue-900 px-4 py-2 flex items-center">
            <Zap className="h-4 w-4 text-blue-400 mr-2" />
            <span className="text-blue-300 font-mono text-sm">
              TOKEN INFORMATION
            </span>
          </div>

          <div className="p-4">
            {coin_info?.id ? (
              <div className="flex items-start">
                <div className="relative w-14 h-14 overflow-hidden flex-shrink-0 border-2 border-blue-900 p-1 bg-black">
                  <Image
                    src={coin_info?.image?.thumb || "/fallback-token-image.png"}
                    alt="Token icon"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
                <div className="ml-4 flex-1">
                  <div className="flex items-center justify-between">
                    <h3
                      className="text-lg font-bold text-blue-300"
                      style={{ textShadow: "0 0 5px rgba(59, 130, 246, 0.5)" }}
                    >
                      {coin_info.id}
                    </h3>
                    <a
                      href={`https://rugcheck.xyz/tokens/${mint}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-300 text-xs flex items-center px-2 py-1 bg-blue-900/30 rounded"
                    >
                      VIEW DETAILS <ExternalLink className="ml-1 h-3 w-3" />
                    </a>
                  </div>
                  <p className="text-sm text-gray-400 mt-1 line-clamp-2 font-mono">
                    {coin_info?.description?.en || "No description available"}
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-red-900/20 border border-red-800 flex items-center justify-center">
                  <AlertTriangle className="h-6 w-6 text-red-500 animate-pulse" />
                </div>
                <div>
                  <h3
                    className="text-lg font-semibold text-red-400"
                    style={{ textShadow: "0 0 5px rgba(248, 113, 113, 0.5)" }}
                  >
                    UNKNOWN TOKEN
                  </h3>
                  <p className="text-sm text-gray-400 font-mono">
                    This token was not found on CoinGecko
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        <div
          className={`mb-6 transition-all duration-700 ease-in-out ${
            showDetails
              ? "opacity-100 translate-x-0 delay-100"
              : "opacity-0 translate-x-8"
          }`}
        >
          <div className="flex items-center mb-2">
            <Info className="h-4 w-4 text-blue-400 mr-2" />
            <span className="text-xs text-blue-300 font-mono uppercase tracking-wider">
              Token Program
            </span>
          </div>
          <div
            className="font-mono text-xs overflow-x-auto p-3 text-green-300"
            style={{
              background: "#000",
              border: "1px solid #2563EB",
              borderRadius: "4px",
              boxShadow: "0 0 5px rgba(59, 130, 246, 0.3)",
            }}
          >
            <span className="text-blue-400">const</span>{" "}
            <span className="text-yellow-400">tokenProgram</span> ={" "}
            <span className="text-green-400">{data.tokenProgram}</span>;
          </div>
        </div>

        <div
          className={`grid grid-cols-2 gap-3 mb-6 transition-all duration-700 ease-in-out ${
            showDetails
              ? "opacity-100 translate-y-0 delay-200"
              : "opacity-0 translate-y-8"
          }`}
        >
          <div
            className="p-3 relative"
            style={{
              background: "#000",
              border: "1px solid #2563EB",
              borderRadius: "4px",
            }}
          >
            <div className="text-blue-300 text-xs font-mono mb-1 flex items-center">
              <User className="h-3 w-3 mr-1 text-blue-400" />
              SINGLE HOLDER
            </div>
            <div className="text-lg font-bold flex items-center">
              <span
                className={isHighRisk ? "text-red-400" : "text-green-400"}
                style={{
                  textShadow: isHighRisk
                    ? "0 0 5px rgba(248, 113, 113, 0.5)"
                    : "0 0 5px rgba(74, 222, 128, 0.5)",
                }}
              >
                {data.risks.find((r) => r.name === "Single holder ownership")
                  ?.value || "N/A"}
              </span>
              {isHighRisk && (
                <AlertCircle className="ml-2 h-4 w-4 text-red-500 animate-pulse" />
              )}
            </div>
          </div>

          <div
            className="p-3 relative"
            style={{
              background: "#000",
              border: "1px solid #2563EB",
              borderRadius: "4px",
            }}
          >
            <div className="text-blue-300 text-xs font-mono mb-1 flex items-center">
              <Users className="h-3 w-3 mr-1 text-blue-400" />
              TOP HOLDERS
            </div>
            <div className="text-lg font-bold">
              <span
                className={isHighRisk ? "text-red-400" : "text-green-400"}
                style={{
                  textShadow: isHighRisk
                    ? "0 0 5px rgba(248, 113, 113, 0.5)"
                    : "0 0 5px rgba(74, 222, 128, 0.5)",
                }}
              >
                {data.risks.find(
                  (r) => r.name === "Top 10 holders high ownership"
                )?.value || "N/A"}
              </span>
            </div>
          </div>
        </div>

        <div
          className={`mb-6 transition-all duration-700 ease-in-out ${
            showDetails
              ? "opacity-100 translate-y-0 delay-300"
              : "opacity-0 translate-y-8"
          }`}
        >
          <div
            className="mb-3 px-3 py-2 flex items-center"
            style={{
              background: "linear-gradient(90deg, #2563EB, transparent)",
              borderLeft: "4px solid #3B82F6",
            }}
          >
            <Activity className="h-4 w-4 text-white mr-2" />
            <h3 className="font-bold text-white">SECURITY SCAN RESULTS</h3>
          </div>

          <div className="space-y-3">
            {data.risks.map((risk, index) => (
              <div
                key={index}
                className={`transition-all duration-700 ease-in-out ${
                  showDetails
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                }`}
                style={{
                  transitionDelay: `${400 + index * 100}ms`,
                  background: "#000",
                  border: "1px solid",
                  borderColor: risk.name.includes("High")
                    ? "#EF4444"
                    : "#2563EB",
                  borderRadius: "4px",
                }}
              >
                <div className="flex justify-between items-start p-3 border-b border-gray-800">
                  <div className="font-medium text-white flex items-center">
                    {risk.name.includes("High") ? (
                      <AlertTriangle className="h-4 w-4 text-red-500 mr-2" />
                    ) : (
                      <Lock className="h-4 w-4 text-blue-400 mr-2" />
                    )}
                    {risk.name}
                  </div>
                  <div
                    className={`px-2 py-0.5 rounded text-xs font-bold ${
                      risk.value === "N/A"
                        ? "text-gray-400 bg-gray-800/50"
                        : risk.name.includes("High")
                        ? "text-red-400 bg-red-900/20"
                        : "text-green-400 bg-green-900/20"
                    }`}
                    style={{
                      textShadow: risk.name.includes("High")
                        ? "0 0 5px rgba(248, 113, 113, 0.5)"
                        : "0 0 5px rgba(74, 222, 128, 0.5)",
                      border: "1px solid",
                      borderColor: risk.name.includes("High")
                        ? "#EF4444"
                        : "#22C55E",
                    }}
                  >
                    {risk.value || "N/A"}
                  </div>
                </div>
                <div className="p-3 text-gray-400 text-sm font-mono">
                  {risk.description}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div
          className={`flex justify-between items-center mt-6 pt-4 border-t border-blue-900 text-xs transition-all duration-700 ease-in-out ${
            showDetails ? "opacity-100 delay-700" : "opacity-0"
          }`}
        >
          <div className="flex items-center text-yellow-500">
            <AlertTriangle className="h-3 w-3 mr-1 animate-pulse" />
            <span style={{ fontFamily: "'VT323', monospace" }}>
              NOT FINANCIAL ADVICE. DYOR.
            </span>
          </div>
          <div className="text-gray-500 font-mono">
            POWERED BY{" "}
            <span
              className="text-blue-400"
              style={{ textShadow: "0 0 5px rgba(59, 130, 246, 0.5)" }}
            >
              RUGCHECK
            </span>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scanline {
          0% {
            transform: translateY(-100%);
          }
          100% {
            transform: translateY(100%);
          }
        }
        @keyframes blink {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.7;
          }
        }
      `}</style>
    </div>
  );
}

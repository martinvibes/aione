"use client";

import { useState } from "react";
import { ArrowLeft, ArrowUpRight, Copy } from "lucide-react";
import { motion } from "framer-motion";
import useFetchCoinInfo from "@/app/hooks/useCoinGeckoGetTokenInfo";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CandleChart from "@/app/chat/[chatid]/components/candle-chart";

import { useParams } from "next/navigation";
import Squares from "@/app/components/ui/Squares";

interface CoinInfo {
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  symbol: any;
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  asset_platform_id: any;
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  market_data: any;
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  marketCap: any;
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  id: any;
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  image: any;
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  description: any;
}

export default function TokenPage() {
  const params = useParams<{ chain: string; token_id: string }>();
  const [timeframe, setTimeframe] = useState("1W");
  const timeframes = ["24H"];
  const coin_info = useFetchCoinInfo(params.token_id, params.chain) as CoinInfo;
  // console.log(coin_info);

  return (
    <div className="bg-mainChatbg h-screen">
      <div className="fixed h-screen w-full">
        <Squares
          speed={0.5}
          squareSize={40}
          direction="diagonal" // up, down, left, right, diagonal
          borderColor="#284a4f"
          hoverFillColor="#B4D9DD"
        />
      </div>
      <div className=" z-30 relative">
        <div className="w-full flex items-center justify-center ">
          {/*  bg-mainChatbg h-screen z-40 */}
          <div className="container py-6 ">
            <div className="mb-6">
              <Button
                onClick={() => window.history.back()}
                className="mb-4 px-3 py-1 bg-white flex w-fit items-center rounded-2xl text-sm text-primary hover:bg-white/90"
                variant="ghost"
              >
                <ArrowLeft className="mr-1 h-4 w-4" />
                Back
              </Button>

              <motion.div
                className="flex bg-[#2d364d] flex-col justify-between gap-4 rounded-lg p-6 text-white sm:flex-row sm:items-center"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex items-center gap-3">
                  <motion.div
                    className="flex h-12 w-12  items-center justify-center rounded-full b backdrop-blur-sm"
                    initial={{ rotate: -180 }}
                    animate={{ rotate: 0 }}
                    transition={{ duration: 0.5, type: "spring" }}
                  >
                    <span className="text-lg font-bold">
                      {coin_info?.symbol}
                    </span>
                  </motion.div>
                  <div>
                    <h1 className="text-2xl font-bold">{coin_info?.id}</h1>
                    <div className="flex items-center gap-2">
                      <span className="text-white/80">
                        {coin_info?.asset_platform_id}
                      </span>
                      <Badge
                        variant="outline"
                        className="border-white/30 bg-white/20 text-white"
                      >
                        +0.2
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="secondary"
                    size="sm"
                    className="h-8 bg-white/20 text-white hover:bg-white/30"
                  >
                    <Copy className="mr-2 h-4 w-4" />
                    Copy Address
                  </Button>
                  <Button
                    size="sm"
                    className="h-8 bg-white/20 text-white hover:bg-white/30"
                  >
                    <ArrowUpRight className="mr-2 h-4 w-4" />
                    View on Explorer
                  </Button>
                </div>
              </motion.div>
            </div>

            <motion.div
              className="grid gap-6 md:grid-cols-4 "
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className="border-[#bfe3e3] md:col-span-3 ">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 border-b border-[#e5f7f7] pb-2">
                  <CardTitle className="text-xl text-primary">
                    Price Chart
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    {timeframes.map((tf) => (
                      <Button
                        key={tf}
                        variant={timeframe === tf ? "default" : "outline"}
                        size="sm"
                        className={`h-7 px-2.5 text-xs ${
                          timeframe === tf
                            ? "bg-primary text-white"
                            : "border-[#bfe3e3] text-primary hover:bg-[#e5f7f7]"
                        }`}
                        onClick={() => setTimeframe(tf)}
                      >
                        {tf}
                      </Button>
                    ))}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="mb-4 flex items-baseline justify-between">
                    <div>
                      <h3 className="text-3xl font-bold text-primary">
                        {coin_info?.market_data?.high_24h?.usd}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Last updated: {new Date().toLocaleString()}
                      </p>
                    </div>
                    <Badge className="text-sm">+0.2</Badge>
                  </div>

                  <CandleChart token={`${coin_info?.id}`} />
                </CardContent>
              </Card>

              <div className="flex flex-col gap-6">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <Card className="border-[#bfe3e3] bg-gradient-to-br from-white to-[#e5f7f7]">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-primary">
                        Market Cap
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-2xl font-bold text-primary">
                        {coin_info?.market_data?.market_cap?.usd?.toLocaleString(
                          "en-US",
                          {
                            style: "currency",
                            currency: "USD",
                            maximumFractionDigits: 0,
                          }
                        )}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <Card className="border-[#bfe3e3] bg-gradient-to-br from-white to-[#e5f7f7]">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-primary">
                        24h Volume
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-2xl font-bold text-primary">
                        {coin_info?.market_data?.total_volume?.usd?.toLocaleString(
                          "en-US",
                          {
                            style: "currency",
                            currency: "USD",
                            maximumFractionDigits: 0,
                          }
                        )}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  <Card className="border-[#bfe3e3] bg-gradient-to-br from-white to-[#e5f7f7]">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-primary">
                        Circulating Supply
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-2xl font-bold text-primary">
                        {coin_info?.market_data?.circulating_supply?.toLocaleString(
                          "en-US",
                          {
                            maximumFractionDigits: 0,
                          }
                        )}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {coin_info?.market_data?.total_supply?.toLocaleString(
                          "en-US",
                          {
                            maximumFractionDigits: 0,
                          }
                        )}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

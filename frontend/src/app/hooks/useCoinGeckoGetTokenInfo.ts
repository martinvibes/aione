"use client";
import { useState, useEffect } from "react";

export default function useFetchCoinInfo(tokenAddr: string, ecosystem: string) {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      "x-cg-demo-api-key": "CG-HegMGgBnFAC7MhLyNewUBT5f",
    },
  };
  const [tokenInfo, setTokenInfo] = useState({}); // TokenInfo | null

  useEffect(() => {
    const fetchTokenInfo = async () => {
      try {
        const response = await fetch(
          `https://api.coingecko.com/api/v3/coins/${ecosystem}/contract/${tokenAddr}`,
          options
        );
        const data = await response.json();
        // console.log("data", data);
        setTokenInfo(data);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        // console.error(err);
      }
    };

    fetchTokenInfo();
  }, []);

  return tokenInfo;
}

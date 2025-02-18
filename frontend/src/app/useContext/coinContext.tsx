"use client";

import { createContext, useEffect, useState } from "react";

export const CoinContext = createContext<{ allCoin: Coin[] }>({ allCoin: [] });

import { ReactNode } from "react";

interface CoinContextProviderProps {
  children: ReactNode;
}
interface Coin {
  id: string;
  name: string;
  market_cap_rank: number;
  current_price: number;
  image: string;
  // other coin properties
}

const CoinContextProvider = (props: CoinContextProviderProps) => {
  const [allCoin, setAllcoin] = useState<Coin[]>([]);

  const fetchAllCoin = async () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-cg-demo-api-key": "CG-HegMGgBnFAC7MhLyNewUBT5f",
      },
    };

    fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd",
      options
    )
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setAllcoin(res);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchAllCoin();
  }, []);

  const contextValue = { allCoin };

  return (
    <CoinContext.Provider value={contextValue}>
      {props.children}
    </CoinContext.Provider>
  );
};

export default CoinContextProvider;

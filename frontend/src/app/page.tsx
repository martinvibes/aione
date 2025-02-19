"use client";

import { useContext } from "react";
import Navbar from "./components/Navbar";
import { CoinContext } from "./useContext/coinContext";

export default function Home() {
  const { allCoin } = useContext(CoinContext);
  console.log(allCoin);

  return (
    <div className="">
      <Navbar />

      
    </div>
  );
}

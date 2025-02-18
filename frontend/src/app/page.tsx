"use client";

import { useContext } from "react";
import Navbar from "./components/Navbar";
import { CoinContext } from "./useContext/coinContext";
import Script from "next/script";

export default function Home() {
  const { allCoin } = useContext(CoinContext);
  console.log(allCoin);

  return (
    <div className="">
      <Navbar />
      <div className="text-white">
        Ah shit, here we go again, Lorem ipsum dolor sit amet, consectetur
        adipisicing elit. Molestiae, adipisci! Dignissimos quibusdam tempore
        sunt nisi dolorem deleniti quia repellendus esse eum. Similique aperiam
        adipisci quia impedit magni exercitationem iusto asperiores illo dicta
        quos officia, nihil modi labore! Illum, similique velit?
      </div>
      <div>
        <Script
          src="https://widgets.coingecko.com/gecko-coin-price-chart-widget.js"
          strategy="lazyOnload"
        ></Script>
        <gecko-coin-price-chart-widget
          locale="en"
          width="500"
          dark-mode="true"
          outlined="true"
          coin-id="solana"
          initial-currency="usd"
        ></gecko-coin-price-chart-widget>
      </div>
    </div>
  );
}

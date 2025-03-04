"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import aiLogo from "../../../public/AI ONE ash 001@3x.png";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export function ConnectBtn() {
  return (
    <div className=" rounded-lg text-base bg-[#5ce1e6] px-4 py-2">
      {" "}
      Connect Wallet
    </div>
  );
}

const Navbar = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  return (
    <div className="flex justify-between items-center text-white backdrop-blur-[100px] bg-gradient-to-br from-[#0A0F1E] via-[#233b42] to-[#0A0F1E] rounded-lg px-6 py-6 w-[95%] mx-auto">
      {/* <h1 className="text-[#5CE1E6] italic text-xl">AiOne</h1> */}
      <Image src={aiLogo} alt="AiOne Logo" width={80} height={80} />
      <div className="flex justify-center text-base items-center space-x-6">
        <p className=" cursor-pointer hover:text-[#5ce1e6] transition-all">
          Community
        </p>
        <p className=" cursor-pointer hover:text-[#5ce1e6] transition-all">
          Data
        </p>
      </div>
      <button className=" rounded-lg text-base">
        {isLoading ? <ConnectBtn /> : <ConnectButton />}
      </button>
    </div>
  );
};

export default Navbar;

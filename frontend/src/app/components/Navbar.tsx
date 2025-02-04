import Image from "next/image";
import React from "react";
// import aiLogo from "../../../public/AI ONE Purple 1@2x.png";

const Navbar = () => {
  return (
    <div className="flex justify-between items-center text-white backdrop-blur-[10px] bg-[#bbdaf31c] my-6 rounded-lg px-6 py-6 mx-8">
      <h1 className="text-[#5CE1E6] italic text-xl">AiOne</h1>
      {/* <Image src={aiLogo} alt="AiOne Logo" width={80} height={80} /> */}
      <div className="flex justify-center text-lg items-center space-x-6">
        <p className=" cursor-pointer hover:text-[#5ce1e6] transition-all">
          Community
        </p>
        <p className=" cursor-pointer hover:text-[#5ce1e6] transition-all">
          Data
        </p>
      </div>
      <button className=" text-lg">Connect Wallet</button>
    </div>
  );
};

export default Navbar;

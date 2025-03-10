"use client";
import { AnimatePresence, motion } from "framer-motion";

import { X, Wallet, Clipboard, CircleHelp } from "lucide-react";
import { useEffect, useState } from "react";
interface CloseProps {
  close: () => void;
}

interface GetData {
  status: string;
  result: number | string | null;
}

 export const formatAddress = (address: string) =>
   `${address.slice(0, 6)}...${address.slice(-4)}`;

const WalletUi = ({ close }: CloseProps) => {
  const [getBalance, setGetBalance] = useState<GetData | null>(null);
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const handleGetBalanceAction = async () => {
    try {
      const response = await fetch("/api/agent-action", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          connection: "sonic",
          action: "get-balance",
          params: ["0x11CaeF1EF6FAd2A9e8987051Ca5bfC869F11dE7A"],
        }),
      });

      if (!response) return;

      const data = await response.json();
      setGetBalance(data);
      // console.log(data);
    } catch (err) {
      if (err instanceof Error) {
        // console.log(err.message);
      } else {
        // console.log("An unknown error occurred");
      }
      // console.log(err);
    }
  };

  useEffect(() => {
    handleGetBalanceAction()
  })

  return (
    <>
      <AnimatePresence>
        <motion.section
          className="bg-darkishBlue w-[380px] p-6 h-fit scrollbar-hide overflow-y-auto fixed left-24 z-[998] top-3 rounded-lg shadow-lg"
          exit={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          initial={{ opacity: 0, scale: 0.7 }}
          transition={{ ease: "easeInOut" }}
        >
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-xl font-bold text-white">My Wallet</h1>
            <button
              onClick={close}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          <div className="bg-black w-full h-fit p-4 rounded-[18px] text-[12px] my-4 font-light">
            THIS IS THE FIXED WALLET AVAILABLE IN AI ONE, SEND YOUR TOKENS TO
            THIS WALLET TO PERFORM TRANSACTIONS ON THE APP
          </div>
          <div className="space-y-4">
            <div className="flex flex-row gap-2 justify-between px-2 items-center">
              <Wallet className="h-6 w-6 text-white" />
              <div className="flex flex-col">
                <h1 className="font-bold text-lg ">Account 1</h1>
                <p className="flex text-sm font-light">
                  {formatAddress("0x11CaeF1EF6FAd2A9e8987051Ca5bfC869F11dE7A")}{" "}
                  <Clipboard
                    onClick={() =>
                      copyToClipboard(
                        "0x11CaeF1EF6FAd2A9e8987051Ca5bfC869F11dE7A"
                      )
                    }
                    className="w-4 h-4 text-white cursor-pointer"
                  />
                </p>
              </div>
              <p>{Number(getBalance?.result).toFixed(4) || "0"}S</p>
              <CircleHelp />
            </div>
            <br />
            <div>
              <div className="flex flex-row gap-2 justify-start px-2 items-center mb-3">
                <div className="border-b-2 border-white m-2">Overview</div>
                <div className="text-grey-400 m-2 hover:disabled:text-slate-400">
                  Activity
                </div>
              </div>
              <ul>
                <li className="flex items-center px-2 justify-between">
                  <div className="flex gap-2">
                    <div className="w-[30px] h-[30px] rounded-full bg-gray-400"></div>
                    <p className="text-lg font-bold">ETH</p>
                  </div>
                  <p>$0</p>
                </li>
              </ul>
            </div>
          </div>
        </motion.section>
      </AnimatePresence>
    </>
  );
};

export default WalletUi;

"use client";
import { useContext, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import AddToken from "./add-token-form";
import { type data, getLocalStorageTokens } from "@/lib/helper";
import { ChatContext } from "@/app/useContext/chatContex";
import { X, ExternalLink, Copy, Plus } from "lucide-react";
import Link from "next/link";

interface CloseProps {
  close: () => void;
}

function TokenList({ close }: CloseProps) {
  const { setIsTokenListOpen } = useContext(ChatContext);
  const [token, setToken] = useState<data>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const storageData: data = getLocalStorageTokens();
  const storeToken = useMemo(() => storageData, [storageData]);

  function formModalHandler() {
    setIsFormOpen((data) => !data);
    if (isFormOpen) {
      setIsTokenListOpen(false);
    }
  }

  useEffect(() => {
    if (storeToken.length > token.length) {
      setToken(storeToken);
    }
  }, [storeToken, token]);

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <>
      {isFormOpen && <AddToken close={formModalHandler} />}
      <AnimatePresence>
        <motion.section
          className="bg-darkishBlue min-h-[80%] max-h-[90%] w-[350px] p-6 scrollbar-hide overflow-y-auto fixed left-24 z-[998] top-3 rounded-lg shadow-lg"
          exit={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          initial={{ opacity: 0, scale: 0.7 }}
          transition={{ ease: "easeInOut" }}
        >
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-xl font-bold text-white">Token Addresses</h1>
            <button
              onClick={close}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          <div className="space-y-4">
            {token.map((data, index) => (
              <div
                key={index}
                className="bg-[#1C2136] p-4 rounded-lg hover:bg-[#252B48] transition-colors"
              >
                <div className="flex justify-between items-center mb-2">
                  <Link
                    href={`/token/sonic/${data.address}`}
                    className="text-aqwaGreen hover:text-aqwaGreen/80 font-semibold flex items-center"
                  >
                    {data.name}
                    <ExternalLink className="h-4 w-4 ml-1" />
                  </Link>
                  <button
                    onClick={() => copyToClipboard(data.address, index)}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {copiedIndex === index ? (
                      <span className="text-aqwaGreen text-sm">Copied!</span>
                    ) : (
                      <Copy className="h-5 w-5" />
                    )}
                  </button>
                </div>
                <p className="text-[#51586D] text-sm font-mono">
                  {`${data.address.slice(0, 6)}...${data.address.slice(-6)}`}
                </p>
              </div>
            ))}
          </div>
          <button
            className="bg-aqwaGreen hover:bg-aqwaGreen/90 text-darkishBlue rounded-lg py-3 px-4 text-base font-semibold capitalize w-full mt-6 flex items-center justify-center transition-colors"
            onClick={formModalHandler}
          >
            <Plus className="h-5 w-5 mr-2" />
            Add New Address
          </button>
        </motion.section>
      </AnimatePresence>
    </>
  );
}

export default TokenList;

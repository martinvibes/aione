import React, { useState } from "react";
import { useTransactionHistory } from "@/app/hooks/useTransactionHistory";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

interface TransactionHistoryProps {
  chatId?: string;
}

export const TransactionHistory: React.FC<TransactionHistoryProps> = ({
  chatId,
}) => {
  const { getAllTransactions, getChatTransactions } = useTransactionHistory();
  const [isOpen, setIsOpen] = useState<string | null>(null);

  const transactions = chatId
    ? getChatTransactions(chatId)
    : getAllTransactions();
  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleString();
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const handleToggle = (id: string) => {
    setIsOpen(isOpen === id ? null : id);
  };

  return (
    <AnimatePresence initial={false}>
      <div className="space-x-0 z-40">
        <h2 className="text-xl font-bold p-3">
          {chatId ? "Chat Transactions" : "All Transactions"}
        </h2>

        <div className="grid gap-3 p-2">
          {transactions.map((tx) => (
            <div key={tx.id} className="bg-[#1C2535] p-3 rounded-lg space-y-2">
              <div
                onClick={() => handleToggle(tx.id)}
                className="flex justify-between items-start cursor-pointer"
              >
                <span className="font-medium capitalize">{tx.type}</span>
                <span
                  className={`px-2 py-1 rounded text-sm ${
                    tx.status === "success"
                      ? "bg-green-500/20 text-green-400"
                      : "bg-red-500/20 text-red-400"
                  }`}
                >
                  {tx.status}
                </span>
              </div>

              <div
                onClick={() => handleToggle(tx.id)}
                className="flex justify-between items-center cursor-pointer"
              >
                <p>Date: {formatDate(tx.timestamp)}</p>
                <span
                  className={` ${
                    isOpen == tx.id ? " rotate-180" : "rotate-0"
                  } transition-transform duration-300 ease-in-out transform`}
                >
                  <ChevronDown width={20} height={20} />
                </span>
              </div>

              {isOpen == tx.id && (
                <motion.div
                  className="rounded-[8px] h-full overflow-y-auto scrollbar-hide scroll-smooth  relative  z-[555]"
                  exit={{ opacity: 0, height: "0%" }}
                  animate={{ opacity: 1, scale: 1, height: "100%" }}
                  initial={{ opacity: 0, height: "0%" }}
                  transition={{ ease: "linear" }}
                >
                  <div className="text-sm space-y-1 text-gray-300">
                    {tx.type === "swap" && (
                      <>
                        <p>From: {formatAddress(tx.details.fromToken || "")}</p>
                        <p>To: {formatAddress(tx.details.toToken || "")}</p>
                        <p>Amount: {tx.details.amount}</p>
                      </>
                    )}
                    {tx.type == "transfer" && (
                      <>
                        <p>
                          To: {formatAddress(tx.details.recipientAddress || "")}
                        </p>
                        <p>Amount: {tx.details.amount}</p>
                      </>
                    )}
                    {tx.txHash && (
                      <p className="break-all">
                        Hash: {formatAddress(tx.txHash)}
                      </p>
                    )}
                  </div>

                  <Link
                    href={`/chat/${tx.chatid}`}
                    className="text-sm text-blue-400 hover:text-blue-300"
                  >
                    View Chat
                  </Link>
                </motion.div>
              )}
            </div>
          ))}

          {transactions.length === 0 && (
            <p className="text-center text-gray-400">No transactions found</p>
          )}
        </div>
      </div>
    </AnimatePresence>
  );
};

export default TransactionHistory;

import React from "react";
import { useTransactionHistory } from "@/app/hooks/useTransactionHistory";
import Link from "next/link";

interface TransactionHistoryProps {
  chatId?: string;
}

export const TransactionHistory: React.FC<TransactionHistoryProps> = ({
  chatId,
}) => {
  const { getAllTransactions, getChatTransactions } = useTransactionHistory();

  const transactions = chatId
    ? getChatTransactions(chatId)
    : getAllTransactions();
  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleString();
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <div className="space-x-0 z-40">
      <h2 className="text-xl font-bold p-3">
        {chatId ? "Chat Transactions" : "All Transactions"}
      </h2>

      <div className="grid gap-3 p-2">
        {transactions.map((tx) => (
          <div key={tx.id} className="bg-[#1C2535] p-3 rounded-lg space-y-2">
            <div className="flex justify-between items-start">
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

            <div className="text-sm space-y-1 text-gray-300">
              <p>Date: {formatDate(tx.timestamp)}</p>
              {tx.type === "swap" && (
                <>
                  <p>From: {formatAddress(tx.details.fromToken || "")}</p>
                  <p>To: {formatAddress(tx.details.toToken || "")}</p>
                  <p>Amount: {tx.details.amount}</p>
                </>
              )}
              {tx.type == "transfer" && (
                <>
                  <p>To: {formatAddress(tx.details.recipientAddress || "")}</p>
                  <p>Amount: {tx.details.amount}</p>
                </>
              )}
              {tx.txHash && (
                <p className="break-all">Hash: {formatAddress(tx.txHash)}</p>
              )}
            </div>

            <Link
              href={`/chat/${tx.chatid}`}
              className="text-sm text-blue-400 hover:text-blue-300"
            >
              View Chat
            </Link>
          </div>
        ))}

        {transactions.length === 0 && (
          <p className="text-center text-gray-400">No transactions found</p>
        )}
      </div>
    </div>
  );
};

export default TransactionHistory;

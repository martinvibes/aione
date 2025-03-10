import { useEffect, useState } from "react";
import { TransactionHistory, TransactionStore } from "@/lib/types";

const STORAGE_KEY = "transaction_history";

export function useTransactionHistory() {
  const [transactions, setTransactions] = useState<TransactionHistory[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const data: TransactionStore = JSON.parse(stored);
        setTransactions(data.transactions);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        // console.log(err);
      }
    }
  }, []);

  const saveTransaction = (transaction: TransactionHistory) => {
    const updatedTransactions = [...transactions, transaction];
    setTransactions(updatedTransactions);
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        transactions: updatedTransactions,
      })
    );
  };

  const getChatTransactions = (chatId: string) => {
    return transactions.filter((tx) => tx.chatid === chatId);
  };

  const getAllTransactions = () => {
    return transactions;
  };

  return {
    saveTransaction,
    getChatTransactions,
    getAllTransactions,
  };
}

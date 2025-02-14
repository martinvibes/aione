"use client";

import { Message } from "@/lib/types";
import React, { createContext, useContext, useState } from "react";

// type balance = {
//   sol: number;
//   usd: number;
// };

type MessageContextType = {
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  transactionType: string;
  setTransactionType: React.Dispatch<React.SetStateAction<string>>;
};

export const MessageContext = createContext<MessageContextType>({
   messages: [],
  setMessages:()=>{},
  isLoading:false,
  setIsLoading:()=>{},
  transactionType: "",
  setTransactionType:()=>{},
});

export function MessageProvider({ children }: { children: React.ReactNode }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [transactionType, setTransactionType] = useState("");

  return (
    <MessageContext.Provider
      value={{
        messages,
        setMessages,
        isLoading,
        setIsLoading,
        transactionType,
        setTransactionType,
      }}
    >
      {children}
    </MessageContext.Provider>
  );
}

export function useMessages() {
  const context = useContext(MessageContext);
  if (context === undefined) {
    throw new Error("useMessages must be used within a MessageProvider");
  }
  return context;
}

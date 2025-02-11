"use client";

import React, { createContext, useContext, useState } from "react";

// type balance = {
//   sol: number;
//   usd: number;
// };

interface Message {
  id: string;
  content: string;
  sender: "user" | "agent" | "chart";
  agentName: "zerepy" | "allora" | "user" | "debridge";
  //   balance: balance;
  //   intent: string;
}

const dummy:Message[] = [
  {
    id: "5",
    content: `hello`,
    sender: "user",
    agentName: "user",
  },
  {
    id: "2",
    content: `Sign in to Chrome
Sign in with your Google Account to get your bookmarks, history, passwords, and other settings on all your devices`,
    sender: "agent",
    agentName: "allora",
  },
  {
    id: "52",
    content: `Swap 2 ETH for USDC.`,
    sender: "user",
    agentName: "user",
  },
  {
    id: "22",
    content: `Confirming your swap request: 2 ETH → USDC. Estimated amount: 4,320 USDC. Proceed?`,
    sender: "agent",
    agentName: "zerepy",
  },
];

type MessageContextType = {
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  transactionType: string;
  setTransactionType: React.Dispatch<React.SetStateAction<string>>;
};

const MessageContext = createContext<MessageContextType | undefined>(undefined);

export function MessageProvider({ children }: { children: React.ReactNode }) {
  const [messages, setMessages] = useState<Message[]>(dummy);
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

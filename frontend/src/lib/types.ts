export interface Message {
  id: string;
  content: string | number;
  sender: "user" | "agent" | "chart";
  // agentName: "zerepy" | "allora" | "user" | "debridge" | "rugcheck";
  intent?:
    | "swap"
    | "checkBalance"
    | "transfer"
    | "normalChat"
    | "unknown"
    | "pridiction"
    | "getTokenTicker"
    | "rugcheck";
  tokenName?: string | number;
  component?: {
    type: string;
    /* eslint-disable  @typescript-eslint/no-explicit-any */
    props: any;
  };
}

export interface RugCheckProps {
  data: RugCheckData;
  mint: string;
}

export interface RugCheckData {
  tokenProgram: string;
  score: number;
  risks: {
    name: string;
    value?: string;
    description: string;
  }[];
}

export interface TransactionHistory {
  id: string;
  chatid: string;
  type: "swap" | "transfer";
  timestamp: number;
  status: "success" | "failed";
  txHash: string | undefined | null;
  details: {
    fromToken?: string;
    toToken?: string;
    amount?: string;
    recipientAddress?: string;
  };
}

export interface TransactionStore {
  transactions: TransactionHistory[];
}

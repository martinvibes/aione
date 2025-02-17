export interface Message {
  id: string;
  content: string | number;
  sender: "user" | "agent" | "chart";
  agentName: "zerepy" | "allora" | "user" | "debridge";
  intent?:
    | "swap"
    | "checkBalance"
    | "transfer"
    | "normalChat"
    | "unknown"
    | "pridiction"
    | "getTokenTicker";
  tokenName?: string | number;
}

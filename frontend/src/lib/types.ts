import { ReactElement } from "react";

export interface Message {
  id: string;
  content: string | number;
  sender: "user" | "agent" | "chart";
  agentName: "zerepy" | "allora" | "user" | "debridge" | "rugcheck";
  intent?:
    | "swap"
    | "checkBalance"
    | "transfer"
    | "normalChat"
    | "unknown"
    | "pridiction"
    | "rugcheck";
  component?: {
    type: string;
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
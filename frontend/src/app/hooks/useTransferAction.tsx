import { Message } from "@/lib/types";

interface TransferResponse {
  status: string;
  result: number | string | null;
}

export async function transferTokenData(
  recipientAddress: string | undefined,
  amount: number | undefined,
  messages: Message[],
  setMessages: (messages: Message[]) => void,
  setMessagesInStorage: (messages: Message[]) => void
) {
  if (!recipientAddress || !amount) {
    const promptMessage: Message = {
      content: `To perform transfer, please provide:
    1. recipientAddress address (the token you want to transfer to)
    2. Amount to transfer
    
    Format: transferto:DESTINATION_ADDRESS amount:AMOUNT`,
      sender: "agent",
      id: Date.now().toString(),
      agentName: "zerepy",
      intent: "transfer",
    };
    setMessagesInStorage([...messages, promptMessage]);
    setMessages([...messages, promptMessage]);
    return;
  }

  try {
    const actionData = {
      connection: "sonic",
      action: "transfer",
      params: [recipientAddress, amount.toString()],
    };

    const response = await fetch("/api/agent-action", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(actionData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: TransferResponse = await response.json();

    const transferMessage: Message = {
      content: data?.result
        ? `transfer successful! Transaction hash: ${data.result}`
        : `Sorry, the transfer couldn't be completed at this time.`,
      sender: "agent",
      id: Date.now().toString(),
      agentName: "zerepy",
      intent: "transfer",
    };
    setMessages([...messages, transferMessage]);
    setMessagesInStorage([...messages, transferMessage]);
    return data;
  } catch (err) {
    console.error("Error performing transfer:", err);
    const errorMessage: Message = {
      content:
        "Sorry, I encountered an error while trying to perform the transfer. Please check the addresses and try again.",
      sender: "agent",
      id: Date.now().toLocaleString(),
      agentName: "zerepy",
      intent: "transfer",
    };
    setMessages([...messages, errorMessage]);
    setMessagesInStorage([...messages, errorMessage]);
    return null;
  }
}

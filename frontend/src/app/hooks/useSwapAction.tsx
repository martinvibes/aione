import { Message, TransactionHistory } from "@/lib/types";

interface SwapResponse {
  status: string;
  result: number | string | null;
}

export async function swapTokenData(
  sourceToken: string | undefined,
  destinationToken: string | undefined,
  amount: number | undefined,
  chatId: string,
  messages: Message[],
  setMessages: (messages: Message[]) => void,
  setMessagesInStorage: (messages: Message[]) => void,
  saveTransaction: (transaction: TransactionHistory) => void
) {
  if (!sourceToken || !destinationToken || !amount) {
    const promptMessage: Message = {
      content: `To perform a swap, please provide:
    1. Source token address (the token you want to swap from)
    2. Destination token address (the token you want to swap to)
    3. Amount to swap
    
    Format: swapfrom:SOURCE_ADDRESS swapto:DESTINATION_ADDRESS amount:AMOUNT`,
      sender: "agent",
      id: Date.now().toString(),
      agentName: "zerepy",
      intent: "swap",
    };
    setMessagesInStorage([...messages, promptMessage]);
    setMessages([...messages, promptMessage]);
    return;
  }

  try {
    const actionData = {
      connection: "sonic",
      action: "swap",
      params: [sourceToken, destinationToken, amount.toString()],
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

    const data: SwapResponse = await response.json();

    const transaction: TransactionHistory = {
      id: Date.now().toString(),
      chatid: chatId,
      type: "swap",
      timestamp: Date.now(),
      status: data?.result ? "success" : "failed",
      txHash: data?.result ? String(data.result) : null,
      details: {
        fromToken: sourceToken,
        toToken: destinationToken,
        amount: amount.toString(),
      },
    };
    saveTransaction(transaction);

    const swapMessage: Message = {
      content: data?.result
        ? `Swap successful! Transaction hash: ${data.result}`
        : `Sorry, the swap couldn't be completed at this time.`,
      sender: "agent",
      id: Date.now().toString(),
      agentName: "zerepy",
      intent: "swap",
    };
    setMessages([...messages, swapMessage]);
    setMessagesInStorage([...messages, swapMessage]);
    return data;
  } catch (err) {
    console.error("Error performing swap:", err);
    const errorMessage: Message = {
      content:
        "Sorry, I encountered an error while trying to perform the swap. Please check the addresses and try again.",
      sender: "agent",
      id: Date.now().toLocaleString(),
      agentName: "zerepy",
      intent: "swap",
    };
    setMessages([...messages, errorMessage]);
    setMessagesInStorage([...messages, errorMessage]);
    return null;
  }
}

import { Message, TransactionHistory } from "@/lib/types";

interface TransferResponse {
  status: string;
  result: number | string | null;
}

export async function transferTokenData(
  recipientAddress: string | undefined,
  amount: number | undefined,
  chatId: string,
  messages: Message[],
  setMessages: (messages: Message[]) => void,
  setMessagesInStorage: (messages: Message[]) => void,
  saveTransaction: (transaction: TransactionHistory) => void
) {
  if (!recipientAddress || !amount) {
    const promptMessage: Message = {
      content: `To perform transfer, please provide:
    1. recipientAddress address (the token you want to transfer to)
    2. Amount to transfer
    
    Format: transferto:DESTINATION_ADDRESS amount:AMOUNT`,
      sender: "agent",
      id: Date.now().toString(),
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

    const transaction: TransactionHistory = {
      id: Date.now().toString(),
      chatid: chatId,
      type: "transfer",
      timestamp: Date.now(),
      status: data?.result ? "success" : "failed",
      txHash: data?.result ? String(data.result) : null,
      details: {
        recipientAddress: recipientAddress,
        amount: amount.toString(),
      },
    };
    saveTransaction(transaction);

    const transferMessage: Message = {
      content: "",
      sender: "agent",
      id: Date.now().toString(),
      intent: "transfer",
      component: {
        type: data?.result ? "TransferSuccess" : "TransferFailed",
        props: data?.result
          ? {
              txHash: data.result as string,
              recipientAddress,
              amount: amount.toString(),
              timestamp: Date.now(),
            }
          : {
              recipientAddress,
              amount: amount.toString(),
              error:
                "Transaction failed. Please check your balance and try again.",
              timestamp: Date.now(),
            },
      },
    };
    setMessages([...messages, transferMessage]);
    setMessagesInStorage([...messages, transferMessage]);
    return data;
  } catch (err) {
    console.error("Error performing transfer:", err);
    const errorMessage: Message = {
      content: "",
      sender: "agent",
      id: Date.now().toString(),
      intent: "transfer",
      component: {
        type: "TransferFailed",
        props: {
          recipientAddress: recipientAddress || "",
          amount: amount?.toString() || "0",
          error: err instanceof Error ? err.message : "An unexpected error occurred",
          timestamp: Date.now(),
        },
      },
    };
    setMessages([...messages, errorMessage]);
    setMessagesInStorage([...messages, errorMessage]);
    return null;
  }
}

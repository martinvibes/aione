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

    if (!data?.result) {
      const failedMessage: Message = {
        content: "",
        sender: "agent",
        id: Date.now().toString(),
        intent: "swap",
        component: {
          type: "SwapFailed",
          props: {
            fromToken: sourceToken,
            toToken: destinationToken,
            amount: amount.toString(),
            error: "Insufficient liquidity or slippage tolerance exceeded.",
            onRetry: () =>
              swapTokenData(
                sourceToken,
                destinationToken,
                amount,
                chatId,
                messages,
                setMessages,
                setMessagesInStorage,
                saveTransaction
              ),
          },
        },
      };
      setMessages([...messages, failedMessage]);
      setMessagesInStorage([...messages, failedMessage]);
      return null;
    }

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
      content: "",
      sender: "agent",
      id: Date.now().toString(),
      intent: "swap",
      component: {
        type: "SwapSuccess",
        props: {
          txHash: data.result as string,
          fromToken: sourceToken,
          toToken: destinationToken,
          amount: amount.toString(),
        },
      },
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
      intent: "swap",
    };
    setMessages([...messages, errorMessage]);
    setMessagesInStorage([...messages, errorMessage]);
    return null;
  }
}

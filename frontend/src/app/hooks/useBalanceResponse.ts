interface BalanceResponse {
  status: string;
  result: number | string | null;
}

export async function checkBalance(
  walletAddress?: string,
  tokenAddress?: string
) {
  try {
    const actionData = {
      connection: "sonic",
      action: "get-balance",
      params: tokenAddress
        ? [walletAddress || "", tokenAddress]
        : [walletAddress || ""],
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

    const data: BalanceResponse = await response.json();
    return data;
  } catch (err) {
    console.error("Error checking balance:", err);
    return null;
  }
}

import React, { useState } from "react";

// const BASE_API_URL = "https://zerepy-2.onrender.com/agents/sonic/load";

interface AgentAction {
  connection: string;
  action: string;
  params?: string[];
}

interface GetData {
  status: string;
  result: number | string | null;
}

const AgentController = () => {
  const [error, setError] = useState("");
  const [getBalance, setGetBalance] = useState<GetData | null>(null);
  const [getCoinTicker, setGetCoinTicker] = useState<GetData | null>(null);
  // const [status, setStatus] = useState("");

  const loadAgent = async () => {
    try {
      const response = await fetch("/api/load-agent", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      await response.json();
      return true;
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unknown error occurred");
      }
      // console.log(error, "error loading agent");
      return false;
    }
  };

  const handleGetBalanceAction = async (agentAction: AgentAction) => {
    try {
      const response = await fetch("/api/agent-action", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(agentAction),
      });

      if (!response) return;

      const data = await response.json();
      setGetBalance(data);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
    }
  };

  const handleGetCoinByTickerAction = async (agentAction: AgentAction) => {
    try {
      const response = await fetch("/api/agent-action", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(agentAction),
      });

      if (!response) return;

      const data = await response.json();
      setGetCoinTicker(data);
      // console.log(data);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
      console.error(err);
    }
  };

  const handleTransferAction = async (agentAction: AgentAction) => {
    try {
      const response = await fetch("/api/agent-action", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(agentAction),
      });

      if (!response) return;

      await response.json();
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
      console.error(err);
    }
  };

  const handleSwapAction = async (agentAction: AgentAction) => {
    try {
      const response = await fetch("/api/agent-action", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(agentAction),
      });

      if (!response) return;

      await response.json();
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
      console.error(err);
    }
  };

  const handleLoadAndExecute = async () => {
    setError("");

    const loaded = await loadAgent();
    if (loaded) {
      const actionData = {
        connection: "sonic",
        action: "get-balance",
        params: ["0x11CaeF1EF6FAd2A9e8987051Ca5bfC869F11dE7A"],
      };

      const actionDataGetSticker = {
        connection: "sonic",
        action: "get-token-by-ticker",
        params: ["ANON"],
      };

      const transferActionData = {
        connection: "sonic",
        action: "transfer",
        params: ["0xBE36b98C7DBCd22dad2a8Ce09A08A3877D3C69d6", "1"],
      };

      const swapActionData = {
        connection: "sonic",
        action: "swap",
        params: [
          "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
          "0x79bbf4508b1391af3a0f4b30bb5fc4aa9ab0e07c",
          "1",
        ],
      };

      await handleGetBalanceAction(actionData);
      await handleGetCoinByTickerAction(actionDataGetSticker);
      await handleSwapAction(swapActionData);
      await handleTransferAction(transferActionData);
    }
  };

  return (
    <div className="p-3 rounded-lg">
      <button
        className="bg-red-400 p-1 rounded-lg"
        onClick={handleLoadAndExecute}
      >
        execute
      </button>

      <div>This is your sonic balance {getBalance?.result}</div>

      <div>
        This is your selected coin address:{" "}
        {!getCoinTicker ? "" : getCoinTicker.result ?? "coin not available"}
      </div>

      <div>{error && <div>{error}</div>}</div>
    </div>
  );
};

export default AgentController;

///////
// {
//   "connection": "sonic",
//   "action": "transfer",
//   "params": ["0xBE36b98C7DBCd22dad2a8Ce09A08A3877D3C69d6", "1", "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE"]
// }

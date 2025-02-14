import React, { useEffect, useState } from "react";

// const BASE_API_URL = "https://zerepy-2.onrender.com/agents/sonic/load";

interface AgentAction {
  connection: string;
  action: string;
  params?: string[];
}

const AgentController = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [error, setError] = useState("");
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

      const data = await response.json();
      console.log(data);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unknown error occurred");
      }
      console.log(error, "error loading agent");
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
      console.log(data);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
      console.log(err);
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
      console.log(data);
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

      const data = await response.json();
      console.log(data);
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

      const data = await response.json();
      console.log(data);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
      console.error(err);
    }
  };

  const actionData = {
    connection: "sonic",
    action: "get-balance",
    params: [],
  };

  const actionDataGetSticker = {
    connection: "sonic",
    action: "get-token-by-ticker",
    params: ["S"],
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

  useEffect(() => {
    loadAgent();
    handleGetBalanceAction(actionData);
    handleGetCoinByTickerAction(actionDataGetSticker);
    handleSwapAction(swapActionData);
    handleTransferAction(transferActionData);
  }, []);

  return <div></div>;
};

export default AgentController;

///////
// {
//   "connection": "sonic",
//   "action": "transfer",
//   "params": ["0xBE36b98C7DBCd22dad2a8Ce09A08A3877D3C69d6", "1", "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE"]
// }

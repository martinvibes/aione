"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

interface AgentContextType {
  isLoaded: boolean;
  error: string | null;
  reload: () => Promise<void>;
}

const AgentContext = createContext<AgentContextType | undefined>(undefined);

export function AgentLoadProvider({ children }: { children: React.ReactNode }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
      setIsLoaded(true);
      setError(null);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred";
      setError(errorMessage);
      setIsLoaded(false);
      console.error("Error loading agent:", error);
    }
  };

  // This one dy Load agent when provider mounts
  useEffect(() => {
    loadAgent();
  }, []);

  const reload = async () => {
    setIsLoaded(false);
    await loadAgent();
  };

  return (
    <AgentContext.Provider value={{ isLoaded, error, reload }}>
      {children}
    </AgentContext.Provider>
  );
}

export function useAgent() {
  const context = useContext(AgentContext);
  if (context === undefined) {
    throw new Error("useAgent must be used within an Load");
  }
  return context;
}

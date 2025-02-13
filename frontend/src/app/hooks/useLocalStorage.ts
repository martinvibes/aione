
export const useLocalStorage = (chatId: string) => {
  interface Message {
    id: string;
    content: string;
    sender: "user" | "agent" | "chart";
    agentName: "zerepy" | "allora" | "user" | "debridge";
    intent?: string;
  }

  const getMessagesFromStorage: () => Message[] = () => {
    const stored = localStorage.getItem(chatId);
    return stored ? JSON.parse(stored) : [];
  };

  const setMessagesInStorage = (messages: Message[]) => {
    localStorage.setItem(chatId, JSON.stringify(messages));
  };

  return { setMessagesInStorage, getMessagesFromStorage };
};
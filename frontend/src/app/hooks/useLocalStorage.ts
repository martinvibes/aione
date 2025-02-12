
export const useLocalStorage = (chatId: string) => {
  interface Message {
    id: string;
    content: string;
    sender: "user" | "agent" | "chart";
    agentName: "zerepy" | "allora" | "user" | "debridge";
  }

  const setMessagesInStorage = (messages: Message[]) => {
    localStorage.setItem(chatId, JSON.stringify(messages));
  };

  const getMessagesFromStorage = (): Message[] => {
    const stored = localStorage.getItem(chatId);
    return stored ? JSON.parse(stored) : [];
  };

  return { setMessagesInStorage, getMessagesFromStorage };
};
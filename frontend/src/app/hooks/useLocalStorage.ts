import { useContext, useEffect } from "react";
import { MessageContext } from "../useContext/message-context";

export const useLocalStorage = (chatId: string) => {
   const {setMessages} = useContext(MessageContext);
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
  useEffect(()=>{
    setMessages(getMessagesFromStorage)
  },[])
  return { setMessagesInStorage, getMessagesFromStorage };
};
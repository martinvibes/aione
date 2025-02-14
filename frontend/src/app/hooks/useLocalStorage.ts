import { useContext, useEffect } from "react";
import { MessageContext } from "../useContext/message-context";
import { Message } from "@/lib/types";

export const useLocalStorage = (chatId: string) => {
   const {setMessages} = useContext(MessageContext);

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
import { useContext, useEffect } from "react";
import { MessageContext } from "../useContext/message-context";
import { Message } from "@/lib/types";

export const useLocalStorage = (chatId: string) => {
  function getAllHistoryData() {
    const stored = localStorage.getItem("ai-one");
    const data: string[] = stored ? JSON.parse(stored) : [];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const u: any= data.map((id: string) => {
      const storage = localStorage.getItem(id);
      const storedData: string[] = storage ? JSON.parse(storage) : [];
      //console.log(storedData)
      return storedData;
    });
    //console.log(u)
    const p = [];
    for (const k of u) {
      if (k?.at(0)?.content){
        p.push(k?.at(0)?.content);
      }
    } 
    const m =  p.map((d,i)=>{
      return {
        id: data[i], data:d
      }
    });
    return m;
  }

  function setHistoryData() {
    const stored = localStorage.getItem("ai-one");
    const data: string[] = stored ? JSON.parse(stored) : [];
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    data.includes(chatId) ? data : data.push(chatId);
    localStorage.setItem("ai-one", JSON.stringify(data));
  }

  const { setMessages } = useContext(MessageContext);

  const getMessagesFromStorage: () => Message[] = () => {
    const stored = localStorage.getItem(chatId);
    return stored ? JSON.parse(stored) : [];
  };

  const setMessagesInStorage = (messages: Message[]) => {
    localStorage.setItem(chatId, JSON.stringify(messages));
  };
  useEffect(() => {
    setMessages(getMessagesFromStorage);
    setHistoryData();
  }, []);
  return { setMessagesInStorage, getMessagesFromStorage, getAllHistoryData };
};

import { useContext, useEffect } from "react";
import { responseFromChatOpenAi } from "../api/langchain";
import { Message } from "@/lib/types";
import { MessageContext } from "../useContext/message-context";
import { useParams } from "next/navigation";
import { useLocalStorage } from "./useLocalStorage";

export function useAiResponse(pendingMessage: string|null, setPendingMessage:(e:null)=>void) {
  const { messages, setMessages } = useContext(MessageContext);
  const params = useParams();
  const chatId = params.chatid as string;
  const { setMessagesInStorage } = useLocalStorage(chatId);
  useEffect(() => {
    async function getAIResponse() {
      if (!pendingMessage) return;

      try {
        const airResponse = await responseFromChatOpenAi(pendingMessage);

        switch (airResponse?.intent) {
          case "swap":
            let aiMessage: Message = {
              content: airResponse?.generalResponse ?? "",
              sender: "agent",
              id: Date.now().toString(),
              agentName: "user",
              intent: "swap",
            };
            setMessagesInStorage([...messages, aiMessage]);
            setMessages((messages) => [...messages, aiMessage]);
            break;
          case "checkBalance":
              aiMessage = {
                content: airResponse?.amount ?? "",
                sender: "agent",
                id: Date.now().toString(),
                agentName: "user",
                intent: "checkBalance",
              };
              setMessagesInStorage([...messages, aiMessage]);
              setMessages((messages) => [...messages, aiMessage]);
            break;
          case "normalChat":
            aiMessage = {
              content: airResponse?.generalResponse ?? "",
              sender: "agent",
              id: Date.now().toString(),
              agentName: "user",
              intent: "normalChat",
            };
            setMessagesInStorage([...messages, aiMessage]);
            setMessages((messages) => [...messages, aiMessage]);
            break;
          case "pridiction":
             aiMessage = {
               content: airResponse?.pridictTokenName ?? "",
               sender: "agent",
               id: Date.now().toString(),
               agentName: "user",
               intent: "pridiction",
             };
             setMessagesInStorage([...messages, aiMessage]);
             setMessages((messages) => [...messages, aiMessage]);
            break;
          case "transfer":
             aiMessage = {
               content: airResponse?. ?? "",
               sender: "agent",
               id: Date.now().toString(),
               agentName: "user",
               intent: "transfer",
             };
             setMessagesInStorage([...messages, aiMessage]);
             setMessages((messages) => [...messages, aiMessage]);
            break;
          case "unknown":
             aiMessage = {
               content: airResponse?.generalResponse ?? "",
               sender: "agent",
               id: Date.now().toString(),
               agentName: "user",
               intent: "unknown",
             };
             setMessagesInStorage([...messages, aiMessage]);
             setMessages((messages) => [...messages, aiMessage]);
            break;
          default:
             aiMessage = {
              content: airResponse?.generalResponse ?? "",
              sender: "agent",
              id: Date.now().toString(),
              agentName: "user",
              intent: "normalChat",
            };
            setMessagesInStorage([...messages, aiMessage]);
            setMessages((messages) => [...messages, aiMessage]);
        }
          
      } catch (err) {
        console.error(err);
        const errorMessage: Message = {
          content: "Sorry, I encountered an error processing your request.",
          sender: "agent",
          id: Date.now().toString(),
          agentName: "user",
          intent: "unknown",
        };

        setMessages((messages) => [...messages, errorMessage]);
        setMessagesInStorage([...messages, errorMessage]);
      }

      setPendingMessage(null);
    }

    getAIResponse();
  }, [pendingMessage]);
}

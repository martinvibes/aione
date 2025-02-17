import { useContext, useEffect } from "react";
import { responseFromChatOpenAi } from "../api/langchain";
import { Message } from "@/lib/types";
import { MessageContext } from "../useContext/message-context";
import { useParams } from "next/navigation";
import { useLocalStorage } from "./useLocalStorage";
import { pricePridictionHandle } from "@/lib/allora";
import { rugcheck } from "@/lib/rugcheck";

export function useAiResponse(
  pendingMessage: string | null,
  setPendingMessage: (e: null) => void
) {
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
            const aiMessage: Message = {
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
            const aicheckbalance: Message = {
              content: airResponse?.amount ?? "",
              sender: "agent",
              id: Date.now().toString(),
              agentName: "user",
              intent: "checkBalance",
            };
            setMessagesInStorage([...messages, aicheckbalance]);
            setMessages((messages) => [...messages, aicheckbalance]);
            break;
          case "normalChat":
            const aiNormlChat: Message = {
              content: airResponse?.generalResponse ?? "",
              sender: "agent",
              id: Date.now().toString(),
              agentName: "user",
              intent: "normalChat",
            };
            setMessagesInStorage([...messages, aiNormlChat]);
            setMessages((messages) => [...messages, aiNormlChat]);
            break;
          case "prediction":
            console.log(airResponse);
            pricePridictionHandle(
              airResponse.pridictTokenName ?? "",
              airResponse.generalResponse,
              messages,
              setMessages,
              setMessagesInStorage
            );

            break;
          case "rugcheck":
            console.log(airResponse);
            rugcheck(
              airResponse.tokenaddresstorugcheck ?? "",
              chatId,
              messages,
              setMessages,
              setMessagesInStorage
            );

            break;
          case "transfer":
            const aiTransfer: Message = {
              content: airResponse?.generalResponse ?? "",
              sender: "agent",
              id: Date.now().toString(),
              agentName: "user",
              intent: "transfer",
            };
            setMessagesInStorage([...messages, aiTransfer]);
            setMessages((messages) => [...messages, aiTransfer]);
            break;
          case "unknown":
            const aiUnKnownMessage: Message = {
              content: airResponse?.generalResponse ?? "",
              sender: "agent",
              id: Date.now().toString(),
              agentName: "user",
              intent: "unknown",
            };
            setMessagesInStorage([...messages, aiUnKnownMessage]);
            setMessages((messages) => [...messages, aiUnKnownMessage]);
            break;
          default:
            const aiDefaultMessage: Message = {
              content: airResponse?.generalResponse ?? "",
              sender: "agent",
              id: Date.now().toString(),
              agentName: "user",
              intent: "normalChat",
            };
            setMessagesInStorage([...messages, aiDefaultMessage]);
            setMessages((messages) => [...messages, aiDefaultMessage]);
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
  }, [pendingMessage, chatId, messages, setMessages, setMessagesInStorage, setPendingMessage]);
}

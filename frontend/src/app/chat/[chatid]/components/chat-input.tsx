"use client";
import { useLocalStorage } from "@/app/hooks/useLocalStorage";
import { useSpeech } from "@/app/hooks/useSpeech";
import SendIcon from "@/app/svg/send-icon";
import { ChatContext } from "@/app/useContext/chatContex";
import { AudioLines } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { responseFromChatOpenAi } from "@/app/api/langchain";
import { useParams } from "next/navigation";
import { MessageContext } from "@/app/useContext/message-context";
import { Message } from "@/lib/types";
import { useAiResponse } from "@/app/hooks/useAiResponse";


export default function ChatInput() {
  const { input: chatInput, setInput: setChatInput } = useContext(ChatContext);
  const [pendingMessage, setPendingMessage] = useState<string | null>(null);
  const { messages, setMessages } = useContext(MessageContext);
  const params = useParams();
  const chatId = params.chatid as string;
  const { setMessagesInStorage } = useLocalStorage(chatId);
  //const getLocalmessages = getMessagesFromStorage();

  const {
    listening,
    browserSupportsSpeechRecognition,
    startListening,
    transcript,
    SpeechRecognition,
  } = useSpeech();

  function chatHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (chatInput.trim().length === 0) return;

    const userMessage: Message = {
      content: chatInput,
      sender: "user",
      id: Date.now().toString(),
      agentName: "user",
    };

    setMessages((messages) => [...messages, userMessage]);
    setMessagesInStorage([...messages, userMessage]);
    setPendingMessage(chatInput);
    setChatInput("");
  }
  useAiResponse(pendingMessage,setPendingMessage)

  // useEffect(() => {
  //   async function getAIResponse() {
  //     if (!pendingMessage) return;

  //     try {
  //       const airResponse = await responseFromChatOpenAi(pendingMessage);

  //       switch (airResponse?.intent) {
  //         case "swap":
  //           break;
  //         case "checkBalance":
  //           break;
  //         case "normalChat":
  //           break;
  //         case "pridiction":
  //           break;
  //         case "transfer":
  //           break;
  //         case "unknown":
  //           break;
  //         default:
  //           const aiMessage: Message = {
  //             content: airResponse?.generalResponse ?? "",
  //             sender: "agent",
  //             id: Date.now().toString(),
  //             agentName: "user",
  //             intent: airResponse?.intent,
  //           };
  //       }

  //       // if (airResponse?.generalResponse) {
  //       //   const aiMessage: Message = {
  //       //     content: airResponse.generalResponse,
  //       //     sender: "agent",
  //       //     id: Date.now().toString(),
  //       //     agentName: "user",
  //       //     intent: airResponse.intent,
  //       //   };

  //       //   setMessagesInStorage([...messages, aiMessage]);
  //       //   setMessages((messages) => [...messages, aiMessage]);
  //       //   // console.log("this is the life we chose", aiMessage, airResponse);
  //       // }
  //     } catch (err) {
  //       console.error(err);
  //       const errorMessage: Message = {
  //         content: "Sorry, I encountered an error processing your request.",
  //         sender: "agent",
  //         id: Date.now().toString(),
  //         agentName: "user",
  //         intent: "None",
  //       };

  //       setMessages((messages) => [...messages, errorMessage]);
  //       setMessagesInStorage([...messages, errorMessage]);
  //     }

  //     setPendingMessage(null);
  //   }

  //   getAIResponse();
  // }, [pendingMessage]);

  function aiSuggestionMessageHandle(content: string) {
    const newMessage: Message = {
      content,
      sender: "user",
      id: Date.now().toString(),
      agentName: "user",
    };

    setMessages((messages) => [...messages, newMessage]);
    setMessagesInStorage([...messages, newMessage]);
  }

  useEffect(() => {
    if (listening) {
      setChatInput(transcript);
    }
  }, [listening, transcript]);

  return (
    <>
      {!messages.length && (
        <h1 className="text-[28px] font-bold leading-[37.8px] mb-5">
          Hi, Welcome to your AI AGENT
        </h1>
      )}
      <div
        className={`${
          messages.length ? "p-4" : "p-[40px] bg-[#121826]"
        } w-full max-w-7xl rounded-[8px] flex flex-col gap-[32px]`}
      >
        {!messages.length && (
          <div className="flex justify-center items-center gap-[10px]">
            <button
              onClick={() =>
                aiSuggestionMessageHandle("Show my wallet balance")
              }
              className="bg-[#1C2535] p-2 rounded-[8px]"
            >
              Show my wallet balance
            </button>
            <button
              onClick={() => aiSuggestionMessageHandle("Swap 1 ETH for USDT")}
              className="bg-[#1C2535] p-2 rounded-[8px]"
            >
              Swap 1 ETH for USDT
            </button>
            <button
              onClick={() =>
                aiSuggestionMessageHandle("List my recent transactions.")
              }
              className="bg-[#1C2535] p-2 rounded-[8px]"
            >
              List my recent transactions.
            </button>
            <button
              onClick={() =>
                aiSuggestionMessageHandle("What's the gas fee right now?")
              }
              className="bg-[#1C2535] p-2 rounded-[8px]"
            >
              What &apos; s the gas fee right now?
            </button>
          </div>
        )}
        <form
          onSubmit={chatHandler}
          className={`${
            messages.length ? "p-4" : "m-4 px-4 py-2"
          } flex gap-4 items-center bg-darkishBlue rounded-[8px]`}
        >
          <input
            type="text"
            value={chatInput}
            placeholder="Type a message here"
            onChange={(e) => setChatInput(e.target.value)}
            className="w-full border-none bg-inherit outline-none text-whiteChatText font-mono rounded-md"
          />
          <button
            type="submit"
            className="bg-inherit py-2 px-4 rounded-md grid place-content-center"
          >
            <SendIcon />
          </button>
          {browserSupportsSpeechRecognition && (
            <button
              onMouseDown={startListening}
              onMouseUp={SpeechRecognition.stopListening}
              type="button"
              className="hover:text-green-300"
            >
              <AudioLines />
            </button>
          )}
        </form>
      </div>
    </>
  );
}

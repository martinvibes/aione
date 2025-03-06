"use client";
import { useLocalStorage } from "@/app/hooks/useLocalStorage";
import { useSpeech } from "@/app/hooks/useSpeech";
import { ChatContext } from "@/app/useContext/chatContex";
import { AudioLines } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { MessageContext } from "@/app/useContext/message-context";
import { Message } from "@/lib/types";
import { useAiResponse } from "@/app/hooks/useAiResponse";
// import TransactionHistory from "./TransactionHistory";
import BlockSendLoader, {
  SendBtnIcon,
} from "@/app/components/ui/block-sender-loader";

export default function ChatInput() {
  const { input: chatInput, setInput: setChatInput } = useContext(ChatContext);
  const [pendingMessage, setPendingMessage] = useState<string | null>(null);
  const { messages, setMessages, isLoading, setIsLoading } =
    useContext(MessageContext);
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
    resetTranscript,
  } = useSpeech();

  function chatHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (chatInput.trim().length === 0) return;
    setIsLoading(true);
    const userMessage: Message = {
      content: chatInput,
      sender: "user",
      id: Date.now().toString(),
    };

    setMessages((messages) => [...messages, userMessage]);
    setMessagesInStorage([...messages, userMessage]);
    setPendingMessage(chatInput);
    setChatInput("");
  }
  useAiResponse(pendingMessage, setPendingMessage);
  function aiSuggestionMessageHandle(content: string) {
    const newMessage: Message = {
      content,
      sender: "user",
      id: Date.now().toString(),
    };

    setMessages((messages) => [...messages, newMessage]);
    setMessagesInStorage([...messages, newMessage]);
    setPendingMessage(content);
  }

  useEffect(() => {
    if (listening) {
      setChatInput(transcript);
    }
  }, [listening, transcript, setChatInput]);
  //console.log(transcript)
  return (
    <>
      {/* <TransactionHistory /> */}
      {!messages.length && (
        <h1 className="text-[28px] font-bold leading-[37.8px] mb-5  relative  z-[555] w-fit mx-auto">
          Hi, Welcome to your AI AGENT
        </h1>
      )}
      <div
        className={`${
          messages.length ? "p-4" : "p-[40px] bg-[#121826]"
        } w-full max-w-7xl rounded-[8px] flex flex-col gap-[32px]  relative  z-[555]`}
      >
        {!messages.length && (
          <div className="flex justify-center items-center gap-[10px] capitalize">
            <button
              onClick={() => aiSuggestionMessageHandle("what can you do")}
              className="bg-[#1C2535] p-2 rounded-[8px]"
            >
              what can you do
            </button>
            <button
              onClick={() => aiSuggestionMessageHandle("Show my s balance")}
              className="bg-[#1C2535] p-2 rounded-[8px]"
            >
              show my s balance
            </button>
            <button
              onClick={() => aiSuggestionMessageHandle("Ticker for anon")}
              className="bg-[#1C2535] p-2 rounded-[8px]"
            >
              Ticker for anon
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
            className="bg-inherit px-4 rounded-md grid place-content-center"
          >
            {!isLoading && !listening && <SendBtnIcon />}
            {isLoading && <BlockSendLoader />}
            {listening && <BlockSendLoader />}
          </button>
          {!isLoading && browserSupportsSpeechRecognition && (
            <button
              onMouseDown={startListening}
              onMouseUp={() => {
                SpeechRecognition.stopListening();
                resetTranscript();
              }}
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

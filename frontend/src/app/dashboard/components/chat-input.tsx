"use client";
import { useSpeech } from "@/app/hooks/useSpeech";
import SendIcon from "@/app/svg/send-icon";
import { ChatContext } from "@/app/useContext/chatContex";
import { useMessages } from "@/app/useContext/message-context";
import { AudioLines } from "lucide-react";
import { useContext, useEffect } from "react";
import { responseFromChatOpenAi } from "@/app/api/langchain";

export default function ChatInput() {
  const { setMessages, messages } = useMessages();
  const { input: chatInput, setInput: setChatInput } = useContext(ChatContext);
  const {
    listening,
    browserSupportsSpeechRecognition,
    startListening,
    transcript,
    SpeechRecognition,
  } = useSpeech();

  async function chatHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log(chatInput, "____________init__________");

    if (chatInput.length === 0) return;
    const newId = Date.now().toString();
    setMessages((message) => [
      ...message,
      {
        content: chatInput,
        sender: "user",
        id: newId,
        agentName: "user",
      },
    ]);

    try {
      const airResponse = await responseFromChatOpenAi(chatInput.toString());
      console.log(airResponse);
      if (airResponse?.generalResponse) {
        const aiMessageId = (Date.now() + 1).toString();
        setMessages((message) => [
          ...message,
          {
            content: airResponse.generalResponse,
            sender: "agent",
            id: aiMessageId,
            agentName: "user",
            intent: airResponse.intent,
          },
        ]);
      }
    } catch (err) {
      console.error(err);
      setMessages((message) => [
        ...message,
        {
          content: "Sorry, I encountered an error processing your request.",
          sender: "agent",
          id: message.length.toString(),
          agentName: "user",
        },
      ]);
    }

    setChatInput("");
  }

  function aiSuggestionMessageHandle(content: string) {
    setMessages((message) => [
      ...message,
      {
        content: content,
        sender: "user",
        id: (message.length + 1).toString(),
        agentName: "user",
      },
    ]);
  }
  useEffect(() => {
    if (listening) {
      setChatInput(transcript);
    }
  }, [listening, transcript, setChatInput]);
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
                aiSuggestionMessageHandle("What’s the gas fee right now?")
              }
              className="bg-[#1C2535] p-2 rounded-[8px]"
            >
              What’s the gas fee right now?
            </button>
          </div>
        )}
        <form
          onSubmit={chatHandler}
          action=""
          className={`${
            messages.length ? "p-4" : "m-4 px-4 py-2"
          } flex gap-4 items-center bg-darkishBlue rounded-[8px]`}
        >
          <input
            type="text"
            name=""
            id=""
            value={chatInput}
            placeholder="Type a message here"
            onChange={(e) => {
              setChatInput(e.target.value);
            }}
            className="w-full border-none bg-inherit outline-none text-whiteChatText font-mono rounded-md"
          />
          <button
            type="submit"
            className=" bg-inherit py-2  px-4 rounded-md grid place-content-center"
          >
            <SendIcon />
          </button>
          {browserSupportsSpeechRecognition && (
            <button
              onMouseDown={startListening}
              onMouseUp={SpeechRecognition.stopListening}
              type="button"
              className="hover:text-green-300 "
            >
              <AudioLines />
            </button>
          )}
        </form>
      </div>
    </>
  );
}

"use client";
import { useContext } from "react";
import {
  MessageSquare,
} from "lucide-react";
import { ChatContext } from "../useContext/chatContex";
import Swap from "../svg/swap";
import SideNavBar from "./components/side-bar";
import ChatInput from "./components/chat-input";
import { Chatpage } from "./components/chat-page";
import { useMessages } from "../useContext/message-context";
const Chat = () => {
  const {
    chatType,
  } = useContext(ChatContext);
  const {messages} = useMessages()




  return (
    <main className="bg-mainChatbg min-h-screen max-h-full text-whiteChatText flex overflow-hidden">
      <SideNavBar/>
      <section className="w-full max-h-full min-h-full p-6">
        <header className="flex gap-4">
          <button
            className={`${
              chatType === "ai-chat" ? "bg-aqwaGreen" : "bg-inherit"
            } p-4 flex justify-between items-center w-fit rounded-[8px] transition-all duration-500 border-[#F7F9FC] border`}
            type="button"
          >
            <MessageSquare />
          </button>
          <button
            className={`${
              chatType === "swap" ? "bg-aqwaGreen" : "bg-inherit"
            } p-4 flex justify-between items-center w-fit rounded-[8px] transition-all duration-500 border-[#F7F9FC] border`}
            type="button"
          >
            <Swap />
          </button>
        </header>
        <div className="w-full h-[95%] items-center justify-center flex flex-col gap-2">
          {messages.length > 0 && <Chatpage/> }
         <ChatInput/>
        </div>
      </section>
    </main>
  );
};
export default Chat;

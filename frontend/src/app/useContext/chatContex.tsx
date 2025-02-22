"use client";
import { createContext, useState, Dispatch, SetStateAction } from "react";

export const ChatContext = createContext<{
  input: string;
  setInput: Dispatch<SetStateAction<string>>;
  isSideBarOpen: boolean;
  chatType: string;
  isHistoryOpen:boolean,
  isChatHistoryOpen:boolean,
  setIsChatHistoryOpen:Dispatch<SetStateAction<boolean>>;
  setIsHistoryOpen:Dispatch<SetStateAction<boolean>>;
  setIsSideBarOpen: Dispatch<SetStateAction<boolean>>;
  setChatType: Dispatch<SetStateAction<string>>;
}>({
  input: "",
  isSideBarOpen: false,
  chatType: "",
  isHistoryOpen:false,
  isChatHistoryOpen:false,
  setIsChatHistoryOpen:()=>{},
  setIsHistoryOpen:()=>{},
  setInput: () => {},
  setIsSideBarOpen: () => {},
  setChatType: () => {},
});

const ChatContextProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  // chat input state
  const [input, setInput] = useState("");
  //main menu side bar
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  //chatType  = ai-chat | swap | account | analysis 
  const [chatType, setChatType] = useState("chat");
  // chat history visibility state
  const [isHistoryOpen,setIsHistoryOpen] = useState(false)
  // chat history visibility state
  const [isChatHistoryOpen,setIsChatHistoryOpen] = useState(false)

  return (
    <ChatContext.Provider
      value={{
        input,
        setInput,
        chatType,
        isSideBarOpen,
        setChatType,
        setIsSideBarOpen,
        isHistoryOpen,
        setIsHistoryOpen,
        isChatHistoryOpen,
        setIsChatHistoryOpen,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export default ChatContextProvider;

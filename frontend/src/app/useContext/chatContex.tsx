"use client";
import { createContext, useState, Dispatch, SetStateAction } from "react";

export const ChatContext = createContext<{
  input: string;
  setInput: Dispatch<SetStateAction<string>>;
  isSideBarOpen: boolean;
  chatType: string;
  isHistoryOpen: boolean;
  isChatHistoryOpen: boolean;
  isContactOpen: boolean;
  isWalletUiOpen: boolean;
  isTokenListOpen: boolean;
  setIsChatHistoryOpen: Dispatch<SetStateAction<boolean>>;
  setIsHistoryOpen: Dispatch<SetStateAction<boolean>>;
  setIsSideBarOpen: Dispatch<SetStateAction<boolean>>;
  setChatType: Dispatch<SetStateAction<string>>;
  setIsContactOpen: Dispatch<SetStateAction<boolean>>;
  setIsWalletUiOpen: Dispatch<SetStateAction<boolean>>;
  setIsTokenListOpen: Dispatch<SetStateAction<boolean>>;
}>({
  input: "",
  isSideBarOpen: false,
  isContactOpen: false,
  isWalletUiOpen: false,
  chatType: "",
  isHistoryOpen: false,
  isChatHistoryOpen: false,
  isTokenListOpen: false,
  setIsChatHistoryOpen: () => {},
  setIsContactOpen: () => {},
  setIsWalletUiOpen: () => {},
  setIsHistoryOpen: () => {},
  setInput: () => {},
  setIsSideBarOpen: () => {},
  setChatType: () => {},
  setIsTokenListOpen: () => {},
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
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  // chat history visibility state
  const [isChatHistoryOpen, setIsChatHistoryOpen] = useState(false);
  // user contact visibility state
  const [isContactOpen, setIsContactOpen] = useState(false);
  // token list visibility state
  const [isTokenListOpen, setIsTokenListOpen] = useState(false);
  // wallet ui visibility state
  const [isWalletUiOpen, setIsWalletUiOpen] = useState(false);

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
        isContactOpen,
        isWalletUiOpen,
        setIsContactOpen,
        setIsWalletUiOpen,
        isTokenListOpen,
        setIsTokenListOpen,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export default ChatContextProvider;

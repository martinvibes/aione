"use client"
import {
  createContext,
  useState,
  Dispatch,
  SetStateAction,
} from "react";

export const ChatContext = createContext<{
  input: string;
  setInput: Dispatch<SetStateAction<string>>;
}>({
  input: "",
  setInput: () => {},
});

const ChatContextProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [input, setInput] = useState("");

  return (
    <ChatContext.Provider
      value={{
        input,
        setInput,
      }}
    >
        {children}
    </ChatContext.Provider>
  );
};

export default ChatContextProvider;

"use client";
import React from "react";
import { useMessages } from "@/app/useContext/message-context";

export const Chatpage = () => {
  const { messages } = useMessages();
  return (
    <div
      className={`text h-[90%] w-full max-w-7xl chat-texts mx-auto p-4 rounded-lg space-y-4 flex flex-col-reverse overflow-y-auto scrollbar-hide scroll-smooth relative`}
    >
      {[...messages].reverse().map((message) => (
        <div
          key={message.id}
          className={`flex items-center my-2 ${
            message.sender === "user" ? "justify-end" : ""
          }`}
        >
          <div
            className={`${
              message.sender === "user"
                ? "rounded-[30px] rounded-ee-none"
                : "rounded-[30px] rounded-es-none"
            } p-5 break-words bg-[#1C2535] overflow-wrap-anywhere max-w-[50%]`}
          >
            {message.sender == "user" && (
              <div
                dangerouslySetInnerHTML={{ __html: message.content }}
                className="message-content"
              />
            )}
            {message.sender == "agent" && (
              <div
                // dangerouslySetInnerHTML={{ __html: message.content }}
                className="message-content flex gap-1"
              >
                <div
                  className={`${
                    message.agentName === "zerepy" ? "bg-[#2D9CDB]" : ""
                  } ${message.agentName === "allora" ? "bg-[#D8FFA1]" : ""} ${
                    message.agentName === "debridge" ? "bg-[#E5C8FF]" : ""
                  } w-4 h-4 rounded-[50%]`}
                />
                {message.content}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

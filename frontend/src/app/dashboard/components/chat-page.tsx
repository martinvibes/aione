"use client";
import React from "react";
import { useMessages } from "@/app/useContext/message-context";

export const Chatpage = () => {
  const { messages } = useMessages();
  return (
    <div
      className={`text h-full w-full max-h-[525px] max-w-7xl chat-texts mx-auto p-4 rounded-lg space-y-4 flex flex-col-reverse overflow-y-auto scrollbar-hide scroll-smooth relative`}
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
              message.sender === "user" ? "bg-gray-900" : "bg-gray-800"
            } px-4 py-3 rounded-[24px] break-words overflow-wrap-anywhere lg:max-w-[700px] md:max-w-[500px] max-w-[300px]`}
          >
            {message.sender !== "chart" && (
              <div
                dangerouslySetInnerHTML={{ __html: message.content }}
                className="message-content"
              />
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

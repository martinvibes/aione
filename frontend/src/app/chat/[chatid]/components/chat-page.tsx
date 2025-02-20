"use client";
import React, { useContext } from "react";
import { MessageContext } from "@/app/useContext/message-context";
import RugCheckComponent from "./rug-check";
import TradingInfo from "./trading-info";
import SkeletonCard from "@/app/components/ui/skeleton";

export const Chatpage = () => {
  const { messages, isLoading } = useContext(MessageContext);

  return (
    <>
      <div className="text h-[90%] w-full max-w-7xl chat-texts mx-auto p-4 rounded-lg space-y-4 flex flex-col-reverse overflow-y-auto scrollbar-hide scroll-smooth relative z-[555]">
        {[...messages].reverse().map((message) => (
          <div
            key={message.id}
            className={`flex items-center my-2 ${
              message.sender === "user" ? "justify-end" : ""
            } relative z-[555]`}
          >
            <div
              className={`${
                message.sender === "user"
                  ? "rounded-[30px] rounded-ee-none"
                  : "rounded-[30px] rounded-es-none"
              } p-5 break-words bg-[#1C2535] overflow-wrap-anywhere max-w-[50%]`}
            >
              {message.sender === "user" && (
                <div
                  dangerouslySetInnerHTML={{ __html: `${message.content}` }}
                  className="message-content relative h-fit"
                />
              )}
              {message.sender === "agent" && (
                <div key={message.id} className="message-content relative pl-3">
                  <div
                    className={`${
                      message.agentName === "zerepy" ? "bg-[#687d8a]" : ""
                    } ${message.agentName === "allora" ? "bg-[#D8FFA1]" : ""} ${
                      message.agentName === "debridge" ? "bg-[#E5C8FF]" : ""
                    } w-3 h-3 absolute -left-1 rounded-full`}
                  />
                  {message.content}
                  
                  {message.component && (
                    <div className="mt-4">
                      {message.component.type === "RugCheck" && (
                        <RugCheckComponent {...message.component.props} />
                      )}
                      
                      {message.component.type === "chart" && (
                        <TradingInfo {...message.component.props} />
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      {isLoading && <SkeletonCard />}
    </>
  );
};
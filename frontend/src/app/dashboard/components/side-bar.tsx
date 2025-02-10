"use client";
import ActiveAgentIcon from "@/app/svg/active-agent";
import Analysis from "@/app/svg/analysis";
import CommunityIcon from "@/app/svg/community-icon";
import Swap from "@/app/svg/swap";
import { AlignJustify, ChevronRight, MessageSquare, Settings } from "lucide-react";
import Image from "next/image";
import logo from "../../../../public/side-bar-logo.svg";
import { ChatContext } from "@/app/useContext/chatContex";
import { useContext } from "react";
import ClipBoard from "@/app/svg/clip-board";

export default function SideNavBar() {
  const { chatType, isSideBarOpen, setIsSideBarOpen,setChatType } = useContext(ChatContext);
  function handleSideBar() {
    setIsSideBarOpen((prev) => !prev);
  }
  function chatTypeHandle(data: string) {
    setChatType(data);
  }
  return (
    <nav
      className={`${
        isSideBarOpen ? "w-[90px]" : "w-[315px]"
      } min-h-full bg-sideNavBg px-4 py-6 flex flex-col gap-8 transition-all duration-500 relative`}
    >
      <button
        className="bg-darkishBlue p-4 flex justify-between items-center w-full rounded-[8px] mx-auto"
        type="button"
      >
        <Image
          className={`${
            isSideBarOpen ? "hidden" : "block"
          } transition-all duration-500`}
          src={logo}
          alt="aione"
          priority
        />
        <AlignJustify onClick={handleSideBar} />
      </button>
      <div className="flex flex-col gap-4">
        <button
          className={`${
            chatType === "account"
              ? "bg-aqwaGreen border-[#F8F8F8]"
              : " bg-darkishBlue"
          } bg-darkishBlue px-4 mx-auto py-2 flex border border-transparent justify-between items-center w-full rounded-[8px] transition-all duration-500`}
          type="button"
          onClick={() => chatTypeHandle("account")}
        >
          <div className="flex items-center justify-between gap-2 ">
            <div className="w-8 h-8 rounded-full bg-yellowish mx-auto" />
            <span
              className={`${
                isSideBarOpen ? "hidden" : "flex"
              }  flex-col items-start transition-all duration-700`}
            >
              <span>Account 1</span>
              <span className="flex">
                0x593e0...874d0 <ClipBoard />{" "}
              </span>
            </span>
          </div>
          <ChevronRight
            className={`${
              isSideBarOpen ? "hidden" : "block"
            } transition-all duration-500`}
          />
        </button>
        <button
          className={`${
            chatType === "ai-chat"
              ? "bg-aqwaGreen border-[#F8F8F8]"
              : " bg-darkishBlue"
          } bg-darkishBlue p-4 flex border border-transparent justify-between items-center w-full rounded-[8px] transition-all duration-500 hover:bg-aqwaGreen mx-auto`}
          type="button"
          onClick={() => chatTypeHandle("ai-chat")}
        >
          <div className="flex items-center gap-3">
            <MessageSquare />
            <span className={isSideBarOpen ? "hidden" : "block"}>AI Chat</span>
          </div>
        </button>
        <button
          className={`${
            chatType === "analysis"
              ? "bg-aqwaGreen border-[#F8F8F8]"
              : " bg-darkishBlue"
          } bg-darkishBlue border border-transparent p-4  flex justify-between items-center w-full rounded-[8px] transition-all duration-500 hover:bg-aqwaGreen mx-auto`}
          type="button"
          onClick={() => chatTypeHandle("analysis")}
        >
          <div className="flex items-center gap-3">
            <Analysis />
            <span className={isSideBarOpen ? "hidden" : "block"}>
              Coin analysis
            </span>
          </div>
        </button>
        <button
          className={`${
            chatType === "swap"
              ? "bg-aqwaGreen border-[#F8F8F8]"
              : " bg-darkishBlue"
          } bg-darkishBlue p-4 flex border border-transparent justify-between items-center w-full rounded-[8px] transition-all duration-500 hover:bg-aqwaGreen mx-auto`}
          type="button"
          onClick={() => chatTypeHandle("swap")}
        >
          <div className="flex items-center gap-3">
            <Swap />
            <span className={isSideBarOpen ? "hidden" : "block"}>
              Swap token
            </span>
          </div>
        </button>
        <button
          className={`${
            chatType === "active-agent"
              ? "bg-aqwaGreen border-[#F8F8F8]"
              : " bg-darkishBlue"
          } bg-darkishBlue p-4 flex border border-transparent justify-between items-center w-full rounded-[8px] transition-all duration-500 hover:bg-aqwaGreen mx-auto`}
          type="button"
          onClick={() => chatTypeHandle("active-agent")}
        >
          <div className="flex items-center gap-3">
            <ActiveAgentIcon />
            <span className={isSideBarOpen ? "hidden" : "block"}>
              Active agent
            </span>
          </div>
        </button>
      </div>
      <button
        className={`bg-darkishBlue p-4 flex justify-between items-center rounded-[8px] transition-all duration-500 absolute bottom-4 left-3 ${
          isSideBarOpen ? "w-[70%]" : "w-[90%]"
        }`}
        type="button"
      >
        <div className="flex items-center justify-between gap-2 mx-auto">
          <CommunityIcon />
          <span
            className={`${
              isSideBarOpen ? "hidden" : "flex"
            }  flex-col items-start transition-all duration-700`}
          >
            <span>Community </span>
          </span>
        </div>
        <Settings
          className={`${
            isSideBarOpen ? "hidden" : "block"
          } transition-all duration-500`}
        />
      </button>
    </nav>
  );
}

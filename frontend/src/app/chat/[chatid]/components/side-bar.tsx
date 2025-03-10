"use client";
import ActiveAgentIcon from "@/app/svg/active-agent";
import CommunityIcon from "@/app/svg/community-icon";
import { AlignJustify, ChevronRight, Coins, Settings } from "lucide-react";
import Image from "next/image";
import logo from "../../../../../public/AIONE__6_-removebg-preview.png";
import { ChatContext } from "@/app/useContext/chatContex";
import { useContext } from "react";
import ContactIcon from "@/app/svg/contact-icon";
import ContactList from "./contact-list/contact-list";
import ChatHistory from "./chat-history";
import TokenList from "./token-list/token-list";
import WalletUi from "@/app/components/wallet-popup";
import { formatAddress } from "@/app/components/wallet-popup";
import Link from "next/link";

export default function SideNavBar() {
  const {
    chatType,
    isSideBarOpen,
    setIsSideBarOpen,
    setChatType,
    setIsChatHistoryOpen,
    isContactOpen,
    setIsContactOpen,
    isWalletUiOpen,
    setIsWalletUiOpen,
    setIsTokenListOpen,
    isTokenListOpen,
  } = useContext(ChatContext);

  function handleSideBar() {
    setIsSideBarOpen((prev) => !prev);
  }
  function chatTypeHandle(data: string) {
    setChatType(data);
  }

  function contactListHandle() {
    setIsContactOpen((prev) => !prev);
    setIsChatHistoryOpen(false);
    setIsWalletUiOpen(false);
    setIsChatHistoryOpen(false);
    setIsTokenListOpen(false);
  }

  function walletUiHandle() {
    setIsWalletUiOpen((prev) => !prev);
    setIsChatHistoryOpen(false);
    setIsContactOpen(false);
    setIsChatHistoryOpen(false);
     setIsTokenListOpen(false);
  }

  function tokenListHandle() {
    setIsTokenListOpen((prev) => !prev);
    setIsWalletUiOpen(false);
    setIsContactOpen(false);
    setIsChatHistoryOpen(false);
  }
  return (
    <>
      <nav
        className={`${
          isSideBarOpen ? "w-[90px]" : "w-[315px]"
        } min-h-full bg-sideNavBg px-4 py-6 flex flex-col gap-8 transition-all duration-500 relative z-[555]`}
      >
        <Link href="/"
          className="bg-darkishBlue p-4 flex justify-between items-center w-full rounded-[8px] mx-auto h-16"
        >
          <Image
            className={`${
              isSideBarOpen ? "hidden" : "block"
            } transition-all duration-500`}
            width={80}
            height={80}
            src={logo}
            alt="aione"
            priority
          />
          <AlignJustify onClick={handleSideBar} />
        </Link>
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
                onClick={walletUiHandle}
              >
                <span>Account 1</span>
                <span className="flex">
                  {formatAddress("0x11CaeF1EF6FAd2A9e8987051Ca5bfC869F11dE7A")}
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
              chatType === "analysis"
                ? "bg-aqwaGreen border-[#F8F8F8]"
                : " bg-darkishBlue"
            } bg-darkishBlue border border-transparent p-4  flex justify-between items-center w-full rounded-[8px] transition-all duration-500 hover:bg-aqwaGreen mx-auto`}
            type="button"
            onClick={contactListHandle}
          >
            <div className="flex items-center gap-3">
              <ContactIcon />
              <span className={isSideBarOpen ? "hidden" : "block"}>
                Contact
              </span>
            </div>
          </button>

          <button
            className={`${
              chatType === "analysis"
                ? "bg-aqwaGreen border-[#F8F8F8]"
                : " bg-darkishBlue"
            } bg-darkishBlue border border-transparent p-4  flex justify-between items-center w-full rounded-[8px] transition-all duration-500 hover:bg-aqwaGreen mx-auto`}
            type="button"
            onClick={tokenListHandle}
          >
            <div className="flex items-center gap-3">
              <Coins />
              <span className={isSideBarOpen ? "hidden" : "block"}>Tokens</span>
            </div>
          </button>

          <button
            className={`${
              chatType === "active-agent"
                ? "bg-aqwaGreen border-[#F8F8F8]"
                : " bg-darkishBlue"
            } bg-darkishBlue p-4 flex border border-transparent justify-between items-center w-full rounded-[8px] transition-all duration-500 hover:bg-aqwaGreen mx-auto`}
            type="button"
            onClick={() => {
              setIsChatHistoryOpen((state) => !state);
              setIsTokenListOpen(false);
              setIsWalletUiOpen(false);
              setIsContactOpen(false);
            }}
          >
            <div className="flex items-center gap-3">
              <ActiveAgentIcon />
              <span className={isSideBarOpen ? "hidden" : "block"}>
                Chat History
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
      {isContactOpen && <ContactList close={contactListHandle} />}
      {isWalletUiOpen && <WalletUi close={walletUiHandle} />}
      {isTokenListOpen && <TokenList close={tokenListHandle} />}
      <ChatHistory />
    </>
  );
}

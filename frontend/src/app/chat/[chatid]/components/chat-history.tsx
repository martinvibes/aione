import { useLocalStorage } from "@/app/hooks/useLocalStorage";
import { stringSlice } from "@/lib/helper";
import Link from "next/link";
import { useParams } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { ChatContext } from "@/app/useContext/chatContex";
import { useContext } from "react";
import { X } from "lucide-react";
// import TransactionHistory from "./TransactionHistory";

export default function ChatHistory() {
  const { setIsChatHistoryOpen, setIsContactOpen, isChatHistoryOpen } = useContext(ChatContext);
  const params = useParams();
  const chatId = params.chatid as string;
  const { getAllHistoryData } = useLocalStorage(chatId);
  const historyData = getAllHistoryData();
  return (
    <AnimatePresence initial={false}>
      {isChatHistoryOpen && (
        // <div className="bg-darkishBlue w-full h-full z-[55555]">
        <motion.div
          className="bg-darkishBlue min-h-[80%] max-h-[90%] w-[300px] p-3 scrollbar-hide overflow-y-auto fixed left-24 z-[998] top-3 rounded-md py-8 backdrop-blur-lg"
          exit={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          initial={{ opacity: 0, scale: 0.7 }}
          transition={{ ease: "linear" }}
        >
          <div
            onClick={() => {
              setIsChatHistoryOpen((state) => !state);
              setIsContactOpen(false)
            }}
            className="flex justify-end text-2xl mt-2 mr-2"
          >
            <X
            //  className="w-8 shadow-md p-2 m-2 text-4xl"
            />
          </div>
          <div className="overflow-y-auto scrollbar-hide scroll-smooth">
            <h2 className="border-b-[#D6F3F7] border-b p-4 text-center">
              Chat History
            </h2>

            <div className="grid gap-2 p-2">
              {historyData.map((data, index) => {
                return (
                  <Link
                    onClick={() => setIsChatHistoryOpen((state) => !state)}
                    href={`/chat/${data.id}`}
                    className="border p-4 rounded-md text-sm font-semibold"
                    key={index}
                  >
                    {stringSlice(data.data)}
                  </Link>
                );
              })}
            </div>
          </div>
        </motion.div>
        // </div>
      )}
    </AnimatePresence>
  );
}

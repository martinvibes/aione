import { useLocalStorage } from "@/app/hooks/useLocalStorage";
import { stringSlice } from "@/lib/helper";
import Link from "next/link";
import { useParams } from "next/navigation";
import {AnimatePresence,motion} from "motion/react"
import { ChatContext } from "@/app/useContext/chatContex";
import { useContext } from "react";

export default function History() {
   const {isHistoryOpen:isOpen } = useContext(ChatContext);
  const params = useParams();
  const chatId = params.chatid as string;
  const { getAllHistoryData } = useLocalStorage(chatId);
  const historyData = getAllHistoryData();
  return (
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          className="rounded-[8px] bg-[#141A2A] h-full overflow-y-auto scrollbar-hide scroll-smooth "
          exit={{ opacity: 0, width: "0%" }}
          animate={{ opacity: 1, scale: 1, width: "30%" }}
          initial={{ opacity: 0, width: "0%" }}
          transition={{ease:"linear"}}
        >
          <h2 className="border-b-[#D6F3F7] border-b p-4 text-center">
            Chat History
          </h2>

          <div className="grid gap-2 p-2">
            {historyData.map((data, index) => {
              return (
                <Link
                  href={`/chat/${data.id}`}
                  className="border p-4 rounded-md text-sm font-semibold"
                  key={index}
                >
                  {stringSlice(data.data)}
                </Link>
              );
            })}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

import { useLocalStorage } from "@/app/hooks/useLocalStorage";
import { stringSlice } from "@/lib/helper";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function History() {
  const params = useParams();
  const chatId = params.chatid as string;
  const { getAllHistoryData } = useLocalStorage(chatId);
  const historyData = getAllHistoryData();
  return (
    <div className="transition-all duration-500 rounded-[8px] bg-[#141A2A] h-full w-[30%] overflow-y-auto scrollbar-hide scroll-smooth ">
      <h2 className="border-b-[#D6F3F7] border-b p-4 text-center">
        Chat History
      </h2>

      <div className="grid gap-2 p-2">
        {historyData.map((data, index) => {
          return (
            <Link
              href={`/chat/${data.id}`}
              className="border p-4 rounded-md"
              key={index}
            >
              {stringSlice(data.data)}
            </Link>
          );
        })}
      </div>
    </div>
  );
}

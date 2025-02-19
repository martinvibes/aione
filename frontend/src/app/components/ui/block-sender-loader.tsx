import SendIcon from "@/app/svg/send-icon";
import { AnimatePresence, motion } from "framer-motion";

export default function BlockSendLoader() {
  return (
    <AnimatePresence>
      <motion.span
        className="p-2 rounded-full bg-white"
        exit={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        initial={{ opacity: 0, scale: 0 }}
        transition={{ ease: "linear" }}
      >
        <span className="bg-[#000] w-3 h-3 flex" />
      </motion.span>
    </AnimatePresence>
  );
}

function SendBtnIcon() {
  return (
    <AnimatePresence>
      <motion.span
        exit={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        initial={{ opacity: 0, scale: 0 }}
        transition={{ ease: "linear" }}
        data-tooltip-target="tooltip-default"
      >
        <SendIcon />
      </motion.span>
    </AnimatePresence>
  );
}

export {SendBtnIcon}

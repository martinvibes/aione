"use client";
import { useContext, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import AddContact from "./add-contact-form";
import { type data, getLocalSstorageAddress } from "@/lib/helper";
import { ChatContext } from "@/app/useContext/chatContex";
import { X, User, Copy, Plus } from "lucide-react";

interface CloseProps {
  close: () => void;
}

function ContactList({ close }: CloseProps) {
  const { setIsContactOpen } = useContext(ChatContext);
  const [contact, setContact] = useState<data>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const storageData: data = getLocalSstorageAddress();
  const storeContact = useMemo(() => storageData, [storageData]);

  function formModalHandler() {
    setIsFormOpen((data) => !data);
    if (isFormOpen) {
      setIsContactOpen(false);
    }
  }

  useEffect(() => {
    if (storeContact.length > contact.length) {
      setContact(storeContact);
    }
  }, [storeContact, contact]);

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <>
      {isFormOpen && <AddContact close={formModalHandler} />}
      <AnimatePresence>
        <motion.section
          className="bg-darkishBlue min-h-[80%] max-h-[90%] w-[350px] p-6 scrollbar-hide overflow-y-auto fixed left-24 z-[998] top-3 rounded-lg shadow-lg"
          exit={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          initial={{ opacity: 0, scale: 0.7 }}
          transition={{ ease: "easeInOut" }}
        >
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-xl font-bold text-white">Contact Addresses</h1>
            <button
              onClick={close}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          <div className="space-y-4">
            {contact.map((data, index) => (
              <div
                key={index}
                className="bg-[#1C2136] p-4 rounded-lg hover:bg-[#252B48] transition-colors"
              >
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center text-aqwaGreen">
                    <User className="h-4 w-4 mr-2" />
                    <span className="font-semibold">{data.name}</span>
                  </div>
                  <button
                    onClick={() => copyToClipboard(data.address, index)}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {copiedIndex === index ? (
                      <span className="text-aqwaGreen text-sm">Copied!</span>
                    ) : (
                      <Copy className="h-5 w-5" />
                    )}
                  </button>
                </div>
                <p className="text-[#51586D] text-sm font-mono">
                  {`${data.address.slice(0, 6)}...${data.address.slice(-6)}`}
                </p>
              </div>
            ))}
          </div>
          <button
            className="bg-aqwaGreen hover:bg-aqwaGreen/90 text-darkishBlue rounded-lg py-3 px-4 text-base font-semibold capitalize w-full mt-6 flex items-center justify-center transition-colors"
            onClick={formModalHandler}
          >
            <Plus className="h-5 w-5 mr-2" />
            Add New Contact
          </button>
        </motion.section>
      </AnimatePresence>
    </>
  );
}

export default ContactList;

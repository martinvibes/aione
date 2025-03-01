/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useContext, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import AddContact from "./add-contact-form";
import { data, getLocalSstorageAddress } from "@/lib/helper";
import Xmark from "@/app/svg/x-mark";
import { ChatContext } from "@/app/useContext/chatContex";

interface close {
  close: () => void;
}

function ContactList(props: close) {
    const { setIsContactOpen } = useContext(ChatContext);
  const [contact, setContact] = useState<data>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const storgedata: data = getLocalSstorageAddress();
  const storeContact = useMemo(() => storgedata, [storgedata.length]);
  function formModalHandler() {
    setIsFormOpen((data) => !data);
    if(isFormOpen){
      setIsContactOpen(false)
    }
  }

  useEffect(() => {
    console.log(storeContact.length, contact.length);
    if (storeContact.length > contact.length) {
      setContact(storeContact);
    }
  }, [setContact, contact, storeContact]);

  return (
    <>
      {isFormOpen && <AddContact close={formModalHandler} />}
      <AnimatePresence>
        <motion.section
          className="bg-darkishBlue min-h-[80%] max-h-[90%] w-[300px] p-3 scrollbar-hide overflow-y-auto fixed left-24 z-[998] top-3 rounded-md py-8 backdrop-blur-lg"
          exit={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          initial={{ opacity: 0, scale: 0.7 }}
          transition={{ ease: "linear" }}
        >
          <div className="absolute right-6 top-3" onClick={() => props.close()}>
            <Xmark />
          </div>
          <div className="">
            <h1 className="text-base font-semibold text-white text-center capitalize">
              contact address
            </h1>
            <div className="grid gap-10">
              <ul className="pt-3">
                {contact.map((data, index) => {
                  return (
                    <li key={index}>
                      <h3 className="capitalize">
                        {data?.name}:
                        <span className="lowercase pl-2 text-[#51586D]">
                          {` ${data?.address.slice(
                            0,
                            5
                          )}...${data?.address.slice(-5)}`}
                        </span>
                      </h3>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
          <button
            className="bg-aqwaGreen rounded-lg border border-[#3D435C] text-white py-4 text-base font-semibold capitalize absolute bottom-4 w-[92%] mx-auto"
            onClick={formModalHandler}
          >
            add new address
          </button>
        </motion.section>
      </AnimatePresence>
    </>
  );
}
export default ContactList;

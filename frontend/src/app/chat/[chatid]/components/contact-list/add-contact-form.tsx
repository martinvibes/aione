"use client";

import type React from "react";
import { useState } from "react";
import {
  type data,
  getLocalSstorageAddress,
  setLocalStorageAddress,
} from "@/lib/helper";
import { X, UserPlus } from "lucide-react";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";

interface CloseProps {
  close: () => void;
}

function AddContact({ close }: CloseProps) {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const data: data = getLocalSstorageAddress();

    const filter = data.filter(
      (item) => item.name === name || item.address === address
    );

    if (filter.length > 0) {
      toast.error("Contact already exists");
      return;
    }

    if (name && address) {
      const updateData: data = [...data, { name, address, chain: "" }];
      setLocalStorageAddress(updateData);
      toast.success("Contact added successfully!");
      close();
    }
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9989] flex items-center justify-center"
        onClick={close}
      >
        <motion.form
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-darkishBlue rounded-lg p-6 w-full max-w-md z-[9989555] shadow-xl"
          onClick={(e) => e.stopPropagation()}
          onSubmit={handleSubmit}
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-white">Add New Contact</h2>
            <button
              type="button"
              onClick={close}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-400 mb-1"
              >
                Contact Name
              </label>
              <input
                required
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 bg-[#1C2136] border border-[#3D435C] rounded-md text-white focus:outline-none focus:ring-2 focus:ring-aqwaGreen focus:border-transparent"
                placeholder="Enter contact name"
              />
            </div>

            <div>
              <label
                htmlFor="address"
                className="block text-sm font-medium text-gray-400 mb-1"
              >
                Contact Address
              </label>
              <input
                required
                type="text"
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full px-3 py-2 bg-[#1C2136] border border-[#3D435C] rounded-md text-white focus:outline-none focus:ring-2 focus:ring-aqwaGreen focus:border-transparent"
                placeholder="Enter contact address"
              />
            </div>
          </div>

          <button
            type="submit"
            className="mt-6 w-full bg-aqwaGreen hover:bg-aqwaGreen/90 text-darkishBlue rounded-md py-2 px-4 text-base font-semibold capitalize flex items-center justify-center transition-colors"
          >
            <UserPlus className="h-5 w-5 mr-2" />
            Add Contact
          </button>
        </motion.form>
      </motion.div>
    </AnimatePresence>
  );
}

export default AddContact;

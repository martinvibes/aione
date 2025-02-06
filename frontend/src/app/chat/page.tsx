"use client";
import { useRef, useState } from "react";

const page = () => {
  const [chatInput, setChatInput] = useState("");
  function chatHandler(e:React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    console.log(chatInput);
  }
  return (
    <section>
      <form onSubmit={chatHandler} action="" className="m-4">
        <input
          type="text"
          name=""
          id=""
          placeholder="Type a message here"
          onChange={(e)=>{setChatInput(e.target.value)}} 
          className="w-300px h-[40px] border bg-inherit m-2 outline-none text-white font-mono p-4 rounded-md"
        />
        <button  type="submit" className=" bg-gray-700 py-2  px-4 rounded-md">
          send
        </button>
      </form>
    </section>
  );
};
export default page;

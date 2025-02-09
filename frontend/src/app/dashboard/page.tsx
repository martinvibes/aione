"use client";
import { useContext, useEffect } from "react";
import { Mic } from "lucide-react";
import { useSpeech } from "../hooks/useSpeech";
import { ChatContext } from "../useContext/chatContex";
const Chat = () => {
  const { input: chatInput, setInput: setChatInput } = useContext(ChatContext);
  const {
    listening,
    browserSupportsSpeechRecognition,
    startListening,
    transcript,
    SpeechRecognition
  } = useSpeech();
  function chatHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log(chatInput);
  }


  useEffect(()=>{
    if(listening){
      setChatInput(transcript)
    }
  },[listening,transcript,setChatInput])
  return (
    <section className="bg-white min-h-screen">
      <p>Microphone: {listening ? "on" : "off"}</p>
      <p>{transcript}r</p>
      <form
        onSubmit={chatHandler}
        action=""
        className="m-4 flex gap-3 items-center"
      >
        <input
          type="text"
          name=""
          id=""
          placeholder="Type a message here"
          onChange={(e) => {
            setChatInput(e.target.value);
          }}
          className="w-300px h-[40px] border bg-inherit m-2 outline-none text-black font-mono p-4 rounded-md"
        />
        {browserSupportsSpeechRecognition && (
          <Mic
            onMouseDown={startListening}
            onMouseUp={SpeechRecognition.stopListening}
            className="hover:text-green-300 "
          />
        )}
        <button type="submit" className=" bg-gray-700 py-2  px-4 rounded-md">
          send
        </button>
      </form>
    </section>
  );
};
export default Chat;

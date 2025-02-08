"use client";
import "regenerator-runtime/runtime";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";


const Dictaphone = () => {
  const { transcript, listening, browserSupportsSpeechRecognition,resetTranscript } =
    useSpeechRecognition();
  const startListening = () =>
    SpeechRecognition.startListening({ continuous: true });

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesnt support speech recognition.</span>;
  }

  return (
    <div className="bg-white h-screen flex justify-center items-center flex-col gap-4">
      <div className="flex gap-3 items-center">
        <p>Microphone: {listening ? "on" : "off"}</p>
        <button
          className="border rounded-md px-3 py-1"
          // onTouchStart={startListening}
          onMouseDown={startListening}
          // onTouchEnd={SpeechRecognition.stopListening}
          onMouseUp={SpeechRecognition.stopListening}
        >
          Hold to talk
        </button>
      </div>
      {/* <p>{transcript}</p> */}
      <div className="grid gap-3">
        <h2>v2</h2>
        <p>Microphone: {listening ? "on" : "off"}</p>
        <button
          className="border p-4 rounded-md"
          onClick={() => SpeechRecognition.startListening()}
        >
          Start
        </button>
        <button
          className="border p-4 rounded-md"
          onClick={SpeechRecognition.stopListening}
        >
          Stop
        </button>
        <button className="border p-4 rounded-md" onClick={resetTranscript}>
          Reset
        </button>
        <p>{transcript}</p>
      </div>
    </div>
  );
};
export default Dictaphone;
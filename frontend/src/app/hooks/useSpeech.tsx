"use client";
import "regenerator-runtime/runtime";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";


export const useSpeech = () => { 
  const { transcript, listening, browserSupportsSpeechRecognition,resetTranscript } =
    useSpeechRecognition();
  const startListening = () =>
    SpeechRecognition.startListening({ continuous: true });
  return {
    transcript,
    listening,
    browserSupportsSpeechRecognition,
    resetTranscript,
    startListening,
    SpeechRecognition,
  };
};


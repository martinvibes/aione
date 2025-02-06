import { useEffect, useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

export const useSafeRecognition = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const recognition = useSpeechRecognition();

  if (!isClient) {
    return {
      transcript: "",
      listening: false,
      browserSupportsSpeechRecognition: false,
      resetTranscript: () => {},
    };
  }

  return recognition;
};

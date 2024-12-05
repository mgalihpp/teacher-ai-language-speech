import { useRef, useState } from "react";
import { toast } from "sonner";
import axios from "axios";
import { type Transcript } from "assemblyai";
import { useAiTeacher } from "@/hooks/use-ai-teacher";

const TRANSCRIPT_API_URL = `https://national-kellyann-malas-0a197ff8.koyeb.app/api/speech`;

export const useSpeechRecognition = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const fromLanguage = useAiTeacher().fromLanguage;

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });

      const mediaRecorder = new MediaRecorder(stream);

      mediaRecorderRef.current = mediaRecorder;

      const chunks: BlobPart[] = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunks.push(event.data);
        }
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(chunks, {
          type: "audio/webm",
        });
        await uploadAudio(audioBlob);
      };

      mediaRecorder.start();
      setIsRecording(true);
      toast.message("Recording started");
    } catch (error) {
      console.error(error);
      toast.error("Failed to access microphone.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      toast.message("Recording stopped");
    }
  };

  const uploadAudio = async (audio: Blob | null = null) => {
    if (!audio) {
      toast.error("No audio recorded to upload.");
      return;
    }

    const language_code = getLanguageCode(fromLanguage);

    try {
      const res = await axios.post<{ data: Transcript }>(
        `${TRANSCRIPT_API_URL}?lang_code=${language_code}`,
        audio,
        {
          headers: {
            "Content-Type": "audio/webm",
          },
        },
      );

      const transcrip = res.data.data.text;

      setTranscript(transcrip!);
    } catch (error) {
      console.error("Error uploading audio:", error);
      toast.error("Failed to upload audio.");
    }
  };

  const getLanguageCode = (lang: LanguageOptions) => {
    switch (lang) {
      case "english":
        return "en-us";
      case "japanese":
        return "ja";
      case "indonesia":
        return "id";
      case "france":
        return "fr";
      default:
        return "en-us";
    }
  };

  return {
    isRecording,
    transcript,
    startRecording,
    stopRecording,
  };
};

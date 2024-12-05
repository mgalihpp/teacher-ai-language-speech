import { useRef, useState } from "react";
import { toast } from "sonner";
import axios from "axios";
import { type Transcript } from "assemblyai";

export const useSpeechRecognition = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);

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

    try {
      const res = await axios.post<Transcript>("/api/speech", audio, {
        headers: {
          "Content-Type": "audio/webm",
        },
      });

      const transcrip = res.data.text;

      setTranscript(transcrip!);
    } catch (error) {
      console.error("Error uploading audio:", error);
      toast.error("Failed to upload audio.");
    }
  };

  return {
    isRecording,
    transcript,
    startRecording,
    stopRecording,
  };
};

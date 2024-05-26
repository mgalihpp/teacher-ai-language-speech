import { env } from "@/env";
import { create } from "zustand";

interface AiTeacherState {
  messages: Message[];
  currentMessage: Message | null;
  teacher: Teacher;
  classroom: Classroom;
  loading: boolean;
  furigana: boolean;
  indonesia: boolean;
  speech: Speech;

  setMessages: (message: Message) => void;
  setLoading: (state: boolean) => void;
  setTeacher: (teacher: Teacher) => void;
  setClassroom: (classroom: Classroom) => void;
  setFurigana: (state: boolean) => void;
  setIndonesia: (state: boolean) => void;
  setSpeech: (speech: Speech) => void;
  // askAi: (question: string) => void;
  playAudioTTS: (message: Word[]) => Promise<void>;
  stopAudioTTS: (message: Message) => void;
}

export const useAiTeacher = create<AiTeacherState>((set, get) => ({
  messages: [],
  teacher: "Nanami",
  classroom: "default",
  loading: false,
  furigana: true,
  indonesia: true,
  speech: "formal",

  setTeacher: (teacher) => {
    set({
      teacher,
      messages: get().messages.map((message) => {
        // message.audioPlayer = null, //
        return message;
      }),
    });
  },
  setMessages: (message) => {
    set(() => ({
      currentMessage: message,
    }));

    // const speech = get().speech;

    set((state) => ({ messages: [...state.messages, message] }));

    // get().playMessage(message.answer.english.map((word) => word.word))
  },
  setClassroom: (classroom) => set({ classroom }),
  setFurigana: (state) => set({ furigana: state }),
  setIndonesia: (state) => set({ indonesia: state }),
  setSpeech: (speech) => set({ speech }),
  // askAi: async (question) => {},
  currentMessage: null,
  playAudioTTS: async (english) => {
    const url = "https://api.v6.unrealspeech.com/stream";

    const options = {
      method: "POST",
      headers: {
        accept: "text/plain",
        "Content-Type": "application/json",
        Authorization: `Bearer ${env.NEXT_PUBLIC_UNREAL_SPEECH_API_KEY}`,
      },
      body: JSON.stringify({
        Text: english.map((word) => word.word).join(" "),
        VoiceId: "Liv",
      }),
    };

    try {
      const res = await fetch(url, options);

      const data = await res.blob();
      const audioUrl = URL.createObjectURL(data);
      const audioPlayer = new Audio(audioUrl);

      audioPlayer.currentTime = 0;

      audioPlayer.play().catch((error) => console.log(error));
    } catch (error) {
      console.log(error, "error");
    }
  },
  stopAudioTTS: (message) => {},
  setLoading: (state) => set({ loading: state }),
}));

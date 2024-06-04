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
  playAudioTTS: (message: Word[]) => Promise<HTMLAudioElement | undefined>;
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
  playAudioTTS: (english) => {
    return new Promise((resolve, reject) => {
      const url = "https://api.v6.unrealspeech.com/stream";

      const currentTeacher = get().teacher;

      const options = {
        method: "POST",
        headers: {
          accept: "text/plain",
          "Content-Type": "application/json",
          Authorization: `Bearer ${env.NEXT_PUBLIC_UNREAL_SPEECH_API_KEY}`,
        },
        body: JSON.stringify({
          Text: english.map((word) => word.word).join(" "),
          VoiceId: currentTeacher === "Nanami" ? "Liv" : "Dan",
        }),
      };

      fetch(url, options)
        .then((res) => res.blob())
        .then((data) => {
          const audioUrl = URL.createObjectURL(data);
          const audioPlayer = new Audio(audioUrl);
          audioPlayer.currentTime = 0;

          audioPlayer.play().catch((error) => reject(error));

          audioPlayer.onended = () => {
            set(() => ({
              currentMessage: null,
            }));
          };
          resolve(audioPlayer);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  stopAudioTTS: (english) => {
    english.audioPlayer?.pause();
    set(() => ({
      currentMessage: null,
    }));
  },
  setLoading: (state) => set({ loading: state }),
}));

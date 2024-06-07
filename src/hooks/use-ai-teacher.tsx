import { env } from "@/env";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface AiTeacherState {
  messages: Message[];
  currentMessage: Message | null;
  teacher: Teacher;
  classroom: Classroom;
  loading: boolean;
  furigana: boolean;
  indonesia: boolean;
  speech: Speech;
  // credits: number;

  setMessages: (message: Message) => void;
  setLoading: (state: boolean) => void;
  setTeacher: (teacher: Teacher) => void;
  setClassroom: (classroom: Classroom) => void;
  setFurigana: (state: boolean) => void;
  setIndonesia: (state: boolean) => void;
  setSpeech: (speech: Speech) => void;
  // setCredits: (credits: number) => void;
  // askAi: (question: string) => void;
  playAudioTTS: (message: Message) => Promise<HTMLAudioElement | undefined>;
  stopAudioTTS: (message: Message) => void;
  set: (state: Partial<AiTeacherState>) => void;
}

export const useAiTeacher = create<AiTeacherState>()(
  persist(
    (set, get) => ({
      messages: [],
      teacher: "Nanami",
      classroom: "default",
      loading: false,
      furigana: true,
      indonesia: true,
      speech: "formal",
      currentMessage: null,
      // credits: 0, // for now, we only have 3 credits

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
        set((state) => ({ messages: [...state.messages, message] }));
      },
      setClassroom: (classroom) => set({ classroom }),
      setFurigana: (state) => set({ furigana: state }),
      setIndonesia: (state) => set({ indonesia: state }),
      setSpeech: (speech) => set({ speech }),

      // setCredits: (value) => {
      //   const newCredits = Math.max(get().credits + value, 0);
      //   set({ credits: newCredits });
      // },

      playAudioTTS: (message) => {
        return new Promise((resolve, reject) => {
          const currentTeacher = get().teacher;

          // for details https://docs.unrealspeech.com/reference/parameter-details

          const url = "https://api.v6.unrealspeech.com/stream";
          const options = {
            method: "POST",
            headers: {
              accept: "text/plain",
              "Content-Type": "application/json",
              Authorization: `Bearer ${env.NEXT_PUBLIC_UNREAL_SPEECH_API_KEY}`,
            },
            body: JSON.stringify({
              Text: message.answer.english.map((word) => word.word).join(" "),
              VoiceId: currentTeacher === "Nanami" ? "Liv" : "Dan",
            }),
          };

          fetch(url, options)
            .then((res) => res.blob())
            .then((data) => {
              const audioUrl = URL.createObjectURL(data);
              const audioPlayer = new Audio(audioUrl);
              audioPlayer.currentTime = 0;

              audioPlayer
                .play()
                .then(() => {
                  set({
                    currentMessage: message,
                  });
                })
                .catch((error) => reject(error));

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

      set: (state) => set(state),
    }),
    {
      name: "ai-teacher-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

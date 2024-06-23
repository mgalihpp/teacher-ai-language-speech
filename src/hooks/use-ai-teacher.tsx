import { checkIsAnswerWord, isString } from "@/helpers/check-message";
import SpeechApi from "@/lib/speech";
import { sendAudio } from "@/lib/utils";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface AiTeacherState {
  messages: Message[];
  currentMessage: Message | null;
  teacher: Teacher;
  classroom: Classroom;
  loading: boolean;
  language: LanguageOptions;
  furigana: boolean;
  // indonesia: boolean;
  speech: Speech;

  setMessages: (message: Message) => void;
  setLoading: (state: boolean) => void;
  setTeacher: (teacher: Teacher) => void;
  setClassroom: (classroom: Classroom) => void;
  setLanguage: (language: LanguageOptions) => void;
  setFurigana: (state: boolean) => void;
  // setIndonesia: (state: boolean) => void;
  setSpeech: (speech: Speech) => void;
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
      language: "indonesia",
      furigana: true,
      indonesia: true,
      speech: "formal",
      currentMessage: null,

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
      setLanguage: (lang) => set({ language: lang }),
      setFurigana: (state) => set({ furigana: state }),
      // setIndonesia: (state) => set({ indonesia: state }),
      setSpeech: (speech) => set({ speech }),
      playAudioTTS: (message) => {
        return new Promise((resolve, reject) => {
          const currentTeacher = get().teacher;

          const currentLanguage = isString(message.answer.indonesia)
            ? "indonesia"
            : "english";

          const englishTTS = new SpeechApi({
            language: "english",
            speech: {
              unreal: true,
            },
          });

          const indonesiaTTS = new SpeechApi({
            language: "indonesia",
            speech: {
              unreal: false,
            },
          });

          const translatedWord = checkIsAnswerWord(message);

          // language is ref from user input language question
          switch (currentLanguage) {
            case "indonesia": {
              englishTTS
                .getAudio({
                  Text: translatedWord.map((word) => word.word).join(" "),
                  VoiceId: currentTeacher === "Nanami" ? "Liv" : "Dan",
                })
                .then((data) => {
                  sendAudio(resolve, reject, data, message, set);
                })
                .catch((error) => {
                  reject(error);
                });
              break;
            }
            case "english": {
              indonesiaTTS
                .getAudio({
                  Text: translatedWord.map((word) => word.word).join(" "),
                  VoiceId:
                    currentTeacher === "Nanami"
                      ? "EXAVITQu4vr4xnSDxMaL"
                      : "ErXwobaYiN019PkySvjV",
                })
                .then((data) => {
                  sendAudio(resolve, reject, data, message, set);
                })
                .catch((error) => {
                  reject(error);
                });
              break;
            }
            default:
              break;
          }
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

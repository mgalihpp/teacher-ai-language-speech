import {
  englishFormalSpeechExample,
  indonesiaFormalSpeechExample,
  japaneseFormalSpeechExample,
} from "@/constants/speech-example";
import { type AiTeacherState } from "@/hooks/use-ai-teacher";
import { type PrismaClient, type User } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { clsx, type ClassValue } from "clsx";
import { toast } from "sonner";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const speechExamplesMap: Record<string, SpeechExample> = {
  "indonesia-english": englishFormalSpeechExample,
  "english-indonesia": indonesiaFormalSpeechExample,
  "japanese-english": englishFormalSpeechExample,
  "english-japanese": japaneseFormalSpeechExample,
  "indonesia-japanese": japaneseFormalSpeechExample,
  "japanese-indonesia": indonesiaFormalSpeechExample,
};

export function getSpeechLanguagePreference(
  fromLanguage: LanguageOptions,
  toLanguage: LanguageOptions,
): LanguagePreference {
  const key = `${fromLanguage}-${toLanguage}`;
  const speechExample = speechExamplesMap[key];

  if (!speechExample) {
    throw new Error("Unsupported language combination");
  }

  const versionExample = getVersionExample(
    fromLanguage,
    toLanguage,
    speechExample,
  );

  const wordExample = getWordExample(fromLanguage, toLanguage, speechExample);

  if (!speechExample) {
    throw new Error("Unsupported language combination");
  }

  return { speechExample, versionExample, wordExample };
}

export function getNewLanguageSettings(
  fromLanguage: LanguageOptions,
  toLanguage: LanguageOptions,
): { newFromLanguage: LanguageOptions; newToLanguage: LanguageOptions } | null {
  if (fromLanguage === toLanguage) {
    toast.warning("Please select different languages.");
    return null;
  } else {
    toast.success("Language settings updated successfully.");
  }

  if (fromLanguage === "english" && toLanguage === "indonesia") {
    return { newFromLanguage: "english", newToLanguage: "indonesia" };
  } else if (fromLanguage === "indonesia" && toLanguage === "english") {
    return { newFromLanguage: "indonesia", newToLanguage: "english" };
  } else if (fromLanguage === "english" && toLanguage === "japanese") {
    return { newFromLanguage: "english", newToLanguage: "japanese" };
  } else if (fromLanguage === "japanese" && toLanguage === "english") {
    return { newFromLanguage: "japanese", newToLanguage: "english" };
  } else if (fromLanguage === "indonesia" && toLanguage === "japanese") {
    return { newFromLanguage: "indonesia", newToLanguage: "japanese" };
  } else if (fromLanguage === "japanese" && toLanguage === "indonesia") {
    return { newFromLanguage: "japanese", newToLanguage: "indonesia" };
  }
  return null; // return null if no matching language settings are found
}

function getVersionExample(
  fromLanguage: LanguageOptions,
  toLanguage: LanguageOptions,
  speechExample: SpeechExample,
): string {
  if (!speechExample.grammarBreakdown[0]) {
    return ""; // Handle case where grammarBreakdown is empty or undefined
  }

  if (fromLanguage === "indonesia" && toLanguage === "english") {
    return speechExample.grammarBreakdown[0].english as string;
  } else if (fromLanguage === "english" && toLanguage === "indonesia") {
    return speechExample.grammarBreakdown[0].indonesia as string;
  } else if (fromLanguage === "japanese" && toLanguage === "english") {
    return speechExample.grammarBreakdown[0].english as string;
  } else if (fromLanguage === "english" && toLanguage === "japanese") {
    return speechExample.grammarBreakdown[0].japanese as string;
  } else if (fromLanguage === "indonesia" && toLanguage === "japanese") {
    return speechExample.grammarBreakdown[0].japanese as string;
  } else if (fromLanguage === "japanese" && toLanguage === "indonesia") {
    return speechExample.grammarBreakdown[0].indonesia as string;
  } else {
    return ""; // Default case for unsupported language combinations
  }
}

function getWordExample(
  fromLanguage: LanguageOptions,
  toLanguage: LanguageOptions,
  speechExample: SpeechExample,
): Word[] | undefined {
  if (!speechExample) {
    return []; // Handle case where is empty or undefined
  }

  if (fromLanguage === "indonesia" && toLanguage === "english") {
    return speechExample.english;
  } else if (fromLanguage === "english" && toLanguage === "indonesia") {
    return speechExample.indonesia;
  } else if (fromLanguage === "japanese" && toLanguage === "english") {
    return speechExample.english;
  } else if (fromLanguage === "english" && toLanguage === "japanese") {
    return speechExample.japanese;
  } else if (fromLanguage === "indonesia" && toLanguage === "japanese") {
    return speechExample.japanese;
  } else if (fromLanguage === "japanese" && toLanguage === "indonesia") {
    return speechExample.indonesia;
  } else {
    return []; // Default case for unsupported language combinations
  }
}

export function getQuestion(
  fromLanguage: LanguageOptions,
  toLanguage: LanguageOptions,
  inputQuestion: string,
): string {
  if (inputQuestion === "") {
    if (fromLanguage === "english" && toLanguage === "indonesia") {
      return "Apakah kamu tinggal di Indonesia ?";
    } else if (fromLanguage === "indonesia" && toLanguage === "english") {
      return "Do you live in Indonesia ?";
    } else if (fromLanguage === "japanese" && toLanguage === "english") {
      return "Do you live in Indonesia ?"; // Example for Japanese to English, adjust as needed
    } else if (fromLanguage === "english" && toLanguage === "japanese") {
      return "あなたはインドネシアに住んでいますか？"; // Example for English to Japanese, adjust as needed
    } // Add more cases as needed
  }
  return inputQuestion;
}

export function getTranslatedDescription(toLanguage: LanguageOptions): string {
  switch (toLanguage) {
    case "indonesia":
      return "Ketik sebuah kalimat yang ingin diucapkan dalam bahasa Indonesia dan Guru AI akan mengterjemahkannya untuk kamu.";
    case "japanese":
      return "英語で文を入力し、Guru AIが翻訳します。";
    case "english":
    default:
      return "Type a sentence in English and Guru AI will translate it for you.";
  }
}

export function sendAudio(
  resolve: (audioPlayer: HTMLAudioElement) => void,
  reject: (error: unknown) => void,
  data: Blob,
  message: Message,
  set: (state: Partial<AiTeacherState>) => void,
) {
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
    set({
      currentMessage: null,
    });
  };
  resolve(audioPlayer);
}

export async function checkUserCredits({
  db,
  user,
  credits,
  cost,
}: {
  db: PrismaClient;
  user: User | null | undefined;
  credits: number;
  cost: number;
}) {
  if (!user) {
    if (credits < cost) {
      throw new TRPCError({
        code: "FORBIDDEN",
        message: "You don't have enough credits",
      });
    }

    return true;
  } else {
    if (user.credits < cost) {
      throw new TRPCError({
        code: "FORBIDDEN",
        message: "You don't have enough credits",
      });
    }

    await db.user.update({
      where: {
        id: user.id,
      },
      data: {
        credits: user.credits - cost,
      },
    });

    return true;
  }
}

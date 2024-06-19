import {
  englishFormalSpeechExample,
  indonesiaFormalSpeechExample,
} from "@/constants/speech-example";
import { type AiTeacherState } from "@/hooks/use-ai-teacher";
import { type PrismaClient, type User } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getSpeechLanguagePreference(
  currentLanguage: LanguageOptions,
): SpeechExample {
  let speechExample: SpeechExample;

  switch (currentLanguage) {
    case "indonesia":
      speechExample = englishFormalSpeechExample;
    case "english":
      speechExample = indonesiaFormalSpeechExample;
  }

  return speechExample;
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
}: {
  db: PrismaClient;
  user: User | null | undefined;
  credits: number;
}) {
  if (!user) {
    if (credits <= 0) {
      throw new TRPCError({
        code: "FORBIDDEN",
        message: "You don't have enough credits",
      });
    }

    return true;
  } else {
    if (user.credits <= 0) {
      throw new TRPCError({
        code: "FORBIDDEN",
        message: "You don't have enough credits",
      });
    }

    await db.user.update({
      where: {
        id: user?.id,
      },
      data: {
        credits: user.credits - 1,
      },
    });

    return true;
  }
}

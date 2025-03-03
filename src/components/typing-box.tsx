"use client";

import { useAiTeacher } from "@/hooks/use-ai-teacher";
import { useModal } from "@/hooks/use-modal";
import { api } from "@/trpc/react";
import React, { memo, useEffect, useState } from "react";
import { toast } from "sonner";
import Credits from "./credits";
import { useSession } from "next-auth/react";
import {
  CapitalizeLetters,
  getQuestion,
  getTranslatedDescription,
} from "@/lib/utils";
import { MULTIPLIER_COST_CREDITS } from "@/constants";
import { Loader, Mic, MicOff } from "lucide-react";
import { useSpeechRecognition } from "@/hooks/use-speech-recognition";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

const TypingBox = ({ credits }: { credits: number }) => {
  const { data: session } = useSession();
  const {
    fromLanguage,
    toLanguage,
    setMessages,
    setLoading: setTeacherLoading,
    playAudioTTS,
  } = useAiTeacher();
  const { setModalOpen } = useModal();
  const [question, setQuestion] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const { mutate: askAi, isPending } = api.generate.chat.useMutation();
  const { mutate: updateUserCredits } =
    api.user.updateUserCredits.useMutation();

  const [userCredits, setCredits] = useState(0);

  // this for unauthenticated user credits
  const [usedCredits, setUsedCredits] = useState(0);

  // voice recognition
  const {
    isRecording,
    isTranscribing,
    startRecording,
    stopRecording,
    transcript,
  } = useSpeechRecognition();

  const translatedDescription = getTranslatedDescription(fromLanguage);

  useEffect(() => {
    setCredits(credits);
  }, [credits]);

  useEffect(() => {
    if (transcript) {
      setQuestion(transcript);
    }
  }, [transcript]);

  useEffect(() => {
    setTeacherLoading(loading);

    return () => {
      setTeacherLoading(false);
    };
  }, [loading, setTeacherLoading]);

  const checkIsLimit = () => {
    const creditsCost = Math.ceil(question.length * MULTIPLIER_COST_CREDITS);

    if (!session?.user.id) {
      const limit = JSON.parse(localStorage.getItem("limit")!) as boolean;

      if (limit === true) {
        toast.error("Please log in to continue.");

        setModalOpen(true);

        setLoading(false);
        return false;
      } else if (usedCredits >= 2) {
        try {
          localStorage.setItem("limit", "true");
        } catch (error) {
          console.log("Please Enable Local Storage");
        }

        toast.error("Please log in to continue.");

        setModalOpen(true);

        setLoading(false);
        return false;
      }

      if (userCredits <= creditsCost) {
        toast.error("You don't have enough credits");
        setLoading(false);
        setCredits((prev) => prev);
        return false;
      }

      setCredits((prev) => prev - creditsCost);
      setUsedCredits((prev) => prev + 1);

      return true;
    }

    if (userCredits <= creditsCost) {
      toast.error("You don't have enough credits");
      setLoading(false);
      setCredits((prev) => prev);
      return false;
    }

    setCredits((prev) => prev - creditsCost);
    return true;
  };

  const ask = async () => {
    setLoading(true);

    const canAsk = checkIsLimit();

    if (!canAsk) return;

    await new Promise((resolve) => setTimeout(resolve, 1000));

    askAi(
      {
        question,
        speech: "formal",
        fromLanguage,
        toLanguage,
        credits,
      },
      {
        onError(error) {
          if (error.shape?.data.httpStatus === 500) {
            updateUserCredits(
              {
                credits: 1,
              },
              {
                onSuccess: () => {
                  setCredits((prev) => prev + 1);
                },
              },
            );
            setLoading(false);
            return toast.error("Something went wrong, please try again");
          }

          // toast
          toast.error(error.message);
          console.log(error.message);
          setLoading(false);
        },
        onSuccess: (data) => {
          // english, grammarbreakdown, indonesia
          const { indonesia, english, japanese, france, grammarBreakdown } =
            JSON.parse(data) as AiResponse;

          const uquestion = getQuestion(fromLanguage, toLanguage, question);

          const format: Message = {
            id: data.length,
            question: uquestion,
            speech: "formal",
            answer: {
              english,
              indonesia,
              japanese,
              france,
              grammarBreakdown,
            },
          };

          // play the audio based on the answer
          playAudioTTS(format)
            .then((audioPlayer) => {
              setMessages({
                ...format,
                audioPlayer,
              });
            })
            .catch((error) => {
              console.log(error);
            })
            .finally(() => {
              setLoading(false);
            });
        },
      },
    );

    // reset question
    setQuestion("");
  };

  return (
    <div
      className="z-10 flex w-full flex-col space-y-6 rounded-xl 
    border border-stone-100/30 bg-gradient-to-tr from-stone-300/30 via-stone-400/30 
    to-stone-400/30 p-4 backdrop-blur-md"
    >
      <div>
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-white max-sm:text-lg">
            How to say in {CapitalizeLetters(toLanguage)} ?
          </h2>
          <div className="flex items-center gap-2">
            <TooltipProvider delayDuration={100}>
              {isRecording ? (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      onClick={stopRecording}
                      className="flex items-center gap-1 rounded-full 
                    bg-slate-900/40 p-2 text-xs text-white max-sm:p-1"
                      aria-label="Toggle microphone"
                    >
                      <Mic className="h-4 w-4" />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Stop Recording</p>
                  </TooltipContent>
                </Tooltip>
              ) : (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      onClick={startRecording}
                      className="flex items-center gap-1 rounded-full 
  bg-slate-900/40 p-2 text-xs text-white max-sm:p-1"
                      aria-label="Toggle microphone"
                    >
                      <MicOff className="h-4 w-4" />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Start Recording</p>
                  </TooltipContent>
                </Tooltip>
              )}
              <Tooltip>
                <TooltipTrigger>
                  <Credits credits={userCredits} />
                </TooltipTrigger>
                <TooltipContent>
                  <p>You have {userCredits} credits remaining</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
        <p className="font-semibold text-white/80 max-sm:text-xs">
          {translatedDescription}
        </p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center">
          <span className="relative flex size-4">
            <span
              className="absolute inline-flex h-full w-full animate-ping 
                rounded-full bg-white opacity-75
                "
            ></span>
            <span className="relative inline-flex size-4 rounded-full bg-white"></span>
          </span>
        </div>
      ) : (
        <div className="flex items-center gap-3 max-sm:flex-col">
          <label htmlFor="ask" className="sr-only">
            Ask
          </label>
          <div className="relative w-full">
            <input
              type="text"
              aria-label="Ask"
              name="ask"
              id="ask"
              className="w-full flex-grow rounded-lg 
          bg-stone-800/20 p-2 px-4 text-white shadow-inner shadow-stone-900/60 
          ring-white placeholder:text-white/80 focus-within:ring-2 focus:outline focus:outline-white disabled:cursor-not-allowed disabled:opacity-50 max-sm:w-full"
              placeholder="Pernahkan kamu ke Indonesia ?"
              value={question}
              autoFocus
              disabled={isTranscribing}
              onChange={(e) => setQuestion(e.target.value)}
              onKeyDown={async (e) => {
                if (e.key === "Enter") {
                  await ask();
                }
              }}
            />

            {isTranscribing && (
              <>
                <div className="absolute inset-0 cursor-not-allowed rounded-lg bg-black/40"></div>
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                  <div className="flex items-center gap-2">
                    <Loader className="h-5 w-5 animate-spin" />
                    <span className="text-xs">Transcribing</span>
                  </div>
                </div>
              </>
            )}
          </div>
          <button
            aria-label="Ask"
            onClick={async () => {
              await ask();
            }}
            disabled={isPending || isTranscribing}
            className="rounded-lg bg-slate-100/20 p-2 px-6 text-white disabled:cursor-not-allowed disabled:opacity-50 max-sm:w-full"
          >
            Ask
          </button>
        </div>
      )}
    </div>
  );
};

export default memo(TypingBox);

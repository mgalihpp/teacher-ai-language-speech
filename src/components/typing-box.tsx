"use client";

import { useAiTeacher } from "@/hooks/use-ai-teacher";
import { useModal } from "@/hooks/use-modal";
import { api } from "@/trpc/react";
import React, { memo, useEffect, useState } from "react";
import { toast } from "sonner";
import Credits from "./credits";
import { useSession } from "next-auth/react";
import { getQuestion, getTranslatedDescription } from "@/lib/utils";

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

  useEffect(() => {
    setCredits(credits);
  }, [credits]);

  useEffect(() => {
    setTeacherLoading(loading);

    return () => {
      setTeacherLoading(false);
    };
  }, [loading, setTeacherLoading]);

  const checkIsLimit = () => {
    const creditsCost = Math.ceil(question.length * 0.05);

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
          const { indonesia, english, japanese, grammarBreakdown } = JSON.parse(
            data,
          ) as AiResponse;

          const uquestion = getQuestion(fromLanguage, toLanguage, question);

          const format: Message = {
            id: data.length,
            question: uquestion,
            speech: "formal",
            answer: {
              english,
              indonesia,
              japanese,
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

  const translatedDescription = getTranslatedDescription(fromLanguage);

  return (
    <div
      className="z-10 flex w-full flex-col space-y-6 rounded-xl 
    border border-stone-100/30 bg-gradient-to-tr from-stone-300/30 via-stone-400/30 
    to-stone-400/30 p-4 backdrop-blur-md"
    >
      <div>
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-white max-sm:text-lg">
            How to say in {toLanguage} ?
          </h2>

          <Credits credits={userCredits} />
        </div>
        <p className="font-semibold text-white/70 max-sm:text-xs">
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
          <input
            type="text"
            aria-label="Ask"
            name="ask"
            id="ask"
            className="flex-grow rounded-full bg-stone-800/20 
          p-2 px-4 text-white shadow-inner shadow-stone-900/60 placeholder:text-white/80 
          focus:outline focus:outline-white/80 max-sm:w-full"
            placeholder="Pernahkan kamu ke Indonesia ?"
            value={question}
            autoFocus
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={async (e) => {
              if (e.key === "Enter") {
                await ask();
              }
            }}
          />
          <button
            aria-label="Ask"
            onClick={async () => {
              await ask();
            }}
            disabled={isPending}
            className="rounded-full bg-slate-100/20 p-2 px-6 text-white max-sm:w-full"
          >
            Ask
          </button>
        </div>
      )}
    </div>
  );
};

export default memo(TypingBox);

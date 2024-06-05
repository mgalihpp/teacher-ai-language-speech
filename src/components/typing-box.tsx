"use client";

import { useAiTeacher } from "@/hooks/use-ai-teacher";
import { useModal } from "@/hooks/use-modal";
import { api } from "@/trpc/react";
import { useSession } from "next-auth/react";
import React, { memo, useEffect, useState } from "react";
import { toast } from "sonner";
import Credits from "./credits";

const TypingBox = ({ credits }: { credits: number | null }) => {
  const { data: session } = useSession();
  const {
    loading,
    credits: userCredits,
    setCredits,
    setMessages,
    setLoading,
    playAudioTTS,
  } = useAiTeacher();
  const { setOpen } = useModal();
  const [question, setQuestion] = useState<string>("");
  const { mutate: askAi, isPending } = api.generate.chat.useMutation();

  useEffect(() => {
    setCredits(credits ?? 0);
  }, [credits]);

  const ask = async () => {
    setLoading(true);
    setCredits(-1);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    askAi(
      {
        question,
        speech: "formal",
      },
      {
        onError(error) {
          if (error.shape?.data.httpStatus === 500) {
            setLoading(false);
            return toast.error("Something went wrong, please try again");
          }

          // toast
          toast.error(error.message);
          console.log(error.message);
          setLoading(false);
        },
        onSuccess: (data) => {
          console.log(JSON.parse(data));
          // english, grammarbreakdown, indonesia
          const { indonesia, english, grammarBreakdown } = JSON.parse(
            data,
          ) as AiResponse;

          const format: Message = {
            id: data.length,
            question: indonesia,
            speech: "formal",
            answer: {
              english,
              indonesia,
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
      className="z-10 flex w-full max-w-[600px] flex-col space-y-6 rounded-xl 
    border border-slate-100/30 bg-gradient-to-tr from-slate-300/30 via-gray-400/30 
    to-slate-400/30 p-4 backdrop-blur-md"
    >
      <div>
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-white">
            How to say in English ?
          </h2>

          <Credits credits={userCredits} />
        </div>
        <p className="text-white/65 max-sm:text-xs">
          Ketik sebuah kalimat yang ingin diucapkan dalam bahasa Inggris and
          Guru ai akan mengterjemahkannya untuk kamu.
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
            name="ask"
            id="ask"
            className="flex-grow rounded-full bg-slate-800/60 
          p-2 px-4 text-white shadow-inner shadow-slate-900/60 placeholder:text-white/50 focus:outline focus:outline-white/80 max-sm:w-full max-sm:placeholder:text-xs
          "
            placeholder="Pernahkan kamu ke Indonesia?"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={async (e) => {
              if (e.key === "Enter") {
                if (!session?.user) {
                  toast.error("Please login first");

                  setOpen(true);

                  return;
                }

                await ask();
              }
            }}
          />
          <button
            onClick={async () => {
              if (!session?.user) {
                toast.error("Please login first");

                setOpen(true);

                return;
              }

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

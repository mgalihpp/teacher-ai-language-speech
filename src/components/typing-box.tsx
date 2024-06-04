"use client";

import { useAiTeacher } from "@/hooks/use-ai-teacher";
import { api } from "@/trpc/react";
import Link from "next/link";
import React, { memo, useState } from "react";
import { toast } from "sonner";

const TypingBox = () => {
  const { loading, setMessages, setLoading, playAudioTTS } = useAiTeacher();
  const [question, setQuestion] = useState<string>("");
  const { mutate: askAi, isPending } = api.generate.chat.useMutation();

  const ask = async () => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    askAi(
      {
        question,
        speech: "formal",
      },
      {
        onError(error) {
          // toast
          toast.error("Something went wrong!, please try again later");
          console.log(error.message);
          setLoading(false);
        },
        onSuccess: (data) => {
          // english, grammarbreakdown, indonesia
          const { indonesia, english, grammarBreakdown } = JSON.parse(
            data,
          ) as AiResponse;

          // play the audio based on the answer
          playAudioTTS(english)
            .then((audioPlayer) => {
              setMessages({
                question: indonesia,
                id: data.length,
                speech: "formal",
                answer: {
                  english,
                  indonesia,
                  grammarBreakdown,
                },
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

          <Link
            href="/buy-credits"
            className="flex items-center gap-1 rounded-full 
          bg-slate-900/40 p-2 text-white max-sm:p-1 max-sm:text-xs"
          >
            <span>0</span>
            <span>Credits</span>
          </Link>
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
                await ask();
              }
            }}
          />
          <button
            onClick={ask}
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

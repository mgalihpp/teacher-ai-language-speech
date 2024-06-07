import { useAiTeacher } from "@/hooks/use-ai-teacher";
import { memo, useEffect, useRef } from "react";
import MessageRenderIndonesia from "./message-render/message-render-indonesia";
import MessageRenderEnglish from "./message-render/message-render-english";

const MessagesList = () => {
  const { currentMessage, messages, classroom, playAudioTTS, stopAudioTTS } =
    useAiTeacher();

  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    container.current?.scrollTo({
      top: container.current?.scrollHeight,
      behavior: "smooth",
    });
  }, [messages.length]);

  return (
    <div
      className={`${classroom === "default" ? "h-[676px] w-[1288px]" : "h-[856px] w-[2528px]"} 
    flex flex-col space-y-8 overflow-y-auto bg-transparent p-8 opacity-80
    `}
      ref={container}
    >
      {messages.length === 0 && (
        <div className="grid h-full w-full place-content-center text-center">
          <h2 className="text-8xl font-bold italic text-white/90">
            M. Galih PP
            <br />
            Guru Bahasa Inggris
          </h2>
          <h2 className="font-mono text-8xl font-bold italic text-red-600/90">
            English Teacher
          </h2>
        </div>
      )}
      {messages.map((message, index) => (
        <div key={index}>
          <div className="flex">
            <div className="flex-grow">
              <div className="flex items-center gap-3">
                <span
                  className={`rounded-full px-3 py-1 text-2xl 
                        font-bold uppercase text-white/90 
                        ${
                          message.speech === "formal"
                            ? "bg-indigo-600"
                            : "bg-teal-600"
                        }
                        `}
                >
                  {message.speech}
                </span>
                <MessageRenderIndonesia text={message.answer.indonesia} />
              </div>

              <MessageRenderEnglish english={message.answer.english} />
            </div>
            {currentMessage?.id === message.id ? (
              <button
                className="text-white/65"
                onClick={() => stopAudioTTS(message)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-16 w-16"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 9.563C9 9.252 9.252 9 9.563 9h4.874c.311 0 .563.252.563.563v4.874c0 .311-.252.563-.563.563H9.564A.562.562 0 0 1 9 14.437V9.564Z"
                  />
                </svg>
              </button>
            ) : (
              <button
                className="text-white/65"
                onClick={() => playAudioTTS(message)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-16 w-16"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.91 11.672a.375.375 0 0 1 0 .656l-5.603 3.113a.375.375 0 0 1-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112Z"
                  />
                </svg>
              </button>
            )}
          </div>
          <div
            className="to-pink-500-/20 mt-5 rounded-xl bg-gradient-to-br from-pink-200/20 
          p-5
          "
          >
            <span
              className="inline-block bg-gradient-to-b from-white/90 to-white/70 bg-clip-text 
            pr-4 text-3xl font-bold uppercase italic text-transparent
            "
            >
              Grammar Breakdown
            </span>
            <div className="flex w-full flex-row">
              {message.answer.grammarBreakdown.map((grammar, index) => (
                <div className="mt-3 w-fit" key={index}>
                  {message.answer.grammarBreakdown.length > 1 ? (
                    <>
                      <div className="flex w-fit flex-col">
                        <MessageRenderIndonesia text={grammar.indonesia} />
                        <MessageRenderEnglish english={grammar.english} />
                      </div>

                      <div className="mt-3 flex w-fit flex-row flex-wrap gap-3">
                        {grammar.chunks.map((chunk, index) => (
                          <div
                            className="bg-blank/30 rounded-md p-2"
                            key={index}
                          >
                            <span className="font-mono text-4xl text-white/90">
                              <MessageRenderEnglish english={chunk.english} />
                            </span>
                            <p className="text-2xl text-pink-300/90">
                              {chunk.meaning}
                            </p>
                            <p className="text-2xl text-blue-400/90">
                              {chunk.grammar}
                            </p>
                          </div>
                        ))}
                      </div>
                    </>
                  ) : (
                    <div className="mt-3 flex w-full flex-row flex-wrap gap-3">
                      {grammar.chunks.map((chunk, index) => (
                        <div className="bg-blank/30 rounded-md p-2" key={index}>
                          <span className="font-mono text-4xl text-white/90">
                            <MessageRenderEnglish english={chunk.english} />
                          </span>
                          <p className="text-2xl text-pink-300/90">
                            {chunk.meaning}
                          </p>
                          <p className="text-2xl text-blue-400/90">
                            {chunk.grammar}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default memo(MessagesList);

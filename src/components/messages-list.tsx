import { useAiTeacher } from "@/hooks/use-ai-teacher";
import { memo, useRef } from "react";

const MessagesList = () => {
  const { currentMessage, messages, classroom, playAudioTTS, stopAudioTTS } =
    useAiTeacher();

  const container = useRef<HTMLDivElement>(null);

  const renderIndonesia = (text: string) => (
    <>
      {text && (
        <p
          className="inline-block rounded-sm bg-gradient-to-br from-blue-300/90 to-white/90 bg-clip-text 
            px-2 text-4xl font-bold text-transparent
            "
        >
          {text}
        </p>
      )}
    </>
  );

  const renderEnglish = (english: Word[]) => (
    <p className="mt-2 flex flex-wrap gap-2 font-mono text-4xl font-bold text-white">
      {english.map((word, index) => (
        <span key={index} className="flex flex-col items-center justify-end">
          {word.reading && (
            <span className="text-2xl text-white/65">{word.reading}</span>
          )}
          {word.word}
        </span>
      ))}
    </p>
  );

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
                {renderIndonesia(message.answer.indonesia)}
              </div>

              {renderEnglish(message.answer.english)}
            </div>
            {currentMessage === message ? (
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
            <div className="grid grid-cols-4 items-center justify-start">
              {message.answer.grammarBreakdown.map((grammar, index) => (
                <div className="mt-3" key={index}>
                  {message.answer.grammarBreakdown.length > 1 && (
                    <>
                      {renderIndonesia(grammar.indonesia)}
                      {renderEnglish(grammar.english)}
                    </>
                  )}

                  <div className="mt-3 flex flex-wrap items-end gap-3">
                    {grammar.chunks.map((chunk, index) => (
                      <div className="bg-blank/30 rounded-md p-2" key={index}>
                        <p className="font-mono text-4xl text-white/90">
                          {renderEnglish(chunk.english)}
                        </p>
                        <p className="text-2xl text-pink-300/90">
                          {chunk.meaning}
                        </p>
                        <p className="text-2xl text-blue-400/90">
                          {chunk.grammar}
                        </p>
                      </div>
                    ))}
                  </div>
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

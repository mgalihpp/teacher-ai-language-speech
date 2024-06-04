import { TEACHERS } from "@/constants";
import { useAiTeacher } from "@/hooks/use-ai-teacher";
import Image from "next/image";
import { memo } from "react";

const BoardSettings = () => {
  const { teacher, speech, classroom, setTeacher, setSpeech, setClassroom } =
    useAiTeacher();

  return (
    <>
      <div className="absolute bottom-full right-0 mb-20 flex flex-row gap-10">
        {TEACHERS.map((teach, index) => (
          <div
            className={`p-3 transition-colors duration-500 ${
              teacher === teach ? "bg-white/80" : "bg-white/40"
            }`}
            key={index}
          >
            <button onClick={() => setTeacher(teach)}>
              <div className="relative h-40 w-40">
                <Image
                  className="object-cover"
                  alt={teach}
                  src={`/images/${teach}.jpg`}
                  loading="lazy"
                  fill
                  aria-label="teacher"
                />
              </div>
            </button>
            <h2 className="mt-3 text-center text-3xl font-bold">{teach}</h2>
          </div>
        ))}
      </div>
      <div className="absolute bottom-full left-0 mb-20 flex flex-row gap-10">
        <button
          className={`${
            classroom === "default"
              ? "bg-slate-900/40 text-white"
              : "bg-slate-700/20 text-white/45"
          } rounded-full px-10 py-4 text-4xl backdrop-blur-md transition-colors duration-500`}
          onClick={() => setClassroom("default")}
        >
          Default Classroom
        </button>
        <button
          className={`${
            classroom === "alternative"
              ? "bg-slate-900/40 text-white"
              : "bg-slate-700/20 text-white/45"
          } rounded-full px-10 py-4 text-4xl backdrop-blur-md transition-colors duration-500`}
          onClick={() => setClassroom("alternative")}
        >
          Altenative Classroom
        </button>
      </div>
      <div className="absolute left-0 top-full mt-20 flex flex-row gap-2">
        <button
          className={` ${
            speech === "formal"
              ? "bg-slate-900/40 text-white "
              : "bg-slate-700/20 text-white/45 "
          } rounded-full px-10 py-4 text-4xl backdrop-blur-md transition-colors duration-500`}
          onClick={() => setSpeech("formal")}
        >
          Formal
        </button>
        <button
          className={` ${
            speech === "casual"
              ? "bg-slate-900/40 text-white "
              : "bg-slate-700/20 text-white/45 "
          } rounded-full px-10 py-4 text-4xl backdrop-blur-md transition-colors duration-500`}
          onClick={() => setSpeech("casual")}
        >
          Casual
        </button>
      </div>
    </>
  );
};

export default memo(BoardSettings);

"use client";

import { TEACHERS } from "@/constants";
import { useAiTeacher } from "@/hooks/use-ai-teacher";
import Image from "next/image";
import { memo } from "react";

const BoardSettings = ({ children }: { children: React.ReactNode }) => {
  const { teacher, classroom, setTeacher, set } = useAiTeacher();

  return (
    <>
      <div className="absolute bottom-full right-0 mb-20 flex flex-row gap-10">
        {TEACHERS.map((teach, index) => (
          <div
            className={`p-3 transition-colors duration-500 ${
              teacher === teach
                ? `bg-white/80 ${classroom === "default" ? "text-stone-900" : "text-stone-950"}`
                : `bg-white/40 ${classroom === "default" ? "" : "text-stone-800"}`
            }`}
            key={index}
          >
            <SetTeacherButton setTeacher={setTeacher} type={teach} />
            <h2 className="mt-3 text-center text-3xl font-bold">{teach}</h2>
          </div>
        ))}
      </div>
      <div className="absolute right-0 top-full mt-20 flex w-full flex-row justify-end gap-2">
        {children}
        <button
          className="rounded-full bg-slate-900/20 px-10 
          py-4 text-4xl capitalize text-white/45 backdrop-blur-md transition-colors duration-500 hover:bg-slate-900/40 hover:text-white"
          onClick={() => {
            set({ messages: [] });
          }}
        >
          Clear Message
        </button>
      </div>
    </>
  );
};

const SetTeacherButton: React.FC<{
  setTeacher: (teacher: Teacher) => void;
  type: Teacher;
}> = memo(({ setTeacher, type }) => {
  return (
    <button onClick={() => setTeacher(type)}>
      <div className="relative h-40 w-40">
        <Image
          className="object-cover"
          alt={type}
          src={`/images/${type}.jpg`}
          loading="lazy"
          fill
          aria-label="teacher"
        />
      </div>
    </button>
  );
});

SetTeacherButton.displayName = "SetTeacherButton";
// SetClassroomButton.displayName = "SetClassroomButton";
// SetSpeechButton.displayName = "SetSpeechButton";
// SetLanguageButton.displayName = "SetLanguageButton";

export default memo(BoardSettings);

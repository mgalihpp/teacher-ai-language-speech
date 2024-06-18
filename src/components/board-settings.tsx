import { TEACHERS } from "@/constants";
import { useAiTeacher } from "@/hooks/use-ai-teacher";
import Image from "next/image";
import { memo } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

const BoardSettings = () => {
  const {
    teacher,
    speech,
    classroom,
    setTeacher,
    setSpeech,
    setClassroom,
    setIndonesia,
    set,
  } = useAiTeacher();

  return (
    <>
      <div className="absolute bottom-full right-0 mb-20 flex flex-row gap-10">
        {TEACHERS.map((teach, index) => (
          <div
            className={`p-3 transition-colors duration-500 ${
              teacher === teach ? "bg-white/80 text-stone-900" : "bg-white/40"
            }`}
            key={index}
          >
            <SetTeacherButton setTeacher={setTeacher} type={teach} />
            <h2 className="mt-3 text-center text-3xl font-bold">{teach}</h2>
          </div>
        ))}
      </div>
      <div className="absolute bottom-full left-0 mb-20 flex flex-row gap-10">
        <SetClassroomButton
          classroom={classroom}
          setClassroom={setClassroom}
          type="default"
        />
        <SetClassroomButton
          classroom={classroom}
          setClassroom={setClassroom}
          type="alternative"
        />
      </div>
      <div className="absolute left-0 top-full mt-20 flex flex-row gap-2">
        <SetSpeechButton speech={speech} setSpeech={setSpeech} type="formal" />
        <SetSpeechButton speech={speech} setSpeech={setSpeech} type="casual" />
      </div>
      <div className="absolute right-0 top-full mt-20 flex flex-row gap-2">
        <SetLanguageButton text="Ganti Bahasa" setIndonesia={setIndonesia} />
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
const SetClassroomButton: React.FC<{
  classroom: Classroom;
  setClassroom: (classroom: Classroom) => void;
  type: Classroom;
}> = memo(({ classroom, setClassroom, type }) => {
  return (
    <button
      className={`${
        classroom === type
          ? "bg-slate-900/40 text-white"
          : "bg-slate-700/20 text-white/45"
      } rounded-full px-10 py-4 text-4xl capitalize backdrop-blur-md transition-colors duration-500`}
      onClick={() => setClassroom(type)}
    >
      {type}
    </button>
  );
});

const SetSpeechButton: React.FC<{
  speech: Speech;
  setSpeech: (speech: Speech) => void;
  type: Speech;
}> = memo(({ speech, setSpeech, type }) => {
  return (
    <button
      className={` ${
        speech === type
          ? "bg-slate-900/40 text-white "
          : "bg-slate-700/20 text-white/45 "
      } rounded-full px-10 py-4 text-4xl capitalize backdrop-blur-md transition-colors duration-500`}
      onClick={() => setSpeech(type)}
    >
      {type}
    </button>
  );
});

const SetLanguageButton: React.FC<{
  text: string;
  setIndonesia: (value: boolean) => void;
}> = memo(({ text, setIndonesia }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="rounded-full bg-slate-900/40 px-10 py-4 text-4xl capitalize text-white backdrop-blur-md transition-colors duration-500">
          {text}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="border-0 bg-slate-800/20">
        <DropdownMenuItem
          className="bg-transparent"
          onClick={() => {
            setIndonesia(false);
          }}
        >
          English
        </DropdownMenuItem>
        <DropdownMenuItem
          className="bg-transparent"
          onClick={() => {
            setIndonesia(true);
          }}
        >
          Indonesia
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
});

SetTeacherButton.displayName = "SetTeacherButton";
SetClassroomButton.displayName = "SetClassroomButton";
SetSpeechButton.displayName = "SetSpeechButton";
SetLanguageButton.displayName = "SetLanguageButton";

export default memo(BoardSettings);

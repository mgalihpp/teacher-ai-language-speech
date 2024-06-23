type Teacher = "Nanami" | "Naoki";
type Classroom = "default" | "alternative";
type Speech = "formal" | "casual";

type Message = {
  question: string;
  id: number;
  speech: Speech;
  answer: Answer;
  audioPlayer?: HTMLAudioElement;
};

type Answer = {
  indonesia?: string | Word[];
  english?: string | Word[];
  grammarBreakdown: grammarWord[];
};

type SpeechExample = {
  english?: Word[];
  indonesia?: Word[];
  grammarBreakdown: grammarWord[];
};

type grammarWord = {
  indonesia?: string | Word[];
  english?: string | Word[];
  chunks: ChunksWord[];
};

type ChunksWord = {
  indonesia?: Word[];
  english?: Word[];
  meaning: string;
  grammar: string;
};

type Word = {
  word: string;
  reading: string;
};

type AiResponse = {
  indonesia: string | Word[];
  english: string | Word[];
  grammarBreakdown: grammarWord[];
};

type LanguageOptions = "english" | "indonesia";

type SpeechOptions = {
  unreal?: boolean;
  elevenLabs?: boolean;
};

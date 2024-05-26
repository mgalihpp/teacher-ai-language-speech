type Teacher = "Nanami" | "Naoki";
type Classroom = "default" | "alternative";
type Speech = "formal" | "casual";

type Message = {
  question: string;
  id: number;
  speech: Speech;
  answer: Answer;
};

type Answer = {
  indonesia: string;
  english: Word[];
  grammarBreakdown: grammarWord[];
};

type SpeechExample = {
  english: Word[];
  grammarBreakdown: grammarWord[];
};

type grammarWord = {
  indonesia: string;
  english: Word[];
  chunks: ChunksWord[];
};

type ChunksWord = {
  english: Word[];
  meaning: string;
  grammar: string;
};

type Word = {
  word: string;
  reading: string;
};

type AiResponse = {
  indonesia: string;
  english: Word[];
  grammarBreakdown: grammarWord[];
};

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
  japanese?: string | Word[];
  grammarBreakdown: grammarWord[];
};

type SpeechExample = {
  english?: Word[];
  indonesia?: Word[];
  japanese?: Word[];
  grammarBreakdown: grammarWord[];
};

type grammarWord = {
  indonesia?: string | Word[];
  english?: string | Word[];
  japanese?: string | Word[];
  chunks: ChunksWord[];
};

type ChunksWord = {
  indonesia?: Word[];
  english?: Word[];
  japanese?: Word[];
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
  japanese: string | Word[];
  grammarBreakdown: grammarWord[];
};

type LanguageOptions = "english" | "indonesia" | "japanese";

type SpeechOptions = {
  unreal?: boolean;
  elevenLabs?: boolean;
};

interface LanguagePreference {
  speechExample: SpeechExample;
  versionExample: string;
  wordExample: Word[] | undefined;
}

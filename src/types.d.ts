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
  france?: string | Word[];
  grammarBreakdown: grammarWord[];
};

type SpeechExample = {
  english?: Word[];
  indonesia?: Word[];
  japanese?: Word[];
  france?: Word[];
  grammarBreakdown: grammarWord[];
};

type grammarWord = {
  indonesia?: string | Word[];
  english?: string | Word[];
  japanese?: string | Word[];
  france?: string | Word[];
  chunks: ChunksWord[];
};

type ChunksWord = {
  indonesia?: Word[];
  english?: Word[];
  japanese?: Word[];
  france?: Word[];
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
  france: string | Word[];
  grammarBreakdown: grammarWord[];
};

type LanguageOptions = "english" | "indonesia" | "japanese" | "france";

type SpeechOptions = {
  unreal?: boolean;
  elevenLabs?: boolean;
};

interface LanguagePreference {
  speechExample: SpeechExample;
  versionExample: string;
  wordExample: Word[] | undefined;
}

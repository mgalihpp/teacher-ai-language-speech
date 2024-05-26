import { degToRad } from "three/src/math/MathUtils.js";

export const TEACHERS: Teacher[] = ["Nanami", "Naoki"];

export const ANIMATION_FADE_TIME = 0.5;

export const CAMERA_POSITION = {
  default: [0, 6.123233995736766e-21, 0.0001] as const,
  loading: [
    0.00002621880610890309, 0.00000515037441056466, 0.00009636414192870058,
  ] as const,
  speaking: [0, -1.6481333940859815e-7, 0.00009999846226827279] as const,
};

export const CAMERA_ZOOMS = {
  default: 1,
  loading: 1.3,
  speaking: 2.1204819420055387,
};

export const itemPlacement = {
  default: {
    classroom: {
      position: [0.2, -1.7, -2] as const,
    },
    teacher: {
      position: [-1, -1.7, -3] as const,
      rotation: [0, degToRad(20), 0] as [number, number, number],
    },
    board: {
      position: [0.45, 0.382, -6] as const,
    },
  },
  alternative: {
    classroom: {
      position: [0.3, -1.7, -1.5] as const,
      rotation: [0, degToRad(-90), 0] as [number, number, number],
      scale: 0.4,
    },
    teacher: {
      position: [-1, -1.7, -3] as const,
      rotation: [0, degToRad(20), 0] as [number, number, number],
    },
    board: { position: [1.4, 0.84, -8] as const },
  },
};

export const formalSpeechExample: SpeechExample = {
  english: [
    {
      word: "Do",
      reading: "do",
    },
    {
      word: "You",
      reading: "you",
    },
    {
      word: "Live",
      reading: "live",
    },
    {
      word: "In",
      reading: "in",
    },
    {
      word: "Indonesia",
      reading: "indonesia",
    },
    {
      word: "?",
      reading: '?'
    }
  ],
  grammarBreakdown: [
    {
      indonesia: "Apakah kamu tinggal di Indonesia ?",
      english: [
        {
          word: "Do",
          reading: "Do",
        },
        {
          word: "You",
          reading: "you",
        },
        {
          word: "Live",
          reading: "Live",
        },
        {
          word: "In",
          reading: "in",
        },
        {
          word: "Indonesia?",
          reading: "indonesia?",
        },
      ],
      chunks: [
        {
          english: [
            {
              word: "Do",
              reading: "do",
            },
          ],
          meaning:
            "To form questions or negative sentences in present simple tense.",
          grammar: "Auxiliary verb",
        },
        {
          english: [
            {
              word: "You",
              reading: "you",
            },
          ],
          meaning: "Pronoun referring to the person being addressed.",
          grammar: "Pronoun",
        },
        {
          english: [{ word: "Live", reading: "live" }],
          meaning: "To be alive.",
          grammar: "Verb",
        },
        {
          english: [{ word: "In", reading: "in" }],
          meaning: "Preposition.",
          grammar: "Preposition",
        },
        {
          english: [{ word: "Indonesia", reading: "indonesia" }],
          meaning: "Indonesia.",
          grammar: "Noun",
        },
        {
          english: [{ word: "?", reading: "?" }],
          meaning: "Question mark.",
          grammar: "Punctuation",
        },
      ],
    },
  ],
};

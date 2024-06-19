// From Indonesia to English
export const englishFormalSpeechExample: SpeechExample = {
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
      reading: "?",
    },
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
            "Untuk membentuk pertanyaan atau kalimat negatif dalam present simple tense.",
          grammar: "Kata kerja bantu",
        },
        {
          english: [
            {
              word: "You",
              reading: "you",
            },
          ],
          meaning: "Kata ganti merujuk pada orang yang disapa.",
          grammar: "Kata ganti",
        },
        {
          english: [{ word: "Live", reading: "live" }],
          meaning: "Untuk Lokasi.",
          grammar: "Kata kerja",
        },
        {
          english: [{ word: "In", reading: "in" }],
          meaning: "Preposisi.",
          grammar: "Preposisi",
        },
        {
          english: [{ word: "Indonesia", reading: "indonesia" }],
          meaning: "Indonesia.",
          grammar: "Kata benda",
        },
        {
          english: [{ word: "?", reading: "?" }],
          meaning: "Tanda tanya.",
          grammar: "tanda baca",
        },
      ],
    },
  ],
};

// From English to Indonesia
export const indonesiaFormalSpeechExample: SpeechExample = {
  indonesia: [
    {
      word: "Apakah",
      reading: "apakah",
    },
    {
      word: "Kamu",
      reading: "kamu",
    },
    {
      word: "Tinggal",
      reading: "tinggal",
    },
    {
      word: "Di",
      reading: "di",
    },
    {
      word: "Indonesia",
      reading: "indonesia",
    },
    {
      word: "?",
      reading: "?",
    },
  ],
  grammarBreakdown: [
    {
      english: "Do you live in Indonesia ?",
      indonesia: [
        {
          word: "Apakah",
          reading: "apakah",
        },
        {
          word: "Kamu",
          reading: "kamu",
        },
        {
          word: "Tinggal",
          reading: "tinggal",
        },
        {
          word: "Di",
          reading: "di",
        },
        {
          word: "Indonesia",
          reading: "indonesia",
        },
        {
          word: "?",
          reading: "?",
        },
      ],
      chunks: [
        {
          indonesia: [
            {
              word: "Apakah",
              reading: "apakah",
            },
          ],
          meaning:
            "To form questions or negative sentences in simple present tense.",
          grammar: "Auxiliary verb",
        },
        {
          indonesia: [
            {
              word: "Kamu",
              reading: "kamu",
            },
          ],
          meaning: "Pronouns refer to the person being addressed.",
          grammar: "Pronouns",
        },
        {
          indonesia: [{ word: "Tinggal", reading: "tinggal" }],
          meaning: "For Location.",
          grammar: "Verb",
        },
        {
          indonesia: [{ word: "Di", reading: "di" }],
          meaning: "Preposition.",
          grammar: "Preposition",
        },
        {
          indonesia: [{ word: "Indonesia", reading: "indonesia" }],
          meaning: "Indonesia.",
          grammar: "Noun",
        },
        {
          indonesia: [{ word: "?", reading: "?" }],
          meaning: "Question mark.",
          grammar: "Punctuation",
        },
      ],
    },
  ],
};

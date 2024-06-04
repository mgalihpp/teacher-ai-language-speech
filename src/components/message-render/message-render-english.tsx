import React, { memo } from "react";

interface MessageRenderEnglishProps {
  english: Word[];
}

const MessageRenderEnglish: React.FC<MessageRenderEnglishProps> = ({
  english,
}) => (
  <p className="mt-2 flex w-fit flex-wrap gap-2 font-mono text-4xl font-bold text-white">
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

export default memo(MessageRenderEnglish);

import React, { memo } from "react";

interface MessageRenderToProps {
  answer: Word[];
}

const MessageRenderTo: React.FC<MessageRenderToProps> = ({ answer }) => (
  <p className="mt-2 flex w-fit flex-wrap gap-2 font-mono text-4xl font-bold text-white">
    {answer.map((word, index) => (
      <span key={index} className="flex flex-col items-center justify-end">
        {word.reading && (
          <span className="text-2xl text-white/65">{word.reading}</span>
        )}
        {word.word}
      </span>
    ))}
  </p>
);

export default memo(MessageRenderTo);

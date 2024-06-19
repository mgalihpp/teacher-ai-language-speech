import React, { memo } from "react";

interface MessageRenderFromProps {
  text: string;
}

const MessageRenderFrom: React.FC<MessageRenderFromProps> = ({ text }) => (
  <>
    {text && (
      <p
        className="inline-block w-fit rounded-sm bg-gradient-to-br from-blue-300/90 to-white/90 
            bg-clip-text px-2 text-4xl font-bold text-transparent
            "
      >
        {text}
      </p>
    )}
  </>
);

export default memo(MessageRenderFrom);

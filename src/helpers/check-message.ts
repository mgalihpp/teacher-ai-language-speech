const isString = (input: string | Word[] | undefined): input is string => {
  return typeof input === "string";
};

const isWordArray = (input: string | Word[] | undefined): input is Word[] => {
  return (
    Array.isArray(input) &&
    input.every(
      (item) =>
        typeof item.word === "string" && typeof item.reading === "string",
    )
  );
};

function checkIsAnswerString(message: Message): string {
  if (isString(message.answer.indonesia)) {
    return message.answer.indonesia;
  } else if (isString(message.answer.english)) {
    return message.answer.english;
  }

  return "";
}

function checkIsAnswerWord(message: Message): Word[] {
  if (isWordArray(message.answer.indonesia)) {
    return message.answer.indonesia;
  } else if (isWordArray(message.answer.english)) {
    return message.answer.english;
  }

  return [];
}

function checkIsGrammarString(grammar: grammarWord): string {
  if (isString(grammar.indonesia)) {
    return grammar.indonesia;
  } else if (isString(grammar.english)) {
    return grammar.english;
  }

  return "";
}

function checkIsGrammarWord(grammar: grammarWord): Word[] {
  if (isWordArray(grammar.indonesia)) {
    return grammar.indonesia;
  } else if (isWordArray(grammar.english)) {
    return grammar.english;
  }

  return [];
}

function checkChunk(chunk: ChunksWord): Word[] {
  if (isWordArray(chunk.indonesia)) {
    return chunk.indonesia;
  } else if (isWordArray(chunk.english)) {
    return chunk.english;
  }

  return [];
}

export {
  isString,
  isWordArray,
  checkIsAnswerString,
  checkIsAnswerWord,
  checkIsGrammarString,
  checkIsGrammarWord,
  checkChunk,
};

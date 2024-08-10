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
  } else if (isString(message.answer.japanese)) {
    return message.answer.japanese;
  } else if (isString(message.answer.france)) {
    return message.answer.france;
  }

  return "";
}

function checkIsAnswerWord(message: Message): Word[] {
  if (isWordArray(message.answer.indonesia)) {
    return message.answer.indonesia;
  } else if (isWordArray(message.answer.english)) {
    return message.answer.english;
  } else if (isWordArray(message.answer.japanese)) {
    return message.answer.japanese;
  } else if (isWordArray(message.answer.france)) {
    return message.answer.france;
  }

  return [];
}

function checkIsGrammarString(grammar: grammarWord): string {
  if (isString(grammar.indonesia)) {
    return grammar.indonesia;
  } else if (isString(grammar.english)) {
    return grammar.english;
  } else if (isString(grammar.japanese)) {
    return grammar.japanese;
  } else if (isString(grammar.france)) {
    return grammar.france;
  }

  return "";
}

function checkIsGrammarWord(grammar: grammarWord): Word[] {
  if (isWordArray(grammar.indonesia)) {
    return grammar.indonesia;
  } else if (isWordArray(grammar.english)) {
    return grammar.english;
  } else if (isWordArray(grammar.japanese)) {
    return grammar.japanese;
  } else if (isWordArray(grammar.france)) {
    return grammar.france;
  }

  return [];
}

function checkChunk(chunk: ChunksWord): Word[] {
  if (isWordArray(chunk.indonesia)) {
    return chunk.indonesia;
  } else if (isWordArray(chunk.english)) {
    return chunk.english;
  } else if (isWordArray(chunk.japanese)) {
    return chunk.japanese;
  } else if (isWordArray(chunk.france)) {
    return chunk.france;
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

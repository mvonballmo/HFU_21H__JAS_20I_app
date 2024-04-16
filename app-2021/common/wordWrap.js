/**
 *
 * @param text
 * @param char
 * @param start
 * @param finish
 * @returns {Generator<number, void, *>}
 */
function* getBreaks(text, char, start, finish) {
  let index = start;

  function getNextCharacter() {
    return text.indexOf(char, index);
  }

  let result = getNextCharacter();
  while (result !== -1 && result < finish) {
    yield result;
    index = result + 1;
    result = getNextCharacter();
  }
}

/**
 *
 * @param text
 * @param char
 * @returns {Generator<string, void, *>}
 */
function* getChunks(text, char) {
  let first = 0;
  for (const last of getBreaks(text, char, 0, text.length)) {
    yield text.substring(first, last);
    first = last + 1;
  }
}

export function* getLineBreaks(text) {
  yield* getBreaks(text, "\n", 0, text.length);
}

export function* getWordBreaks(text, start, finish) {
  yield* getBreaks(text, " ", start, finish);
}

export function* getWords(text) {
  yield* getChunks(text, " ");
}

export function* getLines(text) {
  yield* getChunks(text, "\n");
}

export function* getWrappedLineSpans(text, width, indent) {
  let start = 0;

  function* getWrappedLineSpansInSingleLine(lastCharacterIndex) {
    let lastWordBreak = start;

    function createSpan(start, finish) {
      if (start > finish) {
        throw `Start [${start}] cannot be greater than finish [${finish}]`;
      }

      return { start, finish };
    }

    // TODO Remove this instantiation for the word-break array (remove square brackets)
    let wordBreaks = [...getWordBreaks(text, start, lastCharacterIndex)];

    for (const wordBreak of wordBreaks) {
      const lineLength = wordBreak - start;
      if (indent.length + lineLength > width) {
        yield createSpan(start, lastWordBreak);

        start = lastWordBreak + 1;
      } else {
        lastWordBreak = wordBreak;
      }
    }

    if (start < lastWordBreak) {
      yield createSpan(start, lastWordBreak);

      start = lastWordBreak + 1;
    }

    if (start <= lastCharacterIndex) {
      yield createSpan(start, lastCharacterIndex);
    }
  }

  // TODO Remove this instantiation for the line-break array (remove square brackets)
  let lineBreaks = [...getLineBreaks(text)];

  for (const lineBreak of lineBreaks) {
    const finish = lineBreak;
    const lineLength = finish - start;
    if (indent.length + lineLength < width) {
      yield { start, finish };
      start = lineBreak + 1;
    } else {
      yield* getWrappedLineSpansInSingleLine(lineBreak - 1);
      start = lineBreak + 1;
    }
  }

  if (start <= text.length) {
    yield* getWrappedLineSpansInSingleLine(text.length);
  }
}

function* getWrappedLines(text, width, indent) {
  // TODO Remove this instantiation for the wrapped-line-span array (remove square brackets)
  let wrappedLineSpans = [...getWrappedLineSpans(text, width, indent)];

  for (const span of wrappedLineSpans) {
    const isLastLine = span.finish === text.length;
    const lineTerminator = isLastLine ? "" : "\n";
    if (span.start === span.finish) {
      yield lineTerminator;
    } else {
      yield indent + text.substring(span.start, span.finish) + lineTerminator;
    }
  }
}

export function getWrappedText(text, width, indent) {
  return [...getWrappedLines(text, width, indent)].join("");
}

export function wordWrap(text, width, indent = "") {
  const lines = [];
  let currentLine = "";

  text.split("\n").forEach(line => {
    if (line === "") {
      lines.push("");
    } else {
      line.split(" ").forEach(word => {
        if (indent.length + currentLine.length + word.length <= width) {
          currentLine += (currentLine ? " " : "") + word;
        } else {
          lines.push(indent + currentLine);
          currentLine = word;
        }
      });
      lines.push(indent + currentLine);
      currentLine = "";
    }
  });

  return lines.join("\n");
}

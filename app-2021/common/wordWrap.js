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
    // TODO Are we returning the character before the char?
    yield result;
    index = result + 1;
    result = getNextCharacter();
  }

  if (index < finish) {
    yield finish;
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

  function* getWrappedLineSpansInSingleLine(lineBreak) {
    let lastWordBreak = start;

    function createSpan(start, finish) {
      return { start, finish };
    }

    for (const wordBreak of getWordBreaks(text, start, lineBreak)) {
      const lineLength = wordBreak - start;
      if (indent.length + lineLength > width) {
        // Don't include the word-break character
        const finish = lastWordBreak - 1;

        yield createSpan(start, finish);

        start = lastWordBreak + 1;
      } else {
        lastWordBreak = wordBreak;
      }
    }

    if (start < lineBreak) {
      yield createSpan(start, lineBreak);
    }
  }

  for (const lineBreak of getLineBreaks(text)) {
    const finish = lineBreak;
    const lineLength = finish - start;
    if (indent.length + lineLength < width) {
      yield { start, finish };
      start = lineBreak + 1;
    } else {
      yield* getWrappedLineSpansInSingleLine(lineBreak);
      start = lineBreak + 1;
    }
  }

  if (start < text.length) {
    yield* getWrappedLineSpansInSingleLine(text.length);
  }
}

function* getWrappedLines(text, width, indent) {
  for (const span of getWrappedLineSpans(text, width, indent)) {
    const isLastLine = span.finish === text.length;
    const lineTerminator = isLastLine ? "" : "\n";
    if (span.start === span.finish) {
      yield lineTerminator;
    } else {
      yield indent + text.substring(span.start, span.finish + 1) + lineTerminator;
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

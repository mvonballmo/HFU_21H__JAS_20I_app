import { describe, expect, test } from "@jest/globals";
import {
  getLineBreaks,
  getLines,
  getWordBreaks,
  getWords,
  getWrappedLineSpans,
  getWrappedText,
  wordWrap,
} from "../common/wordWrap";

describe("Word-wrapping", () => {
  test("gets newline breaks", () => {
    const text = `A
BB
CCC
BB
A


DDDD`;

    const output = [...getLineBreaks(text)];

    expect(output).toStrictEqual([1, 4, 8, 11, 13, 14, 15, 20]);
  });

  test("gets word breaks", () => {
    const text = `A BB CCC BB A   DDDD`;

    const output = [...getWordBreaks(text, 0, text.length)];

    expect(output).toStrictEqual([1, 4, 8, 11, 13, 14, 15, 20]);
  });

  test("gets partial word breaks", () => {
    const text = `A BB CCC BB A   DDDD`;

    const output = [...getWordBreaks(text, 5, 12)];

    expect(output).toStrictEqual([8, 11]);
  });

  test("gets lines", () => {
    const text = `A
BB
CCC
BB
A


DDDD`;

    const output = [...getLines(text)];

    expect(output).toStrictEqual(["A", "BB", "CCC", "BB", "A", "", "", "DDDD"]);
  });

  test("gets words", () => {
    const text = `A BB CCC BB A   DDDD`;

    const output = [...getWords(text)];

    expect(output).toStrictEqual(["A", "BB", "CCC", "BB", "A", "", "", "DDDD"]);
  });

  test("wraps short lines", () => {
    const text = `A
BB
CCC
BB
A


DDDD`;

    const output = getWrappedText(text, 80, "    ");

    expect(output).toBe(`    A
    BB
    CCC
    BB
    A


    DDDD`);
  });

  test("get word-wrapped spans", () => {
    const text =
      "Dropflow is a CSS layout engine created to explore the reaches of the foundational CSS standards (that is: inlines, blocks, floats, positioning and eventually tables, but not flexbox or grid). It has a high quality text layout implementation and is capable of displaying many of the languages of the world. You can use it to generate PDFs or images on the backend with Node and node-canvas or render rich, wrapped text to a canvas in the browser.";

    const output = [...getWrappedLineSpans(text, 80, "    ")];

    expect(output).toStrictEqual([
      { start: 0, finish: 80 },
      { start: 81, finish: 120 },
    ]);
  });

  test("wraps text", () => {
    const text =
      "Dropflow is a CSS layout engine created to explore the reaches of the foundational CSS standards (that is: inlines, blocks, floats, positioning and eventually tables, but not flexbox or grid). It has a high quality text layout implementation and is capable of displaying many of the languages of the world. You can use it to generate PDFs or images on the backend with Node and node-canvas or render rich, wrapped text to a canvas in the browser.";

    const output = getWrappedText(text, 80, "    ");

    expect(output).toBe(`    Dropflow is a CSS layout engine created to explore the reaches of the
    foundational CSS standards (that is: inlines, blocks, floats, positioning
    and eventually tables, but not flexbox or grid). It has a high quality text
    layout implementation and is capable of displaying many of the languages of
    the world. You can use it to generate PDFs or images on the backend with
    Node and node-canvas or render rich, wrapped text to a canvas in the
    browser.`);
  });

  test("Willison wraps text", () => {
    const text =
      "Dropflow is a CSS layout engine created to explore the reaches of the foundational CSS standards (that is: inlines, blocks, floats, positioning and eventually tables, but not flexbox or grid). It has a high quality text layout implementation and is capable of displaying many of the languages of the world. You can use it to generate PDFs or images on the backend with Node and node-canvas or render rich, wrapped text to a canvas in the browser.";

    const output = wordWrap(text, 80, "    ");

    expect(output).toBe(`    Dropflow is a CSS layout engine created to explore the reaches of the
    foundational CSS standards (that is: inlines, blocks, floats, positioning
    and eventually tables, but not flexbox or grid). It has a high quality text
    layout implementation and is capable of displaying many of the languages of
    the world. You can use it to generate PDFs or images on the backend with
    Node and node-canvas or render rich, wrapped text to a canvas in the
    browser.`);
  });
});

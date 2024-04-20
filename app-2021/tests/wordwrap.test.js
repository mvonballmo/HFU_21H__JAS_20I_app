import { describe, expect, test } from "@jest/globals";
import { getLineBreaks, getWordBreaks, getWrappedLineSpans, getWrappedText, wordWrap } from "../common/wordWrap";

describe("Word-wrapping", () => {
  test("gets newline breaks", () => {
    const text = `A
BB
CCC
BB
A


DDDD`;

    const output = [...getLineBreaks(text)];

    expect(output).toStrictEqual([1, 4, 8, 11, 13, 14, 15]);
  });

  test("gets word breaks", () => {
    const text = `A BB CCC BB A   DDDD`;

    const output = [...getWordBreaks(text, 0, text.length)];

    expect(output).toStrictEqual([1, 4, 8, 11, 13, 14, 15]);
  });

  test("get word breaks in actual text", () => {
    const text = "Dropflow is a CSS layout engine created to explore the reaches of the foundational   ";

    const output = [...getWordBreaks(text, 0, text.length)];

    expect(output).toStrictEqual([8, 11, 13, 17, 24, 31, 39, 42, 50, 54, 62, 65, 69, 82, 83, 84]);
  });

  test("gets partial word breaks", () => {
    const text = `A BB CCC BB A   DDDD`;

    const output = [...getWordBreaks(text, 5, 12)];

    expect(output).toStrictEqual([8, 11]);
  });

  test("wraps a one-character line", () => {
    const text = `A B`;

    const output = getWrappedText(text, 5, "    ");

    expect(output).toBe(`    A
    B`);
  });

  test("wraps one-character lines", () => {
    const text = `A B C`;

    const output = getWrappedText(text, 5, "    ");

    expect(output).toBe(`    A
    B
    C


    D
    E
    F

    `);
  });

  test("wraps one-character lines", () => {
    const text = `A B C

    D E F

    `;

    const output = getWrappedText(text, 5, "    ");

    expect(output).toBe(`    A
    B
    C


    D
    E
    F

    `);
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

  test("wraps short and long lines", () => {
    const text = `A
BB
Dropflow is a CSS layout engine created to explore the reaches of the foundational CSS standards
BB
A


Dropflow is a CSS layout engine created to explore the reaches of the foundational CSS standards`;

    const output = getWrappedText(text, 80, "    ");

    expect(output).toBe(`    A
    BB
    Dropflow is a CSS layout engine created to explore the reaches of the
    foundational CSS standards
    BB
    A


    Dropflow is a CSS layout engine created to explore the reaches of the
    foundational CSS standards`);
  });

  test("get word-wrapped spans", () => {
    const text =
      "Dropflow is a CSS layout engine created to explore the reaches of the foundational CSS standards (that is: inlines, blocks, floats, positioning and eventually tables, but not flexbox or grid). It has a high quality text layout implementation and is capable of displaying many of the languages of the world. You can use it to generate PDFs or images on the backend with Node and node-canvas or render rich, wrapped text to a canvas in the browser.";

    const output = [...getWrappedLineSpans(text, 80, "    ")];

    expect(output).toStrictEqual([
      { start: 0, finish: 68 },
      { start: 70, finish: 142 },
      { start: 144, finish: 218 },
      { start: 220, finish: 294 },
      { start: 296, finish: 367 },
      { start: 369, finish: 436 },
      { start: 438, finish: 446 },
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

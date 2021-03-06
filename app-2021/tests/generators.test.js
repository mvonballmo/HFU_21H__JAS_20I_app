import { describe, expect, test } from "@jest/globals";

describe("Recursion", () => {
  const cases = [
    ["a b c", ["a", "b", "c"]],
    ["d e f", ["d", "e", "f"]],
  ];

  const prefixedCases = [
    ["d e f", ["a", "b", "c", "d", "e", "f"]],
    ["x y z", ["a", "b", "c", "x", "y", "z"]],
  ];

  const earlyReturnCases = [
    ["d e f", ["a", "b", "c", "d"]],
    ["x y z", ["a", "b", "c", "x"]],
  ];

  function* getPrefix() {
    yield "a";
    yield "b";
    yield "c";
  }

  test.each(cases)("getWords using string.split(): %p yields %p", (input, expected) => {
    const getWordsSplit = n => {
      return n.split(" ");
    };

    expect(getWordsSplit(input)).toEqual(expected);
  });

  test.each(cases)("getWords using simple generator: %p yields %p", (input, expected) => {
    function* getWordsGenerator(n) {
      for (const word of n.split(" ")) {
        yield word;
      }
    }

    expect([...getWordsGenerator(input)]).toEqual(expected);
  });

  test.each(cases)("getWords using delegated generator: %p yields %p", (input, expected) => {
    function* getWordsGenerator(n) {
      yield* n.split(" ");
    }

    expect([...getWordsGenerator(input)]).toEqual(expected);
  });

  test.each(prefixedCases)("getWords using prefixed generator: %p yields %p", (input, expected) => {
    function* getWordsGenerator(n) {
      yield* getPrefix();

      for (const word of n.split(" ")) {
        yield word;
      }
    }

    expect([...getWordsGenerator(input)]).toEqual(expected);
  });

  test.each(prefixedCases)("getWords using multiple generators: %p yields %p", (input, expected) => {
    function* getWordsGenerator(n) {
      yield* getPrefix();
      yield* n.split(" ");
    }

    expect([...getWordsGenerator(input)]).toEqual(expected);
  });

  test.each(earlyReturnCases)("getWords using early return: %p yields %p", (input, expected) => {
    function* getWordsGenerator(n) {
      yield* getPrefix();

      for (const word of n.split(" ")) {
        if (word === "e" || word == "y") {
          return;
        }

        yield word;
      }
    }

    expect([...getWordsGenerator(input)]).toEqual(expected);
  });

  test("iterate with next()", () => {
    function* getLetters() {
      yield "a";
      yield "b";
    }

    const letters = getLetters();
    const a = letters.next(); // { done: false, value: "a" }

    expect(a.done).toBeFalsy();
    expect(a.value).toBe("a");

    const b = letters.next(); // { done: true, value: "b" }

    expect(b.done).toBeFalsy();
    expect(b.value).toBe("b");

    const c = letters.next();

    expect(c.done).toBeTruthy();
    expect(c.value).toBeUndefined();

    const letterArray = [...getLetters()];

    expect(letterArray).toEqual(["a", "b"]);
  });

  test("empty generator", () => {
    function* emptyIterator() {}

    /**
     * @param {Generator} iterator
     */
    function firstOrDefault(iterator) {
      return iterator.next().value;
    }

    expect(firstOrDefault(emptyIterator())).toBeUndefined();
  });
});

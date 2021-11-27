import { describe, expect, test } from "@jest/globals";

describe("Basic functions and operators", () => {
  const bioCases = [
    ["bob", -2, 'The user "bob" is -2 years old.'],
    ["bob", -1, 'The user "bob" is -1 years old.'],
    ["bob", 0, 'The user "bob" is 0 years old.'],
    ["john", 1, 'The user "john" is 1 year old.'],
    ["john", 2, 'The user "john" is 2 years old.'],
  ];

  test.each(bioCases)("given %p and %p, Bio returns %p", (argOne, argTwo, expectedResult) => {
    function Bio(t, name, age) {
      const years = age == 1 ? " year" : " years";

      return `${t[0]}${name}${t[1]}${age}${years}${t[2]}`;
    }

    const output = Bio`The user "${argOne}" is ${argTwo} old.`;

    expect(output).toEqual(expectedResult);
  });
});

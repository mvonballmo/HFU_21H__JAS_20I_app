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

  test("substr()", () => {
    const test = "This is a sentence.";

    expect(test.substr(1)).toBe("his is a sentence.");
    expect(test.substr(1, 10)).toBe("his is a s");
  });

  test("substring()", () => {
    const test = "This is a sentence.";

    expect(test.substring(1)).toBe("his is a sentence.");
    expect(test.substring(1, 10)).toBe("his is a ");
  });

  test("includes()", () => {
    const test = "This is a sentence.";

    expect(test.includes("is")).toBeTruthy();
  });

  test("indexOf() and lastIndexOf()", () => {
    const test = "This is a sentence.";

    expect(test.indexOf("is")).toBe(2);
    expect(test.lastIndexOf("is")).toBe(5);

    expect(test.indexOf("man")).toBe(-1);
    expect(test.lastIndexOf("man")).toBe(-1);
  });

  test("startsWith() and endsWith()", () => {
    const test = "This is a sentence.";

    expect(test.startsWith("is")).toBeFalsy();
    expect(test.startsWith("This")).toBeTruthy();

    expect(test.endsWith("sentence.")).toBeTruthy();
    expect(test.endsWith("man")).toBeFalsy();
  });

  test("toLowerCase(), toLocaleLowerCase()", () => {
    const test = "This is ä sentence.";

    expect(test.toLocaleLowerCase("de-CH")).toBe("this is ä sentence.");
    expect(test.toLowerCase()).toBe("this is ä sentence.");
  });

  test("toUpperCase(), toLocaleUpperCase()", () => {
    const test = "This is ä sentence.";

    expect(test.toLocaleUpperCase("de-CH")).toBe("THIS IS Ä SENTENCE.");
    expect(test.toUpperCase()).toBe("THIS IS Ä SENTENCE.");
  });

  test("replace() and replaceAll()", () => {
    const test = "This is a sentence.";

    expect(test.replace("is", "at")).toBe("That is a sentence.");
    expect(test.replaceAll("is", "at")).toBe("That at a sentence.");

    expect(test.replace(/[^ ]s/, "at")).toBe("That is a sentence.");
    expect(test.replaceAll(/[^ ]s/g, "at")).toBe("That at a sentence.");
  });
});

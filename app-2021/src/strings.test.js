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
      const years = age === 1 ? " year" : " years";

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

  test("slice()", () => {
    const test = "This is a sentence.";

    expect(test.slice(4)).toBe(" is a sentence.");
    expect(test.slice(4, 6)).toBe(" i");
    expect(test.slice(4, 5)).toBe(" ");
    expect(test.slice(4, 4)).toBe("");
  });

  test("split() with space", () => {
    const test = "This is a sentence.";

    const words = test.split(" ");

    expect(words).toEqual(["This", "is", "a", "sentence."]);
  });

  test("split() with space and emoji", () => {
    const emojiWords = "Hi! 👍🏻".split(" ");

    expect(emojiWords).toEqual(["Hi!", "👍🏻"]);
  });

  test("split() characters", () => {
    const characters = "Hi! 👍🏻".split("");

    expect(characters.length).toEqual(8);
  });

  test("split() characters from emojis", () => {
    const characters = "👍🏻👍🏻👍🏻👍🏻".split("");

    expect(characters.length).toBe(16);
  });

  test("spread characters from simple emojis", () => {
    const characters = [..."👍👍👍👍"];

    expect(characters).toEqual(["👍", "👍", "👍", "👍"]);
  });

  test("spread characters from emojis", () => {
    const characters = [..."👍🏻👍🏻👍🏻👍🏻"];

    expect(characters).toEqual(["👍", "🏻", "👍", "🏻", "👍", "🏻", "👍", "🏻"]);
  });

  test("split() characters with emoji", () => {
    const characters = "Hi!".split("");

    expect(characters).toEqual(["H", "i", "!"]);
  });

  test("split() with regular expression", () => {
    const test = "This is a sentence.";

    const realWords = test.split(/[ .]/);

    expect(realWords).toEqual(["This", "is", "a", "sentence", ""]);
  });

  test("split() with regular expression and capture group", () => {
    const test = "This is a sentence.";

    const realWords = test.split(/([ .])/);

    expect(realWords).toEqual(["This", " ", "is", " ", "a", " ", "sentence", ".", ""]);
  });

  test("trim(), trimStart(), and trimEnd()", () => {
    const test = " \t\nThis is a sentence. \t\n";

    expect(test.trim()).toBe("This is a sentence.");
    expect(test.trimStart()).toBe("This is a sentence. \t\n");
    expect(test.trimEnd()).toBe(" \t\nThis is a sentence.");
  });

  test("replace() and replaceAll()", () => {
    const test = "This is a sentence.";

    expect(test.replace("is", "at")).toBe("That is a sentence.");
    expect(test.replaceAll("is", "at")).toBe("That at a sentence.");

    expect(test.replace(/[^ ]s/, "at")).toBe("That is a sentence.");
    expect(test.replaceAll(/[^ ]s/g, "at")).toBe("That at a sentence.");
  });

  test("match() with single result", () => {
    const test = "This is a sentence.";

    const match = test.match(/[^ ]s/);

    expect(match.index).toBe(2);
    expect(match.groups).toBeUndefined();
    expect(match.input).toBe(test);
    expect(match.length).toBe(1);
    expect(match[0]).toBe("is"); // Full match
  });

  test("match() with single result and capture groups", () => {
    const test = "This is a sentence.";

    const match = test.match(/(([^ ])s)/);

    expect(match.index).toBe(2);
    expect(match.groups).toBeUndefined();
    expect(match.input).toBe(test);
    expect(match.length).toBe(3);
    expect(match[0]).toBe("is"); // Full match
    expect(match[1]).toBe("is"); // Outer capture group
    expect(match[2]).toBe("i"); // Inner capture group
  });

  test("match() with case-sensitivity", () => {
    const test = "This is a sentence.";

    const match = test.match(/[^ \\.]*t[^ \\.]*/);

    expect(match.index).toBe(10);
    expect(match.length).toBe(1);
    expect(match[0]).toBe("sentence"); //
  });

  test("match() with case-insensitivity", () => {
    const test = "This is a sentence.";

    const match = test.match(/[^ \\.]*t[^ \\.]*/i);

    expect(match.index).toBe(0);
    expect(match.length).toBe(1);
    expect(match[0]).toBe("This"); //
  });

  test("match() with multiple results (global)", () => {
    const test = "This is a sentence.";

    const matches = test.match(/(([^ ])s)/g);

    expect(matches).toEqual(["is", "is"]);
  });

  test("matchAll()", () => {
    const test = "This is a sentence.";

    const [...allMatches] = test.matchAll(/(([^ ])s)/g);

    const match0 = allMatches[0];
    expect(match0.index).toBe(2);
    expect(match0.groups).toBeUndefined();
    expect(match0.input).toBe(test);
    expect(match0.length).toBe(3);
    expect(match0[0]).toBe("is");
    expect(match0[1]).toBe("is");
    expect(match0[2]).toBe("i");

    const match1 = allMatches[1];
    expect(match1.index).toBe(5);
    expect(match1.groups).toBeUndefined();
    expect(match1.input).toBe(test);
    expect(match1.length).toBe(3);
    expect(match1[0]).toBe("is");
    expect(match1[1]).toBe("is");
    expect(match1[2]).toBe("i");
  });

  test("find text in object", () => {
    const person = {
      first: "Bob",
      middle: "Joe",
      last: "Hoffman",
      age: 34,
      company: {
        name: "Apple",
        role: "software developer",
        employedSince: "2020.03.04",
        projects: [
          {
            name: "iMac 30-inch",
            role: "software developer",
          },
          {
            name: "MacBook Pro",
            role: "project manager",
          },
        ],
      },
    };

    function* findText(obj, searchText) {
      for (const key in obj) {
        const value = obj[key];

        if (typeof value === "object") {
          yield* findText(value, searchText);
        } else {
          const textValue = value.toString();

          if (textValue.includes(searchText)) {
            yield {
              object: obj,
              propertyName: key,
              value: textValue,
            };
          }
        }
      }
    }

    const [...hoffmanResults] = findText(person, "Hoff");

    expect(hoffmanResults).toEqual([{ object: person, propertyName: "last", value: "Hoffman" }]);

    const [...oResults] = findText(person, "o");

    expect(oResults).toEqual([
      { object: person, propertyName: "first", value: "Bob" },
      { object: person, propertyName: "middle", value: "Joe" },
      { object: person, propertyName: "last", value: "Hoffman" },
      { object: person.company, propertyName: "role", value: "software developer" },
      { object: person.company.projects[0], propertyName: "role", value: "software developer" },
      { object: person.company.projects[1], propertyName: "name", value: "MacBook Pro" },
      { object: person.company.projects[1], propertyName: "role", value: "project manager" },
    ]);

    const [...softwareResults] = findText(person, "software");

    expect(softwareResults).toEqual([
      { object: person.company, propertyName: "role", value: "software developer" },
      { object: person.company.projects[0], propertyName: "role", value: "software developer" },
    ]);
  });
});

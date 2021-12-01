import { describe, expect, test } from "@jest/globals";
import { findText } from "./find";

describe("Find", () => {
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

  test("find 'Hoff' in person", () => {
    const [...hoffmanResults] = findText(person, "Hoff");

    expect(hoffmanResults).toEqual([{ object: person, propertyName: "last", value: "Hoffman", matches: ["Hoff"] }]);
  });

  test("find 'o' in person", () => {
    const [...oResults] = findText(person, "o");

    expect(oResults).toEqual([
      { object: person, propertyName: "first", value: "Bob", matches: ["o"] },
      { object: person, propertyName: "middle", value: "Joe", matches: ["o"] },
      { object: person, propertyName: "last", value: "Hoffman", matches: ["o"] },
      { object: person.company, propertyName: "role", value: "software developer", matches: ["o"] },
      { object: person.company.projects[0], propertyName: "role", value: "software developer", matches: ["o"] },
      { object: person.company.projects[1], propertyName: "name", value: "MacBook Pro", matches: ["o"] },
      { object: person.company.projects[1], propertyName: "role", value: "project manager", matches: ["o"] },
    ]);
  });

  test("find 'software' in person", () => {
    const [...softwareResults] = findText(person, "software");

    expect(softwareResults).toEqual([
      { object: person.company, propertyName: "role", value: "software developer", matches: ["software"] },
      { object: person.company.projects[0], propertyName: "role", value: "software developer", matches: ["software"] },
    ]);
  });

  test("find 'Hoff' or 'dev' in person", () => {
    const [...multiResults] = findText(person, "Hoff", "dev");

    expect(multiResults).toEqual([
      { object: person, propertyName: "last", value: "Hoffman", matches: ["Hoff"] },
      { object: person.company, propertyName: "role", value: "software developer", matches: ["dev"] },
      { object: person.company.projects[0], propertyName: "role", value: "software developer", matches: ["dev"] },
    ]);
  });

  test("find 'pro' or 'ma' in person", () => {
    const [...multiResults] = findText(person, "pro", "ma");

    expect(multiResults).toEqual([
      { object: person, propertyName: "last", value: "Hoffman", matches: ["ma"] },
      { object: person.company.projects[1], propertyName: "role", value: "project manager", matches: ["pro", "ma"] },
    ]);
  });
});

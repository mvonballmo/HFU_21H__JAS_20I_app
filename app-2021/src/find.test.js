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

    expect(hoffmanResults).toEqual([{ object: person, propertyName: "last", value: "Hoffman", searchText: "Hoff" }]);
  });

  test("find 'o' in person", () => {
    const [...oResults] = findText(person, "o");

    expect(oResults).toEqual([
      { object: person, propertyName: "first", value: "Bob", searchText: "o" },
      { object: person, propertyName: "middle", value: "Joe", searchText: "o" },
      { object: person, propertyName: "last", value: "Hoffman", searchText: "o" },
      { object: person.company, propertyName: "role", value: "software developer", searchText: "o" },
      { object: person.company.projects[0], propertyName: "role", value: "software developer", searchText: "o" },
      { object: person.company.projects[1], propertyName: "name", value: "MacBook Pro", searchText: "o" },
      { object: person.company.projects[1], propertyName: "role", value: "project manager", searchText: "o" },
    ]);
  });

  test("find 'software' in person", () => {
    const [...softwareResults] = findText(person, "software");

    expect(softwareResults).toEqual([
      { object: person.company, propertyName: "role", value: "software developer", searchText: "software" },
      { object: person.company.projects[0], propertyName: "role", value: "software developer", searchText: "software" },
    ]);
  });

  test("find 'Hoff' or 'dev' in person", () => {
    const [...multiResults] = findText(person, "Hoff", "dev");

    expect(multiResults).toEqual([
      { object: person, propertyName: "last", value: "Hoffman", searchText: "Hoff" },
      { object: person.company, propertyName: "role", value: "software developer", searchText: "dev" },
      { object: person.company.projects[0], propertyName: "role", value: "software developer", searchText: "dev" },
    ]);
  });
});

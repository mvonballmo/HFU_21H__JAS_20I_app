/**
 * @jest-environment jsdom
 */

import { beforeEach, describe, expect, test } from "@jest/globals";

describe("WebStorage", () => {
  function getLocalStorageAsObject() {
    const local = {};

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      local[key] = localStorage.getItem(key);
    }

    return local;
  }

  beforeEach(() => {
    localStorage.clear();
  });

  test("get key/value pairs", () => {
    localStorage.setItem("lastUsername", "John");
    localStorage.setItem("expertMode", "true");

    function* getLocalStorageItems() {
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        yield { key, value: localStorage.getItem(key) };
      }
    }

    const local = [...getLocalStorageItems()];

    expect(local).toMatchSnapshot();
  });

  test("get values in object", () => {
    localStorage.setItem("lastUsername", "John");
    localStorage.setItem("expertMode", "true");

    expect(getLocalStorageAsObject()).toMatchSnapshot();
  });

  test("store and load JSON", () => {
    const person = {
      first: "Bob",
      last: "Hoffman",
      age: 34,
      company: {
        name: "Apple",
      },
    };

    localStorage.setItem("person", JSON.stringify(person));

    const loadedPerson = JSON.parse(getLocalStorageAsObject()["person"]);

    expect(loadedPerson.first).toBe("Bob");
    expect(loadedPerson.last).toBe("Hoffman");
    expect(loadedPerson.age).toBe(34);
    expect(loadedPerson.company.name).toBe("Apple");
  });
});

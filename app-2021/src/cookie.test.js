/**
 * @jest-environment jsdom
 */

import { describe, expect, test, beforeEach } from "@jest/globals";

describe("Cookies", () => {
  function clearCookies() {
    const cookies = document.cookie.split(";");
    const expiryDate = new Date(0).toUTCString();

    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i];
      const [key] = cookie.trim().split("=");
      document.cookie = `${key}=; expires=${expiryDate}`;
    }
  }

  function getCookieMap() {
    const cookie = document.cookie.split(";").map(s => {
      const [key, value] = s.trim().split("=");
      return { key, value };
    });
    return cookie;
  }

  function getCookieObject() {
    const cookie = {};

    for (const pair of document.cookie.split(";")) {
      const [key, value] = pair.trim().split("=");
      cookie[key] = value;
    }
    return cookie;
  }

  beforeEach(() => {
    clearCookies();
  });

  test("get key/value pairs", () => {
    document.cookie = "lastUsername=John";
    document.cookie = "expertMode=true";

    expect(getCookieMap()).toMatchSnapshot();
  });

  test("get values in object", () => {
    document.cookie = "lastUsername=John";
    document.cookie = "expertMode=true";

    expect(getCookieObject()).toMatchSnapshot();
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

    document.cookie = "person=" + JSON.stringify(person);

    expect(document.cookie).toMatchSnapshot();

    const loadedPerson = JSON.parse(getCookieObject()["person"]);

    expect(loadedPerson.first).toBe("Bob");
    expect(loadedPerson.last).toBe("Hoffman");
    expect(loadedPerson.age).toBe(34);
    expect(loadedPerson.company.name).toBe("Apple");
  });
});

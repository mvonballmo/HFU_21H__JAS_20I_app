/**
 * @jest-environment jsdom
 */

import { describe, expect, test } from "@jest/globals";

describe("WebStorage", () => {
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

    const local = {};

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      local[key] = localStorage.getItem(key);
    }

    expect(local).toMatchSnapshot();
  });
});

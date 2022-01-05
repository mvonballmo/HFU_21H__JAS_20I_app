/**
 * @jest-environment jsdom
 */

import { describe, expect, test } from "@jest/globals";

describe("Cookies", () => {
  test("get key/value pairs", () => {
    document.cookie = "lastUsername=John";
    document.cookie = "expertMode=true";

    const cookie = document.cookie.split(";").map(s => {
      const [key, value] = s.trim().split("=");
      return { key, value };
    });

    expect(cookie).toMatchSnapshot();
  });

  test("get values in object", () => {
    document.cookie = "lastUsername=John";
    document.cookie = "expertMode=true";

    const cookie = {};

    for (const pair of document.cookie.split(";")) {
      const [key, value] = pair.trim().split("=");
      cookie[key] = value;
    }

    expect(cookie).toMatchSnapshot();
  });
});

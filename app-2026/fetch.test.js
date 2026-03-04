import { test, describe, expect } from "@jest/globals";

describe("fetch", () => {
  test("call fetch gets addresses", () => {
    return fetch("http://localhost:3000/addresses")
      .then(data => data.json())
      .then(addresses => {
        expect(addresses.length).toBe(2);
      });
  });
});

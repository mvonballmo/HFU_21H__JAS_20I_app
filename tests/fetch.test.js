import { describe, expect, test } from "@jest/globals";
import "isomorphic-fetch";

describe("Fetch", () => {
  test("call fetch gets addresses", () => {
    return fetch("http://localhost:3000/addresses")
      .then(data => data.json())
      .then(addresses => {
        expect(addresses.length).toBe(34);
      });
  });
});

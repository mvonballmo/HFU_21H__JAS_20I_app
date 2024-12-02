import { test, describe, expect } from "@jest/globals";
import { counter, increment, decrement } from "./library";
import "isomorphic-fetch";  // Oben in die Datei

describe("library", () => {
  test("counter is initialized to 1", () => {
    expect(counter()).toBe(1);
  });

  test("increment increases by 1", () => {
    const currentCounter = counter();

    expect(increment()).toBe(currentCounter + 1);
  });

  test("decrement decreases by 1", () => {
    const currentCounter = counter();

    expect(decrement()).toBe(currentCounter - 1);
  });

  test("call fetch gets addresses", () => {
    return fetch("http://localhost:3000/addresses")
      .then(data => data.json())
      .then(addresses => {
        expect(addresses.length).toBe(3);
      });
  });
});

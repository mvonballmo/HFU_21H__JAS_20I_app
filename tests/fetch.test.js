import { describe, expect, test } from "@jest/globals";
import "isomorphic-fetch";

describe("Fetch", () => {
  test("call fetch gets addresses", () => {
    return fetch("http://localhost:3000/addresses")
      .then(data => data.json())
      .then(addresses => {
        expect(addresses.length).toBe(12);
      });
  });

  test("call fetch gets addresses with done", done => {
    fetch("http://localhost:3000/addresses")
      .then(data => data.json())
      .then(addresses => {
        expect(addresses.length).toBe(12);
        done();
      })
      .catch(error => done(error));
  });

  test("call fetch with async/await", async () => {
    const promise = await fetch("http://localhost:3000/addresses");
    const addresses = await promise.json();

    expect(addresses.length).toBe(12);
  });

  test("call fetch with async/await and JSON.parse()", async () => {
    const promise = await fetch("http://localhost:3000/addresses");
    const addresses = JSON.parse(await promise.text());

    expect(addresses.length).toBe(12);
  });
});

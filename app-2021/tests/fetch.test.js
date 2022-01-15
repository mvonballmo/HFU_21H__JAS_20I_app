import { describe, expect, test } from "@jest/globals";
import "isomorphic-fetch";
import { testingRootUrl } from "./test-library";

describe("Fetch", () => {
  const serverRoot = testingRootUrl;

  function getAddressesUrl() {
    return `${serverRoot}addresses`;
  }

  test("call fetch gets addresses with done", done => {
    fetch(getAddressesUrl())
      .then(data => data.json())
      .then(addresses => {
        expect(addresses.length).toBe(12);
        done();
      })
      .catch(error => done(error));
  });

  test("call fetch with async/await", async () => {
    const response = await fetch(getAddressesUrl());
    const addresses = await response.json();

    expect(addresses.length).toBe(12);
  });

  test("call fetch with async/await and JSON.parse()", async () => {
    const response = await fetch(getAddressesUrl());

    expect(response.ok).toBeTruthy();
    expect(response.status).toBe(200);

    const addresses = JSON.parse(await response.text());

    expect(addresses.length).toBe(12);
  });

  test("call fetch with async/await and 404", async () => {
    const response = await fetch(getAddressesUrl() + "ssss");

    expect(response.ok).toBeFalsy();
    expect(response.status).toBe(404);
  });

  test("call fetch with caught error", async () => {
    try {
      const promise = await fetch("foo" + getAddressesUrl());
      return await promise.json();
    } catch (error) {
      const e = error; // Für Debugging
      // Error wird ignoriert
    } finally {
      // Wird immer ausgeführt (cleanup, logging, usw.)
    }
  });
});

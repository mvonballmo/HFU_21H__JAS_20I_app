/**
 * @jest-environment jsdom
 */

import { describe, test } from "@jest/globals";
import "isomorphic-fetch";

describe("Timers", () => {
  test("set timeout of 1/4 second", done => {
    setTimeout(() => done(), 250);
  });

  test("clear timeout of 1/4 second", () => {
    const t = setTimeout(() => {
      throw new Error("Timeout should not have occurred.");
    }, 250);

    clearTimeout(t);
  });

  test("set interval of 1/10 second", done => {
    let counter = 0;

    const t = setInterval(() => {
      counter += 1;

      if (counter > 2) {
        clearTimeout(t);
        done();
      }
    }, 100);
  });
});

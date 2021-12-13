/**
 * @jest-environment jsdom
 */

import { describe, expect, test } from "@jest/globals";
import { counter, increment, decrement, show } from "./basics.js";

describe("Library Functions", () => {
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

  test("show writes to output", () => {
    document.body.innerHTML = `
    <div id="output"></div>
    `;

    show("Test");
    show("Test");

    const output = document.getElementById("output");

    expect(output.innerHTML).toMatchSnapshot();
  });
});

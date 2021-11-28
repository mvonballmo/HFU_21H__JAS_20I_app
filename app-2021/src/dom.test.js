/**
 * @jest-environment jsdom
 */

import { describe, expect, test } from "@jest/globals";

describe("DOM", () => {
  test("selecting a button by id, tag, and class", () => {
    document.body.innerHTML = `<button id="a" class="primary">Test</button>`;

    const btn1 = document.getElementById("a");
    const [btn2] = document.getElementsByTagName("button");
    const [btn3] = document.getElementsByClassName("primary");

    expect(btn1.tagName).toBe("BUTTON");
    expect(btn1.className).toBe("primary");
    expect(btn1.id).toBe("a");
    expect(btn1).toEqual(btn2);
    expect(btn2).toEqual(btn3);
  });
});

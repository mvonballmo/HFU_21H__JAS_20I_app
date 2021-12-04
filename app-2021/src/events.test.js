/**
 * @jest-environment jsdom
 */

import { describe, expect, test } from "@jest/globals";

describe("Events", () => {
  test("using onclick attribute", () => {
    document.body.innerHTML = `<button id="button" onclick="clickCount += 1"/>`;

    const button = document.getElementById("button");

    window.clickCount = 0;

    button.click();

    expect(window.clickCount).toBe(1);
  });

  test("using onclick attribute with 'this'", () => {
    document.body.innerHTML = `<button id="button" onclick="targetId = this.id"/>`;

    window.targetId = "";

    const button = document.getElementById("button");

    button.click();

    expect(window.targetId).toBe("button");
  });

  test("using onclick attribute with closure", () => {
    document.body.innerHTML = `<button id="button" onclick="buttonClick(this)"/>`;

    let targetId;

    window.buttonClick = btn => {
      targetId = btn.id;
    };

    const button = document.getElementById("button");

    button.click();

    expect(targetId).toBe("button");
  });

  test("using onclick attribute with event", () => {
    document.body.innerHTML = `<button id="button" onclick="clicked(event)"/>`;

    let targetId;

    window.clicked = e => {
      targetId = e.target.id;
    };

    const button = document.getElementById("button");

    button.click();

    expect(targetId).toBe("button");
  });

  test("using onclick event-handler with event", () => {
    document.body.innerHTML = `<button id="button"/>`;

    let targetId;

    const button = document.getElementById("button");

    button.onclick = e => (targetId = e.target.id);

    button.click();

    expect(targetId).toBe("button");
  });

  test("using onclick event-handler without event", () => {
    document.body.innerHTML = `<button id="button"/>`;

    let targetId;

    const button = document.getElementById("button");

    button.onclick = () => (targetId = "foo");

    button.click();

    expect(targetId).toBe("foo");
  });
});

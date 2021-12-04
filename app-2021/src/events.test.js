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

  test("using onclick attribute with closure", done => {
    document.body.innerHTML = `<button id="button" onclick="buttonClick(this)"/>`;

    window.buttonClick = btn => {
      try {
        expect(btn.id).toBe("button");
      } finally {
        done();
      }
    };

    const button = document.getElementById("button");

    button.click();
  });

  test("using onclick attribute with event", done => {
    document.body.innerHTML = `<button id="button" onclick="clicked(event)"/>`;

    window.clicked = e => {
      try {
        expect(e.target.id).toBe("button");
      } finally {
        done();
      }
    };

    const button = document.getElementById("button");

    button.click();
  });

  test("using onclick event-handler with event", done => {
    document.body.innerHTML = `<button id="button"/>`;

    const button = document.getElementById("button");

    button.onclick = e => {
      try {
        expect(e.target.id).toBe("button");
      } finally {
        done();
      }
    };

    button.click();
  });

  test("using onclick event-handler without event", done => {
    document.body.innerHTML = `<button id="button"/>`;

    const button = document.getElementById("button");

    button.onclick = () => {
      done();
    };

    button.click();
  });

  test("using 'click' event-listener with event", done => {
    document.body.innerHTML = `<button id="button"/>`;

    const button = document.getElementById("button");

    button.addEventListener("click", e => {
      try {
        expect(e.target.id).toBe("button");
      } finally {
        done();
      }
    });

    button.click();
  });

  test("using 'click' event-listener without event", done => {
    document.body.innerHTML = `<button id="button"/>`;

    const button = document.getElementById("button");

    button.addEventListener("click", () => {
      done();
    });

    button.click();
  });

  test("adding and removing event-listener", () => {
    document.body.innerHTML = `<button id="button"/>`;

    const button = document.getElementById("button");

    function handleClick() {
      throw new Error("The click-handler should not have been called.");
    }

    button.addEventListener("click", handleClick);
    button.removeEventListener("click", handleClick);

    button.click();
  });
});

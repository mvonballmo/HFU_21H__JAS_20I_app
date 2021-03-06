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

  test("using arrow function and 'this'", done => {
    document.body.innerHTML = `<button id="button"/>`;

    const button = document.getElementById("button");

    button.addEventListener("click", () => {
      expect(this).toBeUndefined();
      done();
    });

    button.click();
  });

  test("using regular function and 'this'", done => {
    document.body.innerHTML = `<button id="button"/>`;

    const button = document.getElementById("button");

    button.addEventListener("click", function () {
      expect(this).toEqual(button);
      done();
    });

    button.click();
  });

  test("normal bubbling events", () => {
    document.body.innerHTML = `
      <div>
        <button/>
      </div>
    `;

    const [div] = document.getElementsByTagName("div");
    const button = div.firstElementChild;

    let clicks = [];

    function handleClick(e) {
      clicks.push(e.currentTarget.nodeName);
    }

    document.addEventListener("click", handleClick);
    div.addEventListener("click", handleClick);
    button.addEventListener("click", handleClick);

    button.click();

    expect(clicks).toEqual(["BUTTON", "DIV", "#document"]);
  });

  test("events with document capture", () => {
    document.body.innerHTML = `
      <div>
        <button/>
      </div>
    `;

    const [div] = document.getElementsByTagName("div");
    const button = div.firstElementChild;

    let clicks = [];

    function handleClick(e) {
      clicks.push(e.currentTarget.nodeName);
    }

    document.addEventListener("click", handleClick, { capture: true });
    div.addEventListener("click", handleClick);
    button.addEventListener("click", handleClick);

    button.click();

    expect(clicks).toEqual(["#document", "BUTTON", "DIV"]);
  });

  test("events with document capture and stopPropagation()", () => {
    document.body.innerHTML = `
      <div>
        <button/>
      </div>
    `;

    const [div] = document.getElementsByTagName("div");
    const button = div.firstElementChild;

    let clicks = [];

    function handleClick(e) {
      clicks.push(e.currentTarget.nodeName);
      e.stopPropagation();
    }

    document.addEventListener("click", handleClick, { capture: true });
    try {
      div.addEventListener("click", handleClick);
      button.addEventListener("click", handleClick);

      button.click();

      expect(clicks).toEqual(["#document"]);
    } finally {
      // It doesn't matter if document event-listeners in other tests are still attached,
      // but this one captures all events and then stops propagation, which breaks the
      // expectation in the next text (for preventDefault())
      document.removeEventListener("click", handleClick, { capture: true });
    }
  });

  test("events with document capture and preventDefault()", () => {
    document.body.innerHTML = `<a href="https://duckduckgo.com" id="search">DuckDuckGo</a>`;

    const wasClickCanceled = link => {
      const mouseEvent = new MouseEvent("click", {
        cancelable: true,
      });

      const defaultWasExecuted = link.dispatchEvent(mouseEvent);

      return !defaultWasExecuted;
    };

    const duckDuckGo = document.getElementById("search");

    expect(wasClickCanceled(duckDuckGo)).toBeFalsy();

    duckDuckGo.addEventListener("click", e => e.preventDefault());

    expect(wasClickCanceled(duckDuckGo)).toBeTruthy();
  });
});

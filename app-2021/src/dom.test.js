/**
 * @jest-environment jsdom
 */

import { describe, expect, test } from "@jest/globals";

describe("DOM", () => {
  test("get element properties", () => {
    document.body.innerHTML = `
      <div>
        <button id="a" class="primary hl"><span class="strong">Test</span></button>
        <button id="b" class="secondary">Run</button>
      </div>
    `;

    const button = document.getElementById("a");

    expect(button.id).toBe("a");
    expect(button.tagName).toBe("BUTTON");
    expect(button.className).toBe("primary hl");
    expect([...button.classList]).toEqual(["primary", "hl"]);
    expect(button.innerHTML).toBe(`<span class="strong">Test</span>`);
    expect(button.outerHTML).toBe(`<button id="a" class="primary hl"><span class="strong">Test</span></button>`);
  });

  test("get element children", () => {
    document.body.innerHTML = `
      <div>
        <button id="a" class="primary hl">
            Title
            <img src="pic.jpg" alt="Picture">
            <span class="strong">Test</span>
        </button>
      </div>
    `;

    const button = document.getElementById("a");

    expect(button.children.length).toBe(2);
    expect(button.firstElementChild.tagName).toBe("IMG");
    expect(button.lastElementChild.tagName).toBe("SPAN");

    expect(button.childNodes.length).toBe(5);
    expect(button.firstChild.nodeType).toBe(3); // Text
    expect(button.lastChild.nodeType).toBe(3); // Text
  });

  test("get element attributes", () => {
    document.body.innerHTML = `<button id="a" class="primary hl">Test</button>`;

    const button = document.getElementById("a");

    expect(button.attributes.length).toBe(2);

    const names = [...button.attributes].map(a => a.name);
    const values = [...button.attributes].map(a => a.value);

    expect(names).toEqual(["id", "class"]);
    expect(values).toEqual(["a", "primary hl"]);

    expect(button.getAttribute("id")).toBe("a");
    expect(button.hasAttribute("id")).toBeTruthy();
    expect(button.hasAttribute("id2")).toBeFalsy();
  });

  test("set element attributes", () => {
    document.body.innerHTML = `<button id="a" class="primary hl">Test</button>`;

    const button = document.getElementById("a");

    expect(button.hasAttribute("id2")).toBeFalsy();

    button.setAttribute("id2", "42");

    expect(button.hasAttribute("id2")).toBeTruthy();
    expect(button.getAttribute("id2")).toBe("42");
  });

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

  test("selecting buttons by selector", () => {
    document.body.innerHTML = `
      <button id="a" class="primary">Test</button>
      <button id="b" class="secondary">Run</button>
    `;

    const btn1 = document.querySelector("#a");
    const [btn2, btn3] = document.querySelectorAll("button");

    expect(btn1.tagName).toBe("BUTTON");
    expect(btn1.className).toBe("primary");
    expect(btn1.id).toBe("a");
    expect(btn1).toEqual(btn2);
    expect(btn3.id).toBe("b");
  });

  test("selecting all elements with complex CSS", () => {
    document.body.innerHTML = `
      <div>
        <button id="a" class="primary"><span class="strong">Test</span></button>
        <button id="b" class="secondary">Run</button>
      </div>
    `;

    const span = document.querySelector("div > button#a > span.strong");

    expect(span.tagName).toBe("SPAN");
    expect(span.className).toBe("strong");
  });
});

/**
 * @jest-environment jsdom
 */

import { describe, expect, test } from "@jest/globals";
import "isomorphic-fetch";

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

  test("set element class with setAttribute()", () => {
    document.body.innerHTML = `<button id="a">Test</button>`;

    const button = document.getElementById("a");

    button.setAttribute("class", "primary");

    expect(button.className).toBe("primary");
  });

  test("set element class with className", () => {
    document.body.innerHTML = `<button id="a">Test</button>`;

    const button = document.getElementById("a");

    button.className = "primary";

    expect(button.className).toBe("primary");
  });

  test("set element class with classList", () => {
    document.body.innerHTML = `<button id="a">Test</button>`;

    const button = document.getElementById("a");

    button.classList.add("primary");

    expect(button.className).toBe("primary");
  });

  test("set element class with new Attr()", () => {
    document.body.innerHTML = `<button id="a">Test</button>`;

    const button = document.getElementById("a");

    const attr = document.createAttribute("class");
    attr.value = "primary";
    button.attributes.setNamedItem(attr);

    expect(button.className).toBe("primary");
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

  test("removing element from child list", () => {
    document.body.innerHTML = `
      <div>
        <button id="a" class="primary"><span class="strong">Test</span></button>
        <button id="b" class="secondary">Run</button>
        <button id="c" class="secondary">Run</button>
      </div>
    `;

    const div = document.querySelector("div");
    const button = div.firstElementChild;

    expect(button).toBeTruthy();

    const originalElementCount = div.childElementCount;

    button.parentElement.removeChild(button);

    expect(div.childElementCount).toBe(originalElementCount - 1);
  });

  test("textContent", () => {
    document.body.innerHTML = `<button id="a" data-test="b" data-data="c">Test</button>`;

    const element = document.getElementById("a");

    expect(element.textContent).toBe("Test");
    expect(element.innerHTML).toBe("Test");
  });

  test("removing attribute", () => {
    document.body.innerHTML = `
      <div>
        <button id="a" class="primary"><span class="strong">Test</span></button>
        <button id="b" class="secondary">Run</button>
      </div>
    `;

    const button = document.querySelector("#a");

    expect(button.attributes.length).toBe(2);

    button.removeAttribute("class");

    expect(button.attributes.length).toBe(1);
  });

  test("removing element itself", () => {
    document.body.innerHTML = `
      <div>
        <button id="a" class="primary"><span class="strong">Test</span></button>
        <button id="b" class="secondary">Run</button>
      </div>
    `;

    const button = document.querySelector("#a");
    const div = button.parentElement;

    expect(div.childElementCount).toBe(2);

    button.remove();

    expect(div.childElementCount).toBe(1);
  });

  test("data attributes", () => {
    document.body.innerHTML = `<button id="a" data-test="b" data-data="c">Test</button>`;

    const element = document.getElementById("a");

    expect("data" in element.dataset).toBeTruthy();
    expect("test" in element.dataset).toBeTruthy();

    const values = [];

    for (const propertyName in element.dataset) {
      values.push(element.dataset[propertyName]);
    }

    const expectedValues = ["b", "c"];

    expect(values).toEqual(expectedValues);
    expect(element.dataset.data).toBe("c");
    expect(element.dataset.test).toBe("b");
  });

  test("fetch data and add to document", async () => {
    const listItemsHtml = await createCarListItemsHtml();

    expect(listItemsHtml).toBe(`<li>Volkswagen</li><li>Opel</li>`);
  });
});

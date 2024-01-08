/**
 * @jest-environment jsdom
 */

import { describe, expect, test } from "@jest/globals";
import "./web-component";

describe("Web Component", () => {
  test("initialize", async () => {
    document.body.innerHTML = `
      <my-element></my-element>
    `;

    const [myElement] = document.getElementsByTagName("my-element");

    expect(myElement.innerHTML).toMatchSnapshot();
  });

  test("set attribute", async () => {
    document.body.innerHTML = `
      <my-element></my-element>
    `;

    const [myElement] = document.getElementsByTagName("my-element");

    myElement.setAttribute("title", "This is my excellent title.");

    expect(myElement.innerHTML).toMatchSnapshot();
  });
});

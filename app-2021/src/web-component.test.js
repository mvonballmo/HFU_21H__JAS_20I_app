/**
 * @jest-environment jsdom
 */

import { describe, expect, test } from "@jest/globals";
import "./web-component";

describe("Application", () => {
  test("initialize", async () => {
    document.body.innerHTML = `
      <my-element></my-element>
    `;

    const [myElement] = document.getElementsByTagName("my-element");

    expect(myElement.innerHTML).toMatchSnapshot();
  });
});

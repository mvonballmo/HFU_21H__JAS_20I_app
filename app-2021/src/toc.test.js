/**
 * @jest-environment jsdom
 */

import { describe, expect, test } from "@jest/globals";
import { tocBuilder } from "./toc";

describe("TOC Builder", () => {
  test("build ", () => {
    document.body.innerHTML = `
      <h1>1</h1>
      <h2>1.1</h2>
      <h3>1.1.1</h3>
      <h3>1.1.2</h3>
      <h2>1.2</h2>
      <h2>1.3</h2>
      <h3>1.3.1</h3>
      <h4>1.3.1.1</h4>
      <h4>1.3.1.2</h4>
      <h3>1.3.2</h3>
      <nav id="toc"></nav>
    `;

    new tocBuilder().applyToc(2, 4);

    expect(document.body.innerHTML).toMatchSnapshot();
  });
});

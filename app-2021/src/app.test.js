/**
 * @jest-environment jsdom
 */

import { describe, expect, test } from "@jest/globals";
import { application } from "./app";
import "isomorphic-fetch";

describe("Application", () => {
  test("initialize", async () => {
    document.body.innerHTML = `<div id="listItems"></div>`;

    const listItems = document.getElementById("listItems");

    const app = new application();

    await app.initialize(listItems);

    expect(listItems.innerHTML).toMatchSnapshot();
  });

  test("clicking an item loads its details", async () => {
    document.body.innerHTML = `
      <div id="listItems"></div>
      <div id="detail"></div>
    `;

    const app = new application();
    const listItems = document.getElementById("listItems");
    const detail = document.getElementById("detail");

    await app.initialize(listItems);

    const [firstLink] = listItems.getElementsByTagName("a");

    firstLink.click();

    expect(detail.innerHTML).toMatchSnapshot();
  });
});

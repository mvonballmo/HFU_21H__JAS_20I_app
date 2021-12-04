/**
 * @jest-environment jsdom
 */

import { describe, expect, test } from "@jest/globals";
import { application } from "./app";
import "isomorphic-fetch";
import {testingRootUrl} from "./test-library";

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

    const app = new application(testingRootUrl);
    const listItems = document.getElementById("listItems");
    const detail = document.getElementById("detail");

    await app.initialize(listItems);

    let links = listItems.getElementsByTagName("a");

    expect(links.length).toBe(12);

    const [firstLink] = links;

    expect(firstLink.textContent).toBe("Peter Smith")

    firstLink.click();

    expect(detail.innerHTML).toMatchSnapshot();
  });
});

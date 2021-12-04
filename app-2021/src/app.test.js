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
});

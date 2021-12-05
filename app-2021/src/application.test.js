/**
 * @jest-environment jsdom
 */

import { describe, expect, test } from "@jest/globals";
import "isomorphic-fetch";
import { testingRootUrl } from "./test-library";
import { application } from "./application";

describe("Application", () => {
  test("initialize", async () => {
    document.body.innerHTML = `
      <div id="listItems"></div>
      <div id="detail"></div>
    `;

    const listItems = document.getElementById("listItems");
    const detail = document.getElementById("detail");

    const app = new application();

    await app.initialize(listItems);

    expect(listItems.innerHTML).toMatchSnapshot();
    expect(detail.innerHTML).toMatchSnapshot();
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

    expect(firstLink.textContent).toBe("Peter Smith");

    firstLink.click();

    expect(detail.innerHTML).toMatchSnapshot();
  });

  test("updating an item in the details", async () => {
    document.body.innerHTML = `
      <div id="listItems"></div>
      <div id="detail"></div>
    `;

    const app = new application(testingRootUrl);
    const listItems = document.getElementById("listItems");

    await app.initialize(listItems);

    let links = listItems.getElementsByTagName("a");
    const [firstLink] = links;

    expect(firstLink).toBeTruthy();

    firstLink.click();

    const saveButton = document.getElementById("save");
    const firstName = document.getElementById("firstName");
    const lastName = document.getElementById("lastName");

    expect(saveButton).toBeTruthy();
    expect(firstName).toBeTruthy();
    expect(lastName).toBeTruthy();

    const oldAddress = await app.addresses.get(1);

    expect(oldAddress.firstName).toBe("Peter");
    expect(oldAddress.lastName).toBe("Smith");

    firstName.value = "John";
    lastName.value = "Doe";

    try {
      saveButton.click();

      const newAddress = await app.addresses.get(oldAddress.id);

      expect(newAddress.firstName).toBe("John");
      expect(newAddress.lastName).toBe("Doe");
    } finally {
      const address = await app.addresses.get(oldAddress.id);

      address.firstName = oldAddress.firstName;
      address.lastName = oldAddress.lastName;

      await app.addresses.update(address);
    }
  });

  test("shows error when backend server not accessible", async () => {
    document.body.innerHTML = `
      <div id="listItems"></div>
      <div id="detail"></div>
    `;

    const app = new application(testingRootUrl + "foo");

    const listItems = document.getElementById("listItems");

    expect(listItems).toBeTruthy();
    expect(listItems.innerHTML).toMatchSnapshot("before initializing");

    await app.initialize(listItems);

    expect(listItems.innerHTML).toMatchSnapshot("with error");
  });
});

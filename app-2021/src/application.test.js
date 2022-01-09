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

    const app = new application(testingRootUrl);

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

  test("updating an item by clicking save button", async () => {
    document.body.innerHTML = `
      <div id="listItems"></div>
      <div id="detail"></div>
    `;

    const app = new application(testingRootUrl);
    const listItems = document.getElementById("listItems");

    await app.initialize(listItems);

    const links = listItems.getElementsByTagName("a");
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
    expect(firstLink.innerHTML).toContain("Peter");
    expect(firstLink.innerHTML).toContain("Smith");

    firstName.value = "John";
    lastName.value = "Doe";

    try {
      saveButton.click();

      // Here, we have a problem, because we can't "wait" for the "click about to finish
      // The check that the address was stored "works" because it takes long enough that
      // The call to fetch has completed, but... (see below)

      const newAddress = await app.addresses.get(oldAddress.id);

      expect(newAddress.firstName).toBe("John");
      expect(newAddress.lastName).toBe("Doe");

      // ...the DOM has not been updated at this point, so we can't test that the list
      // has been updated via button click

      // const links = listItems.getElementsByTagName("a");
      // const [firstLink] = links;
      //
      // expect(firstLink.innerHTML).toContain("John");
      // expect(firstLink.innerHTML).toContain("Doe");
    } finally {
      const address = await app.addresses.get(oldAddress.id);

      address.firstName = oldAddress.firstName;
      address.lastName = oldAddress.lastName;

      await app.addresses.update(address);
    }
  });

  test("updating an item by calling 'saveDetail' ", async () => {
    document.body.innerHTML = `
      <div id="listItems"></div>
      <div id="detail"></div>
    `;

    const app = new application(testingRootUrl);
    const listItems = document.getElementById("listItems");

    await app.initialize(listItems);

    const oldAddress = await app.addresses.get(1);

    expect(oldAddress.firstName).toBe("Peter");
    expect(oldAddress.lastName).toBe("Smith");

    const firstName = document.getElementById("firstName");
    const lastName = document.getElementById("lastName");

    expect(firstName).toBeTruthy();
    expect(lastName).toBeTruthy();

    firstName.value = "John";
    lastName.value = "Doe";

    try {
      // Here, we call the "save button" event-listener directly so that we can wait for it to complete.

      // Make a copy of the oldAddress because the object is modified by "saveDetail"
      await app.saveDetail({ ...oldAddress });

      const newAddress = await app.addresses.get(oldAddress.id);

      expect(newAddress.firstName).toBe("John");
      expect(newAddress.lastName).toBe("Doe");

      // Unlike the test above, the DOM is now guaranteed to have been updated.

      const links = listItems.getElementsByTagName("a");
      const [firstLink] = links;

      expect(firstLink.innerHTML).toContain("John");
      expect(firstLink.innerHTML).toContain("Doe");
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

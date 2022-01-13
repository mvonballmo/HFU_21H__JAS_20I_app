/**
 * @jest-environment jsdom
 */

import { describe, expect, test } from "@jest/globals";
import "isomorphic-fetch";
import { testingRootUrl } from "../test-library";
import "./web-components";
import { createAddressMetadata } from "../metadataFactory.js";

describe("Application", () => {
  /**
   * @param {string} url
   * @return { listItems: List, detail: Detail, masterDetail: MasterDetail }
   */
  async function setUpMasterDetail(url = testingRootUrl) {
    document.body.innerHTML = `
      <app-master-detail rootUrl="${url}"></app-master-detail>
    `;

    /** @type MasterDetail */
    const [masterDetail] = document.getElementsByTagName("app-master-detail");
    const addressMetadata = createAddressMetadata(url);

    // Call this method manually.
    await masterDetail.setMetadata(addressMetadata);

    const [listItems] = document.getElementsByTagName("app-list");
    const [detail] = document.getElementsByTagName("app-detail");

    return { listItems, detail, masterDetail };
  }

  test("initialize", async () => {
    const { listItems, detail } = await setUpMasterDetail();

    expect(listItems.innerHTML).toMatchSnapshot();
    expect(detail.innerHTML).toMatchSnapshot();
  });

  test("clicking an item loads its details", async () => {
    document.body.innerHTML = `
      <div id="listItems"></div>
      <div id="detail"></div>
    `;

    const { listItems, detail } = await setUpMasterDetail();

    let links = listItems.getElementsByTagName("a");

    expect(links.length).toBe(12);

    const [firstLink] = links;

    expect(firstLink.textContent).toBe("Peter Smith");

    firstLink.click();

    expect(detail.innerHTML).toMatchSnapshot();
  });

  test("updating an item by clicking save button", async () => {
    const { listItems, _, masterDetail } = await setUpMasterDetail();

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

    const crud = masterDetail.crud;
    const oldAddress = await crud.get(1);

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

      const newAddress = await crud.get(oldAddress.id);

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
      const address = await crud.get(oldAddress.id);

      address.firstName = oldAddress.firstName;
      address.lastName = oldAddress.lastName;

      await crud.update(address);
    }
  });

  test("updating an item by calling 'save' ", async () => {
    const { listItems, detail, masterDetail } = await setUpMasterDetail();

    const crud = masterDetail.crud;
    const oldAddress = await crud.get(1);

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

      // Make a copy of the oldAddress because the object is modified by "save"
      await detail.save({ ...oldAddress });

      const newAddress = await crud.get(oldAddress.id);

      expect(newAddress.firstName).toBe("John");
      expect(newAddress.lastName).toBe("Doe");

      // Unlike the test above, the DOM is now guaranteed to have been updated.

      const links = listItems.getElementsByTagName("a");
      const [firstLink] = links;

      expect(firstLink.innerHTML).toContain("John");
      expect(firstLink.innerHTML).toContain("Doe");
    } finally {
      const address = await crud.get(oldAddress.id);

      address.firstName = oldAddress.firstName;
      address.lastName = oldAddress.lastName;

      await crud.update(address);
    }
  });

  test.skip("deleting an item by calling 'delete' ", async () => {
    const { listItems, detail, masterDetail } = await setUpMasterDetail();

    const crud = masterDetail.crud;
    const oldAddress = await crud.get(1);

    try {
      await masterDetail.delete(oldAddress);

      const allAddresses = await crud.getAll();

      expect(allAddresses.length).toBe(11);

      const links = listItems.getElementsByTagName("a");

      // TODO Fix this assertion; the animation doesn't finish running to remove the item
      // expect(links.length).toBe(11);
    } finally {
      await crud.insert(oldAddress);
    }
  });

  test("shows error when backend server not accessible", async () => {
    const { listItems } = await setUpMasterDetail(testingRootUrl + "foo");

    expect(listItems).toBeTruthy();
    expect(listItems.innerHTML).toMatchSnapshot("with error");
  });
});

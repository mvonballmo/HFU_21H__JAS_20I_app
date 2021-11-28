import { describe, expect, test } from "@jest/globals";
import "isomorphic-fetch";
import {
  deleteAddress,
  updateAddress,
  getAddress,
  getAddresses,
  insertAddress,
  getCars,
  getAddressesUrl,
  createAddressCrud,
} from "./fetch";

/*
  This test suite requires a server running at:

  <http://localhost:3001>

  See the README.md at the root of the project to instructions on how to launch the server.
*/

describe("Fetch", () => {
  test("call fetch gets addresses with done", done => {
    fetch(getAddressesUrl())
      .then(data => data.json())
      .then(addresses => {
        expect(addresses.length).toBe(12);
        done();
      })
      .catch(error => done(error));
  });

  test("call fetch with async/await", async () => {
    const promise = await fetch(getAddressesUrl());
    const addresses = await promise.json();

    expect(addresses.length).toBe(12);
  });

  test("call fetch with async/await and JSON.parse()", async () => {
    const response = await fetch(getAddressesUrl());

    expect(response.ok).toBeTruthy();
    expect(response.status).toBe(200);

    const addresses = JSON.parse(await response.text());

    expect(addresses.length).toBe(12);
  });

  test("call fetch with async/await and 404", async () => {
    const response = await fetch(getAddressesUrl() + "ssss");

    expect(response.ok).toBeFalsy();
    expect(response.status).toBe(404);
  });

  test("Call fetch with timeout and try/catch", async () => {
    const controller = new AbortController();

    // Start the timer
    // NOTE: we use a VERY LOW timeout so that the abort occurs before the connection is refused
    const timeoutId = setTimeout(() => controller.abort(), 1);

    try {
      await fetch("http://localhost:3021/addresses", {
        signal: controller.signal,
      });
    } catch (error) {
      expect(error).toBeInstanceOf(Error);

      expect(error.name).toBe("AbortError");
      expect(error.message).toBe("The user aborted a request.");
    } finally {
      clearTimeout(timeoutId);
    }
  });

  test("Call fetch with timeout", async () => {
    const controller = new AbortController();
    const promise = fetch("http://localhost:3020/addresses", {
      signal: controller.signal,
    });

    // Start the timer
    // NOTE: we use a VERY LOW timeout so that the abort occurs before the connection is refused
    const timeoutId = setTimeout(() => controller.abort(), 1);

    try {
      await expect(promise).rejects.toThrow("The user aborted a request.");
    } finally {
      clearTimeout(timeoutId);
    }
  });

  test("call fetch with caught error", async () => {
    try {
      const promise = await fetch("foo" + getAddressesUrl());
      return await promise.json();
    } catch (error) {
      const e = error; // Für Debugging
      // Error wird ignoriert
    } finally {
      // Wird immer ausgeführt (cleanup, logging, usw.)
    }
  });

  test("wait for multiple fetch calls", async () => {
    const addressPromise = getAddresses();
    const carPromise = getCars();

    const [addresses, cars] = await Promise.all([addressPromise, carPromise]);

    expect(addresses.length).toBe(12);
    expect(cars.length).toBe(2);
  });

  test("Insert address", async () => {
    let address = {
      firstName: "test",
      lastName: "tester",
      birthDate: "2021-03-31",
      salary: "20050",
    };

    const addressCrud = createAddressCrud();

    let addresses = await addressCrud.getAll();

    expect(addresses.length).toBe(12);

    address = await addressCrud.insert(address);

    try {
      addresses = await addressCrud.getAll();

      expect(addresses.length).toBe(13);
    } finally {
      await addressCrud.delete(address);
    }
  });

  test("Update address", async () => {
    let address = await getAddress(1);

    expect(address.firstName).toBe("Peter");

    address.firstName = "Moritz";

    await updateAddress(address);

    try {
      address = await getAddress(1);

      expect(address.firstName).toBe("Moritz");
    } finally {
      address.firstName = "Peter";

      await updateAddress(address);
    }
  });

  test("Delete address", async () => {
    let addresses = await getAddresses();

    expect(addresses.length).toBe(12);

    const address = addresses.find(a => a.id === 14);

    await deleteAddress(address);

    try {
      addresses = await getAddresses();

      expect(addresses.length).toBe(11);
    } finally {
      await insertAddress(address);
    }
  });
});

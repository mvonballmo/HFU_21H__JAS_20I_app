import { describe, expect, test } from "@jest/globals";
import "isomorphic-fetch";

/*
  This test suite requires a server running at:

  <http://localhost:3000>

  The project includes the json-server and test data, which you can start with:

  json-server ./server-data/data.json --watch
*/

describe("Fetch", () => {
  async function execute(url, init = undefined) {
    const response = await fetch(url, init);

    return response.json();
  }

  function getAddresses() {
    return execute("http://localhost:3000/addresses");
  }

  function getAddress(id) {
    return execute(`http://localhost:3000/addresses/${id}`);
  }

  function insertOrUpdate(url, address, method) {
    return execute(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(address),
    });
  }

  function insertAddress(address) {
    return insertOrUpdate(`http://localhost:3000/addresses/`, address, "POST");
  }

  function updateAddress(address) {
    return insertOrUpdate(`http://localhost:3000/addresses/${address.id}`, address, "PUT");
  }

  function deleteAddress(address) {
    return fetch(`http://localhost:3000/addresses/${address.id}`, { method: "DELETE" });
  }

  function getCars() {
    return execute("http://localhost:3000/cars");
  }

  test("call fetch gets addresses with done", done => {
    fetch("http://localhost:3000/addresses")
      .then(data => data.json())
      .then(addresses => {
        expect(addresses.length).toBe(12);
        done();
      })
      .catch(error => done(error));
  });

  test("call fetch with async/await", async () => {
    const promise = await fetch("http://localhost:3000/addresses");
    const addresses = await promise.json();

    expect(addresses.length).toBe(12);
  });

  test("call fetch with async/await and JSON.parse()", async () => {
    const response = await fetch("http://localhost:3000/addresses");

    expect(response.ok).toBeTruthy();
    expect(response.status).toBe(200);

    const addresses = JSON.parse(await response.text());

    expect(addresses.length).toBe(12);
  });

  test("call fetch with async/await and 404", async () => {
    const response = await fetch("http://localhost:3000/addressessss");

    expect(response.ok).toBeFalsy();
    expect(response.status).toBe(404);
  });

  test("call fetch with caught error", async () => {
    try {
      const promise = await fetch("htsssstp://localhost:3000/addresses");
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

    let addresses = await getAddresses();

    expect(addresses.length).toBe(12);

    address = await insertAddress(address);

    try {
      addresses = await getAddresses();

      expect(addresses.length).toBe(13);
    } finally {
      await deleteAddress(address);
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

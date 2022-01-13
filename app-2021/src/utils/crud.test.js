import { describe, expect, test } from "@jest/globals";
import "isomorphic-fetch";
import { Crud } from "../utils/crud.js";
import { testingRootUrl } from "../test-library.js";

describe("crud", () => {
  const serverRoot = testingRootUrl;
  /**
   * @type {Crud<address>}
   */
  const addressCrud = new Crud(getAddressesUrl());
  /**
   * @type {Crud<car>}
   */
  const carCrud = new Crud(`${serverRoot}cars`);

  function getAddressesUrl() {
    return `${serverRoot}addresses`;
  }

  test("Call fetch with 404 in crud", async () => {
    try {
      await addressCrud.get(55555);

      throw new Error("The call should have thrown a 404 exception ");
    } catch (error) {
      expect(error).toBeInstanceOf(Error);

      expect(error.name).toBe("Error");
      expect(error.message).toBe("Error [404] accessing [http://localhost:3001/addresses/55555]: Not Found");
    }
  });

  test("wait for multiple fetch calls", async () => {
    const addressPromise = addressCrud.getAll();
    const carPromise = carCrud.getAll();

    const [addresses, cars] = await Promise.all([addressPromise, carPromise]);

    expect(addresses.length).toBe(12);
    expect(cars.length).toBe(2);
  });

  test("Insert address", async () => {
    /**
     * @type {Crud<address>}
     */
    const addressCrud = new Crud(getAddressesUrl());

    let addresses = await addressCrud.getAll();

    expect(addresses.length).toBe(12);

    /**
     *
     * @type {address}
     */
    const newAddress = {
      firstName: "test",
      lastName: "tester",
      birthDate: "2021-03-31",
      salary: "20050",
    };

    const address = await addressCrud.insert(newAddress);

    try {
      addresses = await addressCrud.getAll();

      expect(addresses.length).toBe(13);
    } finally {
      await addressCrud.delete(address);
    }
  });

  test("Update address", async () => {
    let address = await addressCrud.get(1);

    expect(address.firstName).toBe("Peter");

    address.firstName = "Moritz";

    await addressCrud.update(address);

    try {
      address = await addressCrud.get(1);

      expect(address.firstName).toBe("Moritz");
    } finally {
      address.firstName = "Peter";

      await addressCrud.update(address);
    }
  });

  test("Delete address", async () => {
    let addresses = await addressCrud.getAll();

    expect(addresses.length).toBe(12);

    const address = addresses.find(a => a.id === 14);

    await addressCrud.delete(address);

    try {
      addresses = await addressCrud.getAll();

      expect(addresses.length).toBe(11);
    } finally {
      await addressCrud.insert(address);
    }
  });
});

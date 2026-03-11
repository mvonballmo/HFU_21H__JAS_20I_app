import { test, describe, expect } from "@jest/globals";
import { Address } from "./Address";

/**
 * Gets an array of all entities from the database.
 *
 * @return {Promise<[Address]>} Array of all entities
 */
async function getAddresses() {
  const response = await fetch("http://localhost:3000/addresses");
  if (response.ok) {
    return await response.json();
  }

  throw `Response was ${response.statusText}.`;
}

describe("fetch", () => {
  test("call fetch gets addresses", async () => {
    const addresses = await getAddresses();
    expect(addresses.length).toBe(2);
  });

  test("create and delete address", async () => {
    const address = {
      name: "Bob",
    };

    let addressWithId;

    try {
      const response = await fetch("http://localhost:3000/addresses/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(address),
      });

      if (response.ok) {
        addressWithId = await response.json();
      }
    } finally {
      await fetch(`http://localhost:3000/addresses/${addressWithId.id}`, {
        method: "DELETE",
      });
    }
  });
});

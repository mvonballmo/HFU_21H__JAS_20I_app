import { test, describe, expect } from "@jest/globals";
import { counter, increment, decrement } from "./counter";
import "isomorphic-fetch"; // Oben in die Datei

describe("data", () => {
  test("counter is initialized to 1", () => {
    expect(counter()).toBe(1);
  });

  test("increment increases by 1", () => {
    const currentCounter = counter();

    expect(increment()).toBe(currentCounter + 1);
  });

  test("decrement decreases by 1", () => {
    const currentCounter = counter();

    expect(decrement()).toBe(currentCounter - 1);
  });

  test("call fetch gets addresses", () => {
    return fetch("http://localhost:20242/addresses")
      .then(data => data.json())
      .then(addresses => {
        expect(addresses.length).toBe(2);
      });
  });

  test("call fetch with async/await", async () => {
    const response = await fetch("http://localhost:20242/addresses");
    const addresses = await response.json();

    expect(addresses.length).toBe(2);
  });

  test("call fetch for one address", async () => {
    const response = await fetch("http://localhost:20242/addresses/2");
    const johann = await response.json();

    expect(johann.firstName).toBe("Johann");
  });

  test("add address", async () => {
    const address = {
      firstName: "Bob",
      lastName: "Jones",
    };

    let newAddressId;

    try {
      const response = await fetch("http://localhost:20242/addresses/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(address),
      });

      expect(response.ok).toBeTruthy();

      const newAddress = await response.json();

      newAddressId = newAddress.id;

      expect(newAddressId).toBeTruthy();
    } finally {
      await fetch(`http://localhost:20242/addresses/${newAddressId}`, {
        method: "DELETE",
      });
    }
  });

  test("update address", async () => {
    const address = {
      firstName: "Bob",
      lastName: "Jones",
    };

    let newAddressId;

    try {
      const response = await fetch("http://localhost:20242/addresses/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(address),
      });

      expect(response.ok).toBeTruthy();

      const newAddress = await response.json();

      newAddressId = newAddress.id;

      address.lastName = "Müller";

      const putResponse = await fetch(`http://localhost:20242/addresses/${newAddressId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(address),
      });

      expect(putResponse.ok).toBeTruthy();

      const updatedAddress = await putResponse.json();

      expect(updatedAddress.lastName).toBe("Müller");

      const getResponse = await fetch(`http://localhost:20242/addresses/${newAddressId}`);
      const bob = await getResponse.json();

      expect(getResponse.ok).toBeTruthy();

      expect(bob.lastName).toBe("Müller");
    } finally {
      await fetch(`http://localhost:20242/addresses/${newAddressId}`, {
        method: "DELETE",
      });
    }
  });
});

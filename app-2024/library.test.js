import { test, describe, expect } from "@jest/globals";
import { counter, increment, decrement } from "./library";
import "isomorphic-fetch"; // Oben in die Datei

describe("library", () => {
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
    return fetch("http://localhost:3000/addresses")
      .then(data => data.json())
      .then(addresses => {
        expect(addresses.length).toBe(3);
      });
  });

  test("call fetch with async/await", async () => {
    const response = await fetch("http://localhost:3000/addresses");
    const addresses = await response.json();

    expect(addresses.length).toBe(3);
  });

  test("call fetch for one address", async () => {
    const response = await fetch("http://localhost:3000/addresses/2");
    const johann = await response.json();

    expect(johann.firstName).toBe("Johann");
  });

  test("add address", async () => {
    const address = {
      firstName: "Bob",
      lastName: "Jones",
    };

    const response = await fetch("http://localhost:3000/addresses/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(address),
    });

    expect(response.ok).toBeTruthy();

    const newAddress = await response.json();

    expect(newAddress.id).toBeTruthy();
  });

  function getAddresses() {
    return fetch("http://localhost:3000/addresses");
  }

  function getCars() {
    return fetch("http://localhost:3000/cars");
  }

  // ignore("wait for multiple fetch calls", async () => {
  //   const p1 = await fetch("http://localhost:3000/addresses");
  //   const p2 = await fetch("http://localhost:3000/cars");

  //   const [addresses, cars] = await Promise.all([p1, p2]);

  //   expect(addresses.length).toBe(3);
  //   expect(cars.length).toBe(3);
  // });
});

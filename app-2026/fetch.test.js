import { test, describe, expect } from "@jest/globals";

describe("fetch", () => {
  test("call fetch gets addresses", async () => {
    const response = await fetch("http://localhost:3000/addresses");
    if (response.ok) {
      const addresses = await response.json();

      expect(addresses.length).toBe(2);
    } else {
      expect(false);
    }
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

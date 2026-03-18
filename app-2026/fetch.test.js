/**
 * @jest-environment jsdom
 */

import { test, describe, expect } from "@jest/globals";
import { getAddresses } from "./Address";
import "isomorphic-fetch";

describe("general", () => {
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

    describe("events", () => {
      test("using 'click' event-listener without event", done => {
        document.body.innerHTML = `<button id="button"/>`;

        const button = document.getElementById("button");

        button.addEventListener("click", () => {
          done();
        });

        button.click();
      });
    });
  });
});

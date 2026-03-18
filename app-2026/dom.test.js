/**
 * @jest-environment jsdom
 */

import { describe, expect, test } from "@jest/globals";
import { getAddresses } from "./Address";
import "isomorphic-fetch";

describe("DOM", () => {
  test("get element properties", () => {
    document.body.innerHTML = `
      <div>
        <button id="a" class="primary hl"><span class="strong">Test</span></button>
        <button id="b" class="secondary">Run</button>
      </div>
    `;

    const button = document.getElementById("a");

    expect(button.id).toBe("a");
    expect(button.tagName).toBe("BUTTON");
    expect(button.className).toBe("primary hl");
    expect([...button.classList]).toEqual(["primary", "hl"]);
    expect(button.innerHTML).toBe(`<span class="strong">Test</span>`);
    expect(button.outerHTML).toBe(`<button id="a" class="primary hl"><span class="strong">Test</span></button>`);
  });

  test("fetch data and add to document", async () => {
    async function createCarListItemsHtml() {
      const addresses = await getAddresses();

      const createListItem = a => {
        return `<li>${a.name}</li>`;
      };

      return addresses.map(createListItem).join("");
    }

    const listItemsHtml = await createCarListItemsHtml();

    expect(listItemsHtml).toMatchSnapshot();
  });
});

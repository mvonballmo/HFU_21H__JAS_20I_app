/**
 * @jest-environment jsdom
 */

import { describe, expect, test } from "@jest/globals";

describe("Forms", () => {
  test.skip("read document.forms and forms.elements and element.options", () => {
    document.body.innerHTML = `
      <form id="vehicles">
        <input id="firstName" type="text">
        <input id="lastName" type="text">
        <select id="numCars">
          <option id="one">One</option>
          <option id="two">Two</option>
          <option id="three">Three</option>
        </select>
      </form>
    `;

    expect(document.forms[0].elements[0].id).toBe("firstName");
    expect(document.vehicles.firstName.id).toBe("firstName");
    expect(document.forms[0].elements[2].options[0].id).toBe("one");
    expect(document.vehicles.numCars.options.one.id).toBe("one");
  });
});

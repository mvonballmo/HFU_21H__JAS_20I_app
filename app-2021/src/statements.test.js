import { describe, expect, test } from "@jest/globals";

describe("Statements", () => {
  test("switch statement", () => {
    const x = 42;

    function calculateY(x) {
      switch (x) {
        case 41:
          return 1;
        case 42:
          return 2;
        default:
          return 3;
      }
    }

    let y = calculateY(x);

    expect(y).toBe(2);
  });

  test("for_in", () => {
    const o = { a: 1, b: 2, c: 3 };

    const propertyNames = [];
    for (const property in o) {
      propertyNames.push(property);
    }

    const keys = Object.keys(o);

    expect(keys).toEqual(["a", "b", "c"]);
    expect(propertyNames).toEqual(keys);

    // o[keys[2]] == "c"
  });

  test("for_of", () => {
    const items = [10, 20, 30, 40, 50];

    for (const item of items) {
      const expectedItem = items[items.indexOf(item)];
      expect(item).toBe(expectedItem);
    }
  });
});

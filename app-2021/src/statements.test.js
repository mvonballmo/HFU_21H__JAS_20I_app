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

  const divide = (a, b) => {
    if (b === 0) {
      throw `Cannot divide [${a}] by [${b}].`;
    }

    return a / b;
  };

  test("throw and catch exceptions", () => {
    const divideWrapperOne = (a, b) => divide(a, b);
    const divideWrapperTwo = (a, b) => divideWrapperOne(a, b);
    const divideWrapperThree = (a, b) => divideWrapperTwo(a, b);

    const tryDivide = (a, b) => {
      try {
        return { result: divideWrapperThree(a, b) };
      } catch (error) {
        return { error };
      }
    };

    expect(() => divide(1, 0)).toThrow("Cannot divide [1] by [0].");
    expect(tryDivide(1, 0).error).toBe("Cannot divide [1] by [0].");
  });

  test("finally is always called", () => {
    let flag = -1;

    const divideWithFinally = (a, b) => {
      try {
        divide(a, b);
        flag = 0;
      } finally {
        flag = 1;
      }
    };

    expect(() => divideWithFinally(1, 0)).toThrow("Cannot divide [1] by [0].");

    expect(flag).toBe(1);

    flag = -1;
    divideWithFinally(1, 1);

    expect(flag).toBe(1);
  });
});

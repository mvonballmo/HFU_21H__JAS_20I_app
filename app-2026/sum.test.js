import { test, describe, expect } from "@jest/globals";
import { sum } from "./sum";

describe("standard", () => {
  test("adds 1 + 2 to equal 3", () => {
    expect(sum(1, 2)).toBe(3);
  });

  test("object properties work as expected", () => {
    const x = { name: "B" };

    expect(x.name).toBe("B");
  });

  test("arrays work as expected", () => {
    const x = [1, 2, 3];

    expect(x).toStrictEqual([1, 2, 3]);
  });

  test("arrays work as expected", () => {
    const x = [1, 2, 3];

    const result = x.filter(i => i < -1);

    expect(result).toStrictEqual([]);
  });

  test("destructuring", () => {
    const obj = { name: "bob", age: 10, country: "CH" };
    const { name: firstName, age: years } = obj;

    expect(firstName).toBe("bob");
    expect(years).toBe(10);

    // Mit Standardwerte
    const { name: firstName2 = "John", lastName = "Doe" } = obj;

    expect(firstName2).toBe("bob");
    expect(lastName).toBe("Doe");

    // Mit "rest"
    const { name, ...obj2 } = obj;

    expect(name).toBe("bob");
    expect(obj2).toStrictEqual({ age: 10, country: "CH" });
  });
});

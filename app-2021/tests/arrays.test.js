import { describe, expect, test } from "@jest/globals";

describe("Arrays", () => {
  test("destructuring arrays", () => {
    const items = [10, 20, 30, 40, 50];
    const [a, b, ...rest] = items;
    const [c, d] = items; // c == 10, d == 20

    expect(a).toBe(10);
    expect(b).toBe(20);
    expect(c).toBe(10);
    expect(d).toBe(20);
    expect(rest).toEqual([30, 40, 50]);
  });

  test("arrays work as expected", () => {
    const empty1 = [];
    const empty2 = new Array();
    const filled = [1, 2, 3, "test", {}, { a: 42 }];
    const sparse1 = [, ,]; // sparse1.length == 3
    const sparse2 = new Array(3); // sparse2.length == 3
    const a = filled[1]; // a == 2

    const sparse4 = ["a", , , , "b"];

    expect(sparse4).toEqual(["a", undefined, undefined, undefined, "b"]);
  });

  test("test map", () => {
    const m = new Map();

    m.set("a", 1);
    m.set("b", 2);
    m.set("c", 3);

    const expected = ["a", "b", "c"];

    for (const [key, value] of m) {
      expect(key).toBe(expected[value - 1]);
    }
  });

  test("destructuring", () => {
    const items = [10, 20, 30, 40, 50];
    const [a, b, ...rest] = items;
    // a == 10, b == 20, rest == [30, 40, 50]

    expect(a).toEqual(10);
    expect(b).toEqual(20);
    expect(rest).toEqual([30, 40, 50]);

    // Mit Standardwerte
    const [c, d, e = -1, f = -1] = rest;
    // c == 30, d == 40, e = 50, f = -1
    expect(c).toEqual(30);
    expect(d).toEqual(40);
    expect(e).toEqual(50);
    expect(f).toEqual(-1);
  });

  test("array map", () => {
    const items = [10, 20, 30, 40, 50];

    const toAdd = 20;

    const result = items.map(item => item + toAdd);

    expect(result).toStrictEqual([30, 40, 50, 60, 70]);
  });

  test("array reduce", () => {
    const items = [10, 20, 30, 40, 50];

    const sum = (accumulator, item) => accumulator + item;

    const result = items.reduce(sum);

    expect(result).toStrictEqual(150);
  });

  test("array filter", () => {
    const items = [10, 20, 30, 40, 50];

    const result = items.filter(i => i > 30);

    expect(result).toStrictEqual([40, 50]);
  });

  test("array flat", () => {
    const items = [10, [20, [30, 60]], 40, 50];

    const result = items.flat(2);

    expect(result).toEqual([10, 20, 30, 60, 40, 50]);
  });

  test("array slice", () => {
    const items = [10, 20, 30, 40, 50];

    const result = items.slice(1, 3);

    expect(result).toEqual([20, 30]);
  });
});

"use strict";

const sum = require("./sum");

describe("Tests", () => {
  test("adds 1 + 2 to equal 3", () => {
    expect(sum(1, 2)).toBe(3);
  });

  test("adds numbers", () => {
    expect(sum(19, 21)).toBe(40);
  });

  test("array test", () => {
    const a = [1, 2, 3];

    expect(a[0]).toBe(1);
  });

  test("object test", () => {
    const a = { firstName: "bob" };

    expect(a.firstName).toBe("bob");
  });

});

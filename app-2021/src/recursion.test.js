import { describe, expect, test } from "@jest/globals";

describe("Recursion", () => {
  const factorialCases = [
    [true, -1],
    ["foo", -1],
    [-1, -1],
    [0, 1],
    [1, 1],
    [2, 2],
    [3, 6],
    [4, 24],
  ];

  test.each(factorialCases)("factorial: %p! == %p", (input, expected) => {
    const getFactorial = n => {
      if (!Number.isInteger(n) || n < 0) {
        return -1;
      }

      if (n === 0) {
        return 1;
      }

      return n * getFactorial(n - 1);
    };

    expect(getFactorial(input)).toBe(expected);
  });

  const fibonacciCases = [
    [true, -1],
    ["foo", -1],
    [-1, -1],
    [0, 0],
    [1, 1],
    [2, 1],
    [3, 2],
    [4, 3],
    [5, 5],
    [6, 8],
    [7, 13],
  ];

  test.each(fibonacciCases)("fibonacci: f(%p) == %p", (input, expected) => {
    const getFibonacci = n => {
      if (!Number.isInteger(n) || n < 0) {
        return -1;
      }

      if (n === 0) {
        return 0;
      }

      if (n === 1) {
        return 1;
      }

      return getFibonacci(n - 1) + getFibonacci(n - 2);
    };

    expect(getFibonacci(input)).toBe(expected);
  });
});

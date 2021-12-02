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

  const getFibonacci = n => {
    if (!Number.isInteger(n) || n < 0) {
      return -1;
    }

    if (n === 0 || n === 1) {
      return n;
    }

    return getFibonacci(n - 1) + getFibonacci(n - 2);
  };

  test.each(fibonacciCases)("fibonacci: f(%p) == %p", (input, expected) => {
    expect(getFibonacci(input)).toBe(expected);
  });

  test("fibonacci generator", () => {
    function* getFibonacciSequence() {
      let i = 0;
      while (i >= 0) {
        yield getFibonacci(i);

        i += 1;
      }
    }

    const fibonacci = getFibonacciSequence();

    expect(fibonacci.next().value).toBe(0);
    expect(fibonacci.next().value).toBe(1);
    expect(fibonacci.next().value).toBe(1);
    expect(fibonacci.next().value).toBe(2);
    expect(fibonacci.next().value).toBe(3);
    expect(fibonacci.next().value).toBe(5);
    expect(fibonacci.next().value).toBe(8);
    expect(fibonacci.next().value).toBe(13);
  });
});

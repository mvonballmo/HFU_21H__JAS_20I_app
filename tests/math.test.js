import { describe, expect, test } from "@jest/globals";

describe("Math", () => {
  test("max works as expected", () => {
    const max = Math.max(1, 2, 3, 4);

    expect(max).toEqual(4);
  });
});

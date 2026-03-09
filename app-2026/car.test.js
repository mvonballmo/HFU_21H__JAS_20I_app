import { test, describe, expect } from "@jest/globals";
import { Car } from "./car";

describe("car", () => {
  test("equality of objects", () => {
    const car1 = new Car();

    const car2 = new Car();

    expect(car1 == car2).toBeFalsy();
    expect(car1 === car2).toBeFalsy();
    expect(car1).toStrictEqual(car2);
  });
});

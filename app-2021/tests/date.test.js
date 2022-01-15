import { describe, expect, test } from "@jest/globals";

describe("Dates", () => {
  test("create Date with string", () => {
    const date = new Date("04 Dec 2021 00:10:00 GMT");

    expect(date.getUTCMonth()).toBe(11);
    expect(date.getUTCHours()).toBe(0);
    expect(date.getUTCMinutes()).toBe(10);
  });

  test("create Date with US-formatted string", () => {
    const date = new Date(Date.parse("12/04/2021 00:10:00 GMT"));

    expect(date.getUTCMonth()).toBe(11);
    expect(date.getUTCHours()).toBe(0);
    expect(date.getUTCMinutes()).toBe(10);
  });

  test("create Date with ISO string", () => {
    const date = new Date(Date.parse("2021.12.04 00:10:00 GMT"));

    expect(date.getUTCMonth()).toBe(11);
    expect(date.getUTCHours()).toBe(0);
    expect(date.getUTCMinutes()).toBe(10);
  });

  test("create Date with parameters", () => {
    const date = new Date(2021, 11, 4, 0, 10, 0);

    expect(date.getUTCMonth()).toBe(11);
    expect(date.getUTCHours()).toBe(23);
    expect(date.getUTCMinutes()).toBe(10);
  });

  test("create Date with Date.parse() and milliseconds", () => {
    const milliseconds = Date.parse("04 Dec 2021 00:10:00 GMT");
    const date = new Date(milliseconds);

    expect(date.getUTCMonth()).toBe(11);
    expect(date.getUTCHours()).toBe(0);
    expect(date.getUTCMinutes()).toBe(10);
  });

  test("create Date with empty constructor is equal to now()", () => {
    const now = new Date(Date.now()); // jetzt
    const date = new Date(); // jetzt

    expect(now).toEqual(date);
  });
});

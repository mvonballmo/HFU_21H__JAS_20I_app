import { describe, expect, test } from "@jest/globals";

describe("Dates", () => {
  test("Date parsing", () => {
    const date = new Date(Date.parse("04 Dec 2021 00:10:00 GMT"));
    const month = date.getUTCMonth();
    const hour = date.getUTCHours();

    expect(month).toBe(11);
    expect(hour).toBe(0);

    const dateWithTimeStamp = new Date(86400);
    const dateWithISOYear = new Date(Date.parse("2021.12.04 00:10:00 GMT"));
    const dateWithUSYear = new Date(Date.parse("12/04/2021 00:10:00 GMT"));
    const defaultDate = new Date();

    const now = Date.now();
  });
});

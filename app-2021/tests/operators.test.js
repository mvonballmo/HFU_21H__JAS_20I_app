import { describe, expect, test } from "@jest/globals";

describe("Operators", () => {
  test("test comparison operators", () => {
    const x = 1 == "1"; // x ist 'true'
    const y = 1 === "1"; // y ist 'false'

    expect(x).toBeTruthy();
    expect(y).toBeFalsy();
  });

  test("spread operator with parameters", () => {
    function sum(x, y, z) {
      return x + y + z;
    }

    const numbers = [1, 2, 3];
    const total = sum(...numbers); // Ergibt 6

    expect(total).toBe(6);
  });

  test("null-checking without coalescing operators", () => {
    const person = {
      first: "bob",
      last: "Hoffman",
      age: 34,
      company: {
        name: "Apple",
      },
    };

    if (person) {
      if (person.company) {
        if (person.company.name != null) {
          const z = person.company.name;
          expect(z).toBe("Apple");
        } else {
          throw new Error("company.name is not assigned");
        }
      } else {
        throw new Error("company is not assigned");
      }
    } else {
      throw new Error("person is not assigned");
    }
  });

  test("null-checking with coalescing operators", () => {
    const person = {
      first: "bob",
      last: "Hoffman",
      age: 34,
      company: {
        name: "Apple",
      },
    };

    const person2 = null;
    const person3 = {
      first: "bob",
      last: "Hoffman",
      age: 34,
    };

    expect(person.company.name).toBe("Apple");
    expect(person2?.company?.name).toBe(undefined);
    expect(person3.company?.name).toBe(undefined);
  });
});

import { describe, expect, test } from "@jest/globals";
import {
  divide,
  getCapitalized,
  getCopyOfArray,
  getFibonacciSequence,
  getFirstAndLastLetters,
  getJsonWithNiceFormattingAndNoNumbers,
  getObjectWithAllButA,
  getObjectWithAOnly,
  getOddCapitalized,
  getPropertyNames,
  getPropertyValues,
  getReverse,
  Person,
  safeDivide,
  Teacher,
} from "./lk1.library";

describe("LK1", () => {
  describe("Strings", () => {
    test("extract first and last letters", () => {
      const test = "foobar";

      expect(getFirstAndLastLetters(test)).toStrictEqual({ first: "f", last: "r" });
    });

    test("extract first and last letters of empty string", () => {
      const test = "";

      expect(getFirstAndLastLetters(test)).toStrictEqual({ first: undefined, last: undefined });
    });
  });

  describe("Arrays", () => {
    test("get foobar reversed", () => {
      const test = "foobar";
      const reverse = getReverse(test);

      expect(reverse).toBe("raboof");
    });

    test("get otto reversed", () => {
      const test = "otto";
      const reverse = getReverse(test);

      expect(reverse).toBe("otto");
    });

    test("capitalize all elements", () => {
      const test = ["one", "two", "three", "four", "five"];

      expect(getCapitalized(test)).toStrictEqual(["ONE", "TWO", "THREE", "FOUR", "FIVE"]);
    });

    test("capitalize odd elements", () => {
      const test = ["one", "two", "three", "four", "five"];

      expect(getOddCapitalized(test)).toStrictEqual(["one", "TWO", "three", "FOUR", "five"]);
    });

    test("get copy of array", () => {
      const test = ["one", "two", "three", "four", "five"];
      const test2 = getCopyOfArray(test);

      test.reverse();

      expect(test).toStrictEqual(["five", "four", "three", "two", "one"]);
      expect(test2).toStrictEqual(["one", "two", "three", "four", "five"]);
    });
  });

  describe("Functions", () => {
    test("fibonacci generator", () => {
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

  describe("JSON", () => {
    test("export user to JSON", () => {
      const user = {
        name: "bob",
        password: "password123",
      };

      const userAsJson = user;

      // Do not change this expectation; fix the output above
      expect(userAsJson).toBe(`{"name":"bob","password":"password123"}`);
    });

    test("export user to JSON with nice formatting", () => {
      const user = {
        name: "bob",
        password: "password123",
      };

      const userAsJson = JSON.stringify(user);

      // Do not change this expectation; fix the output above
      expect(userAsJson).toBe(
        `{
  "name": "bob",
  "password": "password123"
}`,
      );
    });

    test("export user to JSON with nice formatting and without password", () => {
      const user = {
        name: "bob",
        password: "password123",
        toJSON(key) {
          return this;
        },
      };

      const userAsJson = JSON.stringify(user, null, 2);

      // Do not change this expectation; fix the output above
      expect(userAsJson).toBe(
        `{
  "name": "bob"
}`,
      );
    });

    test("export any object to JSON with nice formatting and no numbers", () => {
      const obj1 = {
        name: "bob",
        age: 23,
      };

      const obj2 = {
        name: "john",
        age: 45,
      };

      const obj1AsJson = getJsonWithNiceFormattingAndNoNumbers(obj1);
      const obj2AsJson = getJsonWithNiceFormattingAndNoNumbers(obj2);

      // Do not change this expectation; fix the output above
      expect(obj1AsJson).toBe(
        `{
  "name": "bob"
}`,
      );
      expect(obj2AsJson).toBe(
        `{
  "name": "john"
}`,
      );
    });
  });

  describe("Exceptions", () => {
    test("Divide returns NaN", () => {
      expect(divide(10, 0)).toBe(NaN);
      expect(safeDivide(10, 5)).toBe(2);
    });

    test("Safe divide returns NaN", () => {
      expect(safeDivide(10, 0)).toBe(NaN);
      expect(safeDivide(10, 5)).toBe(2);
    });
  });

  describe("Objects", () => {
    test("Get all property names", () => {
      const obj = {
        a: 1,
        b: "hello",
        c: true,
      };

      expect(getPropertyNames(obj)).toStrictEqual(["a", "b", "c"]);
    });

    test("Get all property values", () => {
      const obj = {
        a: 1,
        b: "hello",
        c: true,
      };

      expect(getPropertyValues(obj)).toStrictEqual([1, "hello", true]);
    });

    test("Get only one property", () => {
      const obj = {
        a: 1,
        b: "hello",
        c: true,
      };

      expect(getObjectWithAOnly(obj)).toStrictEqual({ a: 1 });
    });

    test("Get all but one property", () => {
      const obj = {
        a: 1,
        b: "hello",
        c: true,
      };

      expect(getObjectWithAllButA(obj)).toStrictEqual({ b: "hello", c: true });
    });
  });

  describe("Classes", () => {
    test("Add middle name to person", () => {
      const firstName = "Hans";
      const middleName = "Fritz";
      const lastName = "Müller";

      const person = new Person(firstName, middleName, lastName);

      expect(person.middleName).toBe(middleName);
    });

    test("Show middle name in full name", () => {
      const firstName = "Hans";
      const middleName = "Fritz";
      const lastName = "Müller";

      const person = new Person(firstName, middleName, lastName);

      expect(person.fullName()).toBe(`${firstName} ${middleName} ${lastName}`);
    });

    test("Make standard output for Person be fullName()", () => {
      const firstName = "Hans";
      const middleName = "Fritz";
      const lastName = "Müller";

      const person = new Person(firstName, middleName, lastName);

      expect(`${person}`).toBe("Hans Fritz Müller");
    });

    test("Add birth date and age", () => {
      const firstName = "Hans";
      const middleName = "Fritz";
      const lastName = "Müller";
      const birthDate = new Date(2000, 7, 1);

      const person = new Person(firstName, middleName, lastName, birthDate);

      expect(person.birthDate).toBe(birthDate);
      expect(person.age()).toBe(24);
    });

    test("Add school name to teacher", () => {
      const firstName = "Hans";
      const middleName = "Fritz";
      const lastName = "Müller";
      const birthDate = new Date(2000, 7, 1);
      const schoolName = "HFU";

      const teacher = new Person(firstName, middleName, lastName, birthDate, schoolName);

      expect(teacher.firstName).toBe(firstName);
      expect(teacher.middleName).toBe(middleName);
      expect(teacher.lastName).toBe(lastName);
      expect(teacher.birthDate).toBe(birthDate);
      expect(teacher.schoolName).toBe(schoolName);
    });

    test("Add school name to fullName()", () => {
      const firstName = "Hans";
      const middleName = "Fritz";
      const lastName = "Müller";
      const birthDate = new Date(2000, 7, 1);
      const schoolName = "HFU";

      const teacher = new Teacher(firstName, middleName, lastName, birthDate);

      expect(teacher.firstName).toBe(firstName);
      expect(teacher.middleName).toBe(middleName);
      expect(teacher.lastName).toBe(lastName);
      expect(teacher.birthDate).toBe(birthDate);
      expect(teacher.schoolName).toBe(schoolName);
      expect(teacher.fullName()).toBe(`${firstName} ${middleName} ${lastName} @ ${schoolName}`);
    });
  });
});

import { describe, expect, test } from "@jest/globals";

describe("Basic functions and operators", () => {
  test("destructuring objects with renaming", () => {
    const o = { p: 42, q: true };
    const { p: foo, q: bar } = o;

    expect(foo).toBe(42);
    expect(bar).toBe(true);
  });

  test("classes with inheritance", () => {
    class Person {
      constructor(firstName, lastName) {
        this.firstName = firstName ?? "John";
        this.lastName = lastName ?? "Doe";
      }

      fullName() {
        return `${this.firstName} ${this.lastName}`;
      }
    }

    class Teacher extends Person {
      constructor(firstName, lastName, schoolName) {
        super(firstName, lastName);
        this.schoolName = schoolName ?? "unknown";
      }

      fullName() {
        return `${super.fullName()} @ ${this.schoolName}`;
      }
    }

    const p1 = new Person("Bob");
    const p2 = new Person("Bob", "Smith");
    const p3 = new Teacher("Bob", "Smith", "HFU");
    const p4 = new Teacher("Bob", "Smith");

    expect(p1.fullName()).toBe("Bob Doe");
    expect(p2.fullName()).toBe("Bob Smith");
    expect(p3.fullName()).toBe("Bob Smith @ HFU");
    expect(p4.fullName()).toBe("Bob Smith @ unknown");

    expect(typeof p1).toBe("object");

    const obj = {
      firstName: "Bob",
      lastName: "Jones",
    };

    expect(p1 instanceof Person).toBeTruthy();
    expect(obj instanceof Person).toBeFalsy();
  });

  test("Simple objects", () => {
    const empty = {};
    const person = {
      first: "Bob",
      last: "Hoffman",
      age: 34,
      company: {
        name: "Apple",
      },
    };

    expect(person.age).toBe(34);
    expect(person.company.name).toBe("Apple");
  });

  test("add method adds one", () => {
    const obj = {
      a: 1,

      add() {
        return this.a + 1;
      },
    };

    expect(obj.add()).toBe(2);
  });

  test("instanceof with object", () => {
    function person(firstName, lastName) {
      this.firstName = firstName;
      this.lastName = lastName;
    }
    const bob = new person("John", "Doe");

    expect(bob instanceof person).toBeTruthy();
    expect(bob instanceof Object).toBeTruthy();
    expect(bob instanceof Number).toBeFalsy();
  });

  test("instanceof with class", () => {
    class person {
      constructor(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
      }
    }
    class employee extends person {}

    const bob = new employee("John", "Doe");

    expect(bob instanceof employee).toBeTruthy();
    expect(bob instanceof person).toBeTruthy();
    expect(bob instanceof Object).toBeTruthy();
    expect(bob instanceof Number).toBeFalsy();
  });
});

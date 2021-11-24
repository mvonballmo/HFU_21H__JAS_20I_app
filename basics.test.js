const {test, expect, describe} = require('@jest/globals');

describe('Basic functions and operators', () => {

  const bioCases = [
    ["bob", -2, "The user \"bob\" is -2 years old."],
    ["bob", -1, "The user \"bob\" is -1 years old."],
    ["bob", 0, "The user \"bob\" is 0 years old."],
    ["john", 1, "The user \"john\" is 1 year old."],
    ["john", 2, "The user \"john\" is 2 years old."]
  ];

  test.each(bioCases)(
    "given %p and %p, Bio returns %p",
    (argOne, argTwo, expectedResult) => {
      function Bio(t, name, age) {
        const years = (age == 1) ? " year" : " years";

        return `${t[0]}${name}${t[1]}${age}${years}${t[2]}`;
      }

      const output = Bio`The user "${argOne}" is ${argTwo} old.`;

      expect(output).toEqual(expectedResult);
    }
  );

  test('var uses same variable', () => {
    // noinspection ES6ConvertVarToLetConst,JSDuplicatedDeclaration
    var x = 1;
    {
      // noinspection ES6ConvertVarToLetConst,JSDuplicatedDeclaration
      var x = 2;  // gleiche Variable!

      expect(x).toBe(2);
    }
    expect(x).toBe(2);
  })

  test('let uses different variable', () => {
    let x = 1;
    {
      let x = 2;  // gleiche Variable!

      expect(x).toBe(2);
    }
    expect(x).toBe(1);
  })

  test('const uses different variable', () => {
    const x = 1;
    {
      const x = 2;  // gleiche Variable!

      expect(x).toBe(2);
    }
    expect(x).toBe(1);
  })

  test('typeof works as expected', () => {
    const age = 42;
    const text = `I am ${age}`;
    let temp;

    expect(typeof age).toBe('number');
    expect(typeof text).toBe('string');
    expect(typeof temp).toBe('undefined');
  })

  test('destructuring arrays', () => {
    const items = [10, 20, 30, 40, 50];
    const [a, b, ...rest] = items;
    const [c, d] = items; // c == 10, d == 20

    expect(a).toBe(10);
    expect(b).toBe(20);
    expect(c).toBe(10);
    expect(d).toBe(20);
    expect(rest).toEqual([30, 40, 50]);
  })

  test('destructuring arrays', () => {
    const items = [10, 20, 30, 40, 50];
    const [a, b, ...rest] = items;
    const [c, d] = items; // c == 10, d == 20

    expect(a).toBe(10);
    expect(b).toBe(20);
    expect(c).toBe(10);
    expect(d).toBe(20);
    expect(rest).toEqual([30, 40, 50]);
  })

  test('destructuring objects with renaming', () => {
    const o = {p: 42, q: true};
    const {p: foo, q: bar} = o;

    expect(foo).toBe(42);
    expect(bar).toBe(true);
  })

  test('classes with inheritance', () => {
    class Person {
      constructor(firstName, lastName) {
        this.firstName = firstName ?? "John";
        this.lastName = lastName ?? "Doe";
      }

      fullName() {
        return `${this.firstName} ${this.lastName}`
      }
    }

    class Teacher extends Person {
      constructor(firstName, lastName, schoolName) {
        super(firstName, lastName);
        this.schoolName = schoolName ?? "unknown";
      }

      fullName() {
        return `${super.fullName()} @ ${this.schoolName}`
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

    expect(p1 instanceof Person).toBeTruthy();
    expect(obj instanceof Person).toBeFalsy();
  });

  test('b is set to value', () => {
    (function () {
      var a = b = 5;
    })();

    expect(b).toBe(5);
  });

  test('arrays work as expected', () => {
    const empty1 = [];
    const empty2 = new Array();
    const filled = [1, 2, 3, "test", {}, {a: 42}];
    const sparse1 = [, ,];         // sparse1.length == 3
    const sparse2 = new Array(3); // sparse2.length == 3
    const a = filled[1];          // a == 2

    const sparse4 = ["a", , , , "b"];

    expect(sparse4).toEqual(["a", undefined, undefined, undefined, "b"]);
  })

  test('d', () => {
    const empty = {};
    const person = {
      first: "Bob",
      last: "Hoffman",
      age: 34,
      company: {
        name: "Apple"
      }
    };

    expect(person.age).toBe(34);
    expect(person.company.name).toBe("Apple");
  })

  test('map', () => {
    const m = new Map();

    m.set('a', 1);
    m.set('b', 2);
    m.set('c', 3);

    for (const [key, value] of m) {
      console.log(key + ' = ' + value)
    }
  })

  test('null-checking without coalescing operators', () => {
    const person = {
      first: "bob",
      last: "Hoffman",
      age: 34,
      company: {
        name: "Apple"
      }
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
  })

  test('null-checking with coalescing operators', () => {
    const person = {
      first: "bob",
      last: "Hoffman",
      age: 34,
      company: {
        name: "Apple"
      }
    };

    const person2 = null;
    const person3 = {
      first: "bob",
      last: "Hoffman",
      age: 34,
    }

    expect(person.company.name).toBe("Apple");
    expect(person2?.company?.name).toBe(undefined);
    expect(person3.company?.name).toBe(undefined);
  })

  test("test comparison operators", () => {
    const x = 1 == '1';   // x ist 'true'
    const y = 1 === '1';  // y ist 'false'

    expect(x).toBeTruthy();
    expect(y).toBeFalsy();
  })

  test("spread operator with parameters", () => {
    function sum(x, y, z) {
      return x + y + z;
    }

    const numbers = [1, 2, 3];
    const total = sum(...numbers);  // Ergibt 6

    expect(total).toBe(6);
  })

  test("destructuring", () => {
    const items = [10, 20, 30, 40, 50];
    const [a, b, ...rest] = items;
// a == 10, b == 20, rest == [30, 40, 50]

    expect(a).toEqual(10)
    expect(b).toEqual(20)
    expect(rest).toEqual([30, 40, 50])

// Mit Standardwerte
    const [c, d, e = -1, f = -1] = rest;
// c == 30, d == 40, e = 50, f = -1
    expect(c).toEqual(30)
    expect(d).toEqual(40)
    expect(e).toEqual(50)
    expect(f).toEqual(-1)
  })

  test("switch statement", () => {

    const x = 42;

    function calculateY(x) {
      switch (x) {
        case 41:
          return 1;
        case 42:
          return 2;
        default:
          return 3;
      }
    }

    let y = calculateY(x);

    expect(y).toBe(2);
  })

  test("for_in", () => {
    const o = { a: 1, b: 2, c: 3 };

    for (const property in o) {
      // console.log(o[property]);
    }

    const keys = Object.keys(o);

    expect(keys).toEqual(["a", "b", "c"]);

    // o[keys[2]] == "c"
  })

  test("for_of", () => {
    const items = [10, 20, 30, 40, 50];

    for (const item of items) {
      const expectedItem = items[items.indexOf(item)];
      expect(item).toBe(expectedItem);
    }
  });

  test("array map", () => {
    const items = [10, 20, 30, 40, 50];

    const toAdd = 20;

    const result = items.map((item) => item + toAdd);

    expect(result).toStrictEqual([30, 40, 50, 60, 70]);
  });

  test("array reduce", () => {
    const items = [10, 20, 30, 40, 50];

    const sum = (a, b) => a + b;

    const result = items.reduce(sum);

    expect(result).toStrictEqual(150);
  });

  test("array filter", () => {
    const items = [10, 20, 30, 40, 50];

    const result = items.filter((i) => i > 30);

    expect(result).toStrictEqual([40, 50]);
  });

  test("array flat", () => {
    const items = [10, [20, [30, 60]], 40, 50];

    const result = items.flat(2);

    expect(result).toEqual([10, 20, 30, 60, 40, 50]);
  });

  test("array slice", () => {
    const items = [10, 20, 30, 40, 50];

    const result = items.slice(1, 3);

    expect(result).toEqual([20, 30]);
  });

  test("math stuff", () => {
    const max = Math.max(1, 2, 3, 4);

    expect(result).toEqual(4);
  });

  test("date stuff", () => {
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

  test("add method adds one", () => {
    const obj = {
      a: 1,

      add() {
        return this.a + 1;
      },
    };

    expect(obj.add()).toBe(2);
  });
});

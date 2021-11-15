const { test, expect, describe } = require('@jest/globals');

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
    var x = 1;
    {
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

  test('b is set to value', () => {
    (function() {
      var a = b = 5;
    })();

    expect(b).toBe(5);
  });
})
const { test, expect, describe } = require('@jest/globals');

describe('Basic functions and operators', () => {
  test('Bio single year', () => {
    function Bio(template, name, age) {
      const years = (age == 1) ? " year" : " years";

      return `${template[0]}${name}${template[1]}${age}${years}${template[2]}`;
    }

    let age = 0;
    let person = "bob";

    const output = Bio`The person named ${person} is ${age} old.`;

    expect(output).toBe("The person named bob is 0 years old.");
  })

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

  test('b is set to value', () => {
    (function() {
      var a = b = 5;
    })();

    expect(b).toBe(5);
  });
})
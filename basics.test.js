const { test } = require('@jest/globals');

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
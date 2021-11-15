const { test, describe } = require('@jest/globals');
const library = require('./library');

describe('library', () => {
  test('counter is initialized to 1', () => {
    expect(library.counter()).toBe(1);
  });

  test('increment increases by 1', () => {
    const currentCounter = library.counter();

    expect(library.increment()).toBe(currentCounter + 1);
  });

  test('decrement decreases by 1', () => {
    const currentCounter = library.counter();

    expect(library.decrement()).toBe(currentCounter - 1);
  });
})


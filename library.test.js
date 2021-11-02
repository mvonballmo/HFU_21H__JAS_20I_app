const library = require('./library');

test('counter is initialized to 1', () => {
  expect(library.counter).toBe(1);
});

test('increment increases by 1', () => {
  expect(library.increment()).toBe(2);
});
const increment = require('./library');

test('increment increases by 1', () => {
  expect(increment()).toBe(2);
});
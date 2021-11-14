/**
 * @jest-environment jsdom
 */

import { counter, increment, decrement } from './library.js';

test('counter is initialized to 1', () => {
  expect(counter()).toBe(1);
});

test('increment increases by 1', () => {
  const currentCounter = counter();

  expect(increment()).toBe(currentCounter + 1);
});

test('decrement decreases by 1', () => {
  const currentCounter = counter();

  expect(decrement()).toBe(currentCounter - 1);
});
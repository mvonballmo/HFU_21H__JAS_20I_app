"use strict";

let _counter = 1;
let m = 2;
show(_counter + m);

export function counter() {
  return _counter;
}

export function increment() {
  return ++_counter;
}

export function decrement() {
  return --_counter;
}

export function show(value) {
  const output = document.getElementById("output");
  if (output) {
    if (output.value) {
      output.value += "\n" + value;
    } else {
      output.value = value;
    }
  }
}

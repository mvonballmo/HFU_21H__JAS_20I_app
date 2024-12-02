"use strict";

let _counter = 1;
let m = 2;
show(_counter + m);

function counter()
{
  return _counter;
}

function increment()
{
  return ++_counter;
}

function decrement()
{
  return --_counter;
}

function show(value)
{
  console.log(value);
}

// TODO Re-export methods with ES6 Modules
// https://trello.com/c/6dpjfKIP/6-fix-js-module-exports-so-it-works-in-the-browser

module.exports = {
  counter,
  increment,
  decrement
}
_counter = 1;
m = 2;
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
  console.warn(value);
}

module.exports = {
  counter,
  increment,
  decrement
}
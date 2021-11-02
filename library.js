counter = 1;
m = 2;
show(counter + m);

function increment()
{
  return ++counter;
}

function decrement()
{
  return --counter;
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
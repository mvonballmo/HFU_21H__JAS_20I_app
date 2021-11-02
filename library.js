n = 1;
m = 2;
show(n + m);

function increment()
{
  return n++;
}

function decrement()
{
  return n--;
}

function show(value)
{
  console.warn(value);
}

module.exports = increment;
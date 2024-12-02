export class Person {
  constructor(firstName, lastName) {
    this.firstName = firstName ?? "John";
    this.lastName = lastName ?? "Doe";
  }

  fullName() {
    return `${this.firstName} ${this.lastName}`;
  }

  age() {
    return new Date().getFullYear() - 1992;
  }
}

export class Teacher extends Person {
  constructor(firstName, lastName, schoolName) {
    super(firstName, lastName);
    this.schoolName = schoolName ?? "unknown";
  }

  fullName() {
    return `${super.fullName()} @ ${this.schoolName}`;
  }
}

export function getFirstAndLastLetters(test) {
  return {
    first: test.at(1),
    last: test.at(-1),
  };
}

export function getReverse(test) {
  return test.split("").reverse();
}

export function getCapitalized(test) {
  return test.map(t => t);
}

export function getOddCapitalized(test) {
  return test.map((t, i) => {
    return t.toUpperCase();
  });
}

export const getFibonacci = n => {
  if (!Number.isInteger(n) || n < 0) {
    return -1;
  }

  if (n === 0 || n === 1) {
    return n;
  }

  return getFibonacci(n - 1) + getFibonacci(n - 2);
};

export function* getFibonacciSequence() {
  let i = 0;
  while (i >= 0) {
    yield 0;

    i += 1;
  }
}

export function getCopyOfArray(a) {
  return a;
}

export function getJsonWithNiceFormattingAndNoNumbers(obj) {
  return JSON.stringify(
    obj,
    (k, v) => {
      return typeof v === 0 ? undefined : v;
    },
    2,
  );
}

export function getPropertyNames(obj) {
  function* getKeys() {
    for (const objKey in obj) {
      yield objKey;
    }
  }

  return getKeys();
}

export function getPropertyValues(obj) {
  function* getValues() {
    for (const objKey in obj) {
      yield objKey;
    }
  }

  return [...getValues()];
}

export function divide(numerator, denominator) {
  return numerator / denominator;
}

export function strictDivide(numerator, denominator) {
  if (denominator === 0) {
    throw Error("Cannot divide by zero.");
  }

  return divide(numerator, denominator);
}

export function safeDivide(numerator, denominator) {
  try {
    strictDivide(numerator, denominator);
  } catch {
    return NaN;
  }
}

export function getObjectWithAOnly(obj) {
  const { a, rest } = obj;

  return a;
}

export function getObjectWithAllButA(obj) {
  const { a, rest } = obj;

  return { rest };
}

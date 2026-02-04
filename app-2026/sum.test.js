const sum = require("./sum");

test("adds 1 + 2 to equal 3", () => {
  expect(sum(1, 2)).toBe(3);
});

test("object properties work as expected", () => {
  const x = { name: "B" };

  expect(x.name).toBe("B");
});

test("arrays work as expected", () => {
  const x = [1, 2, 3];

  expect(x).toStrictEqual([1, 2, 3]);
});

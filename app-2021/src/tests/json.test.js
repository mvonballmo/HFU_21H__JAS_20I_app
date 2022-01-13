import { describe, expect, test } from "@jest/globals";

describe("JSON", () => {
  const JsonTestText = `{
  "firstName": "John",
  "lastName": "Doe",
  "age": 42,
  "active": true,
  "cars": [
    {
      "make": "VW",
      "model": "Golf"
    },
    {
      "make": "BMW",
      "model": "M3"
    }
  ]
}`;

  test("convert to JSON", () => {
    const obj = {
      firstName: "John",
      lastName: "Doe",
      age: 42,
      active: true,
      cars: [
        { make: "VW", model: "Golf" },
        { make: "BMW", model: "M3" },
      ],
    };

    const jsonText = JSON.stringify(obj, null, 2);

    expect(jsonText).toBe(JsonTestText);
  });

  test("convert from JSON", () => {
    const obj = JSON.parse(JsonTestText);

    expect("firstName" in obj).toBeTruthy();
    expect(typeof obj.firstName).toBe("string");
    expect(obj.firstName).toBe("John");

    expect("lastName" in obj).toBeTruthy();
    expect("age" in obj).toBeTruthy();
    expect("active" in obj).toBeTruthy();
    expect("cars" in obj).toBeTruthy();

    expect(typeof obj.cars).toBe("object");
    expect(Array.isArray(obj.cars)).toBeTruthy();
    expect("length" in obj.cars).toBeTruthy();
    expect(obj.cars.length).toBe(2);

    const firstCar = obj.cars[0];
    expect("make" in firstCar).toBeTruthy();
    expect(typeof firstCar.make).toBe("string");
    expect(firstCar.make).toBe("VW");
  });

  test("convert to and from JSON", () => {
    const obj = { color: "red", speed: 50.2 };

    const json = JSON.stringify(obj);
    expect(json).toBe('{"color":"red","speed":50.2}');
    const obj2 = JSON.parse(json);
    expect(obj2).toEqual(obj);
  });

  test("convert to JSON with replacer and spaces", () => {
    const isString = v => typeof v === "string";
    const replacer = (k, v) => (isString(v) ? undefined : v);
    const obj = { color: "red", speed: 50.2 };
    const json = JSON.stringify(obj, replacer);

    expect(json).toBe('{"speed":50.2}');

    const json2 = JSON.stringify(obj, replacer, /* space: */ 2);

    const expected = `{
  "speed": 50.2
}`;

    expect(json2).toBe(expected);
  });

  test("convert to JSON with toJSON() override in exported object", () => {
    const obj = {
      color: "red",
      speed: 50.2,
      toJSON(key) {
        const { color, ...rest } = this;
        return rest; // without "color"
      },
    };
    const json = JSON.stringify(obj);
    expect(json).toBe('{"speed":50.2}');
  });
});

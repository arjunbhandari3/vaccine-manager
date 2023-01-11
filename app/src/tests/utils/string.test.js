import { interpolate, truncate } from "utils/string";

describe("interpolate", () => {
  it("should interpolate values into a string", () => {
    const str = ":name is here.";
    const params = { name: "Ram" };
    const expected = "Ram is here.";
    expect(interpolate(str, params)).toEqual(expected);
  });

  it("should return the original string if no interpolations are found", () => {
    const str = "Hello, world!";
    const params = { name: "Ram" };
    expect(interpolate(str, params)).toEqual(str);
  });

  it("should return the original string if no values are provided", () => {
    const str = ":name is here.";
    expect(interpolate(str)).toEqual(str);
  });
});

describe("truncate", () => {
  it("should truncate the string to the given length", () => {
    const str = "Hello, world!";
    const length = 5;
    const expected = "Hello...";
    expect(truncate(str, length)).toEqual(expected);
  });

  it("should return the original string if it is shorter than the given length", () => {
    const str = "Hello";
    const length = 10;
    expect(truncate(str, length)).toEqual(str);
  });

  it("should use a default length of 10 if none is provided", () => {
    const str = "Hello, world!";
    const expected = "Hello, wor...";
    expect(truncate(str)).toEqual(expected);
  });
});

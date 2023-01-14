import { cleanObject } from "utils/object";

describe("object", () => {
  describe("cleanObject", () => {
    it("should remove empty keys from an object", () => {
      const obj = { name: "John", age: 25, phone: "", address: null };
      const expected = { name: "John", age: 25 };
      const result = cleanObject(obj);

      expect(result).toEqual(expected);
    });

    it("should return an empty object if all keys are empty", () => {
      const obj = { name: "", age: null, phone: "", address: "" };
      const expected = {};
      const result = cleanObject(obj);

      expect(result).toEqual(expected);
    });

    it("should return the same object if no empty keys are present", () => {
      const obj = {
        name: "John",
        age: 25,
        phone: "555-555-5555",
        address: "123 Main St",
      };
      const result = cleanObject(obj);

      expect(result).toEqual(obj);
    });
  });
});

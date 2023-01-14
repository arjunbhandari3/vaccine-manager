import { sortDataByKey, sortVaccinesData, truncateArray } from "utils/array";

describe("array", () => {
  describe("sortVaccinesData", () => {
    it("should sort mandatory vaccines first and then optional vaccines", () => {
      const data = [
        { name: "Flu", isMandatory: false },
        { name: "Tetanus", isMandatory: true },
        { name: "Measles", isMandatory: true },
        { name: "Chickenpox", isMandatory: false },
      ];
      const expected = [
        { name: "Measles", isMandatory: true },
        { name: "Tetanus", isMandatory: true },
        { name: "Chickenpox", isMandatory: false },
        { name: "Flu", isMandatory: false },
      ];
      const result = sortVaccinesData(data);

      expect(result).toEqual(expected);
    });
  });

  describe("sortDataByKey", () => {
    it("should sort data in ascending order by default", () => {
      const data = [
        { name: "Measles", isMandatory: true },
        { name: "Tetanus", isMandatory: true },
        { name: "Chickenpox", isMandatory: false },
        { name: "Flu", isMandatory: false },
      ];
      const expected = [
        { name: "Chickenpox", isMandatory: false },
        { name: "Flu", isMandatory: false },
        { name: "Measles", isMandatory: true },
        { name: "Tetanus", isMandatory: true },
      ];
      const result = sortDataByKey(data);

      expect(result).toEqual(expected);
    });
    it("should sort data in descending order", () => {
      const data = [
        { name: "Measles", isMandatory: true },
        { name: "Tetanus", isMandatory: true },
        { name: "Chickenpox", isMandatory: false },
        { name: "Flu", isMandatory: false },
      ];
      const expected = [
        { name: "Tetanus", isMandatory: true },
        { name: "Measles", isMandatory: true },
        { name: "Flu", isMandatory: false },
        { name: "Chickenpox", isMandatory: false },
      ];
      const result = sortDataByKey(data, "name", "desc");

      expect(result).toEqual(expected);
    });
  });

  describe("truncateArray", () => {
    it("should truncate the array to the given length", () => {
      const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      const expected = [1, 2, 3, 4, 5];
      const result = truncateArray(data, 5);

      expect(result).toEqual(expected);
    });

    it("should not truncate the array if the given length is larger than the array", () => {
      const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      const expected = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      const result = truncateArray(data, 15);

      expect(result).toEqual(expected);
    });
  });
});

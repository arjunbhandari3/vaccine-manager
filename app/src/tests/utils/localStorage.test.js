import localStorageObject from "utils/localStorage";

describe("localStorageObject", () => {
  beforeEach(() => {
    localStorageObject.clear();
  });

  it("should set a value in local storage", () => {
    localStorageObject.set("key", "value");
    expect(localStorageObject.get("key")).toEqual("value");
    localStorageObject.remove("key");
    expect(localStorageObject.get("key")).toBeNull();
  });

  it("should set an object in local storage", () => {
    localStorageObject.set("key", JSON.stringify({ a: 1, b: 2 }), true);
    expect(localStorageObject.get("key", true)).toEqual(
      JSON.stringify({ a: 1, b: 2 })
    );
    localStorageObject.remove("key");
    expect(localStorageObject.get("key", true)).toBeNull();
  });

  it("should clear local storage", () => {
    localStorageObject.set("key1", "value1");
    localStorageObject.set("key2", "value2");
    localStorageObject.clear(); // clear local storage
    expect(localStorageObject.get("key1")).toBeNull();
    expect(localStorageObject.get("key2")).toBeNull();
  });
});

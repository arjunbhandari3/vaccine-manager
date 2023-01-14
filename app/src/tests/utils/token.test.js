import {
  getAuthUser,
  getAuthToken,
  getAuthHeader,
  getAccessToken,
  isUserLoggedIn,
  setAuthUserData,
  removeAuthUserData,
} from "utils/token";
import localStorage from "utils/localStorage";

describe("token", () => {
  beforeAll(() => {
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  describe("getAuthHeader", () => {
    it("should return the correct auth header with access token", () => {
      const token = "abc123";
      localStorage.set("token", { accessToken: token }, true);

      expect(getAuthHeader()).toBe(`Bearer ${token}`);
    });

    it("should return an empty string if access token is not present", () => {
      localStorage.remove("token");

      expect(getAuthHeader()).toBe("");
    });
  });

  describe("setAuthUserData", () => {
    it("should set the correct user data to local storage", () => {
      const accessToken = "abc123";
      const refreshToken = "def456";
      const userId = "1";
      setAuthUserData(accessToken, refreshToken, userId);

      expect(localStorage.get("token", true)).toEqual({
        accessToken,
        refreshToken,
      });
      expect(localStorage.get("userId")).toBe(userId);
    });
  });

  describe("getAccessToken", () => {
    it("should get the correct access token from local storage", () => {
      const token = "abc123";
      localStorage.set("token", { accessToken: token }, true);

      expect(getAccessToken()).toBe(token);
    });

    it("should return undefined if access token is not present in local storage", () => {
      localStorage.remove("token");

      expect(getAccessToken()).toBeUndefined();
    });
  });

  describe("getAuthToken", () => {
    it("should get the correct auth token from local storage", () => {
      const token = { accessToken: "abc123", refreshToken: "def456" };
      localStorage.set("token", token, true);

      expect(getAuthToken()).toEqual(token);
    });

    it("should return null if auth token is not present in local storage", () => {
      localStorage.remove("token");

      expect(getAuthToken()).toBeNull();
    });
  });

  describe("getAuthUser", () => {
    it("should get the correct user from local storage", () => {
      const userId = "1";
      localStorage.set("userId", userId);

      expect(getAuthUser()).toBe(userId);
    });

    it("should return null if user is not present in local storage", () => {
      localStorage.remove("userId");

      expect(getAuthUser()).toBeNull();
    });
  });

  describe("isUserLoggedIn", () => {
    it("should return true if user is logged in", () => {
      const accessToken = "abc123";
      const userId = "1";
      localStorage.set("token", { accessToken }, true);
      localStorage.set("userId", userId);

      expect(isUserLoggedIn()).toBe(true);
    });

    it("should return false if user is not logged in", () => {
      localStorage.remove("token");
      localStorage.remove("userId");

      expect(isUserLoggedIn()).toBe(false);
    });
  });

  describe("removeAuthUserData", () => {
    it("should remove the user data from local storage", () => {
      localStorage.set("token", { accessToken: "abc123" }, true);
      localStorage.set("userId", "1");
      removeAuthUserData();

      expect(localStorage.get("token")).toBeNull();
      expect(localStorage.get("userId")).toBeNull();
    });
  });
});

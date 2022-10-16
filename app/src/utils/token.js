import {
  setDataToLocalStorage,
  getDataFromLocalStorage,
  removeDataFromLocalStorage,
} from "./localStorage";

/**
 * Set user data to local storage
 * @param {string} accessToken
 * @param {string} refreshToken
 * @param {Number} userId
 */
export const setUserDataToLocalStorage = (
  accessToken,
  refreshToken,
  userId
) => {
  const token = { accessToken, refreshToken };

  setDataToLocalStorage("token", token, true);
  setDataToLocalStorage("userId", userId);
};

/**
 * Get tokens from local storage
 * @returns {Object} {accessToken, refreshToken}
 */
export const getTokenFromLocalStorage = () => {
  const token = getDataFromLocalStorage("token", true);
  return token;
};

/**
 * Fetch user from local storage
 * @returns {Number} userId
 */
export const getUserFromLocalStorage = () => {
  removeUserDataFromLocalStorage();
  const userId = getDataFromLocalStorage("userId");

  return userId;
};

/**
 * Check if user is logged in
 * @returns {Boolean}
 */
export const isUserLoggedIn = () => {
  const { accessToken } = getTokenFromLocalStorage();
  const userId = getUserFromLocalStorage();

  return accessToken && userId;
};

/**
 * Remove data from local storage
 */
export const removeUserDataFromLocalStorage = () => {
  removeDataFromLocalStorage("token");
  removeDataFromLocalStorage("userId");
};

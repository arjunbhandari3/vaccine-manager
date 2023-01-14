import localStorage from "./localStorage";

/**
 * Get Auth Header
 *
 * @returns {string}
 */
export const getAuthHeader = () => {
  const token = getAccessToken();

  return token ? `Bearer ${token}` : "";
};

/**
 * Set user data to local storage
 * @param {string} accessToken
 * @param {string} refreshToken
 * @param {Number} userId
 */
export const setAuthUserData = (accessToken, refreshToken, userId) => {
  const token = { accessToken, refreshToken };

  localStorage.set("token", token, true);
  localStorage.set("userId", userId);
};

/**
 * Get access token from local storage
 * @returns {string}
 */
export const getAccessToken = () => {
  const { accessToken } = localStorage.get("token", true) || {};

  return accessToken;
};

/**
 * Get tokens from local storage
 * @returns {Object} {accessToken, refreshToken}
 */
export const getAuthToken = () => {
  const token = localStorage.get("token", true);

  return token;
};

/**
 * Fetch user from local storage
 * @returns {Number} userId
 */
export const getAuthUser = () => {
  const userId = localStorage.get("userId");

  return userId;
};

/**
 * Check if user is logged in
 * @returns {Boolean}
 */
export const isUserLoggedIn = () => {
  const accessToken = getAccessToken();
  const userId = getAuthUser();

  return !!accessToken && !!userId;
};

/**
 * Remove data from local storage
 */
export const removeAuthUserData = () => {
  localStorage.remove("token");
  localStorage.remove("userId");
};

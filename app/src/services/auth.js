import http from "utils/http";
import config from "config/config";
import { getAuthToken, removeAuthUserData, setAuthUserData } from "utils/token";

/**
 * Get token
 */
export const refreshToken = async () => {
  const { refreshToken } = getAuthToken() || {};

  const { data } = await http.post(config.endpoints.auth.refreshToken, {
    refreshToken,
  });

  if (data) {
    const { accessToken, refreshToken, user } = data;

    setAuthUserData(accessToken, refreshToken, user.id);
  }
};

/**
 * Sign in user
 * @param {Object} payload
 * @returns {Promise}
 */
export const signIn = async (payload) => {
  const { data } = await http.post(config.endpoints.auth.signIn, payload);

  const { accessToken, refreshToken, user } = data;

  setAuthUserData(accessToken, refreshToken, user.id);

  return data;
};

/**
 * Sign up user
 * @param {Object} payload
 * @returns {Promise}
 */
export const signUp = async (payload) => {
  const { data } = await http.post(config.endpoints.auth.signUp, payload);

  return data;
};

/**
 * Sign out user
 *
 */
export const signOut = async () => {
  const { refreshToken } = getAuthToken() || {};

  const result = await http.post(config.endpoints.auth.signOut, {
    refreshToken,
  });

  if (result.status === 200) {
    removeAuthUserData();
  }

  return result;
};

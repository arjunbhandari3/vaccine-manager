import axios from "axios";

import {
  getTokenFromLocalStorage,
  removeUserDataFromLocalStorage,
  setUserDataToLocalStorage,
} from "../utils/token";
import config from "../config/config";

/**
 * Get token
 */
export const refreshToken = async () => {
  const { refreshToken } = getTokenFromLocalStorage() || {};

  const { data } = await axios.post(config.endpoints.auth.refreshToken, {
    refreshToken,
  });

  if (data) {
    const { accessToken, refreshToken, user } = data;

    setUserDataToLocalStorage(accessToken, refreshToken, user.id);
  }
};

/**
 * Sign in user
 * @param {string} email
 * @param {string} password
 * @returns {Promise}
 */
export const signIn = async (email, password) => {
  const { data } = await axios.post(config.endpoints.auth.signIn, {
    email,
    password,
  });

  const { accessToken, refreshToken, user } = data;

  setUserDataToLocalStorage(accessToken, refreshToken, user.id);

  return data;
};

/**
 * Sign up user
 * @param {string} email
 * @param {string} password
 * @returns {Promise}
 */
export const signUp = async (email, password) => {
  const { data } = await axios.post(config.endpoints.auth.signUp, {
    email,
    password,
  });

  return data;
};

/**
 * Sign out user
 *
 */
export const signOut = async () => {
  await axios.get(config.endpoints.auth.signOut);

  removeUserDataFromLocalStorage();
};

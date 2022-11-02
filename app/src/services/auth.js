import axios from "axios";

import {
  getTokenFromLocalStorage,
  getUserFromLocalStorage,
  setUserDataToLocalStorage,
} from "../utils/token";
import config from "../config/config";

/**
 * Get token
 */
export const getToken = async () => {
  const id = getUserFromLocalStorage();

  const { refreshToken } = getTokenFromLocalStorage() || {};

  const { data } = await axios.post(config.endpoints.auth.refreshToken, {
    refreshToken,
    id,
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

  const { accessToken, refreshToken, user } = data;

  setUserDataToLocalStorage(accessToken, refreshToken, user.id);

  return data;
};

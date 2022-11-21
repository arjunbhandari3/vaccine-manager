import {
  getTokenFromLocalStorage,
  setUserDataToLocalStorage,
  removeUserDataFromLocalStorage,
} from "utils/token";
import http from "utils/http";
import config from "config/config";
import { showSuccessNotification } from "utils/notification";

import * as routes from "constants/routes";
import { SUCCESS, SUCCESSFULLY_SIGNED_OUT } from "constants/common";

/**
 * Get token
 */
export const refreshToken = async () => {
  const { refreshToken } = getTokenFromLocalStorage() || {};

  const { data } = await http.post(config.endpoints.auth.refreshToken, {
    refreshToken,
  });

  if (data) {
    const { accessToken, refreshToken, user } = data;

    setUserDataToLocalStorage(accessToken, refreshToken, user.id);
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

  setUserDataToLocalStorage(accessToken, refreshToken, user.id);

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
  const { refreshToken } = getTokenFromLocalStorage() || {};

  const result = await http.post(config.endpoints.auth.signOut, {
    refreshToken,
  });

  if (result.status === 200) {
    removeUserDataFromLocalStorage();
    window.location.href = routes.SIGN_IN;

    showSuccessNotification(SUCCESS, SUCCESSFULLY_SIGNED_OUT);
  }
};

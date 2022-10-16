import axios from "axios";

import {
  getTokenFromLocalStorage,
  getUserFromLocalStorage,
  setUserDataToLocalStorage,
} from "../utils/token";
import config from "../config/config";

export const getToken = async () => {
  const userId = getUserFromLocalStorage();
  const { refreshToken } = getTokenFromLocalStorage();

  const res = await axios.post(config.endpoints.auth.refreshToken, {
    refreshToken,
    userId,
  });

  if (res.data) {
    const data = res.data.data;

    const { accessToken, refreshToken, user } = data;
    setUserDataToLocalStorage(accessToken, refreshToken, user.id);
  }
};

export const signIn = async (email, password) => {
  const { data } = await axios.post(config.endpoints.auth.signIn, {
    email,
    password,
  });

  const { accessToken, refreshToken, user } = data.data;

  setUserDataToLocalStorage(accessToken, refreshToken, user.id);

  return data;
};

export const signUp = async (email, password) => {
  const { data } = await axios.post(config.endpoints.auth.signUp, {
    email,
    password,
  });

  const { accessToken, refreshToken, user } = data.data;

  setUserDataToLocalStorage(accessToken, refreshToken, user.id);

  return data;
};

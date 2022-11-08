import axios from "axios";

import { refreshToken } from "../services/auth";
import {
  getTokenFromLocalStorage,
  removeUserDataFromLocalStorage,
} from "../utils/token";

import * as routes from "constants/routes";

const http = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const reqInterceptor = (config) => {
  const { accessToken } = getTokenFromLocalStorage() || {};

  if (accessToken && config.headers) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
};

const reqErrorInterceptor = (error) => Promise.reject(error);

const resErrorInterceptor = async (error, reqInterceptorId) => {
  const originalReq = error.config;

  if (error.response?.status === 401 && !originalReq?.sent) {
    try {
      await refreshToken();

      http.interceptors.request.eject(reqInterceptorId);
      http.interceptors.request.use(reqInterceptor, reqErrorInterceptor);

      originalReq.sent = true;

      return http(originalReq);
    } catch (err) {
      removeUserDataFromLocalStorage();
      window.location.href = routes.SIGN_IN;
      return;
    }
  }

  return Promise.reject(error);
};

const reqInterceptorId = http.interceptors.request.use(
  reqInterceptor,
  reqErrorInterceptor
);

http.interceptors.response.use(
  (response) => response,
  (error) => resErrorInterceptor(error, reqInterceptorId)
);

export default http;

import axios from "axios";
import * as routes from "constants/routes";

import { refreshToken } from "../services/auth";
import { getTokenFromLocalStorage } from "../utils/token";

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

      axios.interceptors.request.eject(reqInterceptorId);
      axios.interceptors.request.use(reqInterceptor);
      originalReq.sent = true;

      return axios(originalReq);
    } catch (err) {
      window.location.href = routes.SIGN_IN;
      return;
    }
  }

  return Promise.reject(error);
};

export const tokenInterceptorProvider = () => {
  axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;
  axios.defaults.headers.post["Content-Type"] = "application/json";

  const reqInterceptorId = axios.interceptors.request.use(
    reqInterceptor,
    reqErrorInterceptor
  );

  axios.interceptors.response.use(
    (response) => response,
    (error) => resErrorInterceptor(error, reqInterceptorId)
  );
};

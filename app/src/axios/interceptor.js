import axios from "axios";

import { getToken } from "../services/auth";
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
    await getToken();

    axios.interceptors.request.eject(reqInterceptorId);
    axios.interceptors.request.use(reqInterceptor);
    originalReq.sent = true;

    return axios(originalReq);
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

import axios from "axios";

import config from "config/config";
import localStorage from "./localStorage";
import { getAccessToken } from "../utils/token";
import { refreshToken } from "../services/auth";

import * as routes from "constants/routes";

const http = axios.create({
  baseURL: config.apiBaseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

http.interceptors.request.use(
  (config) => {
    const accessToken = getAccessToken();

    if (accessToken && config.headers) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

http.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalReq = error.config;

    if (error.response?.status === 401 && !originalReq?.sent) {
      try {
        await refreshToken();

        originalReq.sent = true;

        return http(originalReq);
      } catch (err) {
        localStorage.clear();
        window.location.href = routes.SIGN_IN;
        return;
      }
    }

    return Promise.reject(error);
  }
);

export default http;

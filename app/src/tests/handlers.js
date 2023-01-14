import { rest } from "msw";
import config from "config/config";

import {
  authResponseData,
  allVaccinesResponseData,
  vaccineCountResponseData,
} from "./constants";

export const signInResponse = rest.post(
  `${config.apiBaseURL}${config.endpoints.auth.signIn}`,
  (req, res, ctx) => res(ctx.status(200), ctx.json(authResponseData))
);

export const signUpResponse = rest.post(
  `${config.apiBaseURL}${config.endpoints.auth.signUp}`,
  (req, res, ctx) => res(ctx.status(201), ctx.json(authResponseData))
);

export const refreshTokenResponse = rest.post(
  `${config.apiBaseURL}${config.endpoints.auth.refreshToken}`,
  (req, res, ctx) => res(ctx.status(200), ctx.json(authResponseData))
);

export const allVaccinesResponse = rest.get(
  `${config.apiBaseURL}${config.endpoints.vaccine.all}`,
  (req, res, ctx) => {
    const search = req.url.searchParams.get("search");
    const mandatory = req.url.searchParams.get("mandatory");

    if (mandatory === "true") {
      return res(ctx.status(200), ctx.json([allVaccinesResponseData[0]]));
    } else if (search === "Vaccine 2") {
      return res(ctx.status(200), ctx.json([allVaccinesResponseData[1]]));
    } else {
      return res(ctx.status(200), ctx.json(allVaccinesResponseData));
    }
  }
);

export const vaccineCountResponse = rest.get(
  `${config.apiBaseURL}${config.endpoints.vaccine.count}`,
  (req, res, ctx) => res(ctx.status(200), ctx.json(vaccineCountResponseData))
);

export const vaccineResponse = rest.put(
  `${config.apiBaseURL}${config.endpoints.vaccine.one}`,
  (req, res, ctx) => res(ctx.status(200), ctx.json(allVaccinesResponseData[0]))
);

export const handlers = [
  signInResponse,
  signUpResponse,
  refreshTokenResponse,
  allVaccinesResponse,
  vaccineCountResponse,
  vaccineResponse,
];

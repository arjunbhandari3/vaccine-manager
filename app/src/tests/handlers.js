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

export const allVaccinesResponse = rest.get(
  `${config.apiBaseURL}${config.endpoints.vaccine.all}`,
  (req, res, ctx) => res(ctx.status(200), ctx.json(allVaccinesResponseData))
);

export const vaccineCountResponse = rest.get(
  `${config.apiBaseURL}${config.endpoints.vaccine.count}`,
  (req, res, ctx) => res(ctx.status(200), ctx.json(vaccineCountResponseData))
);

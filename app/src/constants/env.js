import config from "config/config";

export const PRODUCTION = "production";
export const DEVELOPMENT = "development";

export const APP_ENVIRONMENT = config.env || DEVELOPMENT;

/** TOKEN CONSTANTS **/

export const ACCESS_TOKEN = 'access token';
export const REFRESH_TOKEN = 'refresh token';

export const TOKEN_TYPES = { ACCESS_TOKEN, REFRESH_TOKEN };

export const TOKEN_SECRETS = {
  [ACCESS_TOKEN]: process.env.ACCESS_TOKEN_SECRET,
  [REFRESH_TOKEN]: process.env.REFRESH_TOKEN_SECRET,
};

export const TOKEN_EXPIRES_IN = {
  [ACCESS_TOKEN]: process.env.ACCESS_TOKEN_EXPIRES_IN,
  [REFRESH_TOKEN]: process.env.REFRESH_TOKEN_EXPIRES_IN,
};

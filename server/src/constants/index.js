/** TOKEN CONSTANTS **/
export const TOKEN_TYPES = {
  ACCESS_TOKEN: 'access token',
  REFRESH_TOKEN: 'refresh token',
};

export const TOKEN_SECRETS = {
  [TOKEN_TYPES.ACCESS_TOKEN]: process.env.ACCESS_TOKEN_SECRET,
  [TOKEN_TYPES.REFRESH_TOKEN]: process.env.REFRESH_TOKEN_SECRET,
};

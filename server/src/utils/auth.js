import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { ACCESS_TOKEN, REFRESH_TOKEN, TOKEN_EXPIRES_IN, TOKEN_SECRETS } from '../constants';

/**
 * Get hashed password.
 *
 * @param {string} password
 * @returns {string}
 */
export const getHashedPassword = async password => {
  const salt = await bcrypt.genSalt(10);

  return await bcrypt.hash(password, salt);
};

/**
 * Compare password with hashed password.
 *
 * @param {string} password
 * @param {string} hashedPassword
 * @returns {boolean}
 */
export const compareHash = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

/**
 * Get signed tokens.
 *
 * @param {object} data
 * @returns {object}
 */
export const getSignedTokens = data => {
  const accessToken = jwt.sign(data, TOKEN_SECRETS[ACCESS_TOKEN], {
    expiresIn: TOKEN_EXPIRES_IN[ACCESS_TOKEN],
  });

  const refreshToken = jwt.sign(data, TOKEN_SECRETS[REFRESH_TOKEN], {
    expiresIn: TOKEN_EXPIRES_IN[REFRESH_TOKEN],
  });

  return {
    accessToken,
    refreshToken,
  };
};

/**
 * Verify token.
 *
 * @param {string} token
 * @param {string} type
 * @returns {object}
 */
export const verifyToken = (token, type) => {
  return jwt.verify(token, TOKEN_SECRETS[type]);
};

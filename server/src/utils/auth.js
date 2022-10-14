import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { ACCESS_TOKEN, REFRESH_TOKEN, TOKEN_SECRETS } from '../constants';

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
 * @param {object} user
 * @returns {object}
 */
export const getSignedTokens = user => {
  const accessToken = jwt.sign({ id: user.id }, TOKEN_SECRETS[ACCESS_TOKEN], { expiresIn: '15m' });
  const refreshToken = jwt.sign({ id: user.id }, TOKEN_SECRETS[REFRESH_TOKEN], { expiresIn: '7d' });

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

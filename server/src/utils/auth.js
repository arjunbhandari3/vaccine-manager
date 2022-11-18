import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from '../config/config';

import { ACCESS_TOKEN } from '../constants';

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
export const comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

/**
 * Get signed tokens.
 *
 * @param {object} data
 * @returns {object}
 */
export const getSignedTokens = data => {
  const accessToken = jwt.sign(data, config.token.access.secret, {
    expiresIn: config.token.access.expiresIn,
  });

  const refreshToken = jwt.sign(data, config.token.refresh.secret, {
    expiresIn: config.token.refresh.expiresIn,
  });

  return { accessToken, refreshToken };
};

/**
 * Verify token.
 *
 * @param {string} token
 * @param {string} type
 * @returns {object}
 */
export const verifyToken = (token, type = ACCESS_TOKEN) => {
  const secret = type === ACCESS_TOKEN ? config.token.access.secret : config.token.refresh.secret;

  return jwt.verify(token, secret);
};

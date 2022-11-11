import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

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
  const accessToken = jwt.sign(data, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN,
  });

  const refreshToken = jwt.sign(data, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN,
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
  return jwt.verify(token, type === ACCESS_TOKEN ? process.env.ACCESS_TOKEN_SECRET : process.env.REFRESH_TOKEN_SECRET);
};

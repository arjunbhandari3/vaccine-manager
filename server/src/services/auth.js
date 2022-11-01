import User from '../models/user';

import logger from '../utils/logger';
import ErrorRes from '../utils/error';
import { filterFields } from '../utils/object';
import { getHashedPassword, compareHash, getSignedTokens, verifyToken } from '../utils/auth';

import { REFRESH_TOKEN } from '../constants';

/**
 * Sign in an existing user.
 *
 * @param {object} payload
 * @returns {Object}
 */
export const signIn = async payload => {
  logger.info('Signing in user');

  const { email, password } = payload;

  const user = await User.getUserByEmail(email);

  if (!user || !(await compareHash(password, user.password))) {
    throw new ErrorRes('Invalid credentials', 401);
  }

  const { accessToken, refreshToken } = getSignedTokens({ id: user.id, email: user.email });

  const filteredUser = filterFields(user, ['password']);

  return {
    accessToken,
    refreshToken,
    user: filteredUser,
  };
};

/**
 * Sign up a new user.
 *
 * @param {object} payload
 * @returns {Object}
 */
export const signUp = async payload => {
  logger.info('Signing up user');

  const { email, password } = payload;

  const user = await User.getUserByEmail(email);

  if (user) {
    throw new ErrorRes('User already exists!', 400);
  }

  const hashedPassword = await getHashedPassword(password);

  const newUser = await User.createUser({
    email,
    password: hashedPassword,
  });

  const { accessToken, refreshToken } = getSignedTokens({ id: newUser.id, email: newUser.email });
  const filteredUser = filterFields(newUser, ['password']);

  return {
    accessToken,
    refreshToken,
    user: filteredUser,
  };
};

/**
 * Refresh access token.
 *
 * @param {string} refreshToken
 * @returns {Object}
 */
export const refreshAccessToken = async refreshToken => {
  logger.info('Refreshing access token');

  const { id } = verifyToken(refreshToken, REFRESH_TOKEN);

  const user = await User.getUserById(id);

  if (!user) {
    throw new ErrorRes('User not found!', 404);
  }

  const { accessToken, refreshToken: newRefreshToken } = getSignedTokens({ id: user.id, email: user.email });
  const filteredUser = filterFields(user, ['password']);

  return {
    accessToken,
    refreshToken: newRefreshToken,
    user: filteredUser,
  };
};

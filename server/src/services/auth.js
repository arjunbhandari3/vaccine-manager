import jwt from 'jsonwebtoken';

import User from '../models/user';

import { filterFields } from '../utils/object';
import { getHashedPassword, compareHash, getSignedTokens } from '../utils/auth';

import { TOKEN_SECRETS, REFRESH_TOKEN } from '../constants';

/**
 * Sign in an existing user.
 *
 * @param {object} payload
 * @returns {Object}
 */
export const signIn = async payload => {
  const { email, password } = payload;

  const user = await User.getUserByEmail(email);

  if (!user || !(await compareHash(password, user.password))) {
    throw new Error('Invalid credentials');
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
  const { email, password } = payload;

  const user = await User.getUserByEmail(email);

  if (user) {
    throw new Error('User already exists!');
  }

  const hashedPassword = await getHashedPassword(password);

  const newUser = await User.createUser({
    email,
    password: hashedPassword,
  });

  const { accessToken, refreshToken } = getSignedTokens({ id: user.id, email: user.email });
  const filteredUser = filterFields(user, ['password']);

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
  const { id } = jwt.verify(refreshToken, TOKEN_SECRETS[REFRESH_TOKEN]);

  const user = await User.getUserById(id);

  if (!user) {
    throw new Error('User not found!');
  }

  const { accessToken, refreshToken: newRefreshToken } = getSignedTokens(user);
  const filteredUser = filterFields(user, ['password']);

  return {
    accessToken,
    refreshToken: newRefreshToken,
    user: filteredUser,
  };
};

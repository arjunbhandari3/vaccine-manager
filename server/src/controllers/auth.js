import HttpStatus from 'http-status-codes';

import * as authService from '../services/auth';

/**
 * Sign in an existing user.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @returns {Object}
 */
export const signIn = async (req, res, next) => {
  try {
    const data = await authService.signIn(req.body);

    return res.status(HttpStatus.OK).json(data);
  } catch (error) {
    next(error);
  }
};

/**
 * Sign up a new user.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @returns {Object}
 */
export const signUp = async (req, res, next) => {
  try {
    const data = await authService.signUp(req.body);

    return res.status(HttpStatus.CREATED).json(data);
  } catch (error) {
    next(error);
  }
};

/**
 * Refresh access token.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @returns {Object}
 */
export const refreshTokens = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;

    const data = await authService.refreshAccessToken(refreshToken);

    return res.status(HttpStatus.OK).json(data);
  } catch (error) {
    next(error);
  }
};

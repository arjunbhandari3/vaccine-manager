import Joi from 'joi';

import validate from '../utils/validate';

const userSchema = Joi.object({
  email: Joi.string().max(100).email().label('Email').required(),
  password: Joi.string().min(3).max(30).label('Password').required(),
});

const tokenSchema = Joi.object({
  refreshToken: Joi.string().required(),
});

/**
 * Validates user input.
 * @param {object} req
 * @param {object} res
 * @param {Function} next
 * @returns {object}
 */
export const validateUserInput = async (req, res, next) => {
  return await validate(req.body, userSchema)
    .then(() => next())
    .catch(next);
};

/**
 * Validates refresh token.
 * @param {object} req
 * @param {object} res
 * @param {Function} next
 * @returns {object}
 */
export const validateRefreshToken = async (req, res, next) => {
  return await validate(req.body, tokenSchema)
    .then(() => next())
    .catch(next);
};

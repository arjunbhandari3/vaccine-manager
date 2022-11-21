import Joi from 'joi';

import validate from '../utils/validate';

const signUpSchema = Joi.object({
  name: Joi.string().label('Name').required(),
  email: Joi.string().email().label('Email').required(),
  password: Joi.string().min(6).label('Password').required(),
});

const signInSchema = Joi.object({
  email: Joi.string().email().label('Email').required(),
  password: Joi.string().label('Password').required(),
});

const tokenSchema = Joi.object({
  refreshToken: Joi.string().required(),
});

/**
 * Validates signUp input.
 * @param {object} req
 * @param {object} res
 * @param {Function} next
 * @returns {object}
 */
export const validateSignUpInput = async (req, res, next) => {
  return await validate(req.body, signUpSchema)
    .then(() => next())
    .catch(next);
};

/**
 * Validates signIn input.
 * @param {object} req
 * @param {object} res
 * @param {Function} next
 * @returns {object}
 */
export const validateSignInInput = async (req, res, next) => {
  return await validate(req.body, signInSchema)
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

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

export const validateSignUpInput = validate(signUpSchema);
export const validateSignInInput = validate(signInSchema);
export const validateRefreshToken = validate(tokenSchema);

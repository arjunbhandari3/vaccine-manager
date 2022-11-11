import Joi from 'joi';

import validate from '../utils/validate';

const createSchema = Joi.object({
  name: Joi.string().required().label('Name'),
  description: Joi.string().required().label('Description'),
  numberOfDoses: Joi.number().required().label('Number of Doses'),
  manufacturer: Joi.string().required().label('Manufacturer'),
  releaseDate: Joi.date().required().label('Release Date'),
  expirationDate: Joi.date().required().label('Expiration Date'),
  photoUrl: Joi.string().label('Photo URL').allow(null),
  isMandatory: Joi.boolean().label('Is Mandatory'),
  allergies: Joi.array().label('Allergies'),
});

const updateSchema = Joi.object({
  name: Joi.string().label('Name'),
  description: Joi.string().label('Description'),
  numberOfDoses: Joi.number().label('Number of Doses'),
  manufacturer: Joi.string().label('Manufacturer'),
  releaseDate: Joi.date().label('Release Date'),
  expirationDate: Joi.date().label('Expiration Date'),
  photoUrl: Joi.string().label('Photo URL').allow(null),
  isMandatory: Joi.boolean().label('Is Mandatory'),
  allergies: Joi.array().label('Allergies'),
});

/**
 * Validates create vaccine request.
 * @param {object} req
 * @param {object} res
 * @param {Function} next
 * @returns {object}
 */
export const validateCreate = async (req, res, next) => {
  if (req.body?.allergies?.length > 0) {
    req.body.allergies = JSON.parse(req.body.allergies);
  }
  return await validate(req.body, createSchema)
    .then(() => next())
    .catch(next);
};

/**
 * Validates update vaccine request.
 * @param {object} req
 * @param {object} res
 * @param {Function} next
 * @returns {object}
 */
export const validateUpdate = async (req, res, next) => {
  if (req.body?.allergies?.length > 0) {
    req.body.allergies = JSON.parse(req.body.allergies);
  }

  return await validate(req.body, updateSchema)
    .then(() => next())
    .catch(next);
};

import Joi from 'joi';

import validate from '../utils/validate';

const createVaccineSchema = Joi.object({
  name: Joi.string().required().label('Name'),
  description: Joi.string().required().label('Description'),
  numberOfDoses: Joi.number().required().label('Number of Doses'),
  manufacturer: Joi.string().required().label('Manufacturer'),
  releaseDate: Joi.date().required().label('Release Date'),
  expirationDate: Joi.date().required().label('Expiration Date'),
  photoUrl: Joi.string().label('Photo URL').allow(null),
  isMandatory: Joi.boolean().label('Is Mandatory'),
});

const updateVaccineSchema = Joi.object({
  id: Joi.number().required().label('Id'),
  name: Joi.string().label('Name'),
  description: Joi.string().label('Description'),
  numberOfDoses: Joi.number().label('Number of Doses'),
  manufacturer: Joi.string().label('Manufacturer'),
  releaseDate: Joi.date().label('Release Date'),
  expirationDate: Joi.date().label('Expiration Date'),
  photoUrl: Joi.string().label('Photo URL').allow(null),
  isMandatory: Joi.boolean().label('Is Mandatory'),
});

/**
 * Validates create vaccine request.
 * @param {object} req
 * @param {object} res
 * @param {Function} next
 * @returns {object}
 */
export const validateCreateVaccine = async (req, res, next) => {
  return await validate(req.body, createVaccineSchema)
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
export const validateUpdateVaccine = async (req, res, next) => {
  return await validate(req.body, updateVaccineSchema)
    .then(() => next())
    .catch(next);
};

import Joi from 'joi';

import validate from '../utils/validate';

const createSchema = Joi.object({
  name: Joi.string().required().label('Name'),
  description: Joi.string().required().label('Description'),
  numberOfDoses: Joi.number().required().label('Number of Doses'),
  manufacturer: Joi.string().required().label('Manufacturer'),
  releaseDate: Joi.date().required().label('Release Date'),
  expirationDate: Joi.date().required().label('Expiration Date'),
  photoUrl: Joi.string().label('Photo URL').allow(null, ''),
  isMandatory: Joi.boolean().label('Is Mandatory'),
  allergies: Joi.string().label('Allergies'),
});

const updateSchema = Joi.object({
  name: Joi.string().label('Name'),
  description: Joi.string().label('Description'),
  numberOfDoses: Joi.number().label('Number of Doses'),
  manufacturer: Joi.string().label('Manufacturer'),
  releaseDate: Joi.date().label('Release Date'),
  expirationDate: Joi.date().label('Expiration Date'),
  photoUrl: Joi.string().label('Photo URL').allow(null, ''),
  isMandatory: Joi.boolean().label('Is Mandatory'),
  allergies: Joi.string().label('Allergies'),
});

const patchUpdateSchema = Joi.object({
  isMandatory: Joi.boolean().label('Is Mandatory'),
});

export const validateCreate = validate(createSchema);
export const validateUpdate = validate(updateSchema);
export const validatePatchUpdate = validate(patchUpdateSchema);

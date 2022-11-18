import CustomError from './error';

/**
 * Validate the input data with joi schema.
 *
 * @param {object} data
 * @param {object} schema
 * @returns {object}
 */
const validate = async (data, schema) => {
  try {
    const value = await schema.validateAsync(data, { abortEarly: false });

    return value;
  } catch (error) {
    const message = error.message || 'Validation error';

    throw new CustomError(message, 400);
  }
};

export default validate;

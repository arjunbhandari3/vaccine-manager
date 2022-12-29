import CustomError from './error';

/**
 * Validate the input data with joi schema.
 *
 * @param {object} schema
 * @returns {object}
 */
const validate = schema => async (req, res, next) => {
  const options = {
    abortEarly: false, // include all errors
    allowUnknown: true, // ignore unknown props
    stripUnknown: true, // remove unknown props
  };

  try {
    const value = await schema.validateAsync(req.body, options);
    req.body = value;
    next();
  } catch (error) {
    const message = error.message || 'Validation error';
    next(new CustomError(message, 400));
  }
};

export default validate;

/**
 * Build supplied string by interpolating properties after delimiter ':' with the given parameters.
 *
 * @example
 * interpolate(':name is here.', {name: 'Ram'})
 * => 'Ram is here.'
 *
 * @param {string} str
 * @param {object} params
 *
 * @returns string
 */
export const interpolate = (str, params = {}) => {
  const formattedString = Object.keys(params).reduce(
    (result, key) => result.replace(`:${key}`, params[key]),
    str
  );

  return formattedString;
};

/**
 * Truncate the given string to the given length.
 *
 * @param {string} str
 * @param {number} length
 *
 * @returns string
 */
export const truncate = (str, length = 10) => {
  if (str.length <= length) {
    return str;
  }

  return `${str.substring(0, length)}...`;
};

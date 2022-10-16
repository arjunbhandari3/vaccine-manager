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
  let formattedString = str;

  Object.keys(params).forEach((key) => {
    formattedString = formattedString.replace(`:${key}`, params[key]);
  });

  return formattedString;
};

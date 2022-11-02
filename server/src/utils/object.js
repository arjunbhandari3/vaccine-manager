/**
 * Remove not required attributes from given object.
 *
 * @param {Object} obj
 * @param {Array} notRequiredAttributes
 */
export function withoutAttrs(obj, notRequiredAttributes = []) {
  const result = {};

  Object.keys(obj).forEach(key => {
    if (!notRequiredAttributes.includes(key)) {
      result[key] = obj[key];
    }
  });

  return result;
}

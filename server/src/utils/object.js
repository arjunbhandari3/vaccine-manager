/**
 * Remove not required attributes from given object.
 *
 * @param {Object} obj
 * @param {Array} notRequiredAttributes
 */
export function withoutAttrs(obj, notRequiredAttributes = []) {
  return Object.keys(obj).reduce((result, key) => {
    if (!notRequiredAttributes.includes(key)) {
      result[key] = obj[key];
    }

    return result;
  }, {});
}

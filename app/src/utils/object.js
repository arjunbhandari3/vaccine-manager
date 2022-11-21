/**
 * Remove empty keys from an object.
 *
 * @param {*} obj
 * @param {*} acc
 */
export function cleanObject(obj, acc) {
  return Object.keys(obj).reduce((result, key) => {
    if (obj[key] == null || obj[key] === "") {
      return result;
    }

    result[key] = obj[key];

    return result;
  }, acc || {});
}

/**
 * Remove empty keys from an object.
 *
 * @param {*} obj
 * @param {*} acc
 */
export function cleanObject(obj, acc) {
  const cleaned = acc || {};

  Object.keys(obj).forEach((key) => {
    if (obj[key] !== undefined && obj[key] !== null) {
      cleaned[key] = obj[key];
    }
  });

  return cleaned;
}

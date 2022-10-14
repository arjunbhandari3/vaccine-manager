/**
 * Remove fields from object.
 * @param {object} object
 * @param {array} fields
 * @returns {object}
 */
export const filterFields = (object, fields = []) => {
  const filteredObject = { ...object };

  fields.forEach(field => {
    delete filteredObject[field];
  });

  return filteredObject;
};

/**
 * Remove fields from object.
 * @param {object} user
 * @param {array} fields
 * @returns {object}
 */
export const filterFields = (user, fields) => {
  const filteredUser = { ...user };

  fields.forEach(field => {
    delete filteredUser[field];
  });

  return filteredUser;
};

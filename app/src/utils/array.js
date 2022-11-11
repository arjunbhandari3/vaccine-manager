/**
 * Sort vaccines data
 *
 * @param {Array} data
 * @returns {Array} sorted data
 */
export const sortVaccinesData = (data) => {
  const mandatoryVaccine = data.filter((vaccine) => vaccine.isMandatory);
  const optionalVaccine = data.filter((vaccine) => !vaccine.isMandatory);

  return [
    ...sortDataByKey(mandatoryVaccine),
    ...sortDataByKey(optionalVaccine),
  ];
};

/**
 * Sort data by key
 *
 * @param {Array} data
 * @param {string} key
 * @param {string} order
 * @returns {Array} sorted data
 */

export const sortDataByKey = (data, key = "name", order = "asc") => {
  return data.sort((a, b) => {
    if (order === "asc") {
      return a[key].localeCompare(b[key]);
    } else {
      return b[key].localeCompare(a[key]);
    }
  });
};

/**
 * Truncate the given array to the given length.
 *
 * @param {array} arr
 * @param {number} length
 *
 * @returns array
 */

export const truncateArray = (arr, length = 5) => {
  if (arr.length <= length) {
    return arr;
  }

  return arr.slice(0, length);
};

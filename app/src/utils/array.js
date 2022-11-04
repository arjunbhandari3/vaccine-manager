export const sortVaccinesData = (data) => {
  const mandatoryVaccine = data.filter((vaccine) => vaccine.isMandatory);
  const optionalVaccine = data.filter((vaccine) => !vaccine.isMandatory);

  return [
    ...sortDataByKey(mandatoryVaccine),
    ...sortDataByKey(optionalVaccine),
  ];
};

export const sortDataByKey = (data = [], key = "name") => {
  return data.sort((a, b) => a[key].localeCompare(b[key]));
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

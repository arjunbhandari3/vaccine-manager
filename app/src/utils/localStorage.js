/**
 * Set Data to local storage
 * @param {string} key
 * @param {string} value
 * @param {boolean} isObject
 */
export const setDataToLocalStorage = (key, value, isObject = false) => {
  localStorage.setItem(key, isObject ? JSON.stringify(value) : value);
};

/**
 * Get data from local storage
 * @param {string} key
 * @param {boolean} isObject
 * @returns {string} value
 */
export const getDataFromLocalStorage = (key, isObject = false) => {
  return isObject
    ? JSON.parse(localStorage.getItem(key))
    : localStorage.getItem(key);
};

/**
 * Remove item data from localStorage
 * @param {string} key
 */
export const removeDataFromLocalStorage = (key) => {
  localStorage.removeItem(key);
};

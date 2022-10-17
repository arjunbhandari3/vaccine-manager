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
  const value = localStorage.getItem(key);

  return isObject ? JSON.parse(value) : value;
};

/**
 * Remove item data from localStorage
 * @param {string} key
 */
export const removeDataFromLocalStorage = (key) => {
  localStorage.removeItem(key);
};

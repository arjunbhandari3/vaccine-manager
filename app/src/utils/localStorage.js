const localStorageObject = {
  get: (key, isObject = false) => {
    const value = localStorage.getItem(key);

    return isObject ? JSON.parse(value) : value;
  },

  set: (key, value, isObject = false) => {
    localStorage.setItem(key, isObject ? JSON.stringify(value) : value);
  },

  remove: (key) => {
    localStorage.removeItem(key);
  },

  clear: () => {
    localStorage.clear();
  },
};

export default localStorageObject;

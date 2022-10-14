/**
 * Create a new vaccine.
 *
 * @param {object} payload
 * @returns {Object}
 */
export const createVaccine = async payload => {
  const vaccine = await Vaccine.getVaccineByName(payload.name);

  if (vaccine) {
    throw new Error('Vaccine already exists!');
  }

  const vaccinePayload = { ...payload, created_by: req.user.id, created_at: new Date() };

  const newVaccine = await Vaccine.createVaccine(vaccinePayload);

  return newVaccine;
};

/**
 * Get vaccine by id.
 * @param {Number} id
 * @returns {Object}
 */
export const getVaccineById = async id => {
  const vaccine = await Vaccine.getVaccineById(id);

  return vaccine;
};

/**
 * Get vaccine by name.
 * @param {String} name
 * @returns {Object}
 */
export const getVaccineByName = async name => {
  const vaccine = await Vaccine.getVaccineByName(name);

  return vaccine;
};

/**
 * Get all vaccines.
 * @returns {Object}
 */
export const getAllVaccines = async () => {
  const vaccines = await Vaccine.getAllVaccines();

  return vaccines;
};

/**
 * Update vaccine.
 * @param {Number} id
 * @param {Object} payload
 * @returns {Object}
 */
export const updateVaccine = async (id, payload) => {
  const vaccine = await Vaccine.getVaccineById(id);

  if (!vaccine) {
    throw new Error('Vaccine does not exist!');
  }

  const vaccinePayload = { ...payload, updated_by: req.user.id, updated_at: new Date() };

  const updatedVaccine = await Vaccine.updateVaccine(id, vaccinePayload);

  return updatedVaccine;
};

/**
 * Delete vaccine.
 * @param {Number} id
 * @returns {Object}
 */
export const deleteVaccine = async id => {
  const vaccine = await Vaccine.getVaccineById(id);

  if (!vaccine) {
    throw new Error('Vaccine does not exist!');
  }

  const deletedVaccine = await Vaccine.deleteVaccine(id);

  return deletedVaccine;
};

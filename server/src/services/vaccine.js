import Vaccine from '../models/vaccine';

import logger from '../utils/logger';
import ErrorRes from '../utils/error';
import { deleteImageFromCloudinary, uploadImageToCloudinary } from '../utils/fileUploader';

/**
 * Create a new vaccine.
 *
 * @param {object} payload
 * @returns {Object}
 */
export const createVaccine = async payload => {
  logger.info('Creating vaccine');

  if (payload.photoUrl) {
    const uploadUrl = await uploadImageToCloudinary(payload.photoUrl);
    payload.photoUrl = uploadUrl;
  }

  const newVaccine = await Vaccine.createVaccine(payload);

  return newVaccine;
};

/**
 * Get vaccine by id.
 * @param {Number} id
 * @returns {Object}
 */
export const getVaccineById = async id => {
  logger.info('Getting vaccine by id:' + id);

  const vaccine = await Vaccine.getVaccineById(id);

  return vaccine;
};

/**
 * Get vaccine by name.
 * @param {String} name
 * @returns {Object}
 */
export const getVaccineByName = async name => {
  logger.info('Getting vaccine by name:' + name);

  const vaccine = await Vaccine.getVaccineByName(name);

  return vaccine;
};

/**
 * Get all vaccines.
 * @returns {Object}
 */
export const getAllVaccines = async () => {
  logger.info('Getting all vaccines');

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
  logger.info('Updating vaccine by id:' + id);

  const vaccine = await Vaccine.getVaccineById(id);

  if (!vaccine) {
    throw new ErrorRes('Vaccine does not exist!', 404);
  }

  if (payload.photoUrl) {
    const uploadUrl = await uploadImageToCloudinary(payload.photoUrl);
    payload.photoUrl = uploadUrl;
  }

  if (vaccine.photoUrl) {
    await deleteImageFromCloudinary(vaccine.photoUrl);
  }

  const updatedVaccine = await Vaccine.updateVaccine(id, payload);

  return updatedVaccine;
};

/**
 * Delete vaccine.
 * @param {Number} id
 * @returns {Object}
 */
export const deleteVaccine = async id => {
  logger.info('Deleting vaccine by id:' + id);

  const vaccine = await Vaccine.getVaccineById(id);

  if (!vaccine) {
    throw new ErrorRes('Vaccine does not exist!', 404);
  }

  const deletedVaccine = await Vaccine.deleteVaccine(id);

  if (deletedVaccine.photoUrl) {
    await deleteImageFromCloudinary(deletedVaccine.photoUrl);
  }

  return deletedVaccine;
};

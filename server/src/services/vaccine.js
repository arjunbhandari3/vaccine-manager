import Vaccine from '../models/vaccine';
import Allergy from '../models/allergy';

import * as allergyService from './allergy';

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

  const { allergies, ...vaccine } = payload;

  const newVaccine = await Vaccine.createVaccine(vaccine);

  if (allergies?.length > 0) {
    const allergyPromises = allergies.map(async allergy => {
      const newAllergy = await Allergy.createAllergy({ ...allergy, vaccineId: newVaccine.id, createdAt: new Date() });

      return newAllergy;
    });

    const newAllergies = await Promise.all(allergyPromises);

    newVaccine.allergies = newAllergies;
  }

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

  const { allergies, ...vaccinePayload } = payload;

  const updatedVaccine = await Vaccine.updateVaccine(id, vaccinePayload);

  if (allergies?.length > 0) {
    let existingAllergiesIds = [];
    if (vaccine.allergies?.length > 0) {
      existingAllergiesIds = vaccine.allergies.map(allergy => allergy.id);
    }

    const upsertAllergyPromises = [];

    const newAllergiesIds = allergies.reduce((acc, allergy) => {
      upsertAllergyPromises.push(allergyService.upsertAllergy(vaccine.id, allergy));

      if (allergy.id) {
        acc.push(allergy.id);
      }

      return acc;
    }, []);

    const deletedAllergiesIds = existingAllergiesIds.filter(id => !newAllergiesIds.includes(id));

    if (deletedAllergiesIds.length > 0) {
      const deleteAllergyPromises = await Allergy.updateAllergiesByIds(deletedAllergiesIds, {
        deletedAt: new Date(),
        deletedBy: payload.updatedBy,
      });

      await Promise.all(deleteAllergyPromises);
    }

    const upsertedAllergies = await Promise.all(upsertAllergyPromises);

    updatedVaccine.allergies = upsertedAllergies;
  }

  return updatedVaccine;
};

/**
 * Delete vaccine.
 * @param {Number} id
 * @param {Object} payload
 * @returns {Object}
 */
export const deleteVaccine = async (id, payload) => {
  logger.info('Deleting vaccine by id:' + id);

  const vaccine = await Vaccine.getVaccineById(id);

  if (!vaccine) {
    throw new ErrorRes('Vaccine does not exist!', 404);
  }

  const deletedVaccine = await Vaccine.updateVaccine(id, payload);

  if (deletedVaccine.photoUrl) {
    await deleteImageFromCloudinary(deletedVaccine.photoUrl);
  }

  if (deletedVaccine.allergies?.length > 0) {
    const deletedAllergiesIds = deletedVaccine.allergies.map(allergy => allergy.id);

    const deleteAllergyPromises = await Allergy.updateAllergiesByIds(deletedAllergiesIds, {
      deletedAt: new Date(),
      deletedBy: payload.deletedBy,
    });

    const deletedAllergies = await Promise.all(deleteAllergyPromises);

    deletedVaccine.allergies = deletedAllergies;
  }

  return deletedVaccine;
};

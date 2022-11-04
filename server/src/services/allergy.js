import logger from '../utils/logger';
import Allergy from '../models/allergy';

/**
 * Upsert the allergy.
 *
 * @param {number} vaccineId
 * @param {object} allergy
 * @returns {Object}
 */
export const upsertAllergy = async (vaccineId, allergy) => {
  logger.info('Upserting allergy');

  const allergyData = { ...allergy, vaccineId };

  if (allergy.id) {
    const updatedAllergy = await Allergy.updateAllergy(allergy.id, {
      ...allergyData,
      updatedAt: new Date(),
    });

    return updatedAllergy;
  } else {
    const newAllergy = await Allergy.createAllergy({ ...allergyData, createdAt: new Date() });

    return newAllergy;
  }
};

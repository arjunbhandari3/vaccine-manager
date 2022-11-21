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

  const response = allergy?.id
    ? await Allergy.update(allergy.id, { ...allergyData, updatedAt: new Date() })
    : await Allergy.create(allergyData);

  return response;
};

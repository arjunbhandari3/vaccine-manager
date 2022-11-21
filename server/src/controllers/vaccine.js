import HttpStatus from 'http-status-codes';

import * as vaccineService from '../services/vaccine';

/**
 * Create a vaccine
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @returns {Object}
 */
export const createVaccine = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.photoUrl = req.file.path;
    }

    const data = await vaccineService.createVaccine(req.body);

    return res.status(HttpStatus.CREATED).json(data);
  } catch (error) {
    next(error);
  }
};

/**
 * Get a vaccine.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @returns {Object}
 */
export const getVaccineById = async (req, res, next) => {
  try {
    const data = await vaccineService.getVaccineById(req.params.id);

    return res.status(HttpStatus.OK).json(data);
  } catch (error) {
    next(error);
  }
};

/**
 * Get all vaccines.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @returns {Object}
 */
export const getAllVaccines = async (req, res, next) => {
  try {
    const data = await vaccineService.getAllVaccines(req.query);

    return res.status(HttpStatus.OK).json(data);
  } catch (error) {
    next(error);
  }
};

/**
 * Get count data.
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @returns {Object}
 */
export const getCount = async (req, res, next) => {
  try {
    const data = await vaccineService.getCount();

    return res.status(HttpStatus.OK).json(data);
  } catch (error) {
    next(error);
  }
};

/**
 * Update vaccine.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @returns {Object}
 */
export const updateVaccine = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.photoUrl = req.file.path;
    }

    const data = await vaccineService.updateVaccine(req.params.id, req.body);

    return res.status(HttpStatus.OK).json(data);
  } catch (error) {
    next(error);
  }
};

/**
 * Update mandatoryStatus of vaccine
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @returns {Object}
 */
export const updateMandatoryStatus = async (req, res, next) => {
  try {
    const data = await vaccineService.updateMandatoryStatus(req.params.id, req.body);

    return res.status(HttpStatus.OK).json(data);
  } catch (error) {
    next(error);
  }
};
/**
 * Delete vaccine.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @returns {Object}
 */
export const deleteVaccine = async (req, res, next) => {
  try {
    const { id } = req.params;

    const data = await vaccineService.deleteVaccine(id);

    return res.status(HttpStatus.OK).json(data);
  } catch (error) {
    next(error);
  }
};

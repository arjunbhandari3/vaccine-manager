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
export const getVaccine = async (req, res, next) => {
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
    const data = await vaccineService.getAllVaccines();

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
    const data = await vaccineService.updateVaccine(req.params.id, req.body);

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
    const data = await vaccineService.deleteVaccine(req.params.id);

    return res.status(HttpStatus.OK).json(data);
  } catch (error) {
    next(error);
  }
};

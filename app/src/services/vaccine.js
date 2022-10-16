import axios from "axios";

import config from "config/config";
import { interpolate } from "utils/string";

/**
 * Get all vaccines
 *
 * @returns {Promise}
 */
export const getAllVacccines = async () => {
  const url = interpolate(config.endpoints.vaccine.all);

  const { data } = await axios.get(url);

  return data;
};

/**
 * Get vaccine by id
 * @param {string} id
 * @returns {Promise}
 */
export const getVaccineById = async (id) => {
  const url = interpolate(config.endpoints.vaccine.one, { id });

  const { data } = await axios.get(url);

  return data;
};

/**
 * Add vaccine
 * @param {object} vaccine
 * @returns {Promise}
 */
export const addVaccine = async (vaccine) => {
  const { data } = await axios.post(config.endpoints.vaccine.all, vaccine, {
    headers: { "content-type": "multipart/form-data" },
  });

  return data;
};

/**
 * Edit a vaccine
 * @param {object} vaccine
 * @returns {Promise}
 */
export const editVaccine = async (vaccine) => {
  const url = interpolate(config.endpoints.vaccine.one, { id: vaccine.id });

  const { data } = await axios.put(url, vaccine, {
    headers: { "content-type": "multipart/form-data" },
  });

  return data;
};

/**
 * Delete a vaccine
 * @param {string} id
 * @returns {Promise}
 */
export const deleteVaccine = async (id) => {
  const url = interpolate(config.endpoints.vaccine.one, { id });

  const { data } = await axios.delete(url);

  return data;
};

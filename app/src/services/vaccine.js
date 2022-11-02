import axios from "axios";

import config from "config/config";
import { cleanObject } from "utils/object";
import { interpolate } from "utils/string";
import { getAuthHeader } from "utils/token";

/**
 * Get all vaccines
 *
 * @returns {Promise}
 */
export const getAllVaccines = async () => {
  const url = interpolate(config.endpoints.vaccine.all);

  const { data } = await axios.get(url, {
    headers: {
      "Content-type": "application/json",
      Authorization: getAuthHeader(),
    },
  });

  return data;
};

/**
 * Get vaccine by id
 * @param {string} id
 * @returns {Promise}
 */
export const getVaccineById = async (id) => {
  const url = interpolate(config.endpoints.vaccine.one, { id });

  const { data } = await axios.get(url, {
    headers: {
      "Content-type": "application/json",
      Authorization: getAuthHeader(),
    },
  });

  return data;
};

/**
 * Add vaccine
 * @param {object} vaccine
 * @returns {Promise}
 */
export const addVaccine = async (vaccine) => {
  const { data } = await axios.post(config.endpoints.vaccine.all, vaccine, {
    headers: {
      "content-type": "multipart/form-data",
      Authorization: getAuthHeader(),
    },
  });

  return data;
};

/**
 * Update a vaccine
 * @param {object} vaccine
 * @returns {Promise}
 */
export const updateVaccine = async (id, vaccine) => {
  const url = interpolate(config.endpoints.vaccine.one, { id: id });

  const vaccineData = cleanObject(vaccine);

  const { data } = await axios.put(url, vaccineData, {
    headers: {
      "content-type": "multipart/form-data",
      Authorization: getAuthHeader(),
    },
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

  const { data } = await axios.delete(url, {
    headers: { Authorization: getAuthHeader() },
  });

  return data;
};

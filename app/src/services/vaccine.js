import moment from "moment";

import config from "config/config";

import http from "utils/http";
import { cleanObject } from "utils/object";
import { interpolate } from "utils/string";
import { getAuthHeader } from "utils/token";
import { sortVaccinesData } from "utils/array";

/**
 * Format the vaccine data.
 * @param {*} vaccines
 * @returns
 */
const formatVaccineData = (vaccines) => {
  return vaccines.map((vaccine) => ({
    ...vaccine,
    releaseDate: moment(vaccine.releaseDate).format("YYYY-MM-DD"),
    expirationDate: moment(vaccine.expirationDate).format("YYYY-MM-DD"),
  }));
};

/**
 * Get all vaccines
 *
 * @returns {Promise}
 */
export const getAllVaccines = async () => {
  const url = interpolate(config.endpoints.vaccine.all);

  const { data } = await http.get(url);

  const sortedData = sortVaccinesData(formatVaccineData(data));

  return sortedData;
};

/**
 * Get vaccine by id
 * @param {string} id
 * @returns {Promise}
 */
export const getVaccineById = async (id) => {
  const url = interpolate(config.endpoints.vaccine.one, { id });

  const { data } = await http.get(url);

  return data;
};

/**
 * Add vaccine
 * @param {object} vaccine
 * @returns {Promise}
 */
export const addVaccine = async (vaccine) => {
  const { data } = await http.post(config.endpoints.vaccine.all, vaccine, {
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

  const { data } = await http.put(url, vaccineData, {
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

  const { data } = await http.delete(url);

  return data;
};

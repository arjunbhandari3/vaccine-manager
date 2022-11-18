import moment from "moment";

import config from "config/config";

import http from "utils/http";
import { cleanObject } from "utils/object";
import { interpolate } from "utils/string";
import { getAuthHeader } from "utils/token";
import { sortVaccinesData } from "utils/array";

import { DATE_FORMAT } from "constants/common";

/**
 * Format the vaccine data.
 * @param {*} vaccines
 * @returns {Array}
 */
const formatVaccineData = (vaccines) => {
  return vaccines.map((vaccine) => ({
    ...vaccine,
    releaseDate: moment(vaccine.releaseDate).format(DATE_FORMAT),
    expirationDate: moment(vaccine.expirationDate).format(DATE_FORMAT),
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
 * @param {string} id
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
 * Update vaccine mandatory status

 * @param {string} id
 * @param {object} payload
 * @returns {Promise}
 */
export const updateVaccineMandatoryStatus = async (id, payload) => {
  const url = interpolate(config.endpoints.vaccine.one, { id: id });

  const { data } = await http.patch(url, payload);

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

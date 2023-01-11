import moment from "moment";

import config from "config/config";

import http from "utils/http";
import { cleanObject } from "utils/object";
import { interpolate } from "utils/string";
import { getAuthHeader } from "utils/token";
import { sortVaccinesData } from "utils/array";

import { DATE_FORMAT } from "constants/date";
import { VACCINE_METADATA } from "constants/common";

/**
 * Format the vaccine data.
 * @param {*} vaccine
 * @returns {Object}
 */
export const formatVaccineData = (vaccine, action) => {
  if (action === "submit") {
    return {
      ...vaccine,
      releaseDate: moment(vaccine.releaseDate).format(DATE_FORMAT),
      expirationDate: moment(vaccine.expirationDate).format(DATE_FORMAT),
      allergies: JSON.stringify(vaccine.allergies || []),
    };
  }

  return {
    ...vaccine,
    key: vaccine.id,
    releaseDate: moment(vaccine.releaseDate),
    expirationDate: moment(vaccine.expirationDate),
  };
};

/**
 * Format the vaccines data.
 * @param {*} vaccines
 * @returns {Array}
 */
const formatVaccinesData = (vaccines) => {
  return vaccines?.map((vaccine) => formatVaccineData(vaccine));
};

/**
 * check vaccine mandatory.
 * @param {*} mandatory
 * @returns
 */
const getMandatory = (mandatory) => {
  if (!mandatory || mandatory === VACCINE_METADATA.TOTAL) {
    return null;
  }

  return mandatory === VACCINE_METADATA.MANDATORY;
};

/**
 * Get all vaccines
 *
 * @param {Object} filters
 * @returns {Promise}
 */
export const getAllVaccines = async (filters) => {
  const { search, mandatory } = filters || {};

  const query = { search, mandatory: getMandatory(mandatory) };

  const params = cleanObject(query);

  const { data } = await http.get(config.endpoints.vaccine.all, { params });

  const sortedData = sortVaccinesData(formatVaccinesData(data));

  return sortedData;
};

/**
 * Get vaccine count data.
 *
 * @returns {Promise}
 */
export const getVaccineCount = async () => {
  const { data } = await http.get(config.endpoints.vaccine.count);

  return data;
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

  const { data } = await http.put(url, vaccine, {
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

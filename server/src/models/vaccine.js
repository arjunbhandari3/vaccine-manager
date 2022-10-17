import db from '../db';

import { TABLE_NAME_VACCINE } from '../constants';

class Vaccine {
  static qb = db(TABLE_NAME_VACCINE);

  /**
   * Get vaccine by id.
   * @param {Number} id
   * @returns {Object}
   */
  static async getVaccineById(id) {
    const result = await this.qb.select('*').where('id', id);

    return result[0];
  }

  /**
   * Get vaccine by name.
   *
   * @param {string} name
   * @returns {Promise}
   */

  static async getVaccineByName(name) {
    const result = await this.qb.select('*').where('name', name);

    return result[0];
  }

  /**
   * Get all vaccines.
   * @returns {Object}
   */
  static async getAllVaccines() {
    const result = await this.qb.select('*');

    return result;
  }

  /**
   * Create a new vaccine.
   *
   * @param {object} payload
   * @returns {Promise}
   */
  static async createVaccine(payload) {
    const result = await this.qb.insert(payload).returning('*');

    return result[0];
  }

  /**
   * Update vaccine.
   *
   * @param {number} id
   * @param {object} payload
   * @returns {Promise}
   */
  static async updateVaccine(id, payload) {
    return await this.qb.where('id', id).update(payload).returning('*');
  }

  /**
   * Delete vaccine.
   *
   * @param {number} id
   * @returns {Promise}
   */
  static async deleteVaccine(id) {
    return await this.qb.returning('*').del().where('id', id);
  }
}

export default Vaccine;

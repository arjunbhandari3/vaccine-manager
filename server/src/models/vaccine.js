import db from '../db';

import { TABLE_NAME_VACCINE } from '../constants';

class Vaccine {
  static qb = () => db(TABLE_NAME_VACCINE);

  /**
   * Get vaccine by id.
   * @param {Number} id
   * @returns {Object}
   */
  static async getVaccineById(id) {
    const [result] = await this.qb().where('id', id).select('*');

    return result;
  }

  /**
   * Get vaccine by name.
   *
   * @param {string} name
   * @returns {Promise}
   */

  static async getVaccineByName(name) {
    const [result] = await this.qb().select('*').where('name', name);

    return result;
  }

  /**
   * Get all vaccines.
   * @returns {Object}
   */
  static async getAllVaccines() {
    const result = await this.qb().select('*').orderBy('id');

    return result;
  }

  /**
   * Create a new vaccine.
   *
   * @param {object} payload
   * @returns {Promise}
   */
  static async createVaccine(payload) {
    const [result] = await this.qb().insert(payload).returning('*');

    return result;
  }

  /**
   * Update vaccine.
   *
   * @param {number} id
   * @param {object} payload
   * @returns {Promise}
   */
  static async updateVaccine(id, payload) {
    const [result] = await this.qb().returning('*').update(payload).where('id', id);

    return result;
  }

  /**
   * Delete vaccine.
   *
   * @param {number} id
   * @returns {Promise}
   */
  static async deleteVaccine(id) {
    const [result] = await this.qb().returning('*').del().where('id', id);

    return result;
  }
}

export default Vaccine;

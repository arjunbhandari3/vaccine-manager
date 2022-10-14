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
    const result = this.qb.where('id', id).returning('*');

    return result.then(([vaccine]) => vaccine);
  }

  /**
   * Get vaccine by name.
   *
   * @param {string} name
   * @returns {Promise}
   */

  static getVaccineByName(name) {
    const result = this.qb.where('name', name).returning('*');

    return result.then(([vaccine]) => vaccine);
  }

  /**
   * Get all vaccines.
   * @returns {Object}
   */
  static getAllVaccines() {
    const result = this.qb.returning('*');

    return result;
  }

  /**
   * Create a new vaccine.
   *
   * @param {object} payload
   * @returns {Promise}
   */
  static createVaccine(payload) {
    return this.qb.insert(payload).returning('*');
  }

  /**
   * Update vaccine.
   *
   * @param {number} id
   * @param {object} payload
   * @returns {Promise}
   */
  static updateVaccine(id, payload) {
    return this.qb.where('id', id).update(payload).returning('*');
  }

  /**
   * Delete vaccine.
   *
   * @param {number} id
   * @returns {Promise}
   */
  static deleteVaccine(id) {
    return this.qb.returning('*').del().where('id', id);
  }
}

export default Vaccine;

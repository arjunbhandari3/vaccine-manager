import knex from '../db';

import { TABLE_NAME_ALLERGY } from '../constants';

class Allergy {
  static qb = () => knex(TABLE_NAME_ALLERGY);

  /**
   * Get allergy by id.
   * @param {Number} id
   * @returns {Object}
   */
  static async getById(id) {
    const [result] = await this.qb().where('id', id).select('*');

    return result;
  }

  /**
   * Get allergies by vaccineId.
   *
   * @param {number} vaccineId
   * @returns {Promise}
   */
  static async getByVaccineId(vaccineId) {
    const result = await this.qb().select('*').where('vaccineId', vaccineId);

    return result;
  }

  /**
   * Get all allergies.
   * @returns {Object}
   */
  static async getAll() {
    const result = await this.qb().select('*').orderBy('id');

    return result;
  }

  /**
   * Create a new allergy.
   *
   * @param {object} payload
   * @returns {Promise}
   */
  static async create(payload) {
    const [result] = await this.qb().insert(payload).returning('*');

    return result;
  }

  /**
   * Update allergy.
   *
   * @param {number} id
   * @param {object} payload
   * @returns {Promise}
   */
  static async update(id, payload) {
    const [result] = await this.qb().where('id', id).update(payload).returning('*');

    return result;
  }

  /**
   * Update by allergyIds.
   * @param {Array} ids
   * @param {Object} payload
   * @returns {Promise}
   */
  static async updateByIds(ids, payload) {
    const result = await this.qb().whereIn('id', ids).update(payload).returning('*');

    return result;
  }

  /**
   * Delete allergy.
   *
   * @param {number} id
   * @returns {Promise}
   */
  static async deleteById(id) {
    const [result] = await this.qb().where('id', id).del().returning('*');

    return result;
  }
}

export default Allergy;

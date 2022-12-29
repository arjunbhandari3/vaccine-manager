import knex from '../db';

import { TABLE_NAME_ALLERGY } from '../constants';

class Allergy {
  static qb = () => knex(TABLE_NAME_ALLERGY);

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
}

export default Allergy;

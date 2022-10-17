import db from '../db';

import { TABLE_NAME_USER } from '../constants';

class User {
  static qb = db(TABLE_NAME_USER);

  /**
   * Get user by id.
   * @param {Number} id
   * @returns {Object}
   */
  static async getUserById(id) {
    const result = await this.qb.select('*').where('id', id);

    return result[0];
  }

  /**
   * Get user by email.
   *
   * @param {string} email
   * @returns {Promise}
   */

  static async getUserByEmail(email) {
    const result = await this.qb.select('*').where('email', email);

    return result[0];
  }

  /**
   * Create a new user.
   *
   * @param {object} payload
   * @returns {Promise}
   */
  static async createUser(payload) {
    const result = await this.qb.insert(payload).returning('*');

    return result[0];
  }
}

export default User;

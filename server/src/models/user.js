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
    const result = this.qb.where('id', id).returning('*');

    return result.then(([user]) => user);
  }

  /**
   * Get user by email.
   *
   * @param {string} email
   * @returns {Promise}
   */

  static getUserByEmail(email) {
    const result = this.qb.where('email', email).returning('*');

    return result.then(([user]) => user);
  }

  /**
   * Create a new user.
   *
   * @param {object} payload
   * @returns {Promise}
   */
  static createUser(payload) {
    return this.qb.insert(payload).returning('*');
  }
}

export default User;

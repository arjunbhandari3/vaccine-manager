import db from '../db';

class User {
  static TABLE_NAME = 'user';

  static qb = db(this.TABLE_NAME);

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

  /**
   * Update user.
   *
   * @param {number} id
   * @param {object} payload
   * @returns {Promise}
   */
  static updateUser(id, payload) {
    return this.qb.where({ id }).update(payload).returning('*');
  }

  /**
   * Delete user.
   *
   * @param {number} id
   * @returns {Promise}
   */
  static deleteUser(id) {
    return this.qb.where({ id }).del();
  }
}

export default User;

import knex from '../db';

import CustomError from '../utils/error';

import { TABLE_NAME_USER } from '../constants';

class User {
  static qb = () => knex(TABLE_NAME_USER);

  /**
   * Get user by id.
   *
   * @param {number} id
   * @returns  {Object}
   */
  static async getById(id) {
    const [result] = await this.qb().select('*').where('id', id);
    if (!result) {
      throw new CustomError('User not found.', 404);
    }
    return result;
  }

  /**
   * Get user by email.
   *
   * @param {string} email
   * @returns {Promise}
   */

  static async getByEmail(email) {
    const [result] = await this.qb().select('*').where('email', email);

    return result;
  }

  /**
   * Create a new user.
   *
   * @param {object} payload
   * @returns {Promise}
   */
  static async create(payload) {
    const [result] = await this.qb().insert(payload, ['id', 'name', 'email', 'password']).returning('*');

    return result;
  }
}

export default User;

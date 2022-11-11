import { getHashedPassword } from '../utils/auth';

import { TABLE_NAME_USER } from '../constants';

/**
 * Delete existing entries and seed values for `user`.
 *
 * @param   {object} knex
 * @returns {Promise}
 */
export function seed(knex) {
  return knex(TABLE_NAME_USER)
    .del()
    .then(async () =>
      knex(TABLE_NAME_USER).insert([
        {
          id: 1,
          email: 'test@gmail.com',
          password: await getHashedPassword('test123'),
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 2,
          email: 'user@gmail.com',
          password: await getHashedPassword('user123'),
          created_at: new Date(),
          updated_at: new Date(),
        },
      ])
    );
}

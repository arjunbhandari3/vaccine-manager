import { TABLE_NAME_ALLERGY } from '../constants';

/**
 * Delete existing entries and seed values for `allergy`.
 *
 * @param   {object} knex
 * @returns {Promise}
 */
export function seed(knex) {
  return knex(TABLE_NAME_ALLERGY)
    .del()
    .then(async () =>
      knex(TABLE_NAME_ALLERGY).insert([
        {
          id: 1,
          allergy: 'Allergy 1',
          risk: 'Low',
          vaccine_id: 1,
          created_at: new Date(),
          updated_at: new Date(),
          deleted_at: null,
          deleted_by: null,
        },
        {
          id: 2,
          allergy: 'Allergy 2',
          risk: 'High',
          vaccine_id: 1,
          created_at: new Date(),
          updated_at: new Date(),
          deleted_at: null,
          deleted_by: null,
        },
        {
          id: 3,
          allergy: 'Allergy 3',
          risk: 'Medium',
          vaccine_id: 2,
          created_at: new Date(),
          updated_at: new Date(),
          deleted_at: null,
          deleted_by: null,
        },
      ])
    );
}

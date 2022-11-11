import { TABLE_NAME_VACCINE } from '../constants';

/**
 * Delete existing entries and seed values for `vaccine`.
 *
 * @param   {object} knex
 * @returns {Promise}
 */
export function seed(knex) {
  return knex(TABLE_NAME_VACCINE)
    .del()
    .then(async () =>
      knex(TABLE_NAME_VACCINE).insert([
        {
          id: 1,
          name: 'Vaccine 1',
          description: 'vaccine 1 desc',
          number_of_doses: 2,
          manufacturer: 'ABC',
          is_mandatory: false,
          release_date: '2022-11-08T18:15:00.000Z',
          expiration_date: '2022-11-29T18:15:00.000Z',
          photo_url: null,
          created_by: 1,
          created_at: new Date(),
          updated_by: 1,
          updated_at: new Date(),
          deleted_at: null,
          deleted_by: null,
        },
        {
          id: 2,
          name: 'Vaccine 2',
          description: 'vaccine 2 desc',
          number_of_doses: 3,
          manufacturer: 'ABC',
          is_mandatory: true,
          release_date: '2022-11-10T18:15:00.000Z',
          expiration_date: '2022-11-29T18:15:00.000Z',
          photo_url: null,
          created_by: 1,
          created_at: new Date(),
          updated_by: 1,
          updated_at: new Date(),
          deleted_at: null,
          deleted_by: null,
        },
      ])
    );
}

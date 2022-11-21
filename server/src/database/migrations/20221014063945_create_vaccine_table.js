import { TABLE_NAME_VACCINE } from '../../constants';

/**
 * Create table `vaccine`.
 *
 * @param   {object} knex
 * @returns {Promise}
 */
export function up(knex) {
  return knex.schema.createTable(TABLE_NAME_VACCINE, table => {
    table.increments();
    table.string('name').notNullable();
    table.string('description').notNullable();
    table.integer('number_of_doses').notNullable();
    table.string('manufacturer').notNullable();
    table.date('release_date').notNullable();
    table.date('expiration_date').notNullable();
    table.string('photo_url');
    table.boolean('is_mandatory').defaultTo(false);
    table.timestamp('created_at').notNull().defaultTo(knex.raw('now()'));
    table.timestamp('updated_at').notNull().defaultTo(knex.raw('now()'));
    table.timestamp('deleted_at');
  });
}

/**
 * Drop table `vaccine`.
 *
 * @param   {object} knex
 * @returns {Promise}
 */
export function down(knex) {
  return knex.schema.dropTable(TABLE_NAME_VACCINE);
}

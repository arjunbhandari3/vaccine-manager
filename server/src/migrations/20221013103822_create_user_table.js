import { TABLE_NAME_USER } from '../constants';

/**
 * Create table `user`.
 *
 * @param   {object} knex
 * @returns {Promise}
 */
export function up(knex) {
  return knex.schema.createTable(TABLE_NAME_USER, table => {
    table.increments();
    table.string('email', 128).unique().notNull();
    table.string('password', 128).notNull();
    table.timestamp('created_at').notNull().defaultTo(knex.raw('now()'));
    table.timestamp('updated_at').notNull().defaultTo(knex.raw('now()'));
  });
}

/**
 * Drop table `user`.
 *
 * @param   {object} knex
 * @returns {Promise}
 */
export function down(knex) {
  return knex.schema.dropTable(TABLE_NAME_USER);
}

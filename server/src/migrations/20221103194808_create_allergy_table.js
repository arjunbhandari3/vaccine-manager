import { ALLERGY_RISK_ENUM, TABLE_NAME_ALLERGY, TABLE_NAME_VACCINE } from '../constants';

/**
 * Create table `allergy`.
 *
 * @param   {object} knex
 * @returns {Promise}
 */
export function up(knex) {
  return knex.schema.createTable(TABLE_NAME_ALLERGY, table => {
    table.increments();
    table.string('allergy').notNullable();
    table.enu('risk', ALLERGY_RISK_ENUM).notNullable();
    table.integer('vaccine_id');
    table.foreign('vaccine_id').references('id').inTable(TABLE_NAME_VACCINE).onDelete('CASCADE');
    table.timestamp('created_at').notNull().defaultTo(knex.raw('now()'));
    table.timestamp('updated_at').notNull().defaultTo(knex.raw('now()'));
    table.timestamp('deleted_at');
    table.integer('deleted_by');
  });
}

/**
 * Drop table `allergy`.
 *
 * @param   {object} knex
 * @returns {Promise}
 */
export function down(knex) {
  return knex.schema.dropTable(TABLE_NAME_ALLERGY);
}

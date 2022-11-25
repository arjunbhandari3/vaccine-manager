import knex from '../db';

import { TABLE_NAME_ALLERGY, TABLE_NAME_VACCINE } from '../constants';

class Vaccine {
  static qb = () => knex(TABLE_NAME_VACCINE);

  /**
   * Get vaccine by id.
   * @param {Number} id
   * @returns {Object}
   */
  static async getById(id) {
    const [result] = await this.qb()
      .select(`${TABLE_NAME_VACCINE}.*`, `allergies.allergies`)
      .leftJoin(
        knex
          .select(
            'vaccine_id',
            knex.raw(`json_agg(jsonb_build_object('id',id,'allergy',allergy,'risk',risk)) as allergies`)
          )
          .from(`${TABLE_NAME_ALLERGY}`)
          .where(`${TABLE_NAME_ALLERGY}.deleted_at`, null)
          .groupBy('vaccine_id')
          .as('allergies'),
        'allergies.vaccine_id',
        'vaccine.id'
      )
      .where(`${TABLE_NAME_VACCINE}.id`, id);

    return result;
  }

  /**
   * Get all vaccines.
   *
   * @param {Object} filters
   * @returns {Object}
   */
  static async getAll(filters) {
    const query = this.qb()
      .select(`${TABLE_NAME_VACCINE}.*`, `allergies.allergies`)
      .leftJoin(
        knex
          .select(
            'vaccine_id',
            knex.raw(`json_agg(jsonb_build_object('id',id,'allergy',allergy,'risk',risk)) as allergies`)
          )
          .from(`${TABLE_NAME_ALLERGY}`)
          .where(`${TABLE_NAME_ALLERGY}.deleted_at`, null)
          .groupBy('vaccine_id')
          .as('allergies'),
        'allergies.vaccine_id',
        'vaccine.id'
      )
      .where(`${TABLE_NAME_VACCINE}.deleted_at`, null);

    if (filters) {
      this.appendFilter(query, filters);
    }

    const result = await query;

    return result;
  }

  /**
   * Append Filter.
   *
   * @param {Object} query
   * @param {Object} filters
   * @returns {Object}
   */
  static appendFilter(query, filters) {
    if (filters.mandatory) {
      query.where(`${TABLE_NAME_VACCINE}.is_mandatory`, filters.mandatory);
    }

    if (filters.search) {
      const search = `%${filters.search}%`;

      query
        .where(`${TABLE_NAME_VACCINE}.name`, 'ilike', search)
        .orWhere(`${TABLE_NAME_VACCINE}.description`, 'ilike', search)
        .orWhere(`${TABLE_NAME_VACCINE}.manufacturer`, 'ilike', search);
    }
  }

  /**
   * Get count data.
   * @returns {Promise}
   */
  static async getCount() {
    const [result] = await this.qb()
      .select(
        knex.raw(
          `count(*) as total, 
          count (*) filter(where is_mandatory = true) as mandatory,
          count (*) filter(where is_mandatory = false) as optional`
        )
      )
      .where(`${TABLE_NAME_VACCINE}.deleted_at`, null);

    return result;
  }

  /**
   * Create a new vaccine.
   *
   * @param {object} payload
   * @returns {Promise}
   */
  static async create(payload) {
    const [result] = await this.qb().insert(payload).returning('*');

    return result;
  }

  /**
   * Update vaccine.
   *
   * @param {number} id
   * @param {object} payload
   * @returns {Promise}
   */
  static async update(id, payload) {
    const [result] = await this.qb().returning('*').update(payload).where('id', id);

    return result;
  }

  /**
   * Update by vaccineIds.
   * @param {Array} ids
   * @param {Object} payload
   * @returns {Promise}
   */
  static async updateByIds(ids, payload) {
    const result = await this.qb().whereIn('id', ids).update(payload);

    return result;
  }

  /**
   * Delete vaccine.
   *
   * @param {number} id
   * @returns {Promise}
   */
  static async deleteById(id) {
    const [result] = await this.qb().returning('*').del().where('id', id);

    return result;
  }
}

export default Vaccine;

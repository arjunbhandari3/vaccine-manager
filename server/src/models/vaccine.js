import db from '../db';

import { TABLE_NAME_ALLERGY, TABLE_NAME_VACCINE } from '../constants';

class Vaccine {
  static qb = () => db(TABLE_NAME_VACCINE);

  /**
   * Get vaccine by id.
   * @param {Number} id
   * @returns {Object}
   */
  static async getById(id) {
    const [result] = await this.qb()
      .select(`${TABLE_NAME_VACCINE}.*`, `allergies.allergies`)
      .leftJoin(
        db
          .select(
            'vaccine_id',
            db.raw(`json_agg(jsonb_build_object('id',id,'allergy',allergy,'risk',risk)) as allergies`)
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
   * @returns {Object}
   */
  static async getAll() {
    const result = await this.qb()
      .select(`${TABLE_NAME_VACCINE}.*`, `allergies.allergies`)
      .where(`${TABLE_NAME_VACCINE}.deleted_at`, null)
      .leftJoin(
        db
          .select(
            'vaccine_id',
            db.raw(`json_agg(jsonb_build_object('id',id,'allergy',allergy,'risk',risk)) as allergies`)
          )
          .from(`${TABLE_NAME_ALLERGY}`)
          .where(`${TABLE_NAME_ALLERGY}.deleted_at`, null)
          .groupBy('vaccine_id')
          .as('allergies'),
        'allergies.vaccine_id',
        'vaccine.id'
      );

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

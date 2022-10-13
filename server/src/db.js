import knexJs from "knex";
import toSnakeCase from "to-snake-case";
import camelcaseKeys from "camelcase-keys";

import knexConfig from "./knexfile";

const dbConfig = {
  ...knexConfig,
  wrapIdentifier: (value, origImpl) => {
    if (value === "*") {
      return origImpl(value);
    }

    return origImpl(toSnakeCase(value));
  },
  postProcessResponse: (result) => {
    if (Array.isArray(result)) {
      if (result.length === 0 || !result[0] || typeof result[0] !== "object") {
        return result;
      } else {
        return camelcaseKeys(result, { deep: true });
      }
    }
  },
};

/**
 * Database connection.
 */
const knex = knexJs(dbConfig);

export default knex;

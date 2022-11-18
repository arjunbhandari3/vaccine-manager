import config from './config/config';

import { ENV } from './constants';

// Default configuration for database connection
let connection = {
  port: config.db.port,
  host: config.db.host,
  user: config.db.user,
  password: config.db.password,
  database: config.db.name,
};

// For test environment
if (config.env === ENV.TEST) {
  connection = {
    port: config.db.test.port,
    host: config.db.test.host,
    user: config.db.test.user,
    password: config.db.test.password,
    database: config.db.test.name,
  };
}

/**
 * Database configuration.
 */
module.exports = {
  connection,
  client: config.db.client,
  migrations: {
    tableName: 'migrations',
    directory: './migrations',
    stub: './stubs/migration.stub',
  },
  seeds: {
    directory: './seeds',
    stub: './stubs/seed.stub',
  },
};

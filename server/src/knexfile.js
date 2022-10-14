import dotenv from 'dotenv';

dotenv.config({ path: `${__dirname}/../.env` });

// TODO:change according to requirements.
// Default configuration for database connection
const connection = {
  port: process.env.DB_PORT,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};

/**
 * Database configuration.
 */
module.exports = {
  connection,
  client: process.env.DB_CLIENT,
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

import dotenv from 'dotenv';

dotenv.config({ path: __dirname + '/../../.env' });

/**
 * Server wide configuration.
 */

const config = {
  port: process.env.PORT,
  testPort: process.env.TEST_PORT,
  env: process.env.NODE_ENV,

  // Database
  db: {
    client: process.env.DB_CLIENT,

    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    name: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,

    test: {
      host: process.env.TEST_DB_HOST,
      port: process.env.TEST_DB_PORT,
      name: process.env.TEST_DB_NAME,
      user: process.env.TEST_DB_USER,
      password: process.env.TEST_DB_PASSWORD,
    },
  },

  // Token
  token: {
    access: {
      secret: process.env.ACCESS_TOKEN_SECRET,
      expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN,
    },

    refresh: {
      secret: process.env.REFRESH_TOKEN_SECRET,
      expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN,
    },

    testAccessToken: process.env.TEST_ACCESS_TOKEN,
    testRefreshToken: process.env.TEST_REFRESH_TOKEN,
  },

  // Cloudinary
  cloudinary: {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    apiKey: process.env.CLOUDINARY_API_KEY,
    apiSecret: process.env.CLOUDINARY_API_SECRET,
  },
};

export default config;

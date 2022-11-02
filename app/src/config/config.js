/**
 * Application wide configuration.
 */
const config = {
  env: process.env.REACT_APP_ENV,
  endpoints: {
    auth: {
      signIn: "/api/auth/signin",
      signUp: "/api/auth/signup",
      refreshToken: "/api/auth/token",
    },
    vaccine: {
      all: "/api/vaccines",
      one: "/api/vaccines/:id",
    },
  },
};

export default config;

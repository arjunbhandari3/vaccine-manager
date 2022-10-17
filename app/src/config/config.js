/**
 * Application wide configuration.
 */
const config = {
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

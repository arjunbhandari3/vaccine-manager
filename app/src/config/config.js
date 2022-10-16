/**
 * Application wide configuration.
 */
const config = {
  endpoints: {
    auth: {
      signIn: "/signin",
      signUp: "/signup",
      refreshToken: "/token",
    },
    vaccine: {
      all: "/vaccines",
      one: "/vaccines/:id",
    },
  },
};

export default config;

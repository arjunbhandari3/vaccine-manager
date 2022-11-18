/**
 * Application wide configuration.
 */
const config = {
  env: process.env.REACT_APP_ENV,
  apiBaseURL: process.env.REACT_APP_API_BASE_URL,
  endpoints: {
    auth: {
      signIn: "/api/auth/signin",
      signUp: "/api/auth/signup",
      refreshToken: "/api/auth/token",
      signOut: "/api/auth/signout",
    },
    vaccine: {
      all: "/api/vaccines",
      one: "/api/vaccines/:id",
    },
  },
};

export default config;

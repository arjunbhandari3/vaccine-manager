# Vaccine Manager

Vaccine Management Application where a logged in user can view, add, update and delete vaccines as well as their respectives allergies.

## How to run?

- Clone this repository.

  ```sh
  git clone https://github.com/arjunbhandari3/vaccine-manager.git
  ```

#### To run Backend server:

- Go to server folder using `cd server`
- Install all the dependencies using `yarn` or `npm install`.
- Copy `.env.example` as `.env` file using `cp .env.example .env`. Update the environment variables.
- Run the migrations using `yarn migrate` and seeds using `yarn seed`.
- Start the server using `yarn start:dev` or `npm run start:dev`.
- Server will be started on port 8000: [http://localhost:8000/](http://localhost:8000/)

#### To run Frontend:

- Go to server folder using `cd app`
- Install all the dependencies using `yarn` or `npm install`.
- Copy `.env.example` as `.env` file using `cp .env.example .env`. Update the environment variables.
- Start the server using `yarn start` or `npm run start`.
- Server will be started on port 3000: [http://localhost:3000/](http://localhost:3000/)

## Tests

- Run test cases using `yarn test` or `npm run test`
- Run tests with coverage using: `yarn test:coverage` or `npm run test:coverage`

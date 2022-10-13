import dotenv from "dotenv";
import express from "express";

import logger from "./utils/logger";
import errorHandler from "./middlewares/errorHandler";

// Environment setup
dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/api", (req, res) => {
  res.send("Vaccine Manager API");
});

//Error handler
app.use(errorHandler);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  logger.info(
    `Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`
  );
});

// Catch unhandled rejections
process.on("unhandledRejection", (err) => {
  logger.error("Unhandled rejection");
  logger.error(err.stack);

  process.exit(1);
});

// Catch uncaught exceptions
process.on("uncaughtException", (err) => {
  logger.error("Uncaught exception");
  logger.error(err.stack);

  process.exit(1);
});
export default (err, req, res, next) => {
  //Postgres unique constriant error
  if (err.code === "23505") {
    return res.status(400).send("User with this email exists already!");
  }

  logger.error(err.stack);
  res.status(500).send({ message: "Internal Server Error", stack: err.stack });
};

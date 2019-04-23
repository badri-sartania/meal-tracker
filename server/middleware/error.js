const logErrors = (err, req, res, next) => {
  console.error(err.stack);
  next(err);
};

const errorHandler = (err, req, res, next) => {
  if (err.code === "invalid_token") {
    console.log("Catched err", err);
    return res.status(401).json({
      message: "Your authorization token is expired",
      code: "INVALID_TOKEN"
    });
  }
  res.status(500).json(err);
};

module.exports = {
  logErrors,
  errorHandler
};

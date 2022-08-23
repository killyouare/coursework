const { JsonWebTokenError } = require("jsonwebtoken");
const ApiError = require("../Expressions/error");

module.exports = function (err, req, res, next) {
  console.log(err)

  if (err instanceof ApiError) {

    let error = {
      message: err.message
    }

    if (Object.keys(err.errors).length) {
      error.errors = err.errors
    }

    return res
      .status(err.status)
      .json({ error });
  }

  if (err instanceof JsonWebTokenError) {
    return res
      .status(401)
      .json({ error: { message: err.message } })
  }

  return res
    .status(500)
    .json({ error: { message: "Server error" } });
};

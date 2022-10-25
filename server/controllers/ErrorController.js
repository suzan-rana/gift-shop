const AppError = require("../utils/appError");
const sendErrorDev = (err, res) => {
  console.log(err);
  console.log(err.name);
  console.log(err.message);
  return res.status(err.statuscode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
    name: err.name,
  });
};
const sendErrorProd = (err, res) => {
  if (err.isOperational) {
    return res.status(400).json({
      status: "error",
      message: err.message,
    });
  } else {
    console.error("Error 💣", err);
    console.log(err.name);
    console.log(err.code);
    return res.status(500).json({
      status: "error",
      message: "something went wrong ",
    });
  }
};

module.exports = (err, req, res, next) => {
  err.statuscode = err.statuscode || 500;
  err.status = err.status || "error";
  if (process.env.NODE_ENV === "development") {
    return sendErrorDev(err, res);
  } else {
    if (err.name === "JsonWebTokenError") {
      return res.status(401).json({
        status: "Error",
        message: "invalid token please login with valid credentials ",
      });
    }
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({
        status: "error",
        message: "Token expired .You need to login again ",
      });
    }
    if (err.code === 11000) {
      return res.status(400).json({
        status: "Error",
        message: "user already exist try with another username and email ",
      });
    }

    sendErrorProd(err, res);
  }
};

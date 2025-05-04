console.log("🌍 Current environment:", process.env.NODE_ENV);

const AppError = require("./../utils/appError");

const handleJWTError = () =>
  new AppError("Invalid token. Please log in again!", 401);

const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new AppError(message, 400);
};

const handleJWTExpiredError = () =>
  new AppError("Your token has expired!", 401);

const handleDuplicateFieldsDB = (err) => {
  console.log("Error object:", err); // Log the full error to check the structure
  const value = err.keyValue?.name; // Ensure this safely accesses the 'name' field
  if (value) {
    console.log("Duplicate value:", value); // Log the duplicate value
  } else {
    console.log("No duplicate name found in error object");
  }
  const message = `Duplicate field value: ${value}. Please use another value!`;
  return new AppError(message, 400);
};

const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  const message = `Invalid input data. ${errors.join(". ")}`;
  return new AppError(message, 400);
};

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorProd = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    console.error("ERROR 💥", err);
    res.status(500).json({
      status: "error",
      message: "Something went very wrong!",
    });
  }
};

module.exports = (err, req, res, next) => {
  console.log("💥 Error handler triggered");
  console.log("💥 Error message:", err.message);
  if (res.headersSent) {
    return next(err);
  }
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === "production") {
    let error = { ...err }; // clone

    // 🔍 Add fallback for message/name manually
    error.message = err.message;
    error.name = err.name;
    console.log("error name: ", error.name);
    if (error.name === "CastError") error = handleCastErrorDB(error); // pass original!
    if (error.code === 11000) error = handleDuplicateFieldsDB(error); // pass original!
    if (error.name === "ValidationError")
      error = handleValidationErrorDB(error);
    if (error.name === "JsonWebTokenError") error = handleJWTError();
    if (error.name === "TokenExpiredError") {
      error = new AppError("Your token has expired! Please log in again.", 401);
    }
    sendErrorProd(error, res);
  }
};

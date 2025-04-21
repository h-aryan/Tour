class AppError extends Error {
  constructor(message, statusCode) {
    super(message); // Call the parent constructor with the message
    this.statusCode = statusCode; // Set the status code
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error"; // Determine if the status is a failure or error
    this.isOperational = true; // Indicate that this is an operational error

    Error.captureStackTrace(this, this.constructor); // Capture the stack trace for debugging
  }
}
module.exports = AppError;

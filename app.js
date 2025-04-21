const express = require("express");
const app = express();

const morgan = require("morgan");

const tourRouter = require("./routes/tourRoutes");
const userRouter = require("./routes/userRoutes");

app.use(express.json());
app.use(morgan("dev"));

app.use((req, res, next) => {
  console.log("Hello from the middleware!");
  next(); // Call next() to pass control to the next middleware function
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);

app.get(/(.*)/, (req, res, next) => {
  res.status(404).json({
    status: "fail",
    message: `Route not found on this ${req.originalUrl} server!`,
  });
});

//Global error handling middleware
// It catches any errors that occur in the application and sends a response to the client
app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
});

module.exports = app;

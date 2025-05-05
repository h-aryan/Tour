const express = require("express");
const app = express();
const AppError = require("./utils/appError");

const morgan = require("morgan");

const tourRouter = require("./routes/tourRoutes");
const userRouter = require("./routes/userRoutes");

app.use(express.json());
app.use(morgan("dev"));
app.use(express.json());

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
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

//Global error handling middleware
// It catches any errors that occur in the application and sends a response to the client
const globalErrorHandler = require("./controllers/errorController");
app.use(globalErrorHandler);
module.exports = app;

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

module.exports = app;

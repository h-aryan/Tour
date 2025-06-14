const path = require("path");
const express = require("express");
const app = express();
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const AppError = require("./utils/appError");
const hpp = require("hpp");
const morgan = require("morgan");

const tourRouter = require("./routes/tourRoutes");
const userRouter = require("./routes/userRoutes");
const reviewRouter = require("./routes/reviewRoutes");
const viewRouter = require("./routes/viewRoutes");

app.use(express.json());
app.use(morgan("dev"));
app.set("view engine", "pug"); // Set Pug as the view engine
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public"))); // Serve static files from the public directory
//RATE LIMITER
const limiter = rateLimit({
  max: 100, // Limit each IP to 100 requests per windowMs
  windowMs: 60 * 60 * 1000, // 1 hour in milliseconds
  message: "Too many requests from this IP, please try again in an hour!",
});

app.use("/api", limiter); // Apply the rate limiting middleware to all requests to /api

app.use(helmet()); // Set security HTTP headers

app.use((req, res, next) => {
  console.log("Hello from the middleware!");
  next(); // Call next() to pass control to the next middleware function
});

app.use(
  hpp({
    whitelist: [
      "duration",
      "ratingsQuantity",
      "ratingsAverage",
      "maxGroupSize",
      "difficulty",
      "price",
    ], // Whitelist of query parameters to allow HTTP parameter pollution
  })
); // Prevent HTTP parameter pollution

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// Define a simple route for the home page
app.use("/", viewRouter); // Use the viewRouter for rendering views
app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/reviews", reviewRouter);

app.get(/(.*)/, (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

//Global error handling middleware
// It catches any errors that occur in the application and sends a response to the client
const globalErrorHandler = require("./controllers/errorController");
app.use(globalErrorHandler);
module.exports = app;

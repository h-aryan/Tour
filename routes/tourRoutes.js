const express = require("express");
const tourController = require("./../controllers/tourController");
const router = express.Router();
const authController = require("./../controllers/authController");
const reviewRouter = require("./reviewRoutes");

// Nested routes
// Mounting the review router on the tour router
router.use("/:tourId/reviews", reviewRouter);

router
  .route("/tours-within/:distance/center/:latlng/unit/:unit")
  .get(tourController.getToursWithin);
//this route will get all tours within a certain distance from a given location

router.route("/distances/:latlng/unit/:unit").get(tourController.getDistances);
//this route will get the distances of all tours from a given location

router
  .route("/")
  //the auth controller will run first to see if the user is logged in or not
  //if the user is logged in, then the tour controller will run to get all tours
  .get(tourController.getAllTours)
  .post(
    authController.protect,
    authController.restrictTo("admin", "lead-guide"),
    tourController.createTour
  );

router.route("/tour-stats").get(tourController.tourStats);
router
  .route("/monthly-plan/:year")
  .get(
    authController.protect,
    authController.restrictTo("admin", "lead-guide", "guide"),
    tourController.getMonthlyPlan
  );
router
  .route("/:id")
  .get(tourController.getTour)
  .patch(
    authController.protect,
    authController.restrictTo("admin", "lead-guide"),
    tourController.updateTour
  )
  .delete(
    authController.protect,
    authController.restrictTo("admin", "lead-guide"),
    tourController.deleteTour
  );
router.get("/slug/:slug", tourController.getTourBySlug);

module.exports = router;

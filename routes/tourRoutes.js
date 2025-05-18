const express = require("express");
const tourController = require("./../controllers/tourController");
const router = express.Router();
const authController = require("./../controllers/authController");
const reviewController = require("./../controllers/reviewController");

router
  .route("/")
  //the auth controller will run first to see if the user is logged in or not
  //if the user is logged in, then the tour controller will run to get all tours
  .get(authController.protect, tourController.getAllTours)
  .post(tourController.createTour);

router.route("/tour-stats").get(tourController.tourStats);
router.route("/monthly-plan/:year").get(tourController.getMonthlyPlan);
router
  .route("/:id")
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(
    authController.protect,
    authController.restrictTo("admin", "lead-guide"),
    tourController.deleteTour
  );

router
  .route("/:tourId/reviews")
  .post(
    authController.protect,
    authController.restrictTo("user"),
    reviewController.createReview
  );

module.exports = router;

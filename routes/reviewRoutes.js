const reviewController = require("../controllers/reviewController");
const express = require("express");
const authController = require("../controllers/authController");

const router = express.Router({ mergeParams: true });

router.use(authController.protect); // Protect all routes after this middleware

router
  .route("/") // /api/v1/tours/:tourId/reviews
  .get(reviewController.getAllReviews)
  .post(
    authController.protect,
    authController.restrictTo("user"),
    reviewController.setTourUserIds,
    reviewController.createReview
  );

router
  .route("/:id")
  .delete(
    authController.restrictTo("user", "admin"),
    reviewController.deleteReview
  )
  .patch(
    authController.restrictTo("user", "admin"),
    reviewController.updateReview
  )
  .get(reviewController.getReview);

module.exports = router;

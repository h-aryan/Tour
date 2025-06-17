const express = require("express");
const view = require("../controllers/viewController");
const authController = require("../controllers/authController");

const router = express.Router();

router.get("/", authController.isLoggedIn, view.getOverview);
router.get("/tour/:id", authController.isLoggedIn, view.getTour);
router.get("/login", authController.isLoggedIn, view.getLoginForm);
router.get("/me", authController.protect, view.getAccount);

router.post("/submit-user-data", authController.protect, view.updateUserData);
router.post(
  "/update-password",
  authController.protect,
  authController.updatePassword
);

module.exports = router;
